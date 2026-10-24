import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />

      <div className="main-layout__body">
        <main className="main-layout__content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
