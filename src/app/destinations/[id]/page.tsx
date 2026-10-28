import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    MapPin,
    Star,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditDestinationsDialog } from "@/components/destinations/EditDestinationsDialog";

/** Shape the API *may* use — we normalize whatever comes back. */
type ApiDestination = {
    id?: string | number;
    title?: string;
    name?: string;
    location?: string;
    country?: string;
    image?: string;
    imageUrl?: string;
    photo?: string;
    price?: number | string;
    rating?: number | string;
    reviews?: number;
    totalReviews?: number;
    duration?: string;
    overview?: string;
    description?: string;
    highlights?: string[];
};

const bookingPerks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];

export default async function DestinationDetailsPage({params,}: PageProps<"/destinations/[id]">) {
    const { id } = await params;

    let data: { destination?: ApiDestination } & ApiDestination | null = null;

    try {
        const res = await fetch(`http://localhost:8000/destinations/${id}`, {cache: "no-store",});
        if (res.ok) data = await res.json();
    } catch {
        data = null;
    }

    const destination: ApiDestination | undefined =
        data?.destination ?? data ?? undefined;

    if (!destination) notFound();

    // Normalize fields (backend shape isn't fixed)
    const title = destination.title ?? destination.name ?? "Untitled Destination";
    const location = destination.location ?? destination.country ?? "";
    const image =
        destination.image ??
        destination.imageUrl ??
        destination.photo ??
        "/images/destinations/image1.png";
    const price = Number(destination.price ?? 0);
    const rating = Number(destination.rating ?? 0);
    const reviews = Number(destination.reviews ?? destination.totalReviews ?? 0);
    const duration = destination.duration ?? "";
    const overview = destination.overview ?? destination.description ?? "";
    const highlights = Array.isArray(destination.highlights)
        ? destination.highlights
        : [];

    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
            {/* Top bar: back link + actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/destinations"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft
                        className="size-4 transition-transform group-hover:-translate-x-0.5"
                        aria-hidden
                    />
                    Back to Destinations
                </Link>

                <div className="flex items-center gap-3">
                    <EditDestinationsDialog destination ={destination}/>
                    <Button
                        variant="outline"
                        className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Trash2 className="size-4" aria-hidden />
                        Cancel
                    </Button>
                </div>
            </div>

            {/* Hero image */}
            <div className="relative mt-6 overflow-hidden rounded-2xl">
                <Image
                    src={image}
                    alt={title}
                    width={1600}
                    height={600}
                    priority
                    sizes="(min-width: 1280px) 1152px, calc(100vw - 48px)"
                    className="aspect-[8/3] w-full object-cover"
                />
            </div>

            {/* Content + booking card */}
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
                {/* Left column */}
                <div>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-4" aria-hidden />
                        {location}
                    </p>

                    <h1 className="mt-2 text-4xl font-light text-neutral-900 md:text-5xl">
                        {title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Star
                                className="size-4 fill-amber-400 text-amber-400"
                                aria-hidden
                            />
                            <span className="font-semibold text-neutral-900">
                                {rating.toFixed(1)}
                            </span>
                            {reviews > 0 && (
                                <span className="text-muted-foreground">
                                    ({reviews} reviews)
                                </span>
                            )}
                        </span>

                        {duration && (
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                <CalendarDays className="size-4" aria-hidden />
                                {duration}
                            </span>
                        )}
                    </div>

                    {overview && (
                        <div className="mt-10">
                            <h2 className="text-2xl font-light text-neutral-900">
                                Overview
                            </h2>
                            <p className="mt-3 text-base leading-relaxed text-neutral-500">
                                {overview}
                            </p>
                        </div>
                    )}

                    {highlights.length > 0 && (
                        <div className="mt-10">
                            <h2 className="text-2xl font-light text-neutral-900">
                                Highlights
                            </h2>
                            {overview && (
                                <p className="mt-3 text-base leading-relaxed text-neutral-500">
                                    {overview}
                                </p>
                            )}
                            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                                {highlights.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className="flex items-start gap-2.5 text-sm text-neutral-600"
                                    >
                                        <Check
                                            className="mt-0.5 size-4 shrink-0 text-emerald-500"
                                            aria-hidden
                                        />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right column: booking card */}
                <Card className="h-fit gap-0 rounded-2xl py-0 shadow-[0_2px_12px_rgba(15,23,42,0.05)] ring-1 ring-black/5 lg:sticky lg:top-24">
                    <CardContent className="flex flex-col gap-6 p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Starting from
                            </p>
                            <p className="mt-1 text-4xl font-bold text-[#16A1C0]">
                                ${price}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                per person
                            </p>
                        </div>

                        <input
                            type="date"
                            defaultValue="2026-05-15"
                            aria-label="Travel date"
                            className="w-full rounded-lg bg-muted px-4 py-2.5 text-sm text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />

                        <Button className="h-11 w-full gap-2 bg-[#16A1C0] text-sm font-semibold tracking-[0.12em] text-white uppercase shadow-[0_8px_18px_-8px_rgba(22,161,192,0.7)] hover:bg-[#0f8ba8]">
                            Book Now
                            <ArrowRight className="size-4" aria-hidden />
                        </Button>

                        <div className="h-px bg-black/5" />

                        <ul className="flex flex-col gap-3">
                            {bookingPerks.map((perk) => (
                                <li
                                    key={perk}
                                    className="flex items-center gap-2.5 text-sm text-neutral-600"
                                >
                                    <Check
                                        className="size-4 shrink-0 text-emerald-500"
                                        aria-hidden
                                    />
                                    {perk}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
