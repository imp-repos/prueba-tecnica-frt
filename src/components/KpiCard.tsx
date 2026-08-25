import './KpiCard.scss';
import { Badge } from './ui/Badge';
import { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  subtext: ReactNode;
  variation: number;
}

export function KpiCard({ title, value, subtext, variation }: KpiCardProps) {
  return (
    <div className="kpi-card">
      <div className="kpi-card__header">
        <h3 className="kpi-card__title">{title}</h3>
        <Badge value={variation} />
      </div>
      <div className="kpi-card__body">
        <div className="kpi-card__value">{value}</div>
        <div className="kpi-card__subtext">{subtext}</div>
      </div>
    </div>
  );
}
