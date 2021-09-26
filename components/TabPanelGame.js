import { useContext } from "react";
import { Typography, Box, Grid } from "@mui/material";
import TabPanelTeam from "./TabPanelTeam";

import VisibilityIcon from "@mui/icons-material/Visibility";
import AuthContext from "@/context/AuthContext";
export default function TabPanelGame({ game }) {
    const { activeBoxscoreID, setActiveBoxscoreID, setTransitioning } =
        useContext(AuthContext);
    return (
        <Box
            onClick={() => {
                setActiveBoxscoreID(game.id);
                //
            }}
            key={game.id}
            className={`w-full transition duration-200 rounded border-t border-b py-6 hover:bg-grey-200 bg-grey-100  cursor-pointer
                    ${
                        activeBoxscoreID === game.id
                            ? "bg-white shadow-inner"
                            : ""
                    }
                        `}
        >
            <Grid container justifyContent="center">
                <Grid item xs={11} md={7}>
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            {game.info.teams.map((team, j) => {
                                return (
                                    <TabPanelTeam
                                        key={j}
                                        winnerIndex={game.info.winnerIndex}
                                        team={team}
                                        teamIndex={j}
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="center">
                                {game.info.status === "completed"
                                    ? "Final"
                                    : "In progress"}
                                {activeBoxscoreID === game.id && (
                                    <VisibilityIcon className="ml-2" />
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
