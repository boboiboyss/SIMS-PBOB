import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BannerEntity } from "../entities/banner.entity";

export default function useFetchPromotions() {
  const { data: promotions } = useQuery<BannerEntity[]>({
    queryKey: ["promotions"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/banner",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch promotions");
      }
    },
  });

  return { promotions };
}
