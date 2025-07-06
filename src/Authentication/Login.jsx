import React from 'react'
import { CiChat1, CiLock, CiUser } from 'react-icons/ci';

const Login = () => {
  return (
    <div className="container flex flex-col justify-center items-center h-screen w-full">
      <div className="text-4xl text-inputoutline">
        <CiChat1 />
      </div>

      <div className="flex flex-col mt-6 gap-2.5  p-8 bg-gray-200 rounded border border-inputoutline">
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="email"
            className="text-[16px] font-medium text-textgray"
          >
            Username
          </label>
          <input
            type="email"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[350px]"
            placeholder="example@mail.com"
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiUser />
          </span>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="email"
            className="text-[16px] font-medium text-textgray"
          >
            Password
          </label>
          <input
            type="email"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[350px]"
            placeholder="*******"
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiLock />
          </span>
        </div>
        <div className="flex w-full">
          <button className="w-full py-3 bg-buttonblue text-white rounded cursor-pointer text-[16px] font-normal">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login