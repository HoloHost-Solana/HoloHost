import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DatePickerDemo } from "../ui/DatePicker";

enum status {
  ONGOING,
  PAST,
}

interface ICard {
  id: string;
  name: string;
  daysLeft: number;
  desc: string;
  status: status;
}

interface I {
  cards: ICard[];
}

export const Campaigns: React.FC<I> = ({ cards }) => {
  return (
    <div className="w-[60vw]">
      <Menu cards={cards} />
    </div>
  );
};

const Menu: React.FC<I> = ({ cards }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Do not render on the server
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="all" className="w-full h-full space-y-6 ">
        <div className="space-between justify-between flex items-center">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
            </TabsTrigger>
            <TabsTrigger value="ongoing">OnGoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <Dialog>
            <DialogTrigger>
              <Button variant="outline" className="bg-white text-black">
                Launch New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black">
              <LaunchCampaignModal />
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="all" className="border-none p-0 outline-none">
          <div className="flex flex-wrap">
            {cards.map((c) => (
              <div key={c.id} className="mx-4 my-2">
                <Card
                  id={c.id}
                  desc={c.desc}
                  daysLeft={c.daysLeft}
                  status={c.status}
                  name={c.name}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="ongoing"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          OnGoing
        </TabsContent>

        <TabsContent
          value="past"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          Past
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const Card: React.FC<ICard> = (props) => {
  const { name, daysLeft, desc } = props;

  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src="/manu.png"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {name}
            </p>
            <p className="text-sm text-gray-400">{daysLeft} days left</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {name}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const LaunchCampaignModal: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleLaunch = async () => {
    console.log(name, description, startDate, endDate);
    const req = await fetch("http://localhost:3000/api/createCampaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        startDate,
        endDate,
      }),
    });
    console.log(req);
  };

  return (
    <div className="h-[60vh]">
      <p className="text-3xl mb-2">Launch New Campaign</p>
      <Separator />
      <div className="mt-8">
        <div>
          <p className="text-xl ml-12">Name</p>
          <Input
            className="w-[80%] mx-auto mt-2"
            placeholder="Enter name for campaign"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <p className="ml-12 text-xl mt-6">Description</p>
          <Textarea
            className="mt-2 w-[80%] mx-auto"
            placeholder="Enter description for campaign"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <p className="ml-12 text-xl mt-6">Start Date</p>
          <div className="ml-12 mt-1">
            <DatePickerDemo date={startDate} setDate={setStartDate} />
          </div>
        </div>
        <div>
          <p className="ml-12 text-xl mt-6">End Date</p>
          <div className="ml-12 mt-1">
            <DatePickerDemo date={endDate} setDate={setEndDate} />
          </div>
        </div>
        <div className="ml-24">
          <Button
            variant="outline"
            onClick={handleLaunch}
            className="bg-white mx-auto mt-4 text-black"
          >
            Launch New Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};
