import { Sidebar } from "@/components/brand-dashboard/Sidebar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { availableItems } from "./types";
import { Profile } from "./Profile";
import { Campaigns } from "./Campaigns";
import { toast } from "react-toastify";

enum status {
  ONGOING,
  PAST,
}

interface IBody {
  id: string;
  name: string;
  daysLeft: number;
  desc: string;
  status: status;
}

export const BrandDashboard: React.FC = () => {
  const sidebarNavItems = [
    {
      title: "Campaigns",
      href: "/dashboard",
    },
   
  ];

  const [selectedItem, setSelectedItem] = useState<number>(
    availableItems.Campaigns
  );

  const [loadingTitle, setLoadingTitle] = useState<boolean>(true);
  const [brandName, setBrandName] = useState<string>("");
  const [brandDesc, setBrandDesc] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await fetch("https://holohost.xyz/api/getBrandData");
        const res = await req.json();
        if (res.code !== 200) {
          toast(res.message);
          return;
        }
        setBrandName(res.response.name);
        setBrandDesc(res.response.desc);
        setLoadingTitle(false);
      } catch (error) {
        toast("An Error Occured");
      }
    };

    getData();
  }, []);

  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<IBody[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await fetch("https://holohost.xyz/api/getBrandCampaigns");
        const res = await req.json();
        console.log(res.response);
        toast(res.message);
        setCampaigns(res.response);
        setLoadingCampaigns(false);
      } catch (error) {
        toast("An Error Occured");
      }
    };
    getData();
  }, []);

  return (
    <div className="space-y-6 w-[80%] mx-auto my-6">
      {loadingTitle ? (
        <LoadingTitleSkeleton />
      ) : (
        <div>
          <h3 className="text-3xl font-medium">{brandName}</h3>
          <p className="text-md text-gray-300">{brandDesc}</p>
        </div>
      )}
      <Separator />

      <div className="w-[90%] mx-auto flex">
        <div>
          <Sidebar
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            items={sidebarNavItems}
          />
        </div>
        <div className="ml-8">
          {selectedItem === availableItems.Profile ? (
            <Profile />
          ) : selectedItem === availableItems.Campaigns ? (
            loadingCampaigns ? (
              <LoadingCampaignsSkeleton />
            ) : (
              <Campaigns cards={campaigns} />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingTitleSkeleton: React.FC = () => {
  return <div>loading title...</div>;
};

const LoadingCampaignsSkeleton: React.FC = () => {
  return <div>loading campaigns...</div>;
};
