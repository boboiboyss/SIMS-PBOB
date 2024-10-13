import useFetchProfile from "../../home/hooks/useFetchProfile";
import photo from "../../../assets/Profile Photo.png";
import useFetchBalance from "../../home/hooks/useFetchBalance";
import useFetchService from "../../home/hooks/useFetchService";
import { useParams } from "react-router-dom";
import { useState } from "react";
import usePayment from "../hooks/usePayment";

export default function Payment() {
  const [showBalance, setShowBalance] = useState(true);
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const { profile } = useFetchProfile();
  const { balance } = useFetchBalance();
  const { services } = useFetchService();
  const { form } = usePayment();

  const { serviceCode } = useParams();
  console.log("ini query", serviceCode);

  const service = services?.find(
    (service) => service.service_code === serviceCode
  );

  const handlePayment = () => {
    if (service?.service_code) {
      form.setFieldValue("services_code", service.service_code);
      form.handleSubmit();
    } else {
      console.error("Service code is not defined.");
    }
  };

  console.log("ini services yang sudah di filter", service);

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

        <div className=" text-white p-7 rounded-lg shadow-lg w-1/2 flex items-center justify-between bg-saldo-bg bg-cover">
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

      <div className="flex justify-center items-center bg-white">
        <div className="w-full">
          <h1 className="text-lg font-semibold mb-4">Pembayaran</h1>
          <div className="flex items-center mb-4">
            <img
              src={service?.service_icon}
              alt="img-services"
              className="h-14 w-14 mr-2"
            />
            <span className="font-semibold">{service?.service_name}</span>
          </div>
          <form>
            <input
              readOnly
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder={service?.service_tariff.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            />
            <button
              type="button"
              onClick={handlePayment}
              className="w-full bg-red-600 text-white py-2 rounded"
            >
              Bayar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
