import { z, ZodType } from "zod";

type ValidationResponse<T> =
  | {
      status: "success";
      formData: T;
    }
  | {
      status: "error";
      errorData: {
        errors: Partial<Record<keyof T, string>>;
        message: string;
      };
      formData: T;
    };

/**
 * Validates form data against a Zod schema.
 *
 * @param {Schema} validationSchema - The Zod schema to validate the form data against.
 * @param {FormData | Record<string, unknown> | undefined} formData - The form data to validate.
 * @returns {Promise<ValidationResponse<z.infer<Schema>>>} - A promise that resolves to a validation response.
 *
 * @throws {Error} Throws an error if a valid Zod schema or valid FormData is not provided,
 * or if an unexpected error occurs during validation.
 */
export async function formValidation<Schema extends ZodType<unknown>>(
  validationSchema: Schema,
  formData: FormData | Record<string, unknown> | undefined
): Promise<ValidationResponse<z.infer<Schema>>> {
  if (typeof validationSchema?.safeParseAsync !== "function") {
    throw new Error(
      "A valid Zod schema is required for form validation. Please provide a valid Zod schema and try again."
    );
  }

  if (!formData) {
    throw new Error(
      "A valid FormData object is required for form validation. Please provide a valid FormData object and try again."
    );
  }

  try {
    // TODO: Find a way to type this without losing the ability to use formData directly
    let form = formData;

    if (formData instanceof FormData) {
      form = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    }

    const result = await validationSchema.safeParseAsync(form);

    if (result.success) {
      return {
        status: "success",
        formData: result.data,
      };
    }

    const errors: Partial<Record<keyof z.infer<Schema>, string>> = {};

    for (const { path, message } of result.error.errors) {
      if (path.length > 0) {
        const key = path[0] as keyof z.infer<Schema>;
        errors[key] = message;
      }
    }

    return {
      status: "error",
      errorData: {
        errors,
        message: "Validation failed",
      },
      formData: form as z.infer<Schema>,
    };
  } catch (error: any) {
    throw new Error(
      `Validation failed due to an unexpected error: ${
        error.message || "Please make sure Zod is installed and try again."
      }`
    );
  }
}
