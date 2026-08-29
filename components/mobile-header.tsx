import { type Locale } from "@/lib/i18n";

import { MobileSidebar } from "./mobile-sidebar";

type MobileHeaderProps = {
  locale: Locale;
};

export const MobileHeader = ({ locale }: MobileHeaderProps) => {
  return (
    <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-indigo-700 px-4 lg:hidden">
      <MobileSidebar locale={locale} />
    </nav>
  );
};
