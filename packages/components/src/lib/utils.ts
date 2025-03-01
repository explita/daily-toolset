import { ZodEffects, ZodObject, ZodSchema } from "zod";

function isZodObject(schema: ZodSchema): schema is ZodObject<any> {
  return true;
  return schema instanceof ZodObject;
}

export function getBaseSchema(schema: ZodSchema): ZodObject<any> {
  while (schema instanceof ZodEffects) {
    schema = schema.innerType();
  }

  if (!isZodObject(schema)) {
    throw new Error("Schema must be an instance of ZodObject");
  }

  return schema;
}

export function generateDefaultObject<SchemaType>(
  schema: ZodSchema
): SchemaType {
  const baseSchema = getBaseSchema(schema);

  const shape = baseSchema.shape;

  if (typeof shape !== "object" || shape === null) {
    return {} as SchemaType;
  }

  return Object.keys(shape).reduce((acc, key) => {
    const field = shape[key];

    acc[key] = null;

    return acc;
  }, {} as any);
}
