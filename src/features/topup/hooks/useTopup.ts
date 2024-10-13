import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import axios from "axios";
import { ToupupDto } from "../dto/TopupDTO";

export default function useTopup() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: ToupupDto) => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post(
          "https://take-home-test-api.nutech-integrasi.com/topup",
          data.data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.error("Top-up error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      toast.success("User top-up successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("User top-up failed!");
    },
  });

  const form = useForm({
    defaultValues: {
      top_up_amount: 0,
    },
    onSubmit: async (values) => {
      const topUpData: ToupupDto = {
        data: { top_up_amount: +values.value.top_up_amount },
      };

      await mutateAsync(topUpData);
      form.reset();
    },
  });

  return { form };
}
