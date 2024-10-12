import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { RegisterDto } from "../dto/RegisterDTO";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email("Must be a valid email"),
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function useRegister() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: RegisterDto) => {
      try {
        const res = await axios.post(
          "https://take-home-test-api.nutech-integrasi.com/registration",
          data.data
        );
        return res.data;
      } catch (error) {
        console.error("Registration error:", error); // Log the error for debugging
        throw error; // Re-throw the error to trigger onError
      }
    },
    onSuccess: () => {
      toast.success("User registered successfully");
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data); // Log response error
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("Register Failed!");
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      await mutateAsync(registerSchema.safeParse(values.value));

      // Validate with Zod
      const result = registerSchema.safeParse(values.value);
      if (!result.success) {
        // Menampilkan error jika validasi gagal
        toast.error(result.error.errors[0].message);
        return;
      }
      // Submit if validation passes
      //   await mutateAsync(result.data);
    },
  });

  return { form };
}
