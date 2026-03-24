import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    autor: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: String,
      default: "",
    },
    published_at: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "books",
  },
);

export const BookModel =
  mongoose.models.Book || mongoose.model("Book", bookSchema);
