import Signin from "@/components/auth/Signin";

export default function SignIn() {
  return (
    <div className="flex">
      <div className="w-1/2 mx-[12vw] my-[20vh] ">
        <Signin />
      </div>

      <div className="w-1/2"></div>
    </div>
  );
}
