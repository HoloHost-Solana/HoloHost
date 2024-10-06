import { BrandDashboard } from "@/components/brand-dashboard/BrandLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard: React.FC = () => {

  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data || !data.user) {
      router.push('/auth/signup');
    } 
  }, [])

  return <BrandDashboard />;
};

export default Dashboard;
