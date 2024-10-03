// components/Onboarding.js
import { useState } from "react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4; // Total number of steps

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Calculate progress percentage
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-[50vw] mx-auto mt-10 p-6 bg-[#252424] shadow-md rounded-md">
      {/* Progress Bar */}

      {/* Render steps */}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {step < totalSteps ? (
        //   <button
        //     className="px-4 text-white py-2 bg-purple-500  rounded hover:bg-purple-600"
        //     onClick={nextStep}
        //   >
        //     Next
        //   </button>
        <div></div>
        ) : (
          <button className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600">
            Finish
          </button>
        )}
      </div>

      <div className="mt-[10vh] relative w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="absolute top-0 left-0 h-2 bg-purple-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Individual step components
const Step1 = () => (
  <div className="h-[50vh]  text-white bg-[#252424] flex flex-col gap-16 p-4">
    <p>What best describes you ?</p>

    <div className="flex gap-4 mt-[12vh]">
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Brand
      </button>
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Individual
      </button>
    </div>
  </div>
);
const Step2 = () => (
  <div className="h-[30vh] text-white bg-[#252424] flex flex-col gap-16 p-4">
    <p>What best describes you ?</p>

    <div className="flex gap-4">
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Brand
      </button>
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Individual
      </button>
    </div>
  </div>
);
const Step3 = () => (
  <div className="h-[30vh] text-white bg-[#252424] flex flex-col gap-16 p-4">
    <p>What best describes you ?</p>

    <div className="flex gap-4">
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Brand
      </button>
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Individual
      </button>
    </div>
  </div>
);
const Step4 = () => (
  <div className="h-[30vh] text-white bg-[#252424] flex flex-col gap-16 p-4">
    <p>What best describes you ?</p>

    <div className="flex gap-4">
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Brand
      </button>
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Individual
      </button>
    </div>
  </div>
);

export default Onboarding;
