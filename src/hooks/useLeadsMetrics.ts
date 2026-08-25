import { useMemo } from 'react';
import type { DashboardData } from '../types/dashboard';
import { filterRegistros } from '../lib/metricsHelpers';

export function useLeadsMetrics(data: DashboardData | null, marcaId: string, plataformaId: string) {
  return useMemo(() => {
    if (!data) return [];
    
    return data.filtros.meses.map(m => {
      const regs = filterRegistros(data.registros, marcaId, plataformaId, m.id);
      const totalLeads = regs.reduce((sum, r) => sum + r.leads, 0);
      return {
        mes: m.corto,
        fullMesId: m.id,
        leads: totalLeads,
        display: totalLeads >= 1000 ? `${(totalLeads / 1000).toFixed(0)}k` : totalLeads.toString()
      };
    });
  }, [data, marcaId, plataformaId]);
}
