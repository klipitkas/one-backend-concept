"use client";

import Script from "next/script";

export function SubscribeForm() {
  return (
    <section className="rounded-lg border border-border bg-surface p-8">
      <Script
        src="https://f.convertkit.com/ckjs/ck.5.js"
        strategy="lazyOnload"
      />

      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold">Get notified of new concepts</h2>
        <p className="mt-2 text-muted">
          Subscribe to receive an email whenever a new backend concept is
          published. No spam, unsubscribe anytime.
        </p>

        <form
          action="https://app.kit.com/forms/2469198/subscriptions"
          className="seva-form formkit-form mt-6"
          method="post"
          data-sv-form="2469198"
          data-uid="0a9387523f"
          data-format="inline"
          data-version="5"
        >
          <ul
            className="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          />
          <div data-element="fields" className="seva-fields formkit-fields">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="formkit-field flex-1">
                <input
                  className="formkit-input w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  name="email_address"
                  aria-label="Email Address"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
              <button
                data-element="submit"
                className="formkit-submit rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent/90"
              >
                <div className="formkit-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </form>

        <p className="mt-4 text-xs text-muted">
          Daily at 00:00 UTC. Free forever.
        </p>
      </div>
    </section>
  );
}
