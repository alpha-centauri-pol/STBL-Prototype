export default function CornerBracket({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute w-4 h-4 ${className}`}>
      <div className="w-full h-full border-purple-400 border-l border-t" />
    </div>
  );
}

export function BracketBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group/bracket relative bg-white overflow-visible ${className}`}
    >
      {/* Top-left: moves up-left */}
      <div className="absolute top-0 left-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-top-1 group-hover/bracket:-left-1">
        <div className="w-full h-full border-purple-400 border-l border-t" />
      </div>
      {/* Top-right: moves up-right */}
      <div className="absolute top-0 right-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-top-1 group-hover/bracket:-right-1">
        <div className="w-full h-full border-purple-400 border-r border-t" />
      </div>
      {/* Bottom-left: moves down-left */}
      <div className="absolute bottom-0 left-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-bottom-1 group-hover/bracket:-left-1">
        <div className="w-full h-full border-purple-400 border-l border-b" />
      </div>
      {/* Bottom-right: moves down-right */}
      <div className="absolute bottom-0 right-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-bottom-1 group-hover/bracket:-right-1">
        <div className="w-full h-full border-purple-400 border-r border-b" />
      </div>
      {children}
    </div>
  );
}
