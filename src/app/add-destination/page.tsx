"use client";

import { useState, type FormEvent } from "react";
import { SaveIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
    "Beach",
    "Mountain",
    "City",
    "Desert",
    "Cultural",
    "Adventure",
    "Wildlife",
] as const;

type FormState = {
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
    name: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

const fieldClass ="h-10 border-transparent bg-muted/60 focus-visible:border-ring md:text-sm";

function validate(form: FormState): FormErrors {
    const errors: FormErrors = {};

    if (!form.name.trim()) errors.name = "Destination name is required.";
    if (!form.country.trim()) errors.country = "Country is required.";
    if (!form.category) errors.category = "Please select a category.";
    if (!form.price.trim()) {
        errors.price = "Price is required.";
    } else if (Number.isNaN(Number(form.price)) || Number(form.price) < 0) {
        errors.price = "Enter a valid price.";
    }
    if (!form.duration.trim()) errors.duration = "Duration is required.";
    if (!form.departureDate)
        errors.departureDate = "Departure date is required.";
    if (form.imageUrl.trim() && !/^https?:\/\/\S+$/i.test(form.imageUrl.trim()))
        errors.imageUrl = "Enter a valid URL (https://…).";
    if (!form.description.trim())
        errors.description = "Please add a short description.";

    return errors;
}

const AddDestinationPage = () => {
    const [form, setForm] = useState<FormState>(INITIAL_STATE);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const update = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setSubmitted(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch("http://localhost:8000/add-destination", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...form,
                price: Number(form.price),
            }),
        });

        const data = await res.json();
        console.log("Server response:", data);

        const nextErrors = validate(form);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        // No backend yet — log the payload for now.
        console.log("New travel package:", {
            ...form,
            price: Number(form.price),
        });

        setForm(INITIAL_STATE);
        setSubmitted(true);
    };

    const handleCancel = () => {
        setForm(INITIAL_STATE);
        setErrors({});
        setSubmitted(false);
    };

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-12 md:py-24">
            <h1 className="mb-10 font-heading text-4xl font-normal tracking-tight md:text-5xl">
                Add New Travel Package
            </h1>

            <Card className="mx-auto w-full max-w-2xl shadow-sm">
                <form onSubmit={handleSubmit} noValidate>
                    <CardContent className="flex flex-col gap-5">
                        {/* Destination Name */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="destination-name">
                                Destination Name
                            </Label>
                            <Input
                                id="destination-name"
                                className={fieldClass}
                                placeholder="Bali Paradise"
                                value={form.name}
                                aria-invalid={!!errors.name}
                                onChange={(e) =>
                                    update("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Country + Category */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    className={fieldClass}
                                    placeholder="Indonesia"
                                    value={form.country}
                                    aria-invalid={!!errors.country}
                                    onChange={(e) =>
                                        update("country", e.target.value)
                                    }
                                />
                                {errors.country && (
                                    <p className="text-sm text-destructive">
                                        {errors.country}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={form.category || null}
                                    onValueChange={(value) =>
                                        update("category", value ?? "")
                                    }
                                >
                                    <SelectTrigger
                                        id="category"
                                        className={`w-full ${fieldClass} pr-2.5 data-placeholder:text-muted-foreground`}
                                        aria-invalid={!!errors.category}
                                    >
                                        <SelectValue placeholder="Beach" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <p className="text-sm text-destructive">
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Price + Duration */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="price">Price (USD)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min={0}
                                    className={fieldClass}
                                    placeholder="e.g., 1299"
                                    value={form.price}
                                    aria-invalid={!!errors.price}
                                    onChange={(e) =>
                                        update("price", e.target.value)
                                    }
                                />
                                {errors.price && (
                                    <p className="text-sm text-destructive">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    className={fieldClass}
                                    placeholder="e.g., 7 Days/6 Nights"
                                    value={form.duration}
                                    aria-invalid={!!errors.duration}
                                    onChange={(e) =>
                                        update("duration", e.target.value)
                                    }
                                />
                                {errors.duration && (
                                    <p className="text-sm text-destructive">
                                        {errors.duration}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Departure Date */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="departure-date">
                                Departure Date
                            </Label>
                            <Input
                                id="departure-date"
                                type="date"
                                className={`${fieldClass} [&::-webkit-calendar-picker-indicator]:opacity-50`}
                                value={form.departureDate}
                                aria-invalid={!!errors.departureDate}
                                onChange={(e) =>
                                    update("departureDate", e.target.value)
                                }
                            />
                            {errors.departureDate && (
                                <p className="text-sm text-destructive">
                                    {errors.departureDate}
                                </p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="image-url">Image URL</Label>
                            <Input
                                id="image-url"
                                type="url"
                                className={fieldClass}
                                placeholder="https://example.com/image.jpg"
                                value={form.imageUrl}
                                aria-invalid={!!errors.imageUrl}
                                onChange={(e) =>
                                    update("imageUrl", e.target.value)
                                }
                            />
                            {errors.imageUrl && (
                                <p className="text-sm text-destructive">
                                    {errors.imageUrl}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                rows={7}
                                className={`${fieldClass} min-h-40 py-2.5`}
                                placeholder="Describe the travel experience..."
                                value={form.description}
                                aria-invalid={!!errors.description}
                                onChange={(e) =>
                                    update("description", e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col items-end gap-3 border-t-0 bg-transparent pt-2">
                        {submitted && (
                            <p
                                role="status"
                                className="w-full text-sm text-[#16A1C0]"
                            >
                                Travel package added successfully!
                            </p>
                        )}

                        <div className="flex w-full justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="h-10 border-destructive/40 px-5 text-destructive hover:border-destructive/60 hover:bg-destructive/10 hover:text-destructive"
                                onClick={handleCancel}
                            >
                                <Trash2Icon data-icon="inline-start" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                className="h-10 bg-[#16A1C0] px-5 text-white hover:bg-[#0f8ba8]"
                            >
                                <SaveIcon data-icon="inline-start" />
                                Add Travel Package
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
};

export default AddDestinationPage;
