import { Response } from "express";
import Task from "../models/Task";

const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      userId: req.user.id,
      priority,
      status,
      dueDate,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

const updateTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, priority, status, dueDate },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

const deleteTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
