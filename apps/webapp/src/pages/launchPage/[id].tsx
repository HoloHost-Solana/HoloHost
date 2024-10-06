import { LaunchPageComponent } from "@/components/campaign-dashboard/LaunchPageComponent";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MyPageProps {
  cid?: string;
}

export const getServerSideProps: GetServerSideProps<MyPageProps> = async (
  context
) => {
  const { cid } = context.query;

  return {
    props: {
      cid: cid as string,
    },
  };
};

const LaunchPage: React.FC<MyPageProps> = ({ cid }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  useEffect(() => {
    const get = async () => {
      const req = await fetch(`https://holohost.xyz/api/getCampaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cid,
        }),
      });
      const res = await req.json();
      if (res.code !== 200) return;
      setTitle(res.response.title);
      setDesc(res.response.desc);
    };
    get();
  }, []);

  return (
    <div>
      <LaunchPageComponent title={title} desc={desc} />
    </div>
  );
};

export default LaunchPage;
