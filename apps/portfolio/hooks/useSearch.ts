import { StyleguideData } from '@/data/styleguide.data';
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

export function useSearch(
  searchInput,
  data: StyleguideData[]
): StyleguideData[] {
  const [results, setResults] = useState<StyleguideData[]>();

  useEffect(() => {
    // Must search for at least 2 characters
    if (searchInput === '' || searchInput.length < 2) {
      setResults(data);
      return;
    }

    const results = cloneDeep(data);
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

    const filteredResults = results.filter(
      (result: StyleguideData, index: number) => {
        const filteredSections = result.sections.filter((section) => {
          const { children, ...props } = section.props;
          const match = Object.entries(props).some(([key, prop]) => {
            if (Array.isArray(prop)) {
              const filteredItems = prop.filter((item) => {
                const value = isValidElement(item)
                  ? map(item, (el) => toString(el))
                  : toString(item);
                return contains(value);
              });
              if (filteredItems.length > 0) {
                section.props[key] = filteredItems;
              }
              return filteredItems.length > 0;
            }

            return contains(prop);
          });

          return match || contains(toString(children));
        });

        if (filteredSections.length > 0) {
          result.sections = filteredSections;
        }

        return contains(result.title) || filteredSections.length > 0;
      }
    );

    setResults(filteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return results;
}
