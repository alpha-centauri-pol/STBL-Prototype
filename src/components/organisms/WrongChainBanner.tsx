import { InfoTooltip } from "../atoms/InfoTooltip";

interface WrongChainBannerProps {
  chainName: string;
  message?: string;
  className?: string;
}

export default function WrongChainBanner({
  chainName,
  message,
  className = "",
}: WrongChainBannerProps) {
  const displayMessage =
    message ??
    `MFS is available on ${chainName}. Please switch networks to continue.`;

  return (
    <div
      className={`flex items-center gap-3 bg-purple-100 rounded-lg px-4 py-3 ${className}`}
    >
      <InfoTooltip size="md" className="text-purple-500 flex-shrink-0" />
      <span className="text-sm text-purple-500">{displayMessage}</span>
    </div>
  );
}
