import { useEffect, useState, useRef } from "react";
import iconRestart from "../assets/images/icon-restart.svg"

const TypingArea = ({onRestart, timeLeft, onUpdateStats}) => {

    const referenceText = "The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks.";
    const [userInput,setUserInput] = useState('');
    const inputRef = useRef(null);

    useEffect(()=>{
        if (inputRef.current){
            inputRef.current.focus();
        }
    },[]);

    useEffect(()=>{

        if (userInput === 0) return;

        const timeElapsedInSeconds = 60 - timeLeft;
        const timeElapsedInMinutes = timeElapsedInSeconds / 60;

        let currentWpm = 0;
        if (timeElapsedInMinutes > 0) {
            const wordTyped = userInput.length / 5;
            currentWpm = Math.round(wordTyped / timeElapsedInMinutes);
        }

        let correct = 0;
        let incorrect = 0;
        for (let i = 0; i < userInput.length; i++){
            if (userInput[i] === referenceText[i]){
                correct++;
            } else {
                incorrect++;
            }
        }
        const currentAccuracy = userInput.length > 0
      ? Math.round((correct / userInput.length) * 100)
      : 100;

        onUpdateStats(currentWpm, currentAccuracy, correct, incorrect);

    },[userInput,timeLeft, onUpdateStats]);

    const handleInputChange = (e) => {

        setUserInput(e.target.value);
    };

    const renderText = () => {

        return referenceText.split('').map((char,index) => {

            let colorClass = 'text-neutral-500';

            if (index< userInput.length){
                const isCorrect = char === userInput[index];

                colorClass = isCorrect ? 'text-green-500' : "text-red-500 underline decoration-red-500 decoration-2";
            }

            return (
                <span key={index} className={colorClass}>
                    {char}
                </span>
            );

        });

    };

    return (
        <div onClick={()=> inputRef.current?.focus()}>

            <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            maxLength={referenceText.length}
            className=" absolute opacity-0 -z-10 w-0 h-0 "
            />

            <div className=" mt-2 text-2xl leading-relaxed font-medium cursor-text select-none" >
                {renderText()}
            </div>

                <hr className=" border-neutral-500 mt-2" />

            <div className="flex items-center justify-center mt-3">
                <button onClick={onRestart} className=" flex gap-2 rounded-lg bg-neutral-800 py-2 px-4 text-neutral-50 font-bold items-center hover:bg-neutral-500 transition-colors ">
                    Restart Test
                    <img src={iconRestart} alt="icone de restart" />
                </button>
            </div>

        </div>
    );

};

export default TypingArea;