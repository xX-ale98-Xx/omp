import { Skeleton } from '@/components/shadcn/ui/skeleton'

export default function PazientiLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      {/* Header skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-1 h-4 w-48" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-64 rounded-md" />
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Add card skeleton */}
        <Skeleton className="min-h-[140px] rounded-xl border-2 border-dashed" />

        {/* Patient card skeletons */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-28" />
                <div className="mt-1.5 flex items-center gap-2">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-4 w-6 rounded-full" />
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
