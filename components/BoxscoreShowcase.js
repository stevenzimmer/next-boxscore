import { Fragment } from "react";
import { Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
export default function BoxscoreShowcase(props) {
    // console.log("boxscore showcase", props);
    return (
        <div className="flex flex-wrap md:justify-center  items-center py-12">
            {props.teams.map((team, i) => {
                return (
                    <Fragment key={team.name.abbreviation}>
                        <div className="w-full md:w-2/5">
                            <div className="md:text-center">
                                <div
                                    className={`flex items-center md:justify-center ${
                                        i % 2 === 0 ? "lg:flex-row-reverse" : ""
                                    }`}
                                >
                                    <div
                                        className={`transform origin-center w-12 ${
                                            parseInt(props.winnerIndex) !== 0
                                                ? `rotate-180`
                                                : ``
                                        }`}
                                    >
                                        {i === parseInt(props.winnerIndex) ? (
                                            <ArrowLeftIcon
                                                color="success"
                                                fontSize="large"
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="px-6 w-64 text-left">
                                        <Typography
                                            component="h4"
                                            variant="h4"
                                            sx={{
                                                fontSize: ["20px", "32px"],
                                                fontWeight: 600,
                                                opacity:
                                                    i ===
                                                    parseInt(props.winnerIndex)
                                                        ? ""
                                                        : ".7",
                                            }}
                                        >
                                            {team.name.full}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            component="h4"
                                            variant="h1"
                                            sx={{
                                                fontSize: [
                                                    "32px",
                                                    "64px",
                                                    "72px",
                                                ],
                                                fontWeight: 600,
                                                opacity:
                                                    i ===
                                                    parseInt(props.winnerIndex)
                                                        ? ""
                                                        : ".7",
                                            }}
                                        >
                                            {team.scores.reduce(
                                                (a, b) => a + b,
                                                0
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {i === 0 && (
                            <div className="w-full md:w-1/5 text-right md:text-center">
                                <Typography>
                                    {props.status === "completed"
                                        ? "Final"
                                        : "In Progress"}
                                </Typography>
                                {/* <Typography>
                                    Last updated: {props.lastUpdated}
                                </Typography> */}
                            </div>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}
