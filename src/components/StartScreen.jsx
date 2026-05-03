const StartScreen = ({onStartTest}) => {
    return (



            <div className="relative mt-8 cursor-pointer"
            onClick={onStartTest}>

                <div className="text-2xl leading-relaxed text-neutral-400       opacity-50 select-none  blur-sm ">
                        The archaeological expedition unearthed artifacts that complicated prevailing
                        theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli
                        from Afghanistan, and amber from the Baltic—all found in a single...
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <button className=" bg-blue-600 py-5 px-4 rounded-lg hover:bg-blue-400 transition-colors shadow-lg text-neutral-50 font-semibold text-lg   ">
                        Start Typing Test
                    </button>
                    <p className=" mt-2 text-neutral-50 font-medium drop-shadow-md ">
                        Or click the text and start typing
                    </p>
                </div>


            </div>

    )
}

export default StartScreen;