import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB = "tailwind-tut";
const TODOS_COLLECTION = "todos";
const USERS_COLLECTION = "users";

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");
const client = new MongoClient(MONGO_URI);
const db = client.db(DB);

const getTodos = async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await db.collection(TODOS_COLLECTION).find().toArray();
    const userTodos = todos.filter((todo) => todo.userId === userId);
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
        userTodos,
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
  const { id, title, userId } = req.body;
  const todo = {
    id,
    title,
    userId: userId,
    completed: false,
  };

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
    const todos = await db.collection(TODOS_COLLECTION).find().toArray();
    res.status(200).json({ status: 200, todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const user = {
    username,
    password,
  };

  try {
    const foundUser = await db.collection(USERS_COLLECTION).findOne(user);
    if (foundUser) {
      return res
        .status(400)
        .json({ status: 400, message: "user already exist" });
    } else {
      await db.collection(USERS_COLLECTION).insertOne(user);
      return res.status(200).json({
        status: 200,
        message: "user added successfully!",
        user,
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

const getUser = async (req, res) => {
  const { username, password } = req.body;
  const user = {
    username,
    password,
  };

  try {
    const foundUser = await db.collection(USERS_COLLECTION).findOne(user);

    if (foundUser) {
      return res.status(200).json({
        status: 200,
        foundUser,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "user not found!",
        user,
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

export {
  getTodos,
  addTodos,
  deleteTodo,
  completedTodo,
  deleteCompletedTodos,
  createUser,
  getUser,
};
