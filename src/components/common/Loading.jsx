export default function Loading({ isVisible = true }) {
  if (!isVisible) return null;
  
  return (
    <div className="loading">
      <div className="load_emoji" />
    </div>
  );
}

