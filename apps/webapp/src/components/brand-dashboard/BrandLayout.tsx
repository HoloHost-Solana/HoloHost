import { Sidebar } from "@/components/brand-dashboard/Sidebar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { availableItems } from "./types";
import { Profile } from "./Profile";
import { Campaigns } from "./Campaigns";

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
  const [brandName, setBrandName] = useState<string>('');
  const [brandDesc, setBrandDesc] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const req = await fetch("http://localhost:3000/api/getBrandData");
      const res = await req.json();
      if (res.code !== 200) {
        // show error message toast
        return;
      }
      setBrandName(res.response.name);
      setBrandDesc(res.response.desc);
      setLoadingTitle(false);
    };

    getData();
  }, []);

  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<IBody[]>([]);

  useEffect(() => {
    const getData = async () => {
      const req = await fetch('http://localhost:3000/api/getBrandCampaigns');
      const res = await req.json();
      console.log(res.response);
      setCampaigns(res.response);
      setLoadingCampaigns(false);
    }
    getData();
  }, [])

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
          ) : selectedItem === availableItems.Campaigns ? 
            loadingCampaigns ? <LoadingCampaignsSkeleton /> : <Campaigns cards={campaigns} /> 
          : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingTitleSkeleton: React.FC = () => {
  return (
    <div>
      loading title...
    </div>
  )
}

const LoadingCampaignsSkeleton: React.FC = () => {
  return (
    <div>
      loading campaigns...
    </div>
  )
}
