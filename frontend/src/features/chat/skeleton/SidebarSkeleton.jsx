const SidebarSkeleton = () => {
  return (
    <aside className="h-full flex flex-col border border-blue-500 rounded-md p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-300 rounded" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        {/* Filter Skeleton */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Users Skeleton List */}
      <div className="flex-1 overflow-y-auto mt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-full border rounded-md border-blue-200 mt-2 flex items-center gap-3 px-4 py-3"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2 hidden sm:block">
              <div className="h-3 w-28 bg-gray-300 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
