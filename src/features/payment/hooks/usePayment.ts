import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import axios from "axios";
import { PaymentDto } from "../dto/PaymentDTO";

export default function usePayment() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: PaymentDto) => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post(
          "https://take-home-test-api.nutech-integrasi.com/transaction",
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
      toast.success("User payment successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("User payment failed!");
    },
  });

  const form = useForm({
    defaultValues: {
      services_code: "",
    },
    onSubmit: async (values) => {
      const paymentData: PaymentDto = {
        data: { service_code: values.value.services_code },
      };

      await mutateAsync(paymentData);
    },
  });

  return { form };
}
