import Joi from "joi";

const accountSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  email: Joi.string().email().min(8).max(50).required(),

  password: Joi.string().min(6).max(20).required(),

  birth: Joi.date().less("now").greater("1-1-1900").required(),

  role: Joi.string().valid("user", "admin").default("user"),
});

const accountUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(50),

  email: Joi.string().email().min(8).max(50),

  password: Joi.string().min(6).max(20),

  birth: Joi.date().less("now").greater("1-1-1900"),
});

const accountLoginSchema = Joi.object({
  email: Joi.string().email().min(8).max(50).required(),

  password: Joi.string().min(6).max(20).required(),
});

export { accountSchema, accountUpdateSchema, accountLoginSchema };
