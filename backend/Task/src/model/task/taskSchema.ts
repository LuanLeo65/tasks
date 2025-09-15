import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(3).max(500).required(),
});

export default taskSchema;
