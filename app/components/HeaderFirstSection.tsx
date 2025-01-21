import { Button } from "./Button";
import { useSidebarContext } from "../context/SidebarContext";
import { LuMenu } from "react-icons/lu";

type Props = {
  hidden?: boolean;
};

export default function HeaderFirstSection({ hidden }: Props) {
    const { toggle } = useSidebarContext()

    return (
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          hidden ? "hidden" : "flex"
        }`}
      >
        <Button onClick={toggle} variant="ghost" size="icon">
          <LuMenu />
        </Button>
        <a href="/">
          <img src="/images/youtube.png" className="h-6" />
        </a>
      </div>
  )
}
