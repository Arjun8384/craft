export interface ILoan {
  _id: string;

  toolId: string;

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

  createdAt?: string;

  updatedAt?: string;
}

export type LoanPayload = Omit<
  ILoan,
  "_id" | "createdAt" | "updatedAt"
>;