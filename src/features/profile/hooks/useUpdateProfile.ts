import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import axios from "axios";
import { UpdateProfileDto } from "../dto/UpdateProfileDTO";

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
        console.error("Update profile error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("User update failed!");
    },
  });

  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
    onSubmit: async (values) => {
      const { first_name, last_name } = values.value;

      if (!first_name || first_name.length < 3) {
        toast.error("First name must be at least 3 characters long");
        return;
      }

      if (!last_name || last_name.length < 3) {
        toast.error("Last name must be at least 3 characters long");
        return;
      }
      await mutateAsync({ data: values.value });
    },
  });

  return { form };
}
