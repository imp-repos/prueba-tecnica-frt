import { useMemo } from 'react';
import type { DashboardData, Registro } from '../types/dashboard';
import { filterRegistros, getPreviousMonthId, calcVar } from '../lib/metricsHelpers';

export function useKpiMetrics(data: DashboardData | null, marcaId: string, plataformaId: string, mesId: string) {
  return useMemo(() => {
    if (!data || !mesId) return null;

    const currentRegs = filterRegistros(data.registros, marcaId, plataformaId, mesId);
    const prevMesId = getPreviousMonthId(mesId, data.filtros.meses);
    const prevRegs = prevMesId ? filterRegistros(data.registros, marcaId, plataformaId, prevMesId) : [];

    const agg = (regs: Registro[]) => regs.reduce((acc, curr) => ({
      inversion: acc.inversion + curr.inversion,
      inversionPlan: acc.inversionPlan + curr.inversionPlan,
      mensajes: acc.mensajes + curr.mensajes,
      conversaciones: acc.conversaciones + curr.conversaciones,
      impresiones: acc.impresiones + curr.impresiones,
      clics: acc.clics + curr.clics,
    }), { inversion: 0, inversionPlan: 0, mensajes: 0, conversaciones: 0, impresiones: 0, clics: 0 });

    const curr = agg(currentRegs);
    const prev = agg(prevRegs);

    const currentCTR = curr.impresiones > 0 ? (curr.clics / curr.impresiones) * 100 : 0;
    const prevCTR = prev.impresiones > 0 ? (prev.clics / prev.impresiones) * 100 : 0;

    return {
      inversion: {
        valor: curr.inversion,
        plan: curr.inversionPlan,
        porcentajePlan: curr.inversionPlan > 0 ? (curr.inversion / curr.inversionPlan) * 100 : 0,
        variacion: calcVar(curr.inversion, prev.inversion)
      },
      mensajes: {
        valor: curr.mensajes,
        variacion: calcVar(curr.mensajes, prev.mensajes)
      },
      ctr: {
        valor: currentCTR,
        variacion: prevCTR === 0 ? (currentCTR > 0 ? 100 : 0) : ((currentCTR - prevCTR) / prevCTR) * 100
      },
      conversaciones: {
        valor: curr.conversaciones,
        variacion: calcVar(curr.conversaciones, prev.conversaciones)
      }
    };
  }, [data, marcaId, plataformaId, mesId]);
}
