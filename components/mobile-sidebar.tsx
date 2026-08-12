import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { type Locale } from "@/lib/i18n";

import { Sidebar } from "./sidebar";

type MobileSidebarProps = {
  locale: Locale;
};

export const MobileSidebar = ({ locale }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>

      <SheetContent className="z-[100] p-0" side="left">
        <Sidebar locale={locale} />
      </SheetContent>
    </Sheet>
  );
};
