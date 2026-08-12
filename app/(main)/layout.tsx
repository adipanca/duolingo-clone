import type { PropsWithChildren } from "react";

import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { getLocale } from "@/db/queries";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const locale = await getLocale();

  return (
    <>
      <MobileHeader locale={locale} />
      <Sidebar className="hidden lg:flex" locale={locale} />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
