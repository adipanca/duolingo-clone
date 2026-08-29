import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { type Locale, t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type SidebarProps = {
  className?: string;
  locale: Locale;
};

export const Sidebar = ({ className, locale }: SidebarProps) => {
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
      <Link href="/learn" prefetch>
        <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image src="/logo.png" alt="Logo" height={40} width={40} />

          <h1 className="text-2xl font-extrabold tracking-wide text-indigo-800">
            EMLS
          </h1>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem
          label={t(locale, "learn")}
          href="/learn"
          iconSrc="/learn.svg"
        />
        <SidebarItem
          label={t(locale, "leaderboard")}
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem
          label={t(locale, "quests")}
          href="/quests"
          iconSrc="/quests.svg"
        />
        <SidebarItem
          label={t(locale, "shop")}
          href="/shop"
          iconSrc="/shop.svg"
        />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};
