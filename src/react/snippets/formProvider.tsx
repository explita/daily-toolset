"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { z, ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

import { debounce } from "../../functionUtils";
import { formValidation } from "../../validation/formValidation";

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
  validateValue: (name: string | undefined, value: InputValue) => Promise<void>;
  setMode: (mode: FormMode) => void;
  getValues: () => Record<string, InputValue>;
  getErrors: () => Record<string, string | undefined>;
  setValue: (name: string | undefined, value: any) => void;
  getValue: (name: string) => InputValue | undefined;
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
      validateValue: validateField,
      setMode,
      getValues: () => formValues,
      getErrors: () => formErrors,
      setValue: updateValue,
      getValue: (name: string) => formValues[name],
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
  const previousErrorsRef = useRef<Record<string, string | undefined>>({});
  const previousDefaultValuesRef = useRef<Record<string, any>>({});

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
    if (context && defaultValues) {
      const previousDefaultValues = previousDefaultValuesRef.current;

      const valuesEqual =
        Object.keys(previousDefaultValues).length ===
          Object.keys(defaultValues).length &&
        Object.keys(defaultValues).every(
          (key) => previousDefaultValues[key] === (defaultValues as any)[key]
        );

      if (!valuesEqual) {
        context.setFormValues(defaultValues);
        previousDefaultValuesRef.current = defaultValues; // Update the ref to the new state
      }
    }
  }, [defaultValues, context]);

  useEffect(() => {
    if (context) {
      if (Object.keys(errors).length === 0) {
        // Only clear errors if they are different from the previous state
        if (Object.keys(previousErrorsRef.current).length > 0) {
          context.setFormErrors({});
          previousErrorsRef.current = {}; // Update the ref to the new state
        }
      } else {
        const hasErrorsChanged =
          Object.keys(errors).length !==
            Object.keys(previousErrorsRef.current).length ||
          Object.keys(errors).some(
            (key) => previousErrorsRef.current[key] !== (errors as any)[key]
          );

        if (hasErrorsChanged) {
          context.setFormErrors(errors);
          previousErrorsRef.current = errors; // Update the ref to the new state
        }
      }
    }
  }, [errors, context]);

  if (!context) {
    // console.warn(
    //   "FormContext is not initialized. Wrap your component in a FormProvider."
    // );
    return {
      formValues: defaultValues,
      formErrors: errors,
      getValues: () => defaultValues,
      getErrors: () => errors,
      setValue: () => {},
      validateValue: async () => {},
      getValue: () => undefined,
    };
  }

  const formValues = (
    context.formValues && Object.keys(context.formValues).length > 0
      ? context.formValues
      : {}
  ) as InferZodSchema<UnwrapZodSchema<Schema>> | DefaultValues;

  const formErrors = context.formErrors as Partial<
    Record<keyof InferZodSchema<UnwrapZodSchema<Schema>>, string>
  >;

  return {
    formValues,
    formErrors,
    validateValue: context.validateValue,
    getValues: () => formValues,
    getErrors: () => formErrors,
    setValue: context.setValue,
    getValue: (name: keyof DefaultValues) => context.getValue(name.toString()),
  };
}

// export function useField(name: string) {
//   const context = useContext(FormContext);
//   if (!context) {
//     // console.warn(
//     //   "FormContext is not initialized. Wrap your component in a FormProvider."
//     // );
//     return {
//       value: undefined,
//       errors: [],
//       setValue: () => {},
//       validate: () => {},
//     };
//   }

//   const value = context.getValue(name);
//   const errors = context.getErrors();
//   const setValue = context.setValue(name, value);
//   const validate = context.validateValue(name);

//   return {
//     value,
//     errors,
//     setValue,
//     validate,
//   };
// }
