import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="w-full border-t-2 border-slate-200 p-2">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-y-2 py-4">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Supported by
        </p>

        <div className="flex items-center gap-x-2">
          <Image
            src="/udayana.png"
            alt="Universitas Udayana"
            height={36}
            width={36}
          />

          <span className="text-sm font-semibold text-neutral-500">
            Universitas Udayana
          </span>
        </div>

        <div className="flex items-center gap-x-4">
          <Link
            href="/privacy-policy"
            className="text-xs text-neutral-400 underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>

          <Link
            href="/delete-account"
            className="text-xs text-neutral-400 underline-offset-2 hover:underline"
          >
            Delete Account
          </Link>
        </div>
      </div>

      <div className="mx-auto hidden h-20 max-w-screen-lg items-center justify-evenly lg:flex">
        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/en.svg"
            alt="English"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          English
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/hr.svg"
            alt="Croatian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Croatian
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/es.svg"
            alt="Spanish"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/fr.svg"
            alt="French"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          French
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/it.svg"
            alt="Italian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/jp.svg"
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
      </div>
    </div>
  );
};
