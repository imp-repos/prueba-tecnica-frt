import { useState, useEffect } from 'react';
import type { Meta } from '../types/dashboard';

export function useDashboardFilters(meta?: Meta) {
  const [marcaId, setMarcaId] = useState('todas');
  const [plataformaId, setPlataformaId] = useState('todas');
  const [mesId, setMesId] = useState('');

  useEffect(() => {
    if (meta?.mesDefault && !mesId) {
      setMesId(meta.mesDefault);
    }
  }, [meta, mesId]);

  return {
    marcaId,
    setMarcaId,
    plataformaId,
    setPlataformaId,
    mesId,
    setMesId
  };
}
