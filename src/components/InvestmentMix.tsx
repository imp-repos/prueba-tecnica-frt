import { PanelCard } from './ui/PanelCard';
import './InvestmentMix.scss';

interface MixData {
  nombre: string;
  valor: number;
  porcentaje: number;
}

interface InvestmentMixProps {
  data: MixData[];
}

const formatCurrency = (num: number) => '$' + num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export function InvestmentMix({ data }: InvestmentMixProps) {
  return (
    <PanelCard title="Mix de inversión digital" className="investment-mix-card">
      <div className="investment-mix-card__header">
        <span className="col-canal">CANAL</span>
        <span className="col-valores">INVERSIÓN <span className="spacing"></span> % TOTAL</span>
      </div>

      <div className="investment-mix-card__list">
        {data.length === 0 && <div style={{color: '#a6a6a6', fontSize: 12}}>No hay datos para este mes.</div>}
        
        {data.map((item, index) => (
          <div className="investment-item" key={index}>
            <div className="investment-item__info">
              <span className="canal-name">{item.nombre}</span>
              <span className="canal-values">
                <span className="value">{formatCurrency(item.valor)}</span>
                <span className="separator">|</span>
                <span className="percentage">{item.porcentaje.toFixed(0)}%</span>
              </span>
            </div>
            <div className="investment-item__progress-bg">
              <div 
                className="investment-item__progress-fill" 
                style={{ width: `${item.porcentaje}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
