import DestinationCard, {
    type Destination,
} from "@/components/destinations/DestinationCard";

/** Shape the API *may* use — we normalize whatever comes back. */
type ApiDestination = Partial<Destination> & {
    name?: string;
    country?: string;
    imageUrl?: string;
    photo?: string;
};

const DestinationPage = async () => {
    let items: ApiDestination[] = [];

    try {
        const res = await fetch("http://localhost:8000/destinations", {
            cache: "no-store",
        });
        const data = await res.json();
        items = Array.isArray(data) ? data : (data?.destinations ?? []);
    } catch {
        items = [];
    }

    const destinations: Destination[] = items.map((item, index) => ({
        // Prefer the Mongo `_id` — that's what /destinations/:id expects
        id: String(item._id ?? item.id ?? index),
        title: item.title ?? item.name ?? "Untitled Destination",
        location: item.location ?? item.country ?? "",
        image:
            item.image ??
            item.imageUrl ??
            item.photo ??
            "/images/destinations/image1.png",
        price: Number(item.price ?? 0),
        rating: Number(item.rating ?? 4.5),
        duration: item.duration ?? "",
    }));

    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
            <p className="text-sm text-neutral-500">
                Showing {destinations.length} destinations
            </p>

            {destinations.length === 0 ? (
                <p className="mt-8 text-neutral-500">
                    No destinations found. Make sure your backend is running on
                    port 8000.
                </p>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default DestinationPage;
