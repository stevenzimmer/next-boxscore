export default function BoxscoreBox(props) {
    return (
        <div
            className={`px-2 w-6 h-6 md:w-12 md:h-12  flex items-center justify-center ${
                props.classes
            } ${props.boxed ? "border" : ""}`}
        >
            <div className="text-xs sm:text-sm md:text-base">{props.input}</div>
        </div>
    );
}
