import { CampaignDashboard } from "@/components/campaign-dashboard/CampaignLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Campaign: React.FC = () => {
//   const { data } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (!data || !data.user) {
//       router.push("/auth/signup");
//     }
//   }, []);

  return <CampaignDashboard />;
};

export default Campaign;
