import './Header.scss';
import { Select } from './ui/Select';
import type { FiltroItem, MesItem } from '../types/dashboard';

interface HeaderProps {
  cliente: string;
  presupuestoTotal: number;
  marcas: FiltroItem[];
  plataformas: FiltroItem[];
  meses: MesItem[];
  marcaId: string;
  setMarcaId: (val: string) => void;
  plataformaId: string;
  setPlataformaId: (val: string) => void;
  mesId: string;
  setMesId: (val: string) => void;
}

export function Header({
  cliente, presupuestoTotal, marcas, plataformas, meses,
  marcaId, setMarcaId, plataformaId, setPlataformaId, mesId, setMesId
}: HeaderProps) {
  
  const currentMesIdx = meses.findIndex(m => m.id === mesId);
  const currentMesNombre = currentMesIdx >= 0 ? meses[currentMesIdx].nombre.split(' ')[0] : '';

  const handlePrevMes = () => {
    if (currentMesIdx > 0) setMesId(meses[currentMesIdx - 1].id);
  };
  const handleNextMes = () => {
    if (currentMesIdx < meses.length - 1) setMesId(meses[currentMesIdx + 1].id);
  };

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#3A5AD7" strokeWidth="2.5"/>
            <circle cx="12" cy="12" r="4" fill="#3A5AD7"/>
          </svg>
          <h1>{cliente}</h1>
        </div>
        <div className="header__budget">
          <span className="label">Presupuesto Total:</span>
          <span className="value">USD {presupuestoTotal.toLocaleString('en-US')}</span>
        </div>
      </div>
      
      <div className="header__filters">
        <div className="header__brand-selector">
          <Select 
            value={marcaId} 
            options={marcas.map(m => ({ id: m.id, label: m.nombre }))} 
            variant="large" 
            onChange={setMarcaId}
          />
        </div>
        <div className="header__right-filters">
          <div className="month-selector">
            <button 
              className="month-selector__btn" 
              onClick={handlePrevMes} 
              disabled={currentMesIdx <= 0}
            >&lt;</button>
            <span className="month-selector__current">{currentMesNombre}</span>
            <button 
              className="month-selector__btn" 
              onClick={handleNextMes} 
              disabled={currentMesIdx >= meses.length - 1}
            >&gt;</button>
          </div>
          <div className="platform-selector">
            <span className="platform-selector__label">Plataforma</span>
            <Select 
              value={plataformaId} 
              options={plataformas.map(p => ({ id: p.id, label: p.nombre }))} 
              variant="default"
              onChange={setPlataformaId}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
