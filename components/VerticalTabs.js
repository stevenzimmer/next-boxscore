import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";

import { Tabs, Tab, Box } from "@mui/material";

import TabPanel from "./TabPanel";
import TabPanelContainer from "./TabPanelContainer";

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs(props) {
    // console.log("vertical tabs props", props);
    const {
        activeBoxscoreID,
        gameIDs,
        setTransitioning,
        setTransitioningLeague,
    } = useContext(AuthContext);

    const activeLeague = props[activeBoxscoreID].gameInfo.league;

    // const activeGame

    const previews = [];
    gameIDs.forEach((id) => {
        let league = props[id].gameInfo.league;

        previews.push({
            [league]: {
                games: [{ info: props[id].gameInfo, id }],
            },
        });
    });
    let games;
    let league;
    const [value, setValue] = useState(activeLeague);

    const handleChange = (event, newValue) => {
        if (activeLeague !== newValue) {
            setTransitioning(true);
            setTransitioningLeague(newValue);
        } else {
            setTransitioning(false);
        }

        setValue(newValue);
    };
    return (
        <Box className={`h-full w-full  text-left`}>
            
            <Tabs
                // orientation="vertical"
                // variant="fullWidth"
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="League Box Scores"
                // sx={{
                //     borderRight: 1,
                //     borderColor: "divider",
                // }}
                className={`bg-blue-50`}
            >
                {previews.map((preview, i) => {
                    league = Object.keys(preview);
                    return (
                        <Tab
                            key={league[0]}
                            label={league[0]}
                            value={league[0]}
                            {...a11yProps(league[0])}
                        />
                    );
                })}
                
            </Tabs>
            
            {previews.map((preview, i) => {
                league = Object.keys(preview);
                games = preview[league].games;
                // console.log("previews games", games);
                // console.log("league", league[0]);
                return (
                    <TabPanel
                        key={i}
                        value={value}
                        index={league[0]}
                        className="w-full h-full bg-grey-50 shadow-inner"
                    >
                        <TabPanelContainer league={league[0]} games={games} />
                    </TabPanel>
                );
            })}

        </Box>
    );
}
