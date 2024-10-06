import React, { useEffect, useState } from "react";
import CampaignSwitcher from "./CampaignSwitcher";
import { Separator } from "../ui/separator";
import { CalendarDateRangePicker } from "./DateRangePicker";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./Overview";
import { RecentSales } from "./RecentSales";
import { useRouter } from "next/router";
import { LaunchPageForm } from "./LaunchPageForm";
import { Nft } from "./Nft's";
import { toast } from "react-toastify";

export const CampaignDashboard: React.FC = () => {
  const [loadingCampaign, setLoadingCampaign] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("Overview");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;

    if (!id) return;

    const get = async () => {
      console.log("here");
      try {
        const req = await fetch("https://holohost.xyz/api/getCampaign");
        const res = await req.json();
        console.log(res.response);
        if (res.code !== 200) {
          toast(res.message);
          return;
        }

        toast(res.message);
        setTitle(res.response.title);
        setDesc(res.response.desc);
        setLoadingCampaign(false);
      } catch (error) {
        toast("An error occured");
      }
    };
    get();
  }, []);

  if (loadingCampaign) return <div>Loading...</div>;

  return (
    <div className="w-[80%] mx-auto">
      <Nav title={title} setSelectedOption={setSelectedOption} />
      <Hero />
      {selectedOption === "Overview" ? (
        <Content />
      ) : selectedOption === "LaunchPage" ? (
        <LaunchPageForm oldTitle={title} oldDesc={desc} />
      ): selectedOption === "Nfts" ? <Nft /> : ""}
      {/* {selectedOption === "Overview" ? (
        <Content />
      ) : selectedOption === "LaunchPage" ? (
        <LaunchPageForm oldTitle={title} oldDesc={desc} />
      ) : selectedOption === "Nft's" ? (
        <Nft />
      ) : (
        ""
      )} */}
    </div>
  );
};

interface INav {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

const Nav: React.FC<INav> = ({ setSelectedOption, title }) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <div className="flex items-center mt-4">
        <CampaignSwitcher title={title} />
        <div
          className="mx-3 cursor-pointer"
          onClick={(_e) => setSelectedOption("Overview")}
        >
          Overview
        </div>
        <div
          className="mx-3 text-gray-400 cursor-pointer"
          onClick={() => router.push(`/nftlaunch?id=${id}`)}
        >
          Nft's Launch
        </div>
        <div className="mx-3 text-gray-400 cursor-pointer" onClick={(_e) => setSelectedOption("Nfts")}>NFT's</div>
        <div
          className="mx-3 text-gray-400 cursor-pointer"
          onClick={(_e) => setSelectedOption("LaunchPage")}
        >
          Launch Page
        </div>
      </div>
      <Separator className="mt-3" />
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-3xl ml-2 font-bold mt-5">Dashboard</p>
        <div className="mt-5 mr-2">
          <CalendarDateRangePicker />
        </div>
      </div>
      <div>
        <Tabs defaultValue="all" className="w-full h-full space-y-6 mt-4 ml-4">
          <div className="space-between justify-between flex items-center">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All
              </TabsTrigger>
              <TabsTrigger value="ongoing">OnGoing</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const Item: React.FC = () => {
  return (
    <Card className="bg-[#09090B] w-[18vw] h-[16vh] mt-4 text-white border border-[#27272A]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$0</div>
        <p className="text-xs text-muted-foreground">+0 from last month</p>
      </CardContent>
    </Card>
  );
};

const Content: React.FC = () => {
  return (
    <div>
      <div className="flex justify-evenly flex-wrap">
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
      <div className="flex justify-evenly">
        <Overview />
        {/* <RecentSales /> */}
      </div>
    </div>
  );
};
