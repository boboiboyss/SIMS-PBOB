import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginDto } from "../dto/LoginDTO";

const registerSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function useLogin() {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: LoginDto) => {
      try {
        const res = await axios.post(
          "https://take-home-test-api.nutech-integrasi.com/login",
          data.data
        );
        return res.data;
      } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        throw error; // Re-throw the error to trigger onError
      }
    },
    onSuccess: (data) => {
      const token = data.data.token;

      localStorage.setItem("token", token);
      toast.success("User login successfully");
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data); // Log response error
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("Login Failed!");
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
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
