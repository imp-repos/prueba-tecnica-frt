import { ReactNode } from 'react';
import './PanelCard.scss';

interface PanelCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function PanelCard({ title, subtitle, children, className = '' }: PanelCardProps) {
  return (
    <div className={`panel-card ${className}`}>
      <h3 className="panel-card__title">
        {title} {subtitle && <span className="panel-card__subtitle">| {subtitle}</span>}
      </h3>
      <div className="panel-card__content">
        {children}
      </div>
    </div>
  );
}
