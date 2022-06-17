export const Beams = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center overflow-hidden">
      <div className="flex w-[108rem] flex-none justify-end">
        <picture>
          <source srcSet="/images/beams/docs@30.avif" type="image/avif" />
          <img
            src="/images/beams/docs@tinypng.png"
            alt=""
            className="w-[71.75rem] max-w-none flex-none dark:hidden"
          />
        </picture>
        <picture>
          <source srcSet="/images/beams/docs-dark@30.avif" type="image/avif" />
          <img
            src="/images/beams/docs-dark@tinypng.png"
            alt=""
            className="hidden w-[90rem] max-w-none flex-none dark:block"
          />
        </picture>
      </div>
    </div>
  );
};

export default Beams;
