export function OverviewCardsSkeleton() {
  const items = Array.from({ length: 3 }, (_, i) => i);

  return (
    <>
      {items.map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-lg bg-white shadow animate-pulse"
        >
          <div className="p-5">
            <div className="flex">
              <div className="flex-shrink-0 pt-3">
                <div className="h-6 w-6 bg-gray-200 rounded-md dark:bg-gray-700"></div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="h-5 flex items-center">
                    <div className="h-3.5 w-full bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </dt>
                  <dd>
                    <div className="h-7 flex items-center">
                      <div className="h-5 w-full bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
