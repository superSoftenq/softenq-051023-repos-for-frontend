import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Modal from './components/pages/modalPortal/Modal'

function App() {

 
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(0)
  let response = fetch('/api/fr')
    .then(response => response.text());
  console.log(response);
  return (
    <>

      <div>
        <button onClick={() => setOpen(true)}> Открыть или закрыть</button>
        <Modal 
        children = '123'
        open = {open}
        onClose = {()=> setOpen(false)}/>
      </div>
    </>
  )
}

export default App
