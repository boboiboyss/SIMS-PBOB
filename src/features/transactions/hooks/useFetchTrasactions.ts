import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionsEntity } from "../entities/transactions.entity";

export default function useFetchTransactions() {
  const { data: history } = useQuery<TransactionsEntity[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/transaction/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.data.records;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch profile");
      }
    },
  });

  return { history };
}
