"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Locale, t } from "@/lib/i18n";
import { usePracticeModal } from "@/store/use-practice-modal";

type PracticeModalProps = {
  locale: Locale;
};

export const PracticeModal = ({ locale }: PracticeModalProps) => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/heart.svg" alt="Heart" height={100} width={100} />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            {t(locale, "practiceLessonTitle")}
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            {t(locale, "practiceLessonDescription")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              {t(locale, "iUnderstand")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
