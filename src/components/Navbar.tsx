import Image from "next/image";
import Link from "next/link";
import { User, type LucideIcon } from "lucide-react";
import { cn } from "cn";

type NavLink = {
  label: string;
  href: string;
  active?: boolean;
  icon?: LucideIcon;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

const authLinks: NavLink[] = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="relative flex h-14 items-center bg-white px-6 shadow-sm">
        {/* Primary nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-base transition-colors hover:text-[#16A1C0]",
                  link.active
                    ? "text-[#16A1C0] underline underline-offset-4"
                    : "text-neutral-900"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Wanderlast home"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={163}
            height={24}
            priority
            className="h-6"
            style={{ width: "auto" }}
          />
        </Link>

        {/* Auth links */}
        <ul className="ml-auto flex items-center gap-8">
          {authLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-base text-neutral-900 transition-colors hover:text-[#16A1C0]"
                >
                  {Icon ? <Icon className="size-[18px]" aria-hidden /> : null}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
