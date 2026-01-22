export default function Loading({ isVisible = true }) {
  return (
    <div className={`loading ${!isVisible ? 'fade-out' : ''}`}>
      <div className={`load_imogi ${!isVisible ? 'fade-out' : ''}`} />
    </div>
  );
}

