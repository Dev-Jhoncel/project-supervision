import React from "react";

interface BoxProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color?: string;
}

const Box: React.FC<BoxProps> = ({ icon, title, value, color }) => {
  const colors = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
    }
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="bg-white-100 shadow-2xl bg-gradient-to-tl rounded-b-3xl rounded-t-3xl w-80 h-46 p-6">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${colors(
            color as string
          )}`}
        >
          {icon}
        </div>
        <div className="mt-9">
          <h2 className="text-sm text-gray-400">{title}</h2>
          <h1 className="text-2xl mt-2 text-black font-semibold mt-6">
            {value}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Box;
