"use client";

import Image from "next/image";
import { LuAlignJustify } from "react-icons/lu";
import { Button } from "../components/Button";
import { RiVideoUploadLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { LuMic } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

export default function Header() {
  const [fullState, setFullState] = useState(false);

  const handleOpenSearch = () => {
    setFullState(!fullState);
  };

  return (
    <div className="flex justify-between lg:gap-20 pt-2 mb-6 mx-4">
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          fullState ? "hidden lg:flex" : "flex"
        }`}
      >
        <Button size="icon" variant="default">
          <LuAlignJustify />
        </Button>
        <a href="/">
          <Image src="/images/youtube.png" width={48} height={48} alt="logo" />
        </a>
      </div>
      <form
        className={`flex items-center gap-4 flex-grow justify-center ml-4 ${
          fullState ? "flex" : "hidden md:flex"
        }`}
      >
        {fullState && (
          <Button
            className="md:hidden"
            onClick={handleOpenSearch}
            type="button"
            variant="ghost"
            size="icon"
          >
            <LuArrowLeft />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-2 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0 bg-secondary-default">
            <LuSearch />
          </Button>
        </div>
        <Button
          type="button"
          variant="default"
          size="icon"
          className="flex-shrink-0"
        >
          <LuMic />
        </Button>
      </form>
      <div className={`flex-shrink-0 md:gap ${fullState ? "hidden lg:flex" : "flex"}`}>
        <Button
          size="icon"
          variant="default"
          className="md:hidden"
          onClick={handleOpenSearch}
        >
          <LuSearch />
        </Button>
        <Button size="icon" variant="default">
          <RiVideoUploadLine />
        </Button>
        <Button size="icon" variant="default">
          <IoIosNotificationsOutline />
        </Button>
        <Button size="icon" variant="default">
          <CiUser />
        </Button>
      </div>
    </div>
  );
}
