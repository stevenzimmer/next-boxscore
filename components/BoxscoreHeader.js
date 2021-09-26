import BoxscoreBox from "./BoxscoreBox";
export default function BoxscoreHeader(props) {
    return (
        <div className="flex items-center">
            <BoxscoreBox boxed={false} input={""} />
            {props.scores.map((score, i) => {
                return <BoxscoreBox key={i} boxed={false} input={i + 1} />;
            })}
            {props.league === "MLB" && (
                <>
                    <BoxscoreBox input={"R"} />
                    <BoxscoreBox input={"H"} />
                    <BoxscoreBox input={"E"} />
                </>
            )}
        </div>
    );
}
