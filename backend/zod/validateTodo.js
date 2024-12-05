const zod = require("zod");

function validateCreateTodo(body) {
  const schema = zod.object({
    title: zod.string().min(4).max(50),
    description: zod.string().min(4).max(200),
  });
  const response = schema.safeParse(body);
  return response.success;
}

function validateUpdateTodo(body) {
  const schema = zod.object({
    title: zod.string().min(4).max(50).optional(),
    description: zod.string().min(4).max(200).optional(),
  });
  const response = schema.safeParse(body);
  return response.success;
}

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
};
