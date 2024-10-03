import { Sidebar } from "@/components/brand-dashboard/Sidebar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { availableItems } from "./types";
import { Profile } from "./Profile";
import { Campaigns } from "./Campaigns";

export const BrandDashboard: React.FC = () => {
  const sidebarNavItems = [
    {
      title: "Campaigns",
      href: "/dashboard",
    },
    {
      title: "Profile",
      href: "/dashboard/account",
    },
    {
      title: "Appearance",
      href: "/dashbaord/appearance",
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<number>(
    availableItems.Campaigns
  );

  return (
    <div className="space-y-6 w-[80%] mx-auto my-6">
      <div>
        <h3 className="text-3xl font-medium">Nike</h3>
        <p className="text-md text-gray-300">Get best shoes and sneakers</p>
      </div>
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
            <Campaigns />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
