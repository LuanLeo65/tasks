import Joi from "joi";

const commentSchema = Joi.object({
  author: Joi.string().min(3).max(50),
  comment: Joi.string().min(3).max(1000).required(),
});

export default commentSchema;
