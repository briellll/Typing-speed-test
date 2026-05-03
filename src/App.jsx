import { useEffect, useState } from "react"
import HeaderStats from "./components/HeaderStats"
import StartScreen from "./components/StartScreen"
import TypingArea from "./components/TypingArea";
import ResultScreen from "./components/ResultScreen";

function App() {

    const [gamePhase, setGamePhase] = useState('start');

    const [wpm,setWpm] = useState(0);
    const [accuracy,setAccuracy] = useState(0);
    const [timeLeft,setTimeLeft] = useState(60);

        useEffect(()=> {
        let intervalId;

        if (gamePhase === 'playing' && timeLeft > 0){

            intervalId = setInterval(()=> {
                setTimeLeft((prevtime)=> prevtime - 1);
            }, 1000);

        }

        else if (timeLeft === 0 && gamePhase === 'playing'){
            setTimeout(() => {
        setGamePhase('finished');
      }, 0);
    }

        return () => clearInterval(intervalId);


    }, [gamePhase,timeLeft]);

    const handleRestart = () => {
        setGamePhase('start');
        setWpm(0);
        setAccuracy(0);
        setTimeLeft(0);
    };

    const handleUpdateStats = (newWpm, newAccuracy) => {
        setWpm(newWpm);
        setAccuracy(newAccuracy);
    }

  return (
    <div className=" bg-neutral-900 min-h-screen p-4 " >
        <div className=" max-w-sm mx-auto ">

            <HeaderStats
                time={timeLeft}
                wpm={wpm}
                accuracy={accuracy}
            />

            <hr className=" border-neutral-500 " />

            {gamePhase === 'start' && (
                <StartScreen onStartTest={() => setGamePhase('playing')} />
            )}

            {gamePhase ==='playing' && (
                <TypingArea
                onRestart={handleRestart}
                timeLeft={timeLeft}
                onUpdateStats={handleUpdateStats}
                />
            )}

            {gamePhase ==='finished' && (
                <ResultScreen tesete={ () => setGamePhase('start')} />
            )}


        </div>
    </div>
  )
}

export default App
