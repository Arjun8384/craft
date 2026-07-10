import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface ITool extends Document {
  name: string;
  description: string;
  category: string;
  condition: string;
  quantity: number;
  availableQuantity: number;
  location: string;
  imageUrl?: string;
  status: "Available" | "Borrowed";
  createdAt: Date;
  updatedAt: Date;
}

const ToolSchema = new Schema<ITool>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
    },

    imageUrl: String,

    status: {
      type: String,
      enum: [
        "Available",
        "Borrowed",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Tool: Model<ITool> =
  mongoose.models.Tool ||
  mongoose.model<ITool>(
    "Tool",
    ToolSchema
  );

export default Tool;