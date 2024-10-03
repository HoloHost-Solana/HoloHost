import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { availableItems } from "./types";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  selectedItem: number;
}

export const Sidebar: React.FC<SidebarNavProps> = ({
  className,
  items,
  setSelectedItem,
  selectedItem,
  ...props
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            //@ts-ignore
            selectedItem === availableItems[item.title]
              ? "bg-muted text-black hover:bg-muted"
              : "bg-transparent hover:bg-muted",
            "justify-start w-[13vw] text-lg"
          )}
          onClick={(e) => {
            //@ts-ignore
            setSelectedItem(availableItems[item.title]);
          }}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
};
