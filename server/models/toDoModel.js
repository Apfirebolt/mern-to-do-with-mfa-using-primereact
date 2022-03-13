import mongoose from "mongoose";

const toDoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is a required field"],
    },
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const toDo = mongoose.model("toDo", toDoSchema);

export default toDo;
