const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="bg-zinc-900 h-20 rounded-xl animate-pulse" />
    ))}
  </div>
);


export default LoadingSkeleton;