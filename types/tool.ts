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