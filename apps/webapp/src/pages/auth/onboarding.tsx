import { getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3; // Total number of steps

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

  const progress = (step / totalSteps) * 100;
  const router = useRouter();

  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  console.log(name, userType);

  async function handleOnboarding() {
    try {
      const session = await getSession();

      const response = await fetch("http://localhost:3000/api/onboarding", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userType,
          desc,
          userId: session?.user.id,
        }),
      });

      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[50vw] mx-auto mt-10 p-6 bg-[#252424] shadow-md rounded-md">
      {/* Progress Bar */}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            className="bg-none rounded text-violet-600"
            onClick={prevStep}
          >
            <svg
              className="fill-violet-600 h-[5vh] w-[5vw] bg-none text-violet-500 hover:fill-violet-700"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  id="XMLID_6_"
                  d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394 
                  c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998 
                  c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0 
                  c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"
                ></path>
              </g>
            </svg>
          </button>
        )}
        <div className="">
          {step != 1 && step < totalSteps ? (
            <button
              className=" bg-none rounded text-violet-600"
              onClick={nextStep}
            >
              <svg
                className="fill-violet-600 h-[5vh] w-[5vw]"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="XMLID_2_"
                    d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605 
          l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396 
          l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998 
          c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"
                  ></path>
                </g>
              </svg>
            </button>
          ) : (
            step != 1 && (
              <button
                onClick={handleOnboarding}
                className=" bg-violet-500 p-2 text-white rounded hover:bg-violet-600"
              >
                Finish
              </button>
            )
          )}
        </div>
      </div>

      {/* Render steps */}
      {step === 1 && <Step1 nextStep={nextStep} setUserType={setUserType} />}
      {step === 2 && (
        <Step2 nextStep={nextStep} userType={userType} setName={setName} />
      )}
      {step === 3 && (
        <Step3 nextStep={nextStep} setDesc={setDesc} userType={userType} />
      )}
      {step === 4 && <Step4 nextStep={nextStep} />}

      {/* Navigation buttons */}

      <div className="mt-[10vh] relative w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="absolute top-0 left-0 h-2 bg-violet-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Individual step components
const Step1 = (props: {
  nextStep: () => void;
  setUserType: (userType: string) => void;
}) => (
  <div className="h-[50vh]  text-white bg-[#252424] flex flex-col gap-16 p-4">
    <p className="text-4xl">What describes you the best ?</p>

    <div className="flex gap-4 mt-[12vh]">
      <button
        onClick={() => {
          props.nextStep();
          props.setUserType("BRAND");
        }}
        className="p-4 border border-purple-500 rounded-lg w-1/2 hover:bg-violet-500"
      >
        Brand
      </button>
      <button
        onClick={() => {
          props.nextStep();
          props.setUserType("INDIVIDIUAL");
        }}
        className="p-4 border border-purple-500 rounded-lg w-1/2 hover:bg-violet-500"
      >
        Individual
      </button>
    </div>
  </div>
);
const Step2 = (props: {
  nextStep: () => void;
  userType: string;
  setName: (name: string) => void;
}) => (
  <div className="h-[50vh]  text-white bg-[#252424] flex flex-col gap-16 p-4">
    {props.userType === "BRAND" ? (
      <p className="text-4xl">What is your Brand Name?</p>
    ) : (
      <p className="text-4xl">What is your Name ?</p>
    )}

    <input
      type="text"
      onChange={(e: { target: { value: string } }) =>
        props.setName(e?.target.value)
      }
      className="border-b-4 p-4  bg-[#252424] focus:bg- border-violet-600"
    />
  </div>
);
const Step3 = (props: {
  nextStep: () => void;
  setDesc: (desc: string) => void;
  userType: string;
}) => (
  <div className="h-[50vh]  text-white bg-[#252424] flex flex-col gap-16 p-4">
    {props.userType === "BRAND" ? (
      <p className="text-4xl">write some description about the brand :</p>
    ) : (
      <p className="text-4xl">Write some description about yourself :</p>
    )}
    <textarea
      onChange={(e: { target: { value: string } }) =>
        props.setDesc(e?.target.value)
      }
      className="border-b-4 p-4  bg-[#252424] focus:bg- border-violet-600"
    />
  </div>
);
const Step4 = (props: { nextStep: () => void }) => (
  <div className="h-[30vh] text-white bg-[#252424] flex flex-col gap-16 p-4">
    <p>What best describes you ?</p>

    <div className="flex gap-4">
      <button
        onClick={props.nextStep}
        className="p-4 border border-purple-500 rounded-lg w-1/2"
      >
        Brand
      </button>
      <button className="p-4 border border-purple-500 rounded-lg w-1/2">
        Individual
      </button>
    </div>
  </div>
);

export default Onboarding;
