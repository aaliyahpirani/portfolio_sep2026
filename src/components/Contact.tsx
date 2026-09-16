"use client";

import { FormEvent, useState } from "react";
import PointerWash from "@/components/PointerWash";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setFeedback(
        "Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local, then restart the dev server.",
      );
      return;
    }

    setStatus("sending");
    setFeedback("");

    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", "New message from portfolio contact form");
    formData.append("from_name", "Portfolio contact form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (result.success) {
        setStatus("success");
        setFeedback("Thanks — I’ll get back to you soon.");
        form.reset();
        return;
      }

      setStatus("error");
      setFeedback(result.message ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setFeedback("Could not send the message. Check your connection and try again.");
    }
  }

  return (
    <section
      id="contact"
      data-fade-group
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
    >
      <PointerWash />

      <h2
        data-fade-item
        data-fade-index="0"
        className="relative z-[2] text-center text-5xl text-foreground md:text-6xl"
      >
        <span className="font-playfair pr-4 text-7xl">Contact me</span>
      </h2>

      <p
        data-fade-item
        data-fade-index="1"
        className="relative z-[2] mt-8 max-w-3xl text-center font-serif leading-relaxed text-foreground"
      >
        If you would like to get in touch, fill out the form below and I will get
        back to you.
      </p>

      <form
        data-fade-item
        data-fade-index="2"
        className="relative z-[2] mt-12 flex w-full max-w-3xl flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="flex flex-col gap-6 sm:flex-row">
          <label className="flex min-w-0 flex-1 flex-col gap-2 font-serif text-foreground">
            Full Name
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              className="border border-accent-red bg-background px-4 py-3 font-serif text-foreground shadow-[6px_6px_0_0_#45151b] outline-none"
            />
          </label>

          <label className="flex min-w-0 flex-1 flex-col gap-2 font-serif text-foreground">
            Email
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="border border-accent-red bg-background px-4 py-3 font-serif text-foreground shadow-[6px_6px_0_0_#45151b] outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 font-serif text-foreground">
          Message
          <textarea
            name="message"
            rows={8}
            required
            className="resize-y border border-accent-red bg-background px-4 py-3 font-serif text-foreground shadow-[6px_6px_0_0_#45151b] outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-4 self-center border border-accent-red bg-background px-16 py-5 font-serif text-xl text-accent-red shadow-[6px_6px_0_0_#45151b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit"}
        </button>

        {feedback ? (
          <p
            role="status"
            className={`text-center font-serif ${
              status === "error" ? "text-accent-red" : "text-foreground"
            }`}
          >
            {feedback}
          </p>
        ) : null}
      </form>
    </section>
  );
}
