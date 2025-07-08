import React from 'react'

const Button = ({ HandleClik, Vlaue }) => {
  return (
    <button
      onClick={HandleClik}
      className="w-full py-3 bg-buttonblue text-white rounded cursor-pointer text-[16px] font-normal"
    >
      {Vlaue}
    </button>
  );
};

export default Button