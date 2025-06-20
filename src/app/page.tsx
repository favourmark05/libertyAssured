import Header from "@/components/Header";
import CameraBox from "@/components/CameraBox";
import Webcam from "@/components/Webcam";
import Speed from "@/components/Speed";
import Mic from "@/components/Mic";
import Lighting from "@/components/Lighting";
import SubmitButton from "@/components/SubmitButton";
export default function Home() {
  return (
    <div>
      <Header />
      <div className="pt-[100px] pt-[122px] pb-10 wrap">
        <div className="bg-white max-w-[832px] mx-auto rounded-[20px] px-5 py-8 md:p-10">
          <div>
            <h1 className="font-medium text-xl">System check</h1>
            <p className="text-sm mt-4 leading-[22px] tracking-[-0.015em] max-w-[721px]">
              We utilize your camera image to ensure fairness for all
              participants, and we also employ both your camera and microphone
              for a video questions where you will be prompted to record a
              response using your camera or webcam, so it&apos;s essential to
              verify that your camera and microphone are functioning correctly
              and that you have a stable internet connection. To do this, please
              position yourself in front of your camera, ensuring that your
              entire face is clearly visible on the screen. This includes your
              forehead, eyes, ears, nose, and lips. You can initiate a 5-second
              recording of yourself by clicking the button below.
            </p>
          </div>
          <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
            {/* camera screen */}
            <CameraBox />

            {/* icon boxes */}
            <div className="grid grid-cols-2 gap-3">
              <Webcam />
              <Speed />
              <Mic />
              <Lighting />
            </div>
          </div>
          <SubmitButton />
        </div>
        {/* <ProctorPage /> */}
        <p className="flex items-center gap-[6px] mt-24">
          <span className="text-sm text-light-gray uppercase">Powered by</span>{" "}
          <span className="font-medium text-lg">Getlinked.AI</span>
        </p>
      </div>
    </div>
  );
}
