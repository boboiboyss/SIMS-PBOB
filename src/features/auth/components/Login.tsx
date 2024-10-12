import { useState } from "react";
import { Link } from "react-router-dom";
import ilustrasi from "../../../assets/Illustrasi Login.png";
import logo from "../../../assets/Logo.png";
import useLogin from "../hooks/useLogin";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form } = useLogin();

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <div className="flex items-center mb-6">
          <img src={logo} alt="logo" />
          <h1 className="text-2xl font-bold m-2">SIMS PPOB</h1>
        </div>
        <h2 className="text-2xl font-bold mb-6">Lengkapi data untuk login</h2>

        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Email Field */}
          <div className="mb-4">
            <form.Field
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z.string().email("Must be a valid email"),
              }}
              name="email"
              children={(field) => (
                <>
                  <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                    <i className="fas fa-envelope text-gray-400 mr-3"></i>
                    <input
                      required
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Masukan email anda"
                    />
                  </div>
                  {field.state.meta.errors?.[0] && (
                    <p className="text-red-500 text-sm">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <form.Field
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z
                  .string()
                  .min(8, "Password must be at least 8 characters long"),
              }}
              name="password"
              children={(field) => (
                <>
                  <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                    <i className="fas fa-lock text-gray-400 mr-3"></i>
                    <input
                      required
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Buat password"
                    />
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400 cursor-pointer`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                  {field.state.meta.errors?.[0] && (
                    <p className="text-red-500 text-sm">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Submit Button */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={form.handleSubmit}
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-500">
          belum punya akun? registrasi{" "}
          <Link to="/register" className="text-red-500">
            di sini
          </Link>
        </p>
      </div>
      <div className="w-1/2 bg-gray-200 flex justify-center items-center">
        <img src={ilustrasi} alt="Ilustrasi" className="max-w-full h-auto" />
      </div>
    </div>
  );
}
