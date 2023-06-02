import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClipLoader } from 'react-spinners'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <Suspense fallback={
    <div className='h-full w-full justify-center items-center text-white/80'>
      <ClipLoader
        color={'#36d7b7'}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      Loading app...
    </div>
  }>
    <App />
  </Suspense>

)
