import { Typography, Box } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
export default function TabPanelTeam({ winnerIndex, team, teamIndex }) {
    return (
        <Box key={teamIndex}>
            <div
                className={`mb-2 last:mb-0 flex ${
                    parseInt(winnerIndex) === teamIndex ? "font-semibold" : ""
                }
`}
            >
                <Typography
                    sx={{
                        fontWeight:
                            parseInt(winnerIndex) === teamIndex ? "600" : "400",
                    }}
                >
                    {team.name.abbreviation}
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "10px",
                        fontWeight:
                            parseInt(winnerIndex) === teamIndex ? "600" : "400",
                    }}
                >
                    {team.scores.reduce((a, b) => a + b, 0)}
                </Typography>
                {teamIndex === parseInt(winnerIndex) ? <ArrowLeftIcon /> : ""}
            </div>
        </Box>
    );
}
