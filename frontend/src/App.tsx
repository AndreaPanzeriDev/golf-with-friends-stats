import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

function App() {
  const [count, setCount] = useState(0)
  const {t} = useTranslation('common');
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>
      {t('welcome')}
      </p>
      <h1>Vite + React</h1>
      <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-lg shadow-md border border-green-200">
        <h2 className="text-xl font-bold mb-2">Tailwind Verification</h2>
        <p>If you see this green box with styled text, Tailwind CSS is working correctly!</p>
      </div>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p className='font-bold'>
          Edit <code>src/App.tsx</code> and save to test HMR <i>fuck you Tony</i>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
