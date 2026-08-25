import { useMemo } from 'react';
import type { DashboardData } from '../types/dashboard';
import { filterRegistros } from '../lib/metricsHelpers';

export function useMixMetrics(data: DashboardData | null, marcaId: string, plataformaId: string, mesId: string) {
  return useMemo(() => {
    if (!data || !mesId) return [];

    const currentRegs = filterRegistros(data.registros, marcaId, plataformaId, mesId);
    const totalInversion = currentRegs.reduce((sum, r) => sum + r.inversion, 0);

    const mixData = currentRegs.reduce((acc, r) => {
      const platName = data.filtros.plataformas.find(p => p.id === r.plataforma)?.nombre || r.plataforma;
      if (!acc[platName]) acc[platName] = 0;
      acc[platName] += r.inversion;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(mixData)
      .map(([nombre, valor]) => ({
        nombre,
        valor,
        porcentaje: totalInversion > 0 ? (valor / totalInversion) * 100 : 0
      }))
      .sort((a, b) => b.valor - a.valor);
  }, [data, marcaId, plataformaId, mesId]);
}
