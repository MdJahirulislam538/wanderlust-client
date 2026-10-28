import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export type Destination = {
    /** Raw Mongo-style id from the API (optional after normalization). */
    _id?: string | number | null;
    id: string | number;
    title: string;
    location: string;
    image: string;
    price: number;
    rating: number;
    duration: string;
};

export default function DestinationCard({destination,}: {destination: Destination;}) {
    const { id, title, location, image, price, rating, duration } =
        destination;

    return (
        <Card className="group/card relative gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-14px_rgba(22,161,192,0.35)]">
            {/* Image with gradient + rating badge */}
            <div className="relative overflow-hidden">
                <Link
                    href={`/destinations/${id}`}
                    aria-label={`View ${title}`}
                    className="block"
                >
                    <Image
                        src={image || "/images/destinations/image1.png"}
                        alt={title}
                        width={640}
                        height={400}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                    />
                </Link>

                {/* Soft gradient for depth */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />

                {/* Rating pill */}
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-sm">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    {Number(rating).toFixed(1)}
                </div>
            </div>

            <CardContent className="flex flex-col gap-2.5 px-5 pt-5 pb-5">
                {/* Location */}
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-[#16A1C0]" aria-hidden />
                    {location}
                </p>

                {/* Title + price */}
                <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-xl font-medium text-neutral-900 transition-colors group-hover/card:text-[#16A1C0]">
                        {title}
                    </h2>
                    <p className="shrink-0 text-neutral-900">
                        <span className="text-xl font-semibold">${price}</span>
                        <span className="text-xs text-muted-foreground">
                            /Person
                        </span>
                    </p>
                </div>

                <div className="mt-1 h-px bg-black/5" />

                {/* Footer: duration + CTA */}
                <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CalendarDays
                            className="size-4 text-[#16A1C0]"
                            aria-hidden
                        />
                        {duration}
                    </p>

                    <Button
                        variant="default"
                        render={<Link href={`/destinations/${id}`} />}
                        className="group/btn h-9 gap-1.5 rounded-lg bg-[#16A1C0] px-4 text-xs font-semibold tracking-[0.12em] text-white uppercase shadow-[0_6px_14px_-6px_rgba(22,161,192,0.6)] transition-all hover:bg-[#0f8ba8] hover:shadow-[0_8px_18px_-6px_rgba(22,161,192,0.7)]"
                    >
                        Book Now
                        <ArrowUpRight
                            className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                            aria-hidden
                        />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
