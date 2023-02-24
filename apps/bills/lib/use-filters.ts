import { useRouter } from 'next/router';
import { useState } from 'react';

import { BillType } from './bill.model';
import { queryString } from './utils';

export const useFilters = () => {
  const router = useRouter();
  const { type: typeParam, filter: filterParam } = router.query;
  const [filters, setFilters] = useState<{ type: BillType; filter: string }>({
    type: typeParam
      ? (String(typeParam).toUpperCase() as BillType)
      : BillType.MONTHLY,
    filter: filterParam ? (filterParam as string) : 'all',
  });
  const [query, setQuery] = useState<string>(() => {
    const query = Object.keys(filters).includes('type')
      ? { ...filters, type: filters.type.toLowerCase() }
      : filters;

    return queryString(query);
  });

  const onFiltersChange = (filters: { type: BillType; filter: string }) => {
    setFilters(filters);

    const query = Object.keys(filters).includes('type')
      ? { ...filters, type: filters.type.toLowerCase() }
      : filters;

    setQuery(queryString(query));

    router.push(router.asPath, { query }, { shallow: true });
  };

  return { filters, query, onFiltersChange };
};

export default useFilters;
