import React from "react";

interface buttonProps {
  title: string;
  onClick?: () => void;
}

const Button: React.FC<buttonProps> = ({ title, onClick }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#7C0C0C",
    color: "white",
    padding: "24px",
    textAlign: "center",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  };
  return React.createElement(
    "div",
    { style: buttonStyle, onClick: onClick },
    title
  );
};

export default Button;
