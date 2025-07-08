export default function ComponentsLoading() {
  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Components
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover components shared by the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 animate-pulse">
            <div className="flex justify-between items-start mb-2">
              <div className="h-5 w-2/3 bg-muted rounded" />
              <div className="h-4 w-12 bg-muted rounded" />
            </div>
            <div className="h-4 w-full bg-muted rounded mb-2" />
            <div className="h-4 w-3/4 bg-muted rounded mb-3" />
            <div className="flex gap-1">
              <div className="h-5 w-12 bg-muted rounded" />
              <div className="h-5 w-16 bg-muted rounded" />
              <div className="h-5 w-14 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
