import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

export default function Home() {
  const [trade, setTrade] = useState<Record<string, unknown>>()

  useEffect(() => {
    listen('trade', (ev) => {
      const { message } = ev.payload as { message: string }
      const trade = JSON.parse(message.replace('\\', ''))
      console.log(trade)
      setTrade(trade)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className={'container mx-auto max-w-6xl'}>
      <header className={'py-5'}>
        <h1 className={'text-4xl font-bold tracking-wider'}>Home</h1>
      </header>
      <div>
        <pre
          style={{
            fontSize: '0.8rem',
          }}
        >
          {JSON.stringify(trade, null, 2)}
        </pre>
      </div>
    </div>
  )
}
