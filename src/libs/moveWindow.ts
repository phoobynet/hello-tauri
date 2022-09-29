import { window as appWindow } from '@tauri-apps/api'
import { WebviewWindow } from '@tauri-apps/api/window'

/**
 * Sets the initial position of the window.  This should be removed for builds
 * @param currentWindow
 * @param newPosition
 * @param newSize
 */
export const moveWindow = async (
  currentWindow: WebviewWindow,
  newPosition: { x: number; y: number },
  newSize: { width: number; height: number },
): Promise<void> => {
  const w = await appWindow.getCurrent()
  const currentPosition = await w.innerPosition()
  currentPosition.x = newPosition.x
  currentPosition.y = newPosition.y
  await currentWindow.setPosition(currentPosition)

  const currentSize = await w.innerSize()
  currentSize.width = newSize.width
  currentSize.height = newSize.height
  await currentWindow.setSize(currentSize)
}
