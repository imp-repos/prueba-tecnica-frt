import './Badge.scss';

interface BadgeProps {
  value: number;
}

export function Badge({ value }: BadgeProps) {
  const isPositive = value >= 0;
  const formattedValue = Math.abs(value).toFixed(1) + '%';
  const typeClass = isPositive ? 'badge--positive' : 'badge--negative';
  
  // Usamos una flecha o tilde para representar la variación
  const icon = isPositive ? '↗' : '↘';

  return (
    <span className={`badge ${typeClass}`}>
      <span className="badge__icon">{icon}</span>
      <span className="badge__text">{isPositive ? '+' : '-'}{formattedValue}</span>
    </span>
  );
}
