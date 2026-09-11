export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-48 bg-slate-200 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 animate-pulse">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                <div className="h-5 bg-slate-200 rounded w-4/5"></div>
              </div>
              <div className="h-6 w-12 bg-slate-200 rounded"></div>
            </div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
