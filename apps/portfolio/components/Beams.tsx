import clsx from 'clsx';

export default function Beams({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'pointer-events-none fixed inset-x-0 bottom-0 -z-10 flex rotate-180 justify-center overflow-hidden',
        className
      )}
    >
      <div className="flex w-[54rem] flex-none justify-end md:w-[81rem] lg:w-[108rem]">
        <picture>
          <source srcSet="/images/beams/docs@30.avif" type="image/avif" />
          <img
            src="/images/beams/docs@tinypng.png"
            alt=""
            className="w-[71.75rem] dark:hidden"
          />
        </picture>
        <picture>
          <source srcSet="/images/beams/docs-dark@30.avif" type="image/avif" />
          <img
            src="/images/beams/docs-dark@tinypng.png"
            alt=""
            className="hidden w-[90rem] dark:block"
          />
        </picture>
      </div>
    </div>
  );
}
