import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", hint: "Address, City Or Zip" },
  { label: "Date/Duration", hint: "Anytime/3 Days" },
  { label: "Budget", hint: "$0-$3000" },
  { label: "People", hint: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Background image (already has the dark overlay baked in) */}
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
        <h1 className="text-5xl leading-[1.15] font-light text-white md:text-[5rem]">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/destinations"
            className="group inline-flex w-full items-center justify-between gap-8 bg-[#16A1C0] px-10 py-4 text-sm font-medium tracking-widest text-white uppercase transition-colors hover:bg-[#0f8ba8] sm:w-auto md:text-base"
          >
            Explore Now
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex w-full items-center justify-center border border-white/30 bg-white/10 px-10 py-4 text-sm font-medium tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto md:text-base"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative z-10 flex flex-col border-t border-white/20 bg-white/15 backdrop-blur-md sm:flex-row sm:divide-x sm:divide-white/25">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex flex-1 flex-col justify-center border-b border-white/25 px-6 py-3 text-left sm:border-b-0"
          >
            <span className="text-lg font-bold text-white md:text-xl">
              {field.label}
            </span>
            <span className="text-sm text-white/80">{field.hint}</span>
          </div>
        ))}
        <button
          type="button"
          className="flex h-[60px] w-full items-center justify-center bg-[#16A1C0] px-12 text-lg font-bold text-white transition-colors hover:bg-[#0f8ba8] sm:h-auto sm:w-[200px] md:text-xl"
        >
          Search
        </button>
      </div>
    </section>
  );
}
