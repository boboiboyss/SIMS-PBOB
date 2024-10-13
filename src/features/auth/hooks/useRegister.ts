import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { RegisterDto } from "../dto/RegisterDTO";
import { useNavigate } from "react-router-dom";

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
        console.error("Registration error:", error); 
        throw error; 
      }
    },
    onSuccess: () => {
      toast.success("User registered successfully");
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data); 
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
      // Validasi manual
      const { email, first_name, last_name, password, confirmPassword } =
        values.value;

      if (
        !email ||
        !first_name ||
        !last_name ||
        !password ||
        !confirmPassword
      ) {
        toast.error("All fields are required!");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long!");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords must match!");
        return;
      }

      // Submit if validation passes
      await mutateAsync({ data: values.value }); // Pastikan data sesuai dengan struktur yang diharapkan
    },
  });

  return { form };
}
