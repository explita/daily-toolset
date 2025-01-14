"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { z, ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

import { debounce } from "../functionUtils";
import { formValidation } from "./formValidation";

type ZodSchema =
  | ZodObject<ZodRawShape>
  | ZodEffects<ZodObject<ZodRawShape>>
  | ZodTypeAny
  | undefined;

type FormContextType = {
  formValues: any;
  formErrors: any;
  schema: ZodSchema;
  setFormErrors: (errors: any) => void;
  setFormValues: (values: any) => void;
  setSchema: (schema: ZodSchema) => void;
  updateValue: (name: string | undefined, value: any) => void;
  validateField: (name: string | undefined, value: InputValue) => Promise<void>;
  setMode: (mode: FormMode) => void;
};

type InputValue = string | string[] | number | null;
type FormMode = "uncontrolled" | "controlled";

type FormProviderProps = {
  children: ReactNode;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: FormProviderProps) {
  const [formValues, setFormValues] = useState<Record<string, InputValue>>({});
  const [formErrors, setFormErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [schema, setSchema] = useState<ZodSchema>(undefined);
  const [mode, setMode] = useState<FormMode>("controlled");

  const updateValue = useCallback(
    debounce((name: string | undefined, value: string) => {
      if (mode === "uncontrolled" || !name) return;

      setFormValues((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }, 300),
    [mode]
  );

  const validateField = useCallback(
    async (name: string | undefined, inputValue: InputValue) => {
      if (!name || !schema || mode === "uncontrolled") return;

      const formData = new FormData();
      formData.append(name, inputValue?.toString() ?? "");
      const result = await formValidation(schema, formData);

      if (result.status !== "success") {
        setFormErrors((prev) => ({
          ...prev,
          [name]: result.errorData?.errors[name],
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [schema, mode]
  );

  const contextValues = useMemo(
    () => ({
      formValues,
      formErrors,
      schema,
      setFormValues,
      setFormErrors,
      setSchema,
      updateValue,
      validateField,
      setMode,
    }),
    [formValues, formErrors, schema]
  );

  return (
    <FormContext.Provider value={contextValues}>
      {children}
    </FormContext.Provider>
  );
}

type UnwrapZodSchema<T> = T extends ZodEffects<infer U>
  ? UnwrapZodSchema<U>
  : T;
type InferZodSchema<T> = T extends ZodObject<ZodRawShape> ? z.infer<T> : never;

export function useForm<
  Schema extends
    | ZodObject<ZodRawShape>
    | ZodEffects<ZodObject<ZodRawShape>>
    | undefined,
  DefaultValues = Schema extends undefined
    ? Record<string, unknown>
    : InferZodSchema<UnwrapZodSchema<Schema>>
>(
  props: {
    schema?: Schema;
    defaultValues?: DefaultValues;
    errors?: Partial<Record<keyof DefaultValues, string>>;
    mode?: "controlled" | "uncontrolled";
  } = {}
) {
  const {
    schema,
    defaultValues = {} as DefaultValues,
    errors = {},
    mode = "controlled",
  } = props;
  const context = useContext(FormContext);

  useEffect(() => {
    if (schema && context) {
      context.setSchema(schema);
    }
  }, [schema, context]);

  useEffect(() => {
    if (context) {
      context.setMode(mode);
    }
  }, [mode, context]);

  useEffect(() => {
    if (context && Object.keys(defaultValues as object).length > 0) {
      const valuesEqual =
        JSON.stringify(context.formValues) === JSON.stringify(defaultValues);

      if (!valuesEqual) {
        context.setFormValues(defaultValues);
      }
    }
  }, [defaultValues]);

  useEffect(() => {
    if (
      context &&
      Object.keys(errors).length > 0 &&
      JSON.stringify(context.formErrors) !== JSON.stringify(errors)
    ) {
      context.setFormErrors(errors);
    }
  }, [errors, context]);

  if (!context) {
    // console.warn(
    //   "FormContext is not initialized. Wrap your component in a FormProvider."
    // );
    return {
      formValues: defaultValues,
      formErrors: errors,
      updateValue: () => {},
      validateField: async () => {},
    };
  }

  const formValues = (
    context.formValues && Object.keys(context.formValues).length > 0
      ? context.formValues
      : {}
  ) as InferZodSchema<UnwrapZodSchema<Schema>> | DefaultValues;

  return {
    formValues,
    formErrors: context.formErrors as Partial<
      Record<keyof InferZodSchema<UnwrapZodSchema<Schema>>, string>
    >,
    updateValue: context.updateValue,
    validateField: context.validateField,
  };
}
