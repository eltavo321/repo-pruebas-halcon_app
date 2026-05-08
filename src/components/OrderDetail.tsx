import Stepper from "./Stepper";

export default function OrderDetail({
  order
}: any) {

  return (

    <div className="card">

      <div className="order-inv">
        {order.invoice}
      </div>

      <div className="order-name">
        {order.customer}
      </div>

      <div className="order-addr">
        {order.address}
      </div>

      <div
        className={`badge ${order.status}`}
        style={{ marginTop: 14 }}
      >
        {order.status.replace("_", " ")}
      </div>

      <Stepper status={order.status} />

      {order.photo && (

        <img
          src={`http://localhost:3000${order.photo}`}
          className="preview"
        />

      )}

    </div>

  );
}