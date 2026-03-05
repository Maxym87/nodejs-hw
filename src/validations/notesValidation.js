import { Joi, Segments} from "celebrate";
import { TAGS } from "../constants/tags.js";

export const createNotesSchema = {
  [Segments.BODY]: Joi.object({
title: Joi.string().min(1).required().messages({
'string.base': 'Title must be a string',
'string.min': 'Title shoud have at least 1 characters', }),
content: Joi.string().allow('').messages({
  'string.base': 'Content must be a string',
}),
tag: Joi.string().valid(...TAGS).messages({
  'string.base': 'Tag must be a string',
  'any.only': `Tag must be one of: {{#valids}}`,
}),
  }),
};
