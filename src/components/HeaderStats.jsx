import DropDown from './Dropdown';
import logoSmallImg from '../assets/images/logo-small.svg';
import iconPersonalBest from '../assets/images/icon-personal-best.svg';

const HeaderStats = ({time,wpm,accuracy, gamePhase, bestWpm, difficulty, mode, onDifficultyChange, onModeChange}) => {
    return (
        <div className='flex flex-col gap-6'>

            <div className='flex justify-between items-center px-2 '>
                <span><img src={logoSmallImg} alt="logo" /></span>

                <div className='flex items-center gap-1  font-semibold'>
                    <span className='mr-1'><img src={iconPersonalBest} alt="logo de um troféu" /></span>
                    <div className='text-neutral-500'>Best:</div>
                     <div className=' text-neutral-50 '>{bestWpm}</div>
                </div>
            </div>

            {gamePhase !== 'finished' && (
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6 mt-6 '>
                    <div className='flex justify-center text-center gap-3 text-neutral-200 divide-x divide-neutral-800  '>

                        <div className='px-7 text-xl'>
                            <div className='text-neutral-500'>WPM:</div>
                            <div className='font-bold'>{wpm}</div>
                        </div>

                        <div className='px-7 text-xl'>
                            <div className='text-neutral-500' >Accuracy:</div>
                            <div className='font-bold'>{accuracy}</div>
                        </div>

                        <div className='px-7 text-xl'>
                            <div className='text-neutral-500'>Time:</div>
                            <div className='font-bold'>{time}</div>
                        </div>

                    </div>

                    <div className="flex md:hidden justify-center gap-4 mb-8 ">
                        <DropDown
                            options={['Easy','Medium','Hard']}
                            selectedOption={difficulty}
                            onOptionSelect={onDifficultyChange}
                        />
                        <DropDown
                            options={['Timed(60s)','Passage']}
                            selectedOption={mode}
                            onOptionSelect={onModeChange}
                        />
                    </div>

                    <div className='hidden md:flex items-center gap-6'>
                        <span className='text-neutral-500 text-sm '>Dificuldade:</span>
                        <div className='flex gap-2'>
                            {['Easy','Medium','Hard'].map((opt)=>(
                                <button
                                key={opt}
                                onClick={() => onDifficultyChange(opt)}
                                className={`px-3 py-1 rounded-lg border text-sm transition-colors select-none cursor-pointer ${
                                    difficulty === opt
                                    ? 'border-blue-500 text-blue-500'
                                    : 'border-neutral-500 text-neutral-200 hover:border-neutral-300 hover:bg-neutral-800'
                                }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>



                </div>
          )}
        </div>
    )
}

export default HeaderStats;