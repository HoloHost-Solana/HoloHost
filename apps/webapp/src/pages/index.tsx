import { FeaturesSectionDemo } from "@/components/lading-page/features";
import { Globe, World } from "@/components/lading-page/Globe";
import { Hero } from "@/components/lading-page/Hero";
import { InfiniteMovingCards } from "@/components/lading-page/InfiniiteCard";
import Navbar from "@/components/lading-page/Navbar";
import { TimelineDemo } from "@/components/lading-page/Timeline";
import React from "react";

export default function Home() {

  const items = [
    {
      quote: "Unlock the power of digital collectibles to elevate your brand's engagement. Our platform connects brands and artists, allowing you to create unique NFT campaigns that your audience will love. Drive loyalty, boost interaction, and create a lasting impression with exclusive, limited-edition NFTs.",
      name: 'Engage Audiences with Exclusive NFTs',
      title: 'HoloHost'
    },
    {
      quote: "Say goodbye to complex processes. Our all-in-one platform simplifies the creation and distribution of NFTs, making it easy for brands to collaborate with artists and launch stunning campaigns. Whether you're introducing a new product or rewarding loyal customers, NFTs offer a new way to connect with your audience.",
      name: 'Seamless NFT Creation for Brands',
      title: 'HoloHost'
    },
    {
      quote: "Partner with top creators in the NFT space to bring your brand’s vision to life. Our platform provides access to a network of talented artists ready to create unique digital artwork tailored to your campaign. Make your brand stand out with unforgettable visuals and one-of-a-kind NFTs.",
      name: 'Collaborate with Leading Artists',
      title: 'HoloHost'
    },
    {
      quote: "Increase your brand’s visibility and engagement by launching campaigns centered around NFTs. These digital assets not only drive interaction but also provide fans with a tangible way to own a piece of your brand. Our tools make it easy to track performance and user engagement in real time.",
      name: 'Boost Engagement with Digital Collectibles',
      title: 'HoloHost'
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
