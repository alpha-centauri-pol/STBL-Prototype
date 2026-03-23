import { InfoTooltip } from "@/components/atoms/InfoTooltip";

interface StatCardProps {
  value: string;
  label: string;
  showInfo?: boolean;
  infoText?: string;
  className?: string;
}

export function StatCard({
  value,
  label,
  showInfo = false,
  infoText = "More info",
  className = "",
}: StatCardProps) {
  return (
    <div className={`group/bracket relative bg-white overflow-visible ${className}`}>
      {/* Corner brackets — each moves outward on hover */}
      <div className="absolute top-0 left-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-top-1 group-hover/bracket:-left-1">
        <div className="w-full h-full border-purple-400 border-l border-t" />
      </div>
      <div className="absolute top-0 right-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-top-1 group-hover/bracket:-right-1">
        <div className="w-full h-full border-purple-400 border-r border-t" />
      </div>
      <div className="absolute bottom-0 left-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-bottom-1 group-hover/bracket:-left-1">
        <div className="w-full h-full border-purple-400 border-l border-b" />
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4 transition-all duration-200 group-hover/bracket:-bottom-1 group-hover/bracket:-right-1">
        <div className="w-full h-full border-purple-400 border-r border-b" />
      </div>

      <div className="px-6 py-5 flex flex-col gap-1">
        <span className="text-2xl font-heading font-medium text-black-500">
          {value}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-heading font-light uppercase tracking-wide text-black-300">
            {label}
          </span>
          {showInfo && (
            <InfoTooltip size="sm" tooltip={infoText} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
