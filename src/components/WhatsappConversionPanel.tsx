import { PanelCard } from './ui/PanelCard';
import './WhatsappConversionPanel.scss';

interface Audiencia {
  hombres: number;
  mujeres: number;
}

interface ConversionCanal {
  canal: string;
  valor: number;
}

interface WhatsappConversionPanelProps {
  audiencia: Audiencia;
  conversion: ConversionCanal[];
}

export function WhatsappConversionPanel({ audiencia, conversion }: WhatsappConversionPanelProps) {
  // Encontramos el valor máximo para que las barras sean proporcionales
  const maxConversion = Math.max(...conversion.map(c => c.valor), 1); // evitamos dividir por cero

  return (
    <PanelCard title="WhatsApp & Conversión" className="whatsapp-panel-card">
      <div className="whatsapp-layout">
        <div className="whatsapp-panel-card__audience">
          <div className="audience-box">
            <span className="audience-box__label">Hombres</span>
            <span className="audience-box__value">{audiencia.hombres}%</span>
          </div>
          <div className="audience-box">
            <span className="audience-box__label">Mujeres</span>
            <span className="audience-box__value">{audiencia.mujeres}%</span>
          </div>
        </div>

        <div className="whatsapp-panel-card__channels">
          <h4 className="channels-title">CONVERSIÓN POR CANAL</h4>
          
          {conversion.map((item, index) => {
            const widthPercent = (item.valor / maxConversion) * 100;
            
            return (
              <div className="channel-item" key={index}>
                <div className="channel-item__info">
                  <span className="channel-name">{item.canal}</span>
                  <span className="channel-value">{item.valor}</span>
                </div>
                <div className="channel-item__progress-bg">
                  <div 
                    className="channel-item__progress-fill" 
                    style={{ width: `${widthPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PanelCard>
  );
}
