import { Joi } from "celebrate";

export const OptionalAnyString = Joi.string().lowercase();
export const RequiredAnyString = OptionalAnyString.required();
