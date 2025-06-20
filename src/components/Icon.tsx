import Image from "next/image";
import React from "react";

export default function Icon({
  icon,
  size,
  color,
  state = "default",
}: {
  icon: string;
  size: string;
  color: string;
  state?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${state === "success" ? "border-[2px] border-primary p-[2px] rounded-full" : state === "error" ? "border-[2px] border-red p-[2px] rounded-full" : ""} ${
      // handle size of icon container
      size === "small"
        ? "w-[16px] h-[16px]"
        : size === "medium"
        ? "w-[24px] h-[24px]"
        : size === "large"
        ? "w-[30px] h-[30px]"
        : "w-[35px] h-[35px]"
    } `}>
      <div
        className={`flex items-center justify-center shrink-0 w-full h-full ${
          // handle color of icon container
          state === "error"
            ? "bg-light-red"
            : state === "success"
            ? "bg-primary"
            : color === "purple-1"
            ? "bg-purple-1"
            : color === "purple-2"
            ? "bg-purple-2"
            : ""
        } rounded-full`}
      >
        {/* Image dynamic size */}
        <div
          className={`relative ${
            size === "small"
              ? "w-[8px] h-[8px]"
              : size === "medium"
              ? "w-[16px] h-[16px]"
              : size === "large"
              ? "w-[20px] h-[20px]"
              : "w-[18px] h-[18px]"
          }`}
        >
          <Image
            src={`/icons/${
              state === "error"
                ? "danger"
                : state === "success"
                ? "check"
                : icon
            }.svg`}
            alt="icon"
            fill
          />
        </div>
      </div>
    </div>
  );
}
