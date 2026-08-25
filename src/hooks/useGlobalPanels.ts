import { useMemo } from 'react';
import type { DashboardData } from '../types/dashboard';

export function useGlobalPanels(data: DashboardData | null, marcaId: string) {
  return useMemo(() => {
    if (!data) return null;
    
    const key = marcaId;
    const pg = data.panelesGlobales;
    
    const audiencia = pg.audiencia[key] || pg.audiencia['todas'];
    const conversionPorCanal = pg.conversionPorCanal[key] || pg.conversionPorCanal['todas'];
    const pacing = pg.pacing[key] || pg.pacing['todas'];
    const costoPorConversacion = pg.costoPorConversacion[key] || pg.costoPorConversacion['todas'];
    
    return {
      audiencia,
      conversionPorCanal,
      pacing,
      costoPorConversacion
    };
  }, [data, marcaId]);
}
