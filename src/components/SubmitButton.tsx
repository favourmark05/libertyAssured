"use client";

import { useProctor } from "@/context/ProctorContext";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function SubmitButton() {
  const { screenHasErrors, cameraHasErrors, micHasErrors, networkHasErrors } =
    useProctor();

  const [canSubmit, setCanSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    if (canSubmit) {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (
      cameraHasErrors ||
      micHasErrors ||
      networkHasErrors ||
      screenHasErrors
    ) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [screenHasErrors, cameraHasErrors, micHasErrors, networkHasErrors]);

  return (
    <div className="flex justify-center md:justify-start mt-10">
      <button
        // disabled={canSubmit}
        onClick={handleSubmit}
        className={`bg-primary text-white h-[44px] w-[207px] text-sm font-medium rounded-lg md:mt-5 cursor-pointer ${
          canSubmit ? "" : "opacity-50 cursor-not-allowed"
        }`}
      >
        Take picture and continue
      </button>
      {canSubmit && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex items-center justify-between px-6 bg-primary text-white h-16">
            <p className="font-medium">Start Assessment</p>
            <button
              className="h-8 w-[72px] rounded-[9px] text-xs bg-purple-4 cursor-pointer text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="bg-gray-2 pt-8 pb-10">
            <div className="bg-gray-2 text-center max-w-[335] mx-auto">
              <h1 className="text-primary font-semibold text-xl mb-3 text-sm">
                Proceed to start assessment
              </h1>
              <p className="text-sm text-[#675E8B]">
                Kindly keep to the rules of the assessment and sit up, stay in
                front of your camera/webcam and start your assessment.
              </p>
            </div>
          </div>
          <div className="h-20 flex items-center justify-end px-6 bg-white">
            <button className="bg-primary text-white h-[44px] w-[140px] rounded-lg cursor-pointer">
              Proceed
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
