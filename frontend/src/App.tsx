import CaffeineGrid from './components/CaffeineGrid/CaffeineGrid'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#FAFAFA' }}>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-lg">
            ☕
          </div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Caffeine Tracker</h1>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#EBEDF0' }} /> 0mg</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#9BE9A8' }} /> 1-74mg</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#40C463' }} /> 75-149mg</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#30A14E' }} /> 150-249mg</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#216E39' }} /> 250mg+</div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <CaffeineGrid />
        </div>
      </main>
    </div>
  )
}

export default App
