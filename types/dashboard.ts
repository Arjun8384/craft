import { ILoan } from "@/types/loan";
import { ITool } from "@/types/tool";

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