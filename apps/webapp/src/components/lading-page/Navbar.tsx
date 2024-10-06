import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-[#0B0019] flex items-center justify-between p-1">
      <Link href={"/"}>
        <div className="relative w-[12vw] h-[12vh]">
          <Image
            src="/1.png"
            alt="Responsive Image"
            layout="fill" // Makes the image fill the parent container
            objectFit="contain" // Adjust the image to fit within the container
          />
          {/* <p className="text-2xl" >HoloHost</p> */}
        </div>
      </Link>

      <div className="flex gap-4 p-4">
        <button className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent font-semibold font-sans"
          onClick={() => router.push('/dashboard')}
          >
            Go To App
          </div>
        </button>

        {data?.user ? (
          <button onClick={() => signOut()}>Log Out</button>
        ) : (
          <button onClick={() => router.push('/auth/signup')} >SIgn Up</button>
        )}
      </div>
    </nav>
  );
}