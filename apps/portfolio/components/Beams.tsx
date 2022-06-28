export const Beams = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center overflow-hidden">
      <div className="sm-h:!w-[54rem] flex w-[54rem] flex-none justify-end md:w-[81rem] lg:w-[108rem]">
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
};

export default Beams;
