"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { debounce } from "@explita/daily-toolset-utils";
import { formValidation } from "@explita/daily-toolset-utils/validation";

// import { ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

// type ZodSchema =
//   | ZodObject<ZodRawShape>
//   | ZodEffects<ZodObject<ZodRawShape>>
//   | ZodTypeAny
//   | undefined;

type FormContextType = {
  formValues: any;
  formErrors: any;
  schema: any;
  setFormErrors: (errors: any) => void;
  setFormValues: (values: any) => void;
  setSchema: (schema: any) => void;
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

export const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: FormProviderProps) {
  const [formValues, setFormValues] = useState<Record<string, InputValue>>({});
  const [formErrors, setFormErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [schema, setSchema] = useState<any>(undefined);
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
