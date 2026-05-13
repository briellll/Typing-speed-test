import {useEffect, useState } from "react"
import HeaderStats from "./components/HeaderStats"
import StartScreen from "./components/StartScreen"
import TypingArea from "./components/TypingArea";
import ResultScreen from "./components/ResultScreen";
import textBank from './utils/textBank.json';


function App() {

    const getRandomText = (level) =>{
        const texts = textBank[level];
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    };



    const [gamePhase, setGamePhase] = useState('start');

    const [wpm,setWpm] = useState(0);
    const [accuracy,setAccuracy] = useState(0);
    const [timeLeft,setTimeLeft] = useState(60);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [bestwpm,setBestWpm] = useState(()=>{
        const savedBest = localStorage.getItem('bestWpm');
        return savedBest ? parseInt(savedBest, 10) : 0;
    });
    const [recordType,setRecordType] = useState('none');
    const [difficulty, setDifficulty] = useState('Hard');
    const [mode, setMode] = useState('Timed(60s)');
    const [currentText, setCurrentText] = useState(()=> getRandomText('Hard') )


    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
        handleRestart(mode, newDifficulty);
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        handleRestart(newMode);
    };


    useEffect(()=>{
        if (gamePhase === 'finished'){
            const currentBest = localStorage.getItem('bestWpm');
            const parsedBest = currentBest ? parseInt(currentBest, 10) : 0;

            setTimeout(()=>{
                if (currentBest === null){
                localStorage.setItem('bestWpm', wpm.toString());
                setBestWpm(wpm);
                setRecordType('baseline');
            } else if (wpm > parsedBest){
                localStorage.setItem('bestWpm', wpm.toString());
                setBestWpm(wpm);
                setRecordType('smashed');
            } else {
                setRecordType('none');
            }

            },0);

        }
    }, [gamePhase, wpm]);

        useEffect(()=> {
        let intervalId;



        if (gamePhase === 'playing' && timeLeft > 0 && mode === 'Timed(60s)'){

            intervalId = setInterval(()=> {
                setTimeLeft((prevtime)=> prevtime - 1);
            }, 1000);

        }

        else if ( gamePhase === 'playing' && mode === 'Passage'){
            intervalId = setInterval(()=>{
                setTimeLeft((prevtime)=> prevtime + 1);
            },1000);
        }

        else if (timeLeft === 0 && gamePhase === 'playing'){
            setTimeout(() => {
        setGamePhase('finished');
      }, 0);
    }

        return () => clearInterval(intervalId);


    }, [gamePhase,timeLeft,mode]);

    const handleRestart = ( currentMode = mode, currentDifficulty = difficulty ) => {
        setGamePhase('start');
        setWpm(0);
        setAccuracy(0);
        setCorrectChars(0);
        setIncorrectChars(0);

        setCurrentText(getRandomText(currentDifficulty));

        if (currentMode ==='Timed(60s)') {
            setTimeLeft(60);
        }

        else if (currentMode === 'Passage'){
            setTimeLeft(0)
        }


    };

    const handleUpdateStats = (newWpm, newAccuracy, correct, incorrect) => {
        setWpm(newWpm);
        setAccuracy(newAccuracy);
        setCorrectChars(correct);
        setIncorrectChars(incorrect);
    }

    const handleTextComplete = () => {
        setGamePhase('finished');
    }


    const timeElapsed = mode === 'Timed(60s)' ? 60 - timeLeft : timeLeft;

  return (
    <div className=" bg-neutral-900 min-h-screen p-4 w-full flex justify-center " >
        <div className=" w-full max-w-sm md:max-w-3xl lg:max-w-5xl ">

            <HeaderStats
                time={timeLeft}
                wpm={wpm}
                accuracy={accuracy}
                gamePhase={gamePhase}
                bestWpm={bestwpm}
                difficulty={difficulty}
                mode={mode}
                onDifficultyChange={handleDifficultyChange}
                onModeChange={handleModeChange}
            />

            {gamePhase !== 'finished' && (
                <hr className=" border-neutral-500 " />
            )}

            {gamePhase === 'start' && (
                <StartScreen
                onStartTest={() => setGamePhase('playing')}
                textToType={currentText}
                />
            )}

            {gamePhase ==='playing' && (
                <TypingArea
                onRestart={handleRestart}
                timeElapsed={timeElapsed}
                onUpdateStats={handleUpdateStats}
                onComplete={handleTextComplete}
                textToType={currentText}
                />
            )}

            {gamePhase ==='finished' && (
                <ResultScreen
                wpm={wpm}
                accuracy={accuracy}
                onRestart={handleRestart}
                incorrectChars = {incorrectChars}
                correctChars = {correctChars}
                recordType = {recordType}
                />
            )}


        </div>
    </div>
  )
}

export default App
