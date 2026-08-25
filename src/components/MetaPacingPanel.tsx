import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { PanelCard } from './ui/PanelCard';
import './MetaPacingPanel.scss';

interface Pacing {
  meta: number;
  actual: number;
  faltan: number;
}

interface MetaPacingPanelProps {
  mesNombre: string;
  pacing: Pacing;
}

const COLORS = ['#3a5ad7', '#f5f5f5'];

export function MetaPacingPanel({ mesNombre, pacing }: MetaPacingPanelProps) {
  const pieData = [
    { name: 'Actual', value: pacing.actual },
    { name: 'Faltan', value: pacing.faltan }
  ];

  // Calculamos el porcentaje
  const porcentaje = pacing.meta > 0 ? (pacing.actual / pacing.meta) * 100 : 0;

  return (
    <PanelCard title="Meta & Pacing" subtitle={mesNombre} className="meta-pacing-card">
      <div className="meta-pacing-card__content">
        <div className="meta-pacing-card__stats">
          <div className="stat-box">
            <span className="stat-box__label">Meta</span>
            <span className="stat-box__value">{pacing.meta}</span>
          </div>
          <div className="stat-box">
            <span className="stat-box__label">Actual</span>
            <span className="stat-box__value">{pacing.actual}</span>
          </div>
          <div className="stat-box">
            <span className="stat-box__label">Faltan</span>
            <span className="stat-box__value">{pacing.faltan}</span>
          </div>
        </div>
        
        <div className="meta-pacing-card__chart">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10} 
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-center-text">
              <span className="percentage">{porcentaje.toFixed(0)}%</span>
              <span className="label">de la meta</span>
            </div>
          </div>
        </div>
      </div>
    </PanelCard>
  );
}
