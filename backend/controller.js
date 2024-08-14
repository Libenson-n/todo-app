import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB = "tailwind-tut";
const TODOS_COLLECTION = "todos";

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");
const client = new MongoClient(MONGO_URI);
const db = client.db(DB);

const getTodos = async (req, res) => {
  try {
    const todos = await db.collection(TODOS_COLLECTION).find().toArray();
    if (!todos) {
      res.status(400).json({
        status: 400,
        message: "Error getting todos.",
      });
    } else if (todos.length === 0) {
      res.status(404).json({
        status: 404,
        message: "Error Todos Found!.",
      });
    } else {
      res.json({
        status: 200,
        todos,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const addTodos = async (req, res) => {
  const { id, title } = req.body;
  const todo = {
    id,
    title,
    completed: false,
  };
  console.log(req.body);
  try {
    await db.collection(TODOS_COLLECTION).insertOne(todo);
    return res.status(200).json({
      status: 200,
      message: "todo added successfully!",
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection(TODOS_COLLECTION).deleteOne({ id });
    res.status(200).json({ status: 200, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const completedTodo = async (req, res) => {
  const { id, completed } = req.body;
  const query = { id };
  const newValues = { $set: { ...req.body, completed } };
  try {
    const foundTodo = await db.collection(TODOS_COLLECTION).findOne({ id });
    if (!foundTodo) {
      res.status(404).json({ status: 404, message: "Error Todo Not Found!" });
    } else {
      await db.collection(TODOS_COLLECTION).updateOne(query, newValues);
      res.status(200).json({
        status: 200,
        foundTodo,
        completed,
        message: "Todo Successfully Updated!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteCompletedTodos = async (req, res) => {
  try {
    await db.collection(TODOS_COLLECTION).deleteMany({ completed: true });
    res.status(200).json({ status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export { getTodos, addTodos, deleteTodo, completedTodo, deleteCompletedTodos };
