import { useState } from "react"
import HeaderStats from "./components/HeaderStats"
import StartScreen from "./components/StartScreen"

function App() {

    const [gamePhase, setGamePhase] = useState('start');

  return (
    <div className=" bg-neutral-900 min-h-screen p-4 " >
        <div className=" max-w-sm mx-auto ">

            <HeaderStats/>
            <hr className=" border-neutral-500 " />
            {gamePhase === 'start' && (
                <StartScreen onStartTest={() => setGamePhase('playing')} />
            )}



        </div>
    </div>
  )
}

export default App
