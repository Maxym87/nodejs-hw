import { Joi, Segments} from "celebrate";
import { TAGS } from "../constants/tags.js";
import { isValidObjectId } from "mongoose";

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


const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.error('noteId.invalid') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().required().custom(objectIdValidator).messages({
    'noteId.invalid': `Note ID - {#value} - must be valid mongo ID (24 characters in hex-format)`,
    })
  })
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().required().custom(objectIdValidator).messages({
      'noteId.invalid': `Note ID - {#value} - must be valid mongo ID (24 characters in hex-format)`,
    })
  }),
    [Segments.BODY]: Joi.object({
title: Joi.string().min(1).messages({
'string.base': 'Title must be a string',
'string.min': 'Title shoud have at least 1 characters', }),
content: Joi.string().allow('').messages({
  'string.base': 'Content must be a string',
}),
tag: Joi.string().valid(...TAGS).messages({
  'string.base': 'Tag must be a string',
  'any.only': `Tag must be one of: {{#valids}}`,
}),
  }).min(1),
};
