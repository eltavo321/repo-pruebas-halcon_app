import {
  useState
} from "react";

import { api }
from "../services/api";

interface Props {

  onLogin: () => void;

}

export default function Login({
  onLogin
}: Props){

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

  try {

    const response =
      await api.post(

        "/login",

        {
          email,
          password
        }

      );

    localStorage.setItem(

      "token",

      response.data.token

    );

    localStorage.setItem(
      "driverLogged",
      "true"
    );

    onLogin();

  } catch (error) {

    alert(
      "Credenciales inválidas"
    );

  }

};

  return(

    <div>

      {/* HEADER */}

      <div className="premium-header">

        <div className="header-label">
          DRIVER ACCESS
        </div>

        <div className="header-title">
           Login
        </div>

        <div className="header-subtitle">

          Accede al panel de pedidos.

        </div>

      </div>

      {/* LOGIN CARD */}

      <div className="premium-detail-card">

        <input
          className="premium-input"
          placeholder="Correo"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="premium-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="premium-button"
          onClick={login}
        >

          Ingresar

        </button>

      </div>

    </div>

  );

}