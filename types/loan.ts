import { ITool } from "./tool";

export interface ILoan {
  _id: string;

  toolId: string | ITool;

  returnDate: string;

  borrowerName: string;

  borrowerEmail: string;

  borrowerPhone: string;

  quantity: number;

  borrowDate: string;

  expectedReturnDate: string;

  actualReturnDate?: string;

  status:
    | "Borrowed"
    | "Returned";

  // createdAt?: string;

  // updatedAt?: string;
}

export interface LoanPayload {
  toolId: string;
  quantity: number;
  expectedReturnDate: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  borrowDate: string;
  status: | "Borrowed" | "Returned"; 
}