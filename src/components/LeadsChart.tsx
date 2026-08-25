import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { PanelCard } from './ui/PanelCard';
import './LeadsChart.scss';

interface LeadsData {
  mes: string;
  fullMesId: string;
  leads: number;
  display: string;
}

interface LeadsChartProps {
  data: LeadsData[];
  selectedMesId: string;
}

const colors = [
  '#c9d2f4',
  '#9daceb',
  '#6e82e1',
  '#3a5ad7',
  '#2a43a8',
  '#1b2c72'
];

export function LeadsChart({ data, selectedMesId }: LeadsChartProps) {
  return (
    <PanelCard title="Leads Mensuales" subtitle="Últimos 6 meses" className="leads-chart-card">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="mes" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#a6a6a6' }} 
            dy={10} 
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            formatter={(value: number) => [value, 'Leads']}
          />
          <Bar dataKey="leads" radius={[4, 4, 0, 0]} maxBarSize={70}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                // Opacidad completa para el mes seleccionado o si no se quiere destacar nada, todos llenos
                opacity={entry.fullMesId === selectedMesId ? 1 : 0.75}
              />
            ))}
            <LabelList 
              dataKey="display" 
              position="top" 
              fill="#737373" 
              fontSize={11} 
              offset={8} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </PanelCard>
  );
}
