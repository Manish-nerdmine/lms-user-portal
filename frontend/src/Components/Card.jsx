// Card.jsx
import React from "react";

const Card = ({ title, children, borderColor }) => {
  return (
    <div
      className={`max-w-5xl w-full bg-white shadow-xl rounded-lg p-6 border-t-4 ${borderColor} text-center`}
    >
      <div className="flex justify-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold bg-purple-900 text-white py-2 px-4 rounded-full">
          {title}
        </h2>
      </div>
      <div className="text-gray-700 leading-relaxed text-lg">{children}</div>
    </div>
  );
};

export default Card;
