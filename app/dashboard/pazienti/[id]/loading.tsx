import { Skeleton } from '@/components/shadcn/ui/skeleton'

export default function PatientDetailLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Back button */}
      <Skeleton className="h-8 w-36" />

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <Skeleton className="size-16 rounded-full sm:size-20" />
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24" />
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4 rounded-lg border p-6">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
