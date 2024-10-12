import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BalanceEntity } from "../entities/balance.entity";

export default function useFetchBalance() {
  const { data: balance } = useQuery<BalanceEntity>({
    queryKey: ["balance"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch balance");
      }
    },
  });

  return { balance };
}
