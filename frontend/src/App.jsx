import { useState } from 'react'
import Menu from './components/Menu'
import Chat from './pages/Chat'
import VoiceComponent from './components/VoiceComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex'>
      <Menu />
      <Chat />
      {/* <VoiceComponent/> */}
    </div>
  )
}

export default App
