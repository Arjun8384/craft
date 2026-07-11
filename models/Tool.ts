import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface ITool extends Document {
  name: string;
  description: string;
  category: string;
  condition: "Excellent" | "Good" | "Fair" | "Damaged";
  quantity: number;
  availableQuantity: number;
  location: string;
  image?: string;
  status: "Available" | "Borrowed" | "Maintenance";
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
  enum: [
    "Excellent",
    "Good",
    "Fair",
    "Damaged",
  ],
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

    image: String,

    status: {
      type: String,
      enum: [
        "Available",
        "Borrowed",
        "Maintenance",
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