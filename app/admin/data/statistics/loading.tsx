import { Skeleton } from "@/components/ui/skeleton"

export default function StatisticsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-6 border rounded-lg">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="h-8 w-16 mt-4" />
              <Skeleton className="h-3 w-32 mt-2" />
            </div>
          ))}
      </div>

      <div>
        <div className="border-b">
          <Skeleton className="h-10 w-full max-w-md mx-auto" />
        </div>
        <div className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-6 border rounded-lg">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48 mt-1" />
                  <Skeleton className="h-[250px] w-full mt-4" />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-6 w-10 mt-1" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-6 w-10 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
