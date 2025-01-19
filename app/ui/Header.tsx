import Image from "next/image";
import { LuAlignJustify } from "react-icons/lu";
import { Button } from "../components/Button";

export default function Header() {
  return (
    <div className="flex justify-between lg:gap-20 pt-2 mb-6 mx-4">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button size="icon" variant="default">
          <LuAlignJustify />
        </Button>
        <a href="/">
          <Image src="/images/youtube.png" width={48} height={48} alt="logo" />
        </a>
      </div>

      <p>aaa</p>
    </div>
  );
}
