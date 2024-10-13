import { useState } from "react";
import useFetchProfile from "../../home/hooks/useFetchProfile";
import useFetchBalance from "../../home/hooks/useFetchBalance";
import useTopup from "../hooks/useTopup";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import photo from "../../../assets/Profile Photo.png";

export default function Topup() {
  const [showBalance, setShowBalance] = useState(true);
  const [topupAmount, setTopupAmount] = useState(0);
  const { profile } = useFetchProfile();
  const { balance } = useFetchBalance();
  const { form } = useTopup();

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleSetAmount = (amount: number) => {
    form.setFieldValue("top_up_amount", amount);
    setTopupAmount(amount);
  };

  return (
    <div className="bg-white min-h-screen p-4">
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
                ? balance?.balance?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                : "Rp ••••••••"}
            </h2>
          </div>
          <div onClick={toggleBalanceVisibility} className="cursor-pointer">
            <i
              className={`fas fa-${showBalance ? "eye" : "eye-slash"} text-2xl`}
            ></i>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 justify-start mb-4">
        <p className="text-gray-500">Silahkan masukan</p>
        <h1 className="text-2xl font-bold">Nominal Top Up</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2 space-y-2">
            <form.Field
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z
                  .number()
                  .min(10000, "Minimal top up 10.000")
                  .max(1000000, "Maximal top up 1.000.000"),
              }}
              name="top_up_amount"
              children={(field) => (
                <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                  <i className="fas fa-money-bill-wave"></i>
                  <input
                    type="text"
                    value={topupAmount === 0 ? "" : topupAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTopupAmount(+value);
                      field.handleChange(+value);
                    }}
                    className="flex-1 border-none outline-none px-3 py-2"
                    placeholder="masukan nominal topup"
                  />
                </div>
              )}
            />
            {topupAmount >= 10000 && topupAmount <= 1000000 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                  setTopupAmount(0);
                }}
                type="submit"
                className="bg-red-500 text-white rounded-lg w-full py-2"
              >
                Top Up
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="bg-slate-400 text-white rounded-lg w-full py-2"
              >
                Top Up
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 w-1/2">
            <button
              type="button"
              className="border rounded-lg px-4 py-2"
              onClick={() => handleSetAmount(10000)}
            >
              Rp10.000
            </button>
            <button
              type="button"
              className="border rounded-lg px-4 py-2"
              onClick={() => handleSetAmount(20000)}
            >
              Rp20.000
            </button>
            <button
              type="button"
              className="border rounded-lg px-4 py-2"
              onClick={() => handleSetAmount(50000)}
            >
              Rp50.000
            </button>
            <button
              type="button"
              className="border rounded-lg px-4 py-2"
              onClick={() => handleSetAmount(100000)}
            >
              Rp100.000
            </button>
            <button
              type="button"
              className="border rounded-lg px-4 py-2"
              onClick={() => handleSetAmount(250000)}
            >
              Rp250.000
            </button>
            <button
              type="button"
              className="border rounded-lg px-4 py-2"
              onClick={() => handleSetAmount(500000)}
            >
              Rp500.000
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
