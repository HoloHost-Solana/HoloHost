import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const LaunchPageForm: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();

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
        //   onClick={handleLaunch}
          className="bg-white mx-auto mt-4 text-black"
        >
          Update Page
        </Button>
      </div>
    </div>
  );
};
