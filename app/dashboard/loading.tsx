import { Skeleton } from '@/components/shadcn/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Section Cards skeleton */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="mt-2 h-8 w-32" />
              <div className="mt-4 space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart skeleton */}
        <div className="px-4 lg:px-6">
          <div className="rounded-xl border p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-8 w-48 rounded-md" />
            </div>
            <Skeleton className="mt-4 h-[250px] w-full rounded-md" />
          </div>
        </div>

        {/* Data Table skeleton */}
        <div className="px-4 lg:px-6">
          <div className="rounded-xl border shadow-xs">
            <div className="flex items-center justify-between p-4">
              <Skeleton className="h-8 w-64 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            <div className="space-y-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-t px-4 py-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="ml-auto h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
