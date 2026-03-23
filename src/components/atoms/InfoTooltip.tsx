import Tooltip from "./Tooltip";

type InfoTooltipSize = "sm" | "md" | "lg";

interface InfoTooltipProps {
  size?: InfoTooltipSize;
  tooltip?: string;
  className?: string;
}

const sizeMap: Record<InfoTooltipSize, number> = {
  sm: 18,
  md: 24,
  lg: 28,
};

function InfoIcon({ size = "md", className = "" }: { size?: InfoTooltipSize; className?: string }) {
  const px = sizeMap[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block opacity-50 hover:opacity-80 transition-opacity duration-150 ${className}`}
    >
      <circle cx="11" cy="11" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 10v5M11 7.5v.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InfoTooltip({ size = "md", tooltip, className = "" }: InfoTooltipProps) {
  if (tooltip) {
    return (
      <Tooltip content={tooltip} position="top" align="center">
        <InfoIcon size={size} className={className} />
      </Tooltip>
    );
  }

  return <InfoIcon size={size} className={className} />;
}

export default InfoTooltip;
