import Signup from "@/components/auth/Signup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignUp() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  async function onBoarding() {
    try {
      if (!sessionData) return;

      const res = await fetch(
        `http://localhost:3000/api/isNewUser?userId=${sessionData.user.id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      console.log(data.data);

      if (data.data) {
        router.push("/auth/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (sessionData?.user) {
    console.log(sessionData);

    onBoarding();

    // router.push('/auth/onboarding');
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
