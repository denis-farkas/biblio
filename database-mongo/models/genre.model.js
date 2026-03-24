import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    genre_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "genre",
  },
);

export const GenreModel =
  mongoose.models.Genre || mongoose.model("Genre", genreSchema);
