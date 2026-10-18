import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />

      <div className="main-layout__body">
        <Sidebar />

        <main className="main-layout__content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
