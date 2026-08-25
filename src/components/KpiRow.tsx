import './KpiRow.scss';
import { KpiCard } from './KpiCard';

interface KpisData {
  inversion: { valor: number; plan: number; porcentajePlan: number; variacion: number };
  mensajes: { valor: number; variacion: number };
  ctr: { valor: number; variacion: number };
  conversaciones: { valor: number; variacion: number };
}

interface KpiRowProps {
  kpis: KpisData;
  costoPorConversacion: number;
}

const formatNumber = (num: number) => num.toLocaleString('en-US');
const formatCurrency = (num: number) => '$' + num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export function KpiRow({ kpis, costoPorConversacion }: KpiRowProps) {
  return (
    <div className="kpi-row">
      <KpiCard 
        title="INVERSIÓN EJECUTADA"
        value={formatCurrency(kpis.inversion.valor)}
        subtext={`de ${formatCurrency(kpis.inversion.plan)} (${kpis.inversion.porcentajePlan.toFixed(1)}%)`}
        variation={kpis.inversion.variacion}
      />
      <KpiCard 
        title="MENSAJES DEL MES"
        value={formatNumber(kpis.mensajes.valor)}
        subtext={`Precio/conv $${costoPorConversacion.toFixed(2)}`}
        variation={kpis.mensajes.variacion}
      />
      <KpiCard 
        title="CTR PROMEDIO"
        value={kpis.ctr.valor.toFixed(1) + '%'}
        subtext="Meta"
        variation={kpis.ctr.variacion}
      />
      <KpiCard 
        title="CONVERSACIONES WHATSAPP"
        value={formatNumber(kpis.conversaciones.valor)}
        subtext="iniciadas"
        variation={kpis.conversaciones.variacion}
      />
    </div>
  );
}
