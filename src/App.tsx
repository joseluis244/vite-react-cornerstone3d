import { useEffect,  useRef } from "react"
import { RenderingEngine, Enums, Types} from "@cornerstonejs/core"
import {init as csRenderInit} from "@cornerstonejs/core"
import {init as csToolsInit} from "@cornerstonejs/tools"
import {init as dicomImageLoaderInit} from "@cornerstonejs/dicom-image-loader"
import { CreateFromFile } from "./lib/createFromFile"




function App() {
  const elementRef = useRef<HTMLDivElement>(null)
  const running = useRef(false)

  useEffect(() => {
    const setup = async () => {
      if (running.current) {
        return
      }
      running.current = true
      
      csRenderInit()
      csToolsInit()
      dicomImageLoaderInit({maxWebWorkers:1})
      const stack = await CreateFromFile()
      // Instantiate a rendering engine
      const renderingEngineId = "myRenderingEngine"
      const renderingEngine = new RenderingEngine(renderingEngineId)
      const viewportId = "CT"


      const viewportInput = {
        viewportId,
        type: Enums.ViewportType.STACK,
        element: elementRef.current,
      }

      renderingEngine.enableElement(viewportInput)

      // Get the stack viewport that was created
      const viewport = renderingEngine.getViewport(viewportId) as Types.IStackViewport
      await viewport.setStack(stack)
      viewport.render();
    }

    setup()

    // Create a stack viewport
  }, [elementRef, running])

  return (
    <div
      ref={elementRef}
      style={{
        width: "512px",
        height: "512px",
        backgroundColor: "#000",
      }}
    ></div>
  )
}

export default App