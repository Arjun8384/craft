import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";
import { ITool } from "./Tool"; 

export interface ILoan
  extends Document {
  toolId: Types.ObjectId | ITool;

  borrowDate: Date;

  actualReturnDate: Date;

  borrowerName: string;

  borrowerEmail: string;

  borrowerPhone: string;

  quantity: number;

  expectedReturnDate: Date;

  returnedAt?: Date;

  status:
    | "Borrowed"
    | "Returned";

  createdAt: Date;

  updatedAt: Date;
}

const LoanSchema =
  new Schema<ILoan>(
    {
      toolId: {
        type: Schema.Types.ObjectId,
        ref: "Tool",
        required: true,
      },

      borrowerName: {
        type: String,
        required: true,
      },

      borrowerEmail: {
        type: String,
        required: true,
      },

      borrowerPhone: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      borrowDate: {
        type: Date,
        default: Date.now,
      },

      expectedReturnDate: {
        type: Date,
        required: true,
      },

      actualReturnDate: {
        type: Date,
      },

      returnedAt: Date,

      status: {
        type: String,
        enum: [
          "Borrowed",
          "Returned",
        ],
        default: "Borrowed",
      },
    },
    {
      timestamps: true,
    }
  );

const Loan: Model<ILoan> =
  mongoose.models.Loan ||
  mongoose.model<ILoan>(
    "Loan",
    LoanSchema
  );

export default Loan;