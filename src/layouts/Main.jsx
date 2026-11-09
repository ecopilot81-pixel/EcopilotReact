import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({ auth }) {
  return (
    <div className="main-layout">
      <Navbar auth={auth} />

      <div className="main-layout__body">
        <main className="main-layout__content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
