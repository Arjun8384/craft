export interface ITool {
  _id: string;
  name: string;
  description: string;
  category: string;
  condition:
    | "Excellent"
    | "Good"
    | "Fair"
    | "Damaged";
  quantity: number;
  availableQuantity: number;
  location: string;
  status:
    | "Available"
    | "Borrowed"
    | "Maintenance";
  createdAt: string;
  updatedAt: string;
}

export interface IToolBorrower {
  _id: string;
  borrowerName: string;
  borrowerEmail: string;
  quantity: number;
  borrowDate?: string;
  expectedReturnDate: string;
  status: string;
}