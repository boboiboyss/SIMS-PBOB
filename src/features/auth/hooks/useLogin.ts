import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginDto } from "../dto/LoginDTO";

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
        console.error("Login error:", error); 
        throw error; 
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
        console.error("Axios error response:", error.response?.data);
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
      const { email, password } = values.value;
      await mutateAsync({ data: { email, password } });
    },
  });

  return { form };
}
