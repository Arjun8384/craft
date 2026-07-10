import { ILoan } from "@/models/Loan";
import { ITool } from "@/models/Tool";

export interface DashboardStats {
  totalTools: number;
  borrowedTools: number;
  availableTools: number;
  returnedTools: number;
  activeLoans: number;

  recentLoans: ILoan[];
  lowStockTools: ITool[];

  inventoryChart: {
    name: string;
    value: number;
  }[];
}