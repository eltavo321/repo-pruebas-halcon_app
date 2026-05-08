import {
  useState,
  useEffect
} from "react";

import { api }
from "../services/api";

interface Props {
  logout: () => void;
}

export default function Dashboard({
  logout
}: Props) {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [selected, setSelected] =
    useState<any>(null);

  useEffect(() => {

    fetchOrders();

  }, []);

  /* =========================
     FETCH ORDERS
  ========================= */

  const fetchOrders = async () => {

    try {

      const response =
        await api.get("/orders");

      setOrders(response.data);

      if (
        response.data.length > 0
        &&
        !selected
      ) {

        setSelected(
          response.data[0]
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
     UPDATE STATUS
  ========================= */

  const updateStatus = async (
    id: number,
    status: string
  ) => {

    try {

      const response =
        await api.put(

          `/orders/${id}`,

          {
            status
          }

        );

      const updatedOrder =
        response.data;

      const updatedOrders =
        orders.map(order => {

          if (order.id === id) {

            return {

              ...order,
              status:
                updatedOrder.status

            };

          }

          return order;

        });

      setOrders(updatedOrders);

      setSelected({

        ...selected,
        status

      });

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
     UPLOAD PHOTO
  ========================= */

  const uploadPhoto = async (
    e: any,
    id: number
  ) => {

    try {

      const file =
        e.target.files[0];

      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        "photo",
        file
      );

      const response =
        await api.post(

          `/orders/${id}/photo`,

          formData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data"

            }

          }

        );

      const imageUrl =
        response.data.imageUrl;

      const updatedOrders =
        orders.map(order => {

          if (order.id === id) {

            return {

              ...order,
              photo: imageUrl

            };

          }

          return order;

        });

      setOrders(updatedOrders);

      setSelected({

        ...selected,
        photo: imageUrl

      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <>

      {/* =========================
          HEADER
      ========================= */}

      <div className="premium-header">

        <div className="header-top">

          <div>

            <div className="header-label">
              TRACKR DELIVERY
            </div>

            <div className="header-title">
              Hola, Carlos
            </div>

            <div className="header-subtitle">

              {orders.length}
              {" "}
              entregas activas

            </div>

          </div>

          <button
            className="logout-modern"
            onClick={logout}
          >
            Salir
          </button>

        </div>

      </div>

      {/* =========================
          DETAIL PANEL
      ========================= */}

      {selected && (

        <div className="premium-detail-card">

          <div className="detail-top">

            <div>

              <div className="detail-invoice">

                {selected.invoice}

              </div>

              <div className="detail-customer">

                {selected.customer}

              </div>

              <div className="detail-address">

                📍 {selected.address}

              </div>

            </div>

            <div
              className={`premium-badge ${selected.status}`}
            >

              {
                selected.status === "delivered"
                ? "Entregado"

                : selected.status === "in_route"
                ? "En ruta"

                : "En proceso"
              }

            </div>

          </div>

          <div className="detail-section-title">

            Estado del pedido

          </div>

          <select
            className="premium-select"
            value={selected.status}
            onChange={(e) =>
              updateStatus(
                selected.id,
                e.target.value
              )
            }
          >

            <option value="in_process">
              En proceso
            </option>

            <option value="in_route">
              En ruta
            </option>

            <option value="delivered">
              Entregado
            </option>

          </select>

          <div className="detail-section-title">

            Evidencia fotográfica

          </div>

          <label className="upload-box">

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                uploadPhoto(
                  e,
                  selected.id
                )
              }
            />

            Subir evidencia

          </label>

          {selected.photo && (

            <img
              src={`http://localhost:3000${selected.photo}`}
              className="premium-preview"
            />

          )}

        </div>

      )}

      {/* =========================
          ORDER LIST
      ========================= */}

      {orders.map(order => (

        <div
          className="premium-order-card"
          key={order.id}
          onClick={() =>
            setSelected(order)
          }
        >

          <div className="card-left">

            <div className="premium-avatar">

              {order.customer[0]}

            </div>

            <div className="premium-order-info">

              <div className="premium-invoice">

                {order.invoice}

              </div>

              <div className="premium-customer">

                {order.customer}

              </div>

              <div className="premium-address">

                📍 {order.address}

              </div>

            </div>

          </div>

          <div
            className={`premium-badge ${order.status}`}
          >

            {
              order.status === "delivered"
              ? "✅ Entregado"

              : order.status === "in_route"
              ? "🟡 En ruta"

              : "🔵 En proceso"
            }

          </div>

        </div>

      ))}

    </>

  );

}