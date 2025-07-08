export default function ComponentsLoading() {
  return (
    <div className="container mx-auto max-w-7xl py-10">
      {/* Header Skeleton */}
      <div className="text-center mb-10">
        <div className="h-10 w-1/3 bg-muted rounded animate-pulse mx-auto" />
        <div className="h-6 w-1/2 bg-muted rounded animate-pulse mx-auto mt-4" />
      </div>

      {/* Components Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 animate-pulse">
            <div className="flex justify-between mb-2">
              <div className="h-5 w-2/3 bg-muted rounded" />
              <div className="h-4 w-12 bg-muted rounded" />
            </div>
            <div className="h-4 w-full bg-muted rounded mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
