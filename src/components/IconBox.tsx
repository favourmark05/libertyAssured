import React from "react";
import Icon from "./Icon";
import Image from "next/image";

export default function IconBox({
  icon,
  size,
  color,
  title,
  state,
}: {
  icon: string;
  size: string;
  color: string;
  title: string;
  state?: string;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1 bg-purple-3 w-[91px] h-[71px] rounded-[10px]">
      <Icon icon={icon} size={size} color={color} state={state} />
      <h3 className="text-[10px] text-gray tracking-[-0.015em]">{title}</h3>
      <div
        className={`flex items-center justify-center w-4 h-4 rounded-full absolute top-1 right-1 ${
          state === "error" ? "bg-red" : "bg-primary"
        }`}
      >
        {state && (
            <Image src={`/icons/${title === "Gadget mic" ? "microphone" : icon}-light.svg`} alt="icon" width={8} height={8} />
        )}
      </div>
    </div>
  );
}
