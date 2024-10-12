import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import axios from "axios";
import { UpdateProfileDto } from "../dto/UpdateProfileDTO";

const registerSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters long"),
  last_name: z.string().min(3, "Last name must be at least 3 characters long"),
});

export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: UpdateProfileDto) => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.put(
          "https://take-home-test-api.nutech-integrasi.com/profile/update",
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
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data); // Log response error
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("User updated failed!");
    },
  });

  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
    onSubmit: async (values) => {
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
