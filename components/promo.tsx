import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { type Locale, t } from "@/lib/i18n";

type PromoProps = {
  locale: Locale;
};

export const Promo = ({ locale }: PromoProps) => {
  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="Pro" height={26} width={26} />

          <h3 className="text-lg font-bold">{t(locale, "upgradeToPro")}</h3>
        </div>

        <p className="text-muted-foreground">
          {t(locale, "getUnlimitedHeartsAndMore")}
        </p>
      </div>

      <Button variant="super" className="w-full" size="lg" asChild>
        <Link href="/shop" prefetch>
          {t(locale, "upgradeTodayCta")}
        </Link>
      </Button>
    </div>
  );
};
