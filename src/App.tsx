import {
  useEffect,
  useState
} from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App(){

  const [tab, setTab] =
    useState("home");

  const [logged, setLogged] =
    useState(false);

  useEffect(()=>{

    const token =
      localStorage.getItem(
        "token"
      );

    if(token){

      setLogged(true);

    }

  },[]);

  const logout = () => {

    localStorage.removeItem(
      "token"
    )

    setLogged(false);

  };

  return(

    <div className="app">

      {/* CONTENT */}

      <div className="screen">

        {tab === "home" && (

          <Home />

        )}

        {tab === "delivery" && (

          logged

            ? (

              <Dashboard
                logout={logout}
              />

            )

            : (

              <Login
                onLogin={()=>
                  setLogged(true)
                }
              />

            )

        )}

      </div>

      {/* NAVBAR */}

      <div className="bottom-nav">

        <div
          className={
            tab === "home"
            ? "nav-item active-nav"
            : "nav-item"
          }
          onClick={()=>
            setTab("home")
          }
        >

          <div className="nav-icon">
            🏠
          </div>

          <div className="nav-label">
            Inicio
          </div>

        </div>

        <div
          className={
            tab === "delivery"
            ? "nav-item active-nav"
            : "nav-item"
          }
          onClick={()=>
            setTab("delivery")
          }
        >

          <div className="nav-icon">
            📦
          </div>

          <div className="nav-label">
            Delivery
          </div>

        </div>

      </div>

    </div>

  );

}