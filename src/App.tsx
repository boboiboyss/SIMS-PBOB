import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/auth/LoginPage";
import ProfilePage from "./page/ProfilePage";
import TransactionPage from "./page/TransactionsPage";
import TopupPage from "./page/TopupPage";
import MainLayout from "./components/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./page/auth/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="transaction" element={<TransactionPage />} />
          <Route path="topup" element={<TopupPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
