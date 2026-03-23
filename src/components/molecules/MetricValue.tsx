type MetricColor = "purple" | "green" | "black";
type MetricSize = "sm" | "md" | "lg";

interface MetricValueProps {
  value: string;
  label: string;
  color?: MetricColor;
  size?: MetricSize;
  className?: string;
}

const colorStyles: Record<MetricColor, string> = {
  purple: "text-purple-500",
  green: "text-green-500",
  black: "text-black-500",
};

const valueSizeStyles: Record<MetricSize, string> = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
};

const labelSizeStyles: Record<MetricSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function MetricValue({
  value,
  label,
  color = "black",
  size = "md",
  className = "",
}: MetricValueProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span
        className={`font-heading font-medium ${colorStyles[color]} ${valueSizeStyles[size]}`}
      >
        {value}
      </span>
      <span
        className={`font-heading font-light uppercase tracking-wide opacity-70 ${labelSizeStyles[size]}`}
      >
        {label}
      </span>
    </div>
  );
}

export default MetricValue;
