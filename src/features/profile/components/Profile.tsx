import { useNavigate } from "react-router-dom";
import useFetchProfile from "../../home/hooks/useFetchProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

export default function Profile() {
  const navigate = useNavigate();

  const { profile } = useFetchProfile();
  const { form } = useUpdateProfile();

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full max-w-[600px] mx-auto p-6 bg-white rounded-md text-center">
      <div className="flex justify-center items-center mb-4 relative">
        <img
          src={profile?.profile_image}
          alt="Profile picture of a person"
          className="rounded-full w-24 h-24"
        />
        <label
          htmlFor="file-upload"
          className="absolute ml-[60px] bottom-0 p-1 rounded-full cursor-pointer"
        >
          <i className="fas fa-pencil-alt text-gray-700 relative text-[14px]"></i>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          // onChange={handleImageChange} // Panggil fungsi saat file diunggah
        />
      </div>
      <h1 className="text-2xl font-semibold mb-6">{`${profile?.first_name} ${profile?.last_name}`}</h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex items-center border border-gray-300 p-2 rounded-lg">
          <i className="fas fa-envelope text-gray-500 mr-3"></i>
          <input
            type="email"
            value={profile?.email}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            readOnly // Email tetap read-only
          />
        </div>

        <div className="mb-4">
          <form.Field
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(3, "First name min 3 character"),
            }}
            name="first_name"
            children={(field) => (
              <>
                <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                  <i className="fas fa-user text-gray-400 mr-3"></i>
                  <input
                    required
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={field.state.value || profile?.first_name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nama Depan"
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

        <div className="mb-4">
          <form.Field
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(3, "Last name min 3 character"),
            }}
            name="last_name"
            children={(field) => (
              <>
                <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                  <i className="fas fa-user text-gray-400 mr-3"></i>
                  <input
                    required
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={field.state.value || profile?.last_name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nama Belakang"
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

        <button
          onClick={form.handleSubmit}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Edit Profil
        </button>
        <button
          type="button"
          onClick={handleLogout} // Panggil fungsi logout saat tombol diklik
          className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-50"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
