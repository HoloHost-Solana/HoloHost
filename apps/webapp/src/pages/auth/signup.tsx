import Signup from "@/components/auth/Signup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignUp() {

  const { data: sessionData } = useSession();
  const router = useRouter();

  if (sessionData?.user) {
    router.push('/auth/onboarding');
  }

  return (
    <div className="flex">
      <div className="w-1/2 mx-[12vw] my-[20vh] ">
        <Signup />
      </div>

      <div className="w-1/2"></div>
    </div>
  );
}
