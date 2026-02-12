import { Skeleton } from '@/components/shadcn/ui/skeleton'

export default function NuovoPazienteLoading() {
  return (
    <div className="flex flex-1 flex-col p-4 lg:p-6">
      <div className="mx-auto w-full max-w-3xl">
        <Skeleton className="mb-6 h-8 w-32" />

        <div className="rounded-xl border p-6 shadow-xs">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-80" />

          <div className="mt-8 space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-px w-full" />

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>

            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-px w-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
