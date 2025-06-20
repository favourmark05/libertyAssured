import Image from "next/image";
import React from "react";
import Icon from "./Icon";
import Counter from "./Counter";

export default function Header() {
  return (
    <div className="bg-white fixed top-0 left-0 w-full">
      <div className="wrap h-[98px] flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <Image src="/logo.svg" alt="logo" width={63} height={63} />
          <div>
            <h1 className="text-lg md:text-xl font-semibold">Frontend Developer</h1>
            <p className="text-sm text-light-gray">Skill assessment test</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="bg-purple-1 h-[44px] w-[178px] rounded-xl p-2 flex items-center justify-center gap-2">
            <Icon icon="timer" size="medium" color="purple-2" />
            <div className="flex items-center gap-1  text-primary">
              <Counter />
              <p className="text-sm font-medium">time left</p>
            </div>
          </div>
          <Icon icon="eye" size="large" color="purple-2" />
        </div>
      </div>
    </div>
  );
}
