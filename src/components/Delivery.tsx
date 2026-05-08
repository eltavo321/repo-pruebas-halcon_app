export default function Delivery({ user }: any) {
  return (
    <>
      <div className="top-bar-blue">
        <h2 style={{ color: "#fff" }}>
          Bienvenido {user.name}
        </h2>
      </div>

      <div className="card">
        <p>Panel de repartidor</p>
      </div>
    </>
  );
}