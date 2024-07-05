import React from "react";

const Logout: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded shadow-lg border mt-32 max-w-sm mx-auto">
      <h1 className="text-lg font-bold mb-4 ml-4">
        Are you sure you want to log out?
      </h1>
      <div className="flex justify-around mt-12">
        <button
          onClick={onConfirm}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="bg-green-900 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Logout;
