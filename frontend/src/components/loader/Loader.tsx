import { useState, CSSProperties } from "react";
import { RingLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  const [loading] = useState(true);
  const [color] = useState("red");

  return (
    <div className="sweet-loading">
      <RingLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        speedMultiplier={1}
      />
    </div>
  );
}

export default Loader;
