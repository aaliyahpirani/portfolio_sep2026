import Image from "next/image";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
    >
      <h2 className="relative text-center text-5xl text-foreground md:text-6xl">
        <span className="font-pinyon pr-4 text-7xl">Contact</span>
        <span className="ml-2 font-serif">me</span>
      </h2>

      <p className="relative mt-8 max-w-3xl text-center font-serif leading-relaxed text-foreground">
        If you would like to get in touch, fill out the form below and I will get
        back to you.
      </p>

      <form className="relative mt-12 flex w-full max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <label className="flex min-w-0 flex-1 flex-col gap-2 font-serif text-foreground">
            Full Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              className="border border-accent-red bg-background px-4 py-3 font-serif text-foreground outline-none"
            />
          </label>

          <label className="flex min-w-0 flex-1 flex-col gap-2 font-serif text-foreground">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="border border-accent-red bg-background px-4 py-3 font-serif text-foreground outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 font-serif text-foreground">
          Message
          <textarea
            name="message"
            rows={8}
            className="resize-y border border-accent-red bg-background px-4 py-3 font-serif text-foreground outline-none"
          />
        </label>

        <button
          type="button"
          className="mt-4 self-center border border-accent-red bg-background px-16 py-5 font-montserrat text-xl text-accent-red shadow-[6px_6px_0_0_#45151b]"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
