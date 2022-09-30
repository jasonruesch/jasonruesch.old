/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Observable, isObservable } from 'rxjs';
import { take } from 'rxjs/operators';

interface CustomMatchers<R = unknown> {
  toHaveObservables(key: string[]): R;
  toHaveMethods(keys: string[]): R;
  toEmit<T>(expected: T, selector?: (r: any) => T): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

export function toHaveMethods(target: any, keys: string[]) {
  if (!Array.isArray(keys)) throw new Error(`Expect keys to be a list of properties`);
  const onlyFailed = ({ value }: { value: { pass: boolean } }) => !value.pass;
  const results = keys
    .map((k) => {
      const match = toBeFunction(target, k);
      return { key: k, value: match };
    })
    .filter(onlyFailed);

  const pass = results.length === 0;
  const first: { key?: string; value?: { pass: boolean } } = !pass ? results[0] : {};
  return {
    pass,
    message: () => `expected '${first.key}' ${pass ? 'not' : ''} to be a function`,
  };
}

export function toHaveObservables(target: any, keys: string[]) {
  if (!Array.isArray(keys)) throw new Error(`Expect keys to be a list of observables`);
  const onlyFailed = ({ value }: { value: { pass: boolean } }) => !value.pass;
  const results = keys
    .map((k) => {
      const match = toHaveObservable(target, k);
      return { key: k, value: match };
    })
    .filter(onlyFailed);

  const pass = results.length === 0;
  const first: { key?: string; value?: { pass: boolean } } = !pass ? results[0] : {};
  return {
    pass,
    message: () => `expected '${first.key}' ${pass ? 'not' : ''} to be an observable`,
  };
}

/**
 * Is the target property a Function?
 */
function toBeFunction(target: any, key: string) {
  const pass = typeof target[key] === 'function';
  const actual = typeof target[key];

  return {
    pass,
    actual,
    message: () => `expected '${key}' ${pass ? 'not' : ''} to be a function`,
  };
}

/**
 * Is the target property an Observable?
 */
function toHaveObservable(target: any, key: string) {
  const pass = isObservable(target[key]);
  const actual = typeof target[key];

  return {
    pass,
    actual,
    message: () => `expected '${key}' ${pass ? 'not' : ''} to be an observable`,
  };
}

/**
 * Observable stream to emit first value
 */
function toEmit<R>(this: any, target: Observable<R>, expected: R, selector: (r: any) => R) {
  if (!isObservable(target)) throw new Error(`'target' source is not an Observable`);
  const result: {
    actual?: R;
    pass: boolean;
    message: () => string;
  } = {
    pass: false,
    message: () => `expect first value from stream ${result.pass ? 'not' : ''}to be ${expected}; found ${result.actual}`,
  };
  const subscription = target.pipe(take(1)).subscribe((val) => {
    val = selector ? selector(val) : val;
    result.actual = val;
    result.pass = this.equals(val, expected);
  });
  subscription.unsubscribe();
  return result;
}

/**
 * Custom matcher to check Reactive Store properties as observables
 */
expect.extend({
  toHaveMethods,
  toHaveObservables,
  toEmit,
});
