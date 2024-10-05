import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface ILaunchPageForm {
  oldTitle: string;
  oldDesc: string;
}

export const LaunchPageForm: React.FC<ILaunchPageForm> = (props) => {
  const { oldTitle, oldDesc } = props;

  const [title, setTitle] = useState<string>(oldTitle);
  const [desc, setDesc] = useState<string>(oldDesc);
  const router = useRouter();
  const { data: sessionData } = useSession();

  const handleUpdate = async () => {
    const req = await fetch("http://localhost:3000/api/updateCampaignDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc,
        id: router.query.id,
      }),
    });
    const res = await req.json();
    console.log(res);
  };

  return (
    <div className="w-[60%] mx-auto mt-16">
      <div>
        <p className="text-xl ml-24">Set title for your launch page</p>
        <Input
          className="w-[80%] mx-auto mt-2"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="mt-8">
        <p className="text-xl ml-24">Set description for your launch page</p>
        <Textarea
          className="w-[80%] mx-auto mt-2"
          placeholder="description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </div>
      <div className="flex mx-auto">
        <Button
          variant="outline"
          onClick={handleUpdate}
          className="bg-white mx-auto mt-4 text-black"
        >
          Update Page
        </Button>
      </div>

      <div className="flex">
        <Button
          variant="outline"
          onClick={handleUpdate}
          className="bg-white mx-auto mt-8 text-black"
        >
          Copy Launch Page Link
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const path = sessionData?.user.name;
            if (!path) return;
            router.push(`/launchPage/${path}?cid=${router.query.id}`);
          }}
          className="bg-white mx-auto mt-8 text-black"
        >
          Open Launch Page
        </Button>
      </div>
    </div>
  );
};
