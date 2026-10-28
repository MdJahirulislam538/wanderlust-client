import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative flex min-h-[330px] items-center justify-center overflow-hidden py-24">
      {/* Background image + dark overlay */}
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/65" aria-hidden />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h2 className="text-4xl leading-tight font-light text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-base text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="group mt-8 inline-flex items-center justify-between gap-8 bg-white px-7 py-4 text-sm font-medium tracking-widest text-neutral-900 uppercase transition-colors hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight
            className="size-5 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
