import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | EMLS",
  description: "How EMLS collects, uses, and protects your data.",
};

const LAST_UPDATED = "August 24, 2026";

const PrivacyPolicyPage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-md flex-1 px-4 py-10 text-neutral-700">
      <h1 className="text-2xl font-bold text-neutral-800 lg:text-3xl">
        Privacy Policy
      </h1>

      <p className="mt-2 text-sm text-neutral-400">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-8 flex flex-col gap-y-6 text-sm leading-relaxed lg:text-base">
        <p>
          This Privacy Policy explains how EMLS (&quot;we&quot;,
          &quot;our&quot;, or &quot;the app&quot;) collects, uses, and
          protects your information when you use our website and Android
          application. By using EMLS, you agree to the collection and use
          of information in accordance with this policy.
        </p>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            1. Information We Collect
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold">Account information.</span>{" "}
              We use{" "}
              <a
                href="https://clerk.com"
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-800 underline"
              >
                Clerk
              </a>{" "}
              to handle sign-up and sign-in. Depending on the method you
              choose, this may include your name, email address, profile
              picture, and authentication identifiers from third-party
              providers (e.g. Google or GitHub).
            </li>
            <li>
              <span className="font-semibold">Payment information.</span>{" "}
              If you purchase a subscription, payments are processed by{" "}
              <a
                href="https://stripe.com"
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-800 underline"
              >
                Stripe
              </a>
              . We do not receive or store your full card details — Stripe
              handles this directly and shares only the information needed
              to confirm and manage your subscription (such as subscription
              status and billing dates).
            </li>
            <li>
              <span className="font-semibold">Learning progress.</span> We
              store data related to your app usage, such as course
              selection, hearts, points, streaks, and completed lessons, to
              provide the core functionality of the app.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            2. How We Use Your Information
          </h2>
          <p className="mt-2">We use the information above to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Create and secure your account.</li>
            <li>Save and sync your learning progress across devices.</li>
            <li>Process and manage subscription payments.</li>
            <li>Maintain, troubleshoot, and improve the app.</li>
          </ul>
          <p className="mt-2">
            We do not sell your personal information, and we do not use
            your data for advertising.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            3. Third-Party Services
          </h2>
          <p className="mt-2">
            EMLS relies on the following third-party services, each
            governed by its own privacy policy:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <a
                href="https://clerk.com/legal/privacy"
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-800 underline"
              >
                Clerk
              </a>{" "}
              — authentication and account management.
            </li>
            <li>
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-800 underline"
              >
                Stripe
              </a>{" "}
              — payment processing.
            </li>
            <li>
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-800 underline"
              >
                Vercel
              </a>{" "}
              — application hosting.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            4. Data Retention
          </h2>
          <p className="mt-2">
            We retain your account and progress data for as long as your
            account is active. You may request deletion of your account and
            associated data at any time by contacting us (see below).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            5. Account &amp; Data Deletion
          </h2>
          <p className="mt-2">
            You can request deletion of your account and all associated
            data (learning progress, hearts, points, and subscription
            records) at any time, in either of the following ways:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">In the app:</span> tap your
              profile icon in the top-right corner, open{" "}
              <span className="font-semibold">Manage account</span>, then
              go to the <span className="font-semibold">Security</span> tab
              and select{" "}
              <span className="font-semibold">Delete account</span>.
            </li>
            <li>
              <span className="font-semibold">By email:</span> send a
              request to{" "}
              <a
                href="mailto:axl.pondz@gmail.com"
                className="text-indigo-800 underline"
              >
                axl.pondz@gmail.com
              </a>{" "}
              and we will delete your account and data within 30 days.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            6. Children&apos;s Privacy
          </h2>
          <p className="mt-2">
            EMLS is not directed at children under 13, and we do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            7. Your Rights
          </h2>
          <p className="mt-2">
            You may access, update, or delete your account information at
            any time from within the app, or by contacting us directly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            8. Changes to This Policy
          </h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Changes
            will be posted on this page with an updated &quot;Last
            updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-800">
            9. Contact Us
          </h2>
          <p className="mt-2">
            If you have any questions about this Privacy Policy, contact us
            at{" "}
            <a
              href="mailto:axl.pondz@gmail.com"
              className="text-indigo-800 underline"
            >
              axl.pondz@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
