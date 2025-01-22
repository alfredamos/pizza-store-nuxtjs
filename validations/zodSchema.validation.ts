import { StatusCodes } from "http-status-codes";
import { ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";
import catchError from "http-errors";

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {   
    const validationError = fromZodError(result.error);
    throw catchError(StatusCodes.BAD_REQUEST, `${validationError}`);
  }

  return result.data;
}
