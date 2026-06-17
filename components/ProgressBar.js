export default function ProgressBar({ current, total }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="h-1 bg-gray-100 w-full">
      <div
        className="h-full bg-sage-500 transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
