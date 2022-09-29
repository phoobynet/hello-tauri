import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import { window as appWindow } from '@tauri-apps/api'
import { moveWindow } from './libs/moveWindow'

appWindow.primaryMonitor().then(async (monitor) => {
  if (monitor) {
    const currentWindow = appWindow.getCurrent()
    await moveWindow(currentWindow, {
      x: (monitor.size.width / 2) + 20,
      y: 20
    }, {
      width: (monitor.size.width / 2) - 40,
      height: monitor.size.height - 40
    })
  }
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  )
})

