import { useState } from "react";
import useFetchService from "../hooks/useFetchService";
import useFetchProfile from "../hooks/useFetchProfile";
import useFetchBalance from "../hooks/useFetchBalance";
import useFetchPromotions from "../hooks/useFetchPromotions";
import photo from "../../../assets/Profile Photo.png";

export default function () {
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance); // Toggle visibility
  };

  const { services } = useFetchService();
  const { profile } = useFetchProfile();
  const { balance } = useFetchBalance();
  const { promotions } = useFetchPromotions();

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col space-y-2 justify-start">
          <img
            src={photo || profile?.profile_image}
            alt="Avatar pengguna"
            className="rounded-full border-2 border-gray-300 w-20 h-20"
          />
          <p className="text-gray-500">Selamat datang,</p>
          <h1 className="text-2xl font-bold">{`${profile?.first_name} ${profile?.last_name}`}</h1>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg w-1/2 flex items-center justify-between">
          <div>
            <p className="text-sm mb-1">Saldo Anda</p>
            <h2 className="text-3xl font-bold">
              {showBalance
                ? balance?.balance.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                : "Rp ••••••••"}{" "}
            </h2>
          </div>
          <div onClick={toggleBalanceVisibility} className="cursor-pointer">
            <i
              className={`fas fa-${showBalance ? "eye" : "eye-slash"} text-2xl`}
            ></i>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto mb-8 space-x-4">
        {services?.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-2">
              <img
                src={service?.service_icon}
                alt={service?.service_code}
                className="w-16 h-[70px] object-contain"
              />
            </div>
            <span className="text-center text-sm">{service?.service_name}</span>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Temukan promo menarik</h2>
      <div className="flex overflow-x-auto space-x-4">
        {promotions?.map((promo, index) => (
          <div key={index} className="min-w-[120px] flex-shrink-0">
            <img
              src={promo.banner_image}
              alt="Gambar promo"
              className="w-[200px] h-28 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
