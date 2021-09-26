import BoxscoreRow from "@/components/BoxscoreRow";
export default function Boxscore(props) {
    return (
        <div className="flex items-center justify-center mb-12">
            <div>
                {props.teams.map((team, i) => {
                    // console.log("team", team);
                    return (
                        <BoxscoreRow
                            {...props}
                            key={i}
                            stats={team.stats}
                            abbreviation={team.name.abbreviation}
                            scores={team.scores}
                            isAway={i === 0 ? true : false}
                            isWinner={i === parseInt(props.winnerIndex)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
