import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import axios from "axios";
import { ToupupDto } from "../dto/TopupDTO";

const registerSchema = z.object({
  top_up_amount: z
    .number()
    .min(10000, "Top up amount minimum is 10.000")
    .max(1000000, "Top up amount maximum is 1.000.000"),
});

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
        console.error("Login error:", error); // Log the error for debugging
        throw error; // Re-throw the error to trigger onError
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      toast.success("User topup successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data); // Log response error
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("User topup failed!");
    },
  });

  const form = useForm({
    defaultValues: {
      top_up_amount: 0,
    },
    onSubmit: async (values) => {
      form.reset();
      await mutateAsync(registerSchema.safeParse(values.value));

      const result = registerSchema.safeParse(values.value);
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }
    },
  });

  return { form };
}
