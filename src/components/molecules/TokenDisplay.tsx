type Token = "USDY" | "OUSG" | "USST" | "STBL" | "ETH" | "BNB";
type TokenDisplaySize = "sm" | "md";

interface TokenDisplayProps {
  token: Token;
  size?: TokenDisplaySize;
  className?: string;
}

const tokenColors: Record<Token, string> = {
  USDY: "bg-purple-500",
  OUSG: "bg-purple-400",
  USST: "bg-purple-500",
  STBL: "bg-accent",
  ETH: "bg-blue-500",
  BNB: "bg-yellow-500",
};

const sizeStyles: Record<TokenDisplaySize, { circle: string; text: string }> = {
  sm: { circle: "w-5 h-5", text: "text-sm" },
  md: { circle: "w-7 h-7", text: "text-base" },
};

export function TokenDisplay({
  token,
  size = "md",
  className = "",
}: TokenDisplayProps) {
  const styles = sizeStyles[size];
  const color = tokenColors[token];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`${styles.circle} ${color} rounded-full flex items-center justify-center`}
      >
        <span className="text-white text-[10px] font-bold">
          {token.charAt(0)}
        </span>
      </div>
      <span className={`${styles.text} font-medium text-black-500`}>
        {token}
      </span>
    </div>
  );
}

export default TokenDisplay;
