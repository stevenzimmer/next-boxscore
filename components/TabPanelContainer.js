import { Typography, Box } from "@mui/material";

import TabPanelGame from "./TabPanelGame";
export default function TabPanelContainer({ games, league }) {
    return (
        <Box className="py-12 ">
            <Typography
                align="center"
                variant="h4"
                sx={{ marginBottom: "20px" }}
            >
                {league} scores
            </Typography>
            {games.map((game, i) => {
                return <TabPanelGame key={i} game={game} />;
            })}
        </Box>
    );
}
