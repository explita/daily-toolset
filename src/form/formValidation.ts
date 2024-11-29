import { z, ZodType } from "zod";

type Response<T> = {
  status: "success" | "error";
  errorData?: {
    errors: Partial<T>;
    message: string;
  };
  formData: T;
};

/**
 * Validates a given form data using the provided Zod schema.
 *
 * @param validationSchema the Zod schema to validate the form data against
 * @param formData the form data to validate
 *
 * @returns a response object with a status of "success" if the
 * validation is successful, or "error" if there are any validation
 * errors. The "errorData" property contains the validation errors, and
 * the "formData" property contains the validated form data.
 */
export const formValidation = async <Schema extends ZodType<any>>(
  validationSchema: Schema,
  formData: FormData
): Promise<Response<z.infer<Schema>>> => {
  const form = Object.fromEntries(formData) as Record<string, unknown>;

  const result = await validationSchema.safeParseAsync(form);

  if (result.success) {
    return {
      status: "success",
      formData: result.data, // Validated data
    };
  }

  // Extract errors from Zod
  const errors: Partial<z.infer<Schema>> = {};

  result.error.errors.forEach(({ path, message }) => {
    if (path.length > 0) {
      const key = path[0] as keyof z.infer<Schema>;
      errors[key] = message;
    }
  });

  return {
    status: "error",
    errorData: {
      errors,
      message: "Validation failed",
    },
    formData: form as z.infer<Schema>,
  };
};
