import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "user",
  },
);

userSchema.index({ email: 1 }, { unique: true });

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
