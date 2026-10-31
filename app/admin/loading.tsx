export default function Loading() {
  return (
    <main className="px-5 pt-6 max-w-2xl mx-auto animate-pulse">
      <div className="h-3 w-24 bg-noche/10 rounded mb-3" />
      <div className="h-8 w-56 bg-noche/10 rounded mb-6" />
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-noche/10 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-noche/10 rounded-3xl mb-5" />
      <div className="h-64 bg-noche/10 rounded-3xl" />
    </main>
  );
}
