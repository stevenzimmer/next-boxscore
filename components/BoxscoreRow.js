import BoxscoreBox from "./BoxscoreBox";
import BoxscoreHeader from "./BoxscoreHeader";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
export default function BoxscoreRow(props) {
    // console.log("boxscore row", props);
    let scoreTotal = 0;

    // MLB only
    let errorsTotal = 0;
    let hitsTotal = 0;

    // console.log(props.stats);

    // Get MLB totals
    if (props.league === "MLB") {
        props.stats.hitting.forEach(({ hits }) => {
            hitsTotal += hits;
        });

        // Get errors total
        props.stats.fielding.forEach(({ errors }) => {
            errorsTotal += errors;
        });
    }
    return (
        <>
            {/* Boxscore Header */}
            {props.isAway && (
                <>
                    <BoxscoreHeader
                        scores={props.scores}
                        league={props.league}
                    />
                </>
            )}

            <div className="flex items-center">
                <BoxscoreBox input={props.abbreviation} />

                {props.scores.map((score, i) => {
                    scoreTotal += score;
                    return <BoxscoreBox key={i} boxed={true} input={score} />;
                })}
                <BoxscoreBox
                    boxed={true}
                    classes={`bg-grey-100`}
                    input={scoreTotal}
                />
                {props.league === "MLB" && (
                    <>
                        <BoxscoreBox
                            boxed={true}
                            classes={`bg-grey-100`}
                            input={hitsTotal}
                        />
                        <BoxscoreBox
                            boxed={true}
                            classes={`bg-grey-100`}
                            input={errorsTotal}
                        />
                    </>
                )}
                {props.isWinner && <ArrowLeftIcon />}
            </div>
        </>
    );
}
