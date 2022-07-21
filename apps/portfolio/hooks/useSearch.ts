/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash';
import {
  useState,
  useEffect,
  isValidElement,
  ReactNode,
  Children,
  cloneElement,
} from 'react';

type Options = Partial<{
  maxDepth: number;
  visit: 'breadthFirst' | 'depthFirst';
}>;

function _map<T, C extends ReactNode>(
  children: C | C[],
  fn: (element: ReactNode) => T,
  maxDepth: number,
  depth: number
) {
  return Children.map(children, (child) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isValidElement(child) && child.props.children && depth !== maxDepth) {
      child = cloneElement(child, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        children: _map(child.props.children, fn, maxDepth, depth + 1),
      }) as C;
    }

    return fn(child);
  });
}

function map<T, C extends ReactNode>(
  children: C | C[],
  fn: (element: ReactNode) => T,
  options: Omit<Options, 'visit'> = {}
) {
  const maxDepth = options['maxDepth'] ?? -1;
  return _map(children, fn, maxDepth, 0);
}

export function useSearch(searchInput, data: any[]): any[] {
  const [results, setResults] = useState<any[]>();

  useEffect(() => {
    // Must search for at least 2 characters
    if (searchInput === '' || searchInput.length < 2) {
      setResults(data);
      return;
    }

    const results = cloneDeep(data);

    // ******************************************************
    // Helper methods
    // ******************************************************

    // Split query to words
    const queryParts = searchInput
      .trim()
      .split(' ')
      .map((part) => part.trim().toLowerCase());

    // Check if the value contains any of the words
    const contains = (value) => {
      const text = String(value).toLowerCase();
      if (!text) {
        return false;
      }
      return queryParts.every((part) => text.includes(part));
    };

    // Return the value as a string
    const toString = (value) => {
      if (typeof value === 'object') {
        let values = Object.values(value).filter(
          (v) => v && typeof v === 'string'
        );
        values = values.concat(
          Object.values(value)
            .filter((v) => v && typeof v === 'object')
            .map((v) => {
              return toString(v);
            })
        );
        return values.join(' ').trim();
      }
      return String(value);
    };

    // Filter and return whether the results contain the query
    const filter = ([key, value], originalObject) => {
      if (Array.isArray(value)) {
        const filteredItems = value.filter((item) => {
          if (isValidElement(item)) {
            return (
              Object.entries(item.props).some((v) => filter(v, item.props)) ||
              contains(map(item, (el) => toString(el)))
            );
          }

          return contains(toString(item));
        });

        if (filteredItems.length > 0) {
          originalObject[key] = filteredItems;
          return true;
        }
        return false;
      }

      return contains(value);
    };

    // ******************************************************

    // Filter the results
    const filteredResults = results.filter((result: any) =>
      Object.entries(result).some((value) => filter(value, result))
    );

    setResults(filteredResults);
  }, [searchInput, data]);

  return results;
}
