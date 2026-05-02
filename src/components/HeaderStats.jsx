
import logoSmallImg from '../assets/images/logo-small.svg';
import iconPersonalBest from '../assets/images/icon-personal-best.svg';

const HeaderStats = () => {
    return (
        <div className='flex flex-col gap-6'>

            <div className='flex justify-between items-center px-2 '>
                <span><img src={logoSmallImg} alt="logo" /></span>

                <div className='flex items-center gap-1  font-semibold'>
                    <span className='mr-1'><img src={iconPersonalBest} alt="logo de um troféu" /></span>
                    <div className='text-neutral-500'>Best:</div>
                     <div className=' text-neutral-50 '>92 WPM</div>
                </div>
            </div>


            <div className='flex justify-center text-center gap-3 text-neutral-200 divide-x divide-neutral-800  '>

                <div className='px-7 text-xl'>
                    <div className='text-neutral-500'>WPM:</div>
                    <div className='font-bold'>0</div>
                </div>
                <div className='px-7 text-xl'>
                    <div className='text-neutral-500' >Accuracy:</div>
                    <div className='font-bold'>100%</div>
                </div>
                <div className='px-7 text-xl'>
                    <div className='text-neutral-500'>Time:</div>
                    <div className='font-bold'>0:60</div>
                </div>

            </div>

            <div>
                
            </div>

        </div>
    )
}

export default HeaderStats;