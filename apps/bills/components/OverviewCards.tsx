export interface OverviewCardProps {
  cards: {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    value: React.ReactNode;
  }[];
}

export function OverviewCards({ cards }: OverviewCardProps) {
  return (
    <>
      {cards.map((card) => (
        <div
          key={card.name}
          className="overflow-hidden rounded-lg bg-white shadow"
        >
          <div className="p-5">
            <div className="flex">
              <div className="flex-shrink-0 pt-3">
                <card.icon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {card.name}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {card.value}
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
