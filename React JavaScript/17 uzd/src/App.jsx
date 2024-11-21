import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TaskTracker from './components/TaskTracker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TaskTracker />
    </div>
  )
}

export default App
