import { useState } from "react";
import iconDownArrow from "../assets/images/icon-down-arrow.svg";

const DropDown = ({options, selectedOption, onOptionSelect}) => {

    const [isOpen, setIsOpen] = useState(false);


    const handleSelect = (option) => {
        onOptionSelect(option);
        setIsOpen(false);
    };

    return (
        <div className=" relative flex-1 w-full ">

            <button onClick={()=> setIsOpen(!isOpen)}
                className=" w-full flex border border-neutral-500 py-2 rounded-lg text-neutral-200 justify-center px-4 items-center gap-3 text-center hover:bg-neutral-800 transition-colors select-none "
                >
            <span>{selectedOption}</span>
            <span>
                <img src={iconDownArrow} alt="icone de seta para baixo" />
            </span>
            </button>

            {isOpen && (
                <div className="absolute w-full z-2">
                    <ul className=" divide-y divide-neutral-500 flex flex-col text-neutral-200 bg-neutral-800 rounded-md mt-2">
                        {options.map((option)=>(
                            <li className="flex gap-2 p-1 items-center " key={option} onClick={()=> handleSelect(option)}>
                                <div className="flex items-center justify-center w-4 h-4 rounded-full border border-neutral-500" >
                                    {selectedOption === option && (<div className="w-2 h-2 rounded-full bg-blue-500 "></div>)}
                                </div>
                                <span>{option}</span>
                            </li>
                        ))}

                    </ul>
                </div>
            )}

        </div>

    );
};

export default DropDown;