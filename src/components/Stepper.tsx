const STEPS = [
  "in_process",
  "in_route",
  "delivered"
];

export default function Stepper({
  status
}: any) {

  const current =
    STEPS.indexOf(status);

  return (

    <div className="stepper">

      {STEPS.map((step, index) => (

        <div
          className="step-item"
          key={step}
        >

          <div
  className={
    index <= current
      ? "step-circle done"
      : "step-circle"
  }
/>

          <div className="step-label">
            {step.replace("_", " ")}
          </div>

        </div>

      ))}

    </div>

  );
}