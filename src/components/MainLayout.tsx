import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto p-4 md:p-8">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
