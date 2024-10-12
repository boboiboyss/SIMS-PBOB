import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProfileEntity } from "../entities/profile.entity";

export default function useFetchProfile() {
  const { data: profile } = useQuery<ProfileEntity>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch profile");
      }
    },
  });

  return { profile };
}
