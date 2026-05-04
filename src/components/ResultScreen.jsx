import iconRestart from '../assets/images/icon-restart.svg';
import iconCompleted from '../assets/images/icon-completed.svg';

const ResultScreen = ({wpm, accuracy, correctChars, incorrectChars ,onRestart}) => {
    return (
        <div className='flex flex-col mt-8'>

            <div className='flex flex-col items-center justify-center gap-6 mt-8    w-full max-w-sm mx-auto'>
                <div>
                    <img src={iconCompleted} alt="finalizado" />
                </div>
                <div className='text-center mb-3 '>
                    <h2 className=' text-2xl font-semibold text-neutral-50 mb-2'>
                        Teste Completo!
                    </h2>
                    <p className=' text-sm text-neutral-400 '>
                        Suas mãos são mais rápidas que um Tabaxi Rogue no nível 20!
                    </p>
                </div>
            </div>

            <div className=' flex flex-col gap-4 '>


                <div className='border border-neutral-500 rounded-lg p-4 '>
                    <div className=' text-neutral-400 text-2xl mb-1 ' >WPM:</div>
                    <div className='text-neutral-50 font-bold text-3xl' >{wpm}</div>
                </div>

                <div className='border border-neutral-500 rounded-lg p-4 '>
                    <div className='text-neutral-400 text-2xl mb-1' >Accuracy:</div>
                    <div className={`text-3xl font-bold ${accuracy < 90 ? 'text-red-500' : 'text-green-500'}`} >{accuracy}%</div>
                </div>

                <div className='border border-neutral-500 rounded-lg p-4 '>
                    <div className=' text-neutral-400 text-2xl mb-1 '>Characters:</div>
                    <div className='text-3xl font-bold'>
                        <span className='text-green-500'>{correctChars}</span>
                        <span className='text-neutral-400'>/</span>
                        <span className='text-red-500'>{incorrectChars}</span>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <button onClick={onRestart} className=" mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-neutral-50 text-neutral-900 rounded-xl font-bold text-lg cursor-pointer hover:bg-neutral-400 transition-colors " >
                    Jogar Novamente
                    <img src={iconRestart} alt="Restart" className=" invert w-5 h-5" />
                    </button>

                </div>


            </div>
        </div>
    )
}

export default ResultScreen;