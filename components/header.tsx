import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold text-zinc-100 hover:text-indigo-400 transition-colors"
        >
          COT Research
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Posts
          </Link>
          <Link
            href="/about"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
