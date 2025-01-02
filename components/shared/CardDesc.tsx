

import React from "react";
type CardDescProps = {
    title: string,
    description:  string
}

const CardDesc = ({title,description} : CardDescProps) => {
  return (
    <div className="bg-white w-80 shadow-lg rounded-lg p-6 hover:shadow-xl transition">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default CardDesc;
