import { useState } from "react";

import { api } from "../services/api";

export default function Home(){

  const [invoice, setInvoice] =
    useState("");

  const [order, setOrder] =
    useState<any>(null);

  const searchOrder = async () => {

    try {

      const response =
        await api.get(
          `/orders/${invoice}`
        );

      setOrder(response.data);

    } catch (error) {

      alert(
        "Pedido no encontrado"
      );

    }

  };

  return(

    <div>

      {/* HEADER */}

      <div className="premium-header">

        <div className="header-label">
          TRACKR DELIVERY
        </div>

        <div className="header-title">
           Delivery tracking
        </div>

        <div className="header-subtitle">

          Rastrea tus pedidos en tiempo real.

        </div>

      </div>

      {/* SEARCH */}

      <div className="premium-detail-card">

        <input
          className="premium-input"
          placeholder="Ej: INV-001"
          value={invoice}
          onChange={(e)=>
            setInvoice(
              e.target.value
            )
          }
        />

        <button
          className="premium-button"
          onClick={searchOrder}
        >

          Buscar pedido

        </button>

      </div>

      {/* RESULT */}

      {order && (

        <div className="premium-detail-card">

          <div className="detail-invoice">

            {order.invoice}

          </div>

          <div className="detail-customer">

            {order.customer}

          </div>

          <div className="detail-address">

            📍 {order.address}

          </div>

          <div
            className={`premium-badge ${order.status}`}
            style={{
              marginTop:16,
              width:"fit-content"
            }}
          >

            {
              order.status === "delivered"
              ? "✅ Entregado"

              : order.status === "in_route"
              ? "🟡 En ruta"

              : "🔵 En proceso"
            }

          </div>

          {order.photo && (

            <img
              src={`http://localhost:3000${order.photo}`}
              className="premium-preview"
            />

          )}

        </div>

      )}

    </div>

  );

}