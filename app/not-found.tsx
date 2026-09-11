import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Error 404
        </p>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Institution or Page Not Found
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The requested institution profile or URL does not exist in this catalog or was moved.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded transition-colors"
          >
            ← Return to college directory
          </Link>
        </div>
      </div>
    </div>
  );
}
