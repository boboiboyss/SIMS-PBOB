import logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation(); // Mengambil informasi lokasi saat ini

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <Link to="/" className="flex text-black hover:text-black">
          <img src={logo} alt="logo" />
          <span className="font-bold text-lg ml-2">SIMS PPOB</span>
        </Link>
      </div>
      <nav className="flex space-x-4">
        <Link
          to="/topup"
          className={`text-gray-700 ${
            location.pathname === "/topup" ? "font-bold text-red-500" : ""
          }`}
        >
          Top Up
        </Link>
        <Link
          to="/transaction"
          className={`text-gray-700 ${
            location.pathname === "/transaction" ? "font-bold text-red-500" : ""
          }`}
        >
          Transaction
        </Link>
        <Link
          to="/profile"
          className={`text-gray-700 ${
            location.pathname === "/profile" ? "font-bold text-red-500" : ""
          }`}
        >
          Akun
        </Link>
      </nav>
    </header>
  );
}
