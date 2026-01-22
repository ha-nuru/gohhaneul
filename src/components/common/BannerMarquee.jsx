export default function BannerMarquee({
  wrapperClassName,
  itemClassName,
  text,
  count
}) {
  return (
    <div className={wrapperClassName}>
      <div className="banner_inner _Default about-marquee">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={`${itemClassName}-${i}`}
            className={itemClassName}
            aria-hidden="true"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

