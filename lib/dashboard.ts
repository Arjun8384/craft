import Tool from "@/models/Tool";
import Loan from "@/models/Loan";

export interface DashboardStats {
  totalTools: number;
  borrowedTools: number;
  availableTools: number;
  returnedTools: number;
  activeLoans: number;
  recentLoans: unknown[];
  lowStockTools: unknown[];
  inventoryChart: {
    name: string;
    value: number;
  }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const tools = await Tool.find();

  const totalTools =
    await Tool.countDocuments();

  const availableTools =
    tools.reduce(
      (sum, tool) =>
        sum + tool.availableQuantity,
      0
    );

  const borrowedTools =
    tools.reduce(
      (sum, tool) =>
        sum +
        (
          tool.quantity -
          tool.availableQuantity
        ),
      0
    );

  const activeLoans =
    await Loan.countDocuments({
      status: "Borrowed",
    });

  const returnedTools =
    await Loan.countDocuments({
      status: "Returned",
    });

  const recentLoans =
    await Loan.find()
      .populate("toolId")
      .sort({
        createdAt: -1 as const,
      })
      .limit(5);

  const lowStockTools =
    await Tool.find({
      availableQuantity: {
        $lte: 2,
      },
    })
      .sort({
        availableQuantity: 1 as const,
      })
      .limit(5);

  return {
    totalTools,

    borrowedTools,

    availableTools,

    returnedTools,

    activeLoans,

    recentLoans,

    lowStockTools,

    inventoryChart: [
      {
        name: "Available",
        value: availableTools,
      },
      {
        name: "Borrowed",
        value: borrowedTools,
      },
      {
        name: "Returned",
        value: returnedTools,
      },
    ],
  };
}