"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      '"Exploring The Ancient Temples Of Kyoto Was A Dream Come True. Every Moment Felt Like Stepping Into A Beautiful Story We Would Never Forget."',
    name: "Emma Williams",
    location: "Toronto, Canada",
    image: "/images/person1.png",
  },
  {
    quote:
      '"The Santorini Sunset Cruise Was The Highlight Of Our Honeymoon. Flawless Organization And Stunning Views All The Way. Simply Perfect!"',
    name: "David Kim",
    location: "Seoul, South Korea",
    image: "/images/person2.png",
  },
];

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("reInit", update);
    api.on("select", update);

    return () => {
      api?.off("select", update);
      api?.off("reInit", update);
    };
  }, [api]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading + navigation arrows */}
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl leading-tight font-light text-neutral-900 md:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-base text-neutral-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-full text-neutral-600"
              disabled={!canScrollPrev}
              onClick={() => api?.scrollPrev()}
              aria-label="Previous slide"
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-full text-neutral-600"
              disabled={!canScrollNext}
              onClick={() => api?.scrollNext()}
              aria-label="Next slide"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Testimonial cards */}
        <Carousel
          opts={{ align: "start", loop: false }}
          setApi={setApi}
          className="mt-6"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2">
                <div className="flex h-full flex-col gap-5 border border-neutral-200 bg-white p-6 sm:flex-row sm:items-start sm:gap-6">
                  <div className="flex flex-1 flex-col">
                    <p className="text-base leading-[1.5] text-neutral-900">
                      {testimonial.quote}
                    </p>
                    <div className="mt-auto pt-6">
                      <p className="text-base text-[#16A1C0]">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={150}
                    height={180}
                    className="h-[180px] w-[150px] shrink-0 self-center object-cover sm:self-start"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
