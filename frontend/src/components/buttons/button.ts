import React from "react";

interface buttonProps {
  title: string;
  onClick?: () => void;
  disabled: boolean;
}

const Button: React.FC<buttonProps> = ({ title, onClick, disabled }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#7C0C0C",
    color: "white",
    padding: "23px",
    textAlign: "center",
    borderRadius: "10px",
    fontWeight: "bold",
    pointerEvents: disabled ? "none" : "auto",
    cursor: "pointer",
    marginBottom: "3",
  };
  return React.createElement(
    "div",
    { style: buttonStyle, onClick: onClick },
    title
  );
};

export default Button;
