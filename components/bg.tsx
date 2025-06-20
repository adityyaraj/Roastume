export default function Bgpurple({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden text-white">
      {/* Radial Purple Glow */}
      <div className="absolute inset-0 z-0" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Your Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}