import { InfoTooltip } from "@/components/atoms/InfoTooltip";

interface DetailRowProps {
  label: string;
  value: string;
  showInfo?: boolean;
  infoText?: string;
  className?: string;
}

export function DetailRow({
  label,
  value,
  showInfo = false,
  infoText = "More info",
  className = "",
}: DetailRowProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-black-400">{label}</span>
        {showInfo && <InfoTooltip size="sm" tooltip={infoText} />}
      </div>
      <span className="text-sm font-medium text-black-500">{value}</span>
    </div>
  );
}

export default DetailRow;
