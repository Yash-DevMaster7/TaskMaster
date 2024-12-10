const zod = require("zod");

function validateSignup(body) {
  const schema = zod.object({
    name: zod.string().min(4).max(30).optional(),
    username: zod.string().min(3).max(30),
    email: zod.string().min(4).max(40).email(),
    password: zod.string().min(8).max(30),
  });
  const response = schema.safeParse(body);
  return response.success;
}

function validateLogin(body) {
  const schema = zod.object({
    email: zod.string().min(4).max(40).email(),
    password: zod.string().min(8).max(30),
  });
  const response = schema.safeParse(body);
  return response.success;
}

function validateUpdateDetails(body) {
  const schema = zod.object({
    name: zod.string().min(4).max(30).optional(),
    username: zod.string().min(3).max(30).optional(),
    email: zod.string().min(4).max(40).email().optional(),
  });
  const response = schema.safeParse(body);
  return response.success;
}

function validateUpdatePassword(body) {
  const schema = zod.object({
    password: zod.string().min(8).max(30),
  });
  const response = schema.safeParse(body);
  return response.success;
}

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateDetails,
  validateUpdatePassword,
};
