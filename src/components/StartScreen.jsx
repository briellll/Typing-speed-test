

const StartScreen = ({onStartTest}) => {
    return (



            <div className="relative mt-8 cursor-pointer"
            onClick={onStartTest}
            >

                <div className="text-2xl leading-relaxed text-neutral-400       opacity-50 select-none  blur-sm "
                >
                        The archaeological expedition unearthed artifacts that complicated prevailing
                        theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli
                        from Afghanistan, and amber from the Baltic—all found in a single...
                </div>

            </div>

    )
}

export default StartScreen;