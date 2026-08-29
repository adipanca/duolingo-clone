import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete Your Account | EMLS",
  description:
    "How to request deletion of your EMLS account and associated data.",
};

const DeleteAccountPage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-md flex-1 px-4 py-10 text-neutral-700">
      <h1 className="text-2xl font-bold text-neutral-800 lg:text-3xl">
        Delete Your EMLS Account
      </h1>

      <p className="mt-2 text-sm text-neutral-400">
        EMLS, developed by adipanca
      </p>

      <div className="mt-8 flex flex-col gap-y-6 text-sm leading-relaxed lg:text-base">
        <p>
          You can request permanent deletion of your EMLS account and all
          data associated with it at any time, using either of the methods
          below.
        </p>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            Option 1 — Delete it yourself, in the app
          </h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Open the EMLS app and sign in.</li>
            <li>
              Tap your profile icon in the top-right corner to open{" "}
              <span className="font-semibold">Manage account</span>.
            </li>
            <li>
              Go to the <span className="font-semibold">Security</span> tab.
            </li>
            <li>
              Select <span className="font-semibold">Delete account</span>{" "}
              and confirm.
            </li>
          </ol>
          <p className="mt-2">
            Your account and data are deleted immediately — this action
            cannot be undone.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            Option 2 — Request deletion by email
          </h2>
          <p className="mt-2">
            If you can&apos;t access the app, send a deletion request from
            the email address linked to your account to{" "}
            <a
              href="mailto:axl.pondz@gmail.com?subject=EMLS%20Account%20Deletion%20Request"
              className="text-indigo-800 underline"
            >
              axl.pondz@gmail.com
            </a>
            . We will verify your request and delete your account within{" "}
            <span className="font-semibold">30 days</span>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            What gets deleted
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Your account profile (name, email address, login data).</li>
            <li>
              Your learning progress: hearts, points, streaks, completed
              lessons, and course selection.
            </li>
            <li>Your subscription and billing records held with Stripe.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            What may be retained, and for how long
          </h2>
          <p className="mt-2">
            We may retain minimal transaction records (e.g. payment
            receipts) for up to{" "}
            <span className="font-semibold">90 days</span> after deletion,
            where required for fraud prevention, tax, or legal compliance.
            Encrypted backups that contain your data are automatically
            purged on a rolling cycle and fully removed within{" "}
            <span className="font-semibold">30 days</span> of your deletion
            request. No other data is retained.
          </p>
        </section>

        <p className="text-neutral-500">
          For more detail on how EMLS handles your data, see our{" "}
          <Link href="/privacy-policy" className="text-indigo-800 underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
