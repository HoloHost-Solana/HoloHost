import { FeaturesSectionDemo } from "@/components/lading-page/features";
import { Globe, World } from "@/components/lading-page/Globe";
import { Hero } from "@/components/lading-page/Hero";
import { InfiniteMovingCards } from "@/components/lading-page/InfiniiteCard";
import { TimelineDemo } from "@/components/lading-page/Timeline";
import React from "react";

export default function Home() {

  const items = [
    {
      quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, distinctio! Odio impedit consequuntur nihil pariatur provident unde velit consequatur maiores explicabo fuga fugit labore, saepe facere optio, placeat amet temporibus',
      name: 'Holohost',
      title: 'kfdgf'
    },
    {
      quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, distinctio! Odio impedit consequuntur nihil pariatur provident unde velit consequatur maiores explicabo fuga fugit labore, saepe facere optio, placeat amet temporibus',
      name: 'Holohost',
      title: 'kfdgf'
    },
    {
      quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, distinctio! Odio impedit consequuntur nihil pariatur provident unde velit consequatur maiores explicabo fuga fugit labore, saepe facere optio, placeat amet temporibus',
      name: 'Holohost',
      title: 'kfdgf'
    },
    {
      quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, distinctio! Odio impedit consequuntur nihil pariatur provident unde velit consequatur maiores explicabo fuga fugit labore, saepe facere optio, placeat amet temporibus',
      name: 'Holohost',
      title: 'kfdgf'
    },
  ]

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="mt-8" >
        <InfiniteMovingCards className="flex mx-auto" items={items} />
      </div>
      {/* <div>
        <p className="text-5xl text-center mt-24" >Get Global Reach for your campaigns</p>
        <div>
          <Globe globeConfig={{}}  />
        </div>
      </div> */}
      <div>
        <FeaturesSectionDemo />
      </div>
      <div>
        <TimelineDemo />
      </div>
    </div>
  );
}

const Navbar: React.FC = () => {
  return (
    <div className="border border-white h-[7vh]" ></div>
  )
}

