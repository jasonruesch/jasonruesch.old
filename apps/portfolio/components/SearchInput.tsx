import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import { SearchIcon } from '@heroicons/react/solid';

export default function SearchInput({
  className,
  onSearch,
}: {
  className?: string;
  onSearch: (searchInput: string) => void;
}) {
  const router = useRouter();
  const searchInput: string = router.query.q
    ? Array.isArray(router.query.q)
      ? router.query.q[0]
      : router.query.q
    : '';
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = debounce((e) => {
    let query = router.query;
    const searchValue: string = e.target.value;
    // Set the query parameter 'q' to the search value
    if (searchValue) {
      query = { ...query, q: searchValue };
    } else {
      delete query.q;
    }

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      {
        shallow: true,
      }
    );
  }, 300);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchInput;
      onSearch(searchInput);
    }
  }, [searchInput, onSearch]);

  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="focus-within:text-neutral-inverse relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="text-neutral h-5 w-5" aria-hidden="true" />
        </div>
        <input
          ref={searchRef}
          id="search"
          name="search"
          className="focus:border-primary focus:ring-primary placeholder-neutral-inverse border-neutral-border focus:text-on-background block w-full rounded-md border bg-white py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 dark:bg-black sm:text-sm"
          placeholder="Search"
          type="search"
          defaultValue={searchInput}
          onInput={handleSearch}
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}
