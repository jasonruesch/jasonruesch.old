import { ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface CustomInputProps {
  labelText: string;
  helperText?: string;
  errorText?: string;
  mode?: 'small' | 'large';
}

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  CustomInputProps;

export const Input = ({
  labelText,
  helperText,
  errorText,
  mode,
  ...props
}: InputProps) => {
  // Generate random name if not provided
  const name =
    props.name || props.id || Math.random().toString(36).substring(2, 5);

  return (
    <div
      className={clsx(
        'group relative z-0 w-full',
        errorText ? 'has-error' : ''
      )}
    >
      <input
        {...props}
        className={clsx(
          'peer mt-4 block w-full appearance-none border-0 border-b-2 border-neutral-200 bg-transparent py-1 px-0 text-neutral-700 placeholder-neutral-500 placeholder:opacity-0 focus:border-cyan-500 focus:pr-6 focus:outline-none focus:ring-0 focus:placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-dashed disabled:bg-neutral-50 group-hover:pr-6 group-[.has-error]:border-red-200 group-[.has-error]:pr-6 group-[.has-error]:text-red-700 group-[.has-error]:placeholder-red-500 focus:group-[.has-error]:border-red-700 dark:border-neutral-600 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-violet-400 dark:disabled:bg-neutral-700 dark:group-[.has-error]:border-red-600 dark:group-[.has-error]:text-red-100 dark:group-[.has-error]:placeholder-red-400 dark:focus:group-[.has-error]:border-red-600',
          mode === 'large' ? 'text-3xl font-bold' : '',
          props.className
        )}
        aria-invalid={!!errorText}
        aria-describedby={helperText || errorText ? `${name}-text` : undefined}
      />

      <label
        htmlFor={props.id}
        className={clsx(
          'absolute top-1 origin-[0] -translate-y-5 transform text-xs font-semibold text-neutral-500 duration-300 group-hover:text-neutral-700 group-[.has-error]:text-red-500 group-hover:group-[.has-error]:text-red-700 peer-placeholder-shown:translate-y-0 peer-focus:left-0 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-cyan-500 group-[.has-error]:peer-focus:text-red-700 peer-disabled:cursor-not-allowed dark:text-neutral-300 dark:group-hover:text-neutral-200 dark:group-[.has-error]:text-red-400 dark:group-hover:group-[.has-error]:text-red-300 dark:peer-focus:text-violet-400 dark:group-[.has-error]:peer-focus:text-red-400',
          mode === 'large'
            ? 'peer-placeholder-shown:text-3xl peer-placeholder-shown:font-bold'
            : 'peer-placeholder-shown:text-base peer-placeholder-shown:font-normal'
        )}
      >
        {labelText}
      </label>

      <button
        type="button"
        className="absolute top-1.5 right-0 z-10 hidden items-center focus:flex peer-focus:peer-[&:not(:empty)]:flex group-hover:peer-enabled:peer-[&:not(:empty)]:flex dark:text-neutral-300"
        // onClick={resetField}
      >
        <XCircleIcon className="h-5 w-5" />
      </button>

      <div className="pointer-events-none absolute top-1.5 right-0 hidden items-center group-hover:hidden group-[.has-error]:flex peer-focus:hidden peer-focus:peer-[&:not(:empty)]:!hidden group-hover:peer-enabled:peer-[&:not(:empty)]:!hidden">
        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
      </div>

      <p
        id={`${name}-text`}
        className="h-5 text-xs leading-5 text-neutral-500 group-[.has-error]:text-red-500 dark:text-neutral-300 dark:group-[.has-error]:text-red-300"
      >
        {errorText || helperText}
      </p>
    </div>
  );
};
