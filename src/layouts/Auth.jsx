import { Outlet } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="auth">
      {/* El flujo de acceso/registro queda separado del layout general y su Footer. */}
      <main className="auth__content">
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
