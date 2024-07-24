import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in progress" | "completed";
  dueDate: Date;
  userId: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
    required: true,
  },
  dueDate: { type: Date, required: false },
});

export default mongoose.model<ITask>("Task", taskSchema);
