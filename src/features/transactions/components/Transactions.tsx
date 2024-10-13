import { useState } from "react";
import photo from "../../../assets/Profile Photo.png";
import useFetchProfile from "../../home/hooks/useFetchProfile";
import useFetchBalance from "../../home/hooks/useFetchBalance";
import useFetchTransactions from "../hooks/useFetchTrasactions";

export default function Transactions() {
  const [showBalance, setShowBalance] = useState(true);
  const { profile } = useFetchProfile();
  const { balance } = useFetchBalance();
  const { history } = useFetchTransactions();
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
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

      <div className="flex flex-col mt-10">
        <h1 className="text-xl font-semibold mb-6">Semua Transaksi</h1>
        <div className="w-full">
          {history?.map((transaction, index) => {
            const date = new Date(transaction.created_on);
            return (
              <div
                key={index}
                className="flex justify-between items-center border p-2 border-gray-300 rounded-xl mb-4"
              >
                <div className="flex flex-col w-full pr-4">
                  <div
                    className={`text-lg font-bold ${
                      transaction.transaction_type === "TOPUP"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.transaction_type === "TOPUP" ? "+ " : "- "}
                    {transaction.total_amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {date
                      .toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Jakarta",
                        hour12: false,
                      })
                      .replace("pukul", "")}{" "}
                    WIB
                  </div>
                </div>
                <div className=" text-black text-right">
                  <span>{transaction.description}</span>
                </div>
              </div>
            );
          })}
        </div>
        <button className="mt-6 text-red-500">Show more</button>
      </div>
    </div>
  );
}
