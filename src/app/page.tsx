import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          TripMatch
        </h1>

        <p className="mt-4 text-xl">
          Don&apos;t choose a destination.
          Let the destination choose you.
        </p>

        <Link
          href="/discover"
          className="mt-8 inline-block rounded-xl bg-black px-6 py-3 text-white"
        >
          Find my destination
        </Link>
      </div>
    </main>
  );
}
