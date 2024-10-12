import { useQuery } from "@tanstack/react-query";
import { ServicesEntity } from "../entities/services.entity";
import axios from "axios";

export default function useFetchService() {
  const { data: services } = useQuery<ServicesEntity[]>({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/services",
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        return response.data.data; 
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch services"); 
      }
    },
  });

  return { services };
}
