import './App.scss'
import { Header } from './components/Header'
import { KpiRow } from './components/KpiRow'
import { LeadsChart } from './components/LeadsChart'
import { InvestmentMix } from './components/InvestmentMix'
import { WhatsappConversionPanel } from './components/WhatsappConversionPanel'
import { MetaPacingPanel } from './components/MetaPacingPanel'

import { useDashboardQuery } from './hooks/useDashboardQuery'
import { useDashboardFilters } from './hooks/useDashboardFilters'

import { useKpiMetrics } from './hooks/useKpiMetrics'
import { useLeadsMetrics } from './hooks/useLeadsMetrics'
import { useMixMetrics } from './hooks/useMixMetrics'
import { useGlobalPanels } from './hooks/useGlobalPanels'

export default function App() {
  const { data, loading, error } = useDashboardQuery();
  const { marcaId, setMarcaId, plataformaId, setPlataformaId, mesId, setMesId } = useDashboardFilters(data?.meta);

  const kpis = useKpiMetrics(data, marcaId, plataformaId, mesId);
  const leadsData = useLeadsMetrics(data, marcaId, plataformaId);
  const mixData = useMixMetrics(data, marcaId, plataformaId, mesId);
  const globalPanels = useGlobalPanels(data, marcaId);

  if (loading) return <div className="app__estado">Cargando datos del Dashboard...</div>
  if (error || !data) return <div className="app__estado">Error al cargar la data.</div>
  
  if (!kpis || !globalPanels) return <div className="app__estado">Cargando...</div>

  const mesActual = data.filtros.meses.find(m => m.id === mesId);
  const mesNombre = mesActual ? mesActual.nombre.split(' ')[0] : '';

  return (
    <div className="app">
      <div className="dashboard-layout">
        <Header 
          cliente={data.meta.cliente}
          presupuestoTotal={data.meta.presupuestoTotal}
          marcas={data.filtros.marcas}
          plataformas={data.filtros.plataformas}
          meses={data.filtros.meses}
          marcaId={marcaId}
          setMarcaId={setMarcaId}
          plataformaId={plataformaId}
          setPlataformaId={setPlataformaId}
          mesId={mesId}
          setMesId={setMesId}
        />
        
        <KpiRow 
          kpis={kpis} 
          costoPorConversacion={globalPanels.costoPorConversacion} 
        />
        
        <div className="dashboard-grid">
          <LeadsChart 
            data={leadsData} 
            selectedMesId={mesId} 
          />
          <InvestmentMix 
            data={mixData} 
          />
          <WhatsappConversionPanel 
            audiencia={globalPanels.audiencia} 
            conversion={globalPanels.conversionPorCanal} 
          />
          <MetaPacingPanel 
            mesNombre={mesNombre}
            pacing={globalPanels.pacing}
          />
        </div>
      </div>
    </div>
  )
}
