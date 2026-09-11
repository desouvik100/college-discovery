import Link from "next/link";
import Button from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">{description}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center justify-center rounded-md font-medium text-xs h-8 px-3 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <Button onClick={action.onClick} variant="secondary" size="sm">
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}
