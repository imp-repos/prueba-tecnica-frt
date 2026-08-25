import type { Registro } from '../types/dashboard';

export const filterRegistros = (registros: Registro[], marcaId: string, plataformaId: string, mesId?: string) => {
  return registros.filter(r => {
    const matchMarca = marcaId === 'todas' || r.marca === marcaId;
    const matchPlataforma = plataformaId === 'todas' || r.plataforma === plataformaId;
    const matchMes = !mesId || r.mes === mesId;
    return matchMarca && matchPlataforma && matchMes;
  });
};

export const getPreviousMonthId = (currentMesId: string, meses: {id: string}[]) => {
  const idx = meses.findIndex(m => m.id === currentMesId);
  return idx > 0 ? meses[idx - 1].id : null;
};

export const calcVar = (curr: number, prev: number) => {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return ((curr - prev) / prev) * 100;
};
