import './App.css'
import Calendar from './components/Calendar'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Dynamic Event Calendar</h1>
        <Calendar />
      </div>

    </>
  )
}

export default App
