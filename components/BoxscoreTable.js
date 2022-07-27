import BoxscoreTableRowNba from "./BoxscoreTableRowNba";
import BoxscoreTableRowMLB from "./BoxscoreTableRowMLB";

const tableHeader = {
    NBA: ["", "MIN", "PTS", "FG", "3PT", "REB"],
    MLB: {
        hitting: ["Hitters", "AB", "R", "H", "RBI", "BB"],
        pitching: ["Pitchers", "IP", "H", "ER", "SO", "PC-ST"],
    },
};

export default function BoxscoreTable(props) {
    return (
        <div className="flex flex-wrap justify-center -mx-6">
            {props.teams.map((team) => {
                return (
                    <div
                        key={team.name.abbreviation}
                        className="w-11/12 lg:w-6/12 px-6 mb-12 lg:mb-0 bg-grey-100 py-6"
                    >
                        {props.league === "NBA" && (
                            <BoxscoreTableRowNba
                                {...team}
                                league={props.league}
                                header={tableHeader[props.league]}
                            />
                        )}

                        {props.league === "MLB" && (
                            <BoxscoreTableRowMLB
                                {...team}
                                league={props.league}
                                header={tableHeader[props.league]}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
