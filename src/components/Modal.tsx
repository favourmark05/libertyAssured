import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }:{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Disable scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Overlay click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      <div className={`relative z-10 bg-white max-w-[472px] w-full rounded-[18px] overflow-hidden`}>
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
}
