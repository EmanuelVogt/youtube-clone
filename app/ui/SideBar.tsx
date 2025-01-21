import { Children, ElementType, ReactNode, useState } from "react"
import { Button, buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"
import { useSidebarContext } from "../context/SidebarContext"
import HeaderFirstSection from "../components/HeaderFirstSection";
import { IoMdFilm, IoMdHome } from "react-icons/io";
import { TiArrowRepeat } from "react-icons/ti";
import { LuClapperboard } from "react-icons/lu";
import { MdOutlineRadio, MdSlowMotionVideo, MdVideoLibrary } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { BsPlayBtnFill } from "react-icons/bs";
import { FaBook, FaChevronDown, FaChevronUp, FaClock, FaNewspaper, FaPodcast, FaShoppingBag, FaTshirt } from "react-icons/fa";
import { playlists, subscriptions } from "../fake-data";
import { FaFireFlameCurved } from "react-icons/fa6";
import { SiYoutubemusic } from "react-icons/si";
import { GrGamepad } from "react-icons/gr";
import { IoTrophySharp } from "react-icons/io5";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext()

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={IoMdHome} title="Home" url="/" />
        <SmallSidebarItem Icon={TiArrowRepeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={LuClapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={MdVideoLibrary} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <HeaderFirstSection  />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={IoMdHome} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={LuClapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={MdVideoLibrary}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={RiHistoryFill}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={BsPlayBtnFill}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={FaClock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map(playlist => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={MdSlowMotionVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map(subscription => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={FaFireFlameCurved}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={FaShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={SiYoutubemusic} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={IoMdFilm}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={MdOutlineRadio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={GrGamepad}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={FaNewspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={IoTrophySharp}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={FaBook}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={FaTshirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={FaPodcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  )
}

type SmallSidebarItemProps = {
  Icon: ElementType
  title: string
  url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  )
}

type LargeSidebarSectionProps = {
  children: ReactNode
  title?: string
  visibleItemCount?: number
}

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = Children.toArray(children).flat()
  const showExpandButton = childrenArray.length > visibleItemCount
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount)
  const ButtonIcon = isExpanded ? FaChevronUp : FaChevronDown

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded(e => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  )
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string
  title: string
  url: string
  isActive?: boolean
}

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
}