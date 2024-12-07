const express = require("express");
const {
  validateCreateTodo,
  validateUpdateTodo,
} = require("../zod/validateTodo");
const { Todo } = require("../db/db");
const TodoRouter = express.Router();
const { authMiddleware } = require("../middlewares/authmiddleware");

// Route to create new todo
TodoRouter.post("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const response = validateCreateTodo(body);
  if (!response) {
    return res.json({
      message: "Todo input not validated",
    });
  }
  try {
    const todo = await Todo.create({
      userid: req.id,
      title: body.title,
      description: body.description,
    });
    return res.json({
      message: "Todo created successfully",
    });
  } catch (error) {
    return res.json({
      message: "Todo creation failed",
    });
  }
});

// Route to update an individual todo
TodoRouter.put("/:id", authMiddleware, async (req, res) => {
  const body = req.body;
  const todoId = req.params.id;
  const response = validateUpdateTodo(body);

  if (!response) {
    return res.json({
      message: "Update Todo input not validated",
    });
  }
  try {
    await Todo.updateOne(
      {
        _id: todoId,
      },
      body
    );
    return res.json({
      message: "Todo updated successfully",
    });
  } catch (error) {
    return res.json({
      message: "Error while updating Todo",
    });
  }
});

// Route to fetch all todos of a user
TodoRouter.get("/all", authMiddleware, async (req, res) => {
  const Id = req.id;
  try {
    const AllTodo = await Todo.find({
      userid: Id,
    });
    return res.json({
      AllTodo,
    });
  } catch (error) {
    return res.json({
      message: "Error while fetching All Todos",
    });
  }
});

// Route for fetching an individual todo
TodoRouter.get("/:id", authMiddleware, async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findById({
      _id: todoId,
    });
    return res.json({
      todo,
    });
  } catch (error) {
    return res.json({
      message: "Error while fetching Todo",
    });
  }
});

// Route to delete an individual todo
TodoRouter.delete("/:id", authMiddleware, async (req, res) => {
  const todoId = req.params.id;
  try {
    await Todo.deleteOne({
      _id: todoId,
    });
    return res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.json({
      message: "Error while deleting Todo",
    });
  }
});

module.exports = TodoRouter;
