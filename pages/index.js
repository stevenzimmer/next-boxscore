import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { API_URL } from "@/config/index";
import Boxscore from "@/components/Boxscore";
import BoxscoreTable from "@/components/BoxscoreTable";
import BoxscoreShowcase from "@/components/BoxscoreShowcase";
import { connectToDatabase } from "@/utils/mongodb";
import BoxscoreShowcasePitching from "@/components/BoxscoreShowcasePitching";

import { Grid, Paper, Container, Typography, Box } from "@mui/material";

import VerticalTabs from "@/components/VerticalTabs";

import AuthContext from "@/context/AuthContext";

export default function Home({ returnedCollections }) {
    const {
        activeBoxscoreID,
        transitioning,
        transitioningLeague,
        setTransitioning,
        pitchingStats,
    } = useContext(AuthContext);

    const [boxscoreData, setBoxscoreData] = useState(
        returnedCollections[activeBoxscoreID].gameInfo
    );

    console.log("boxscore data", boxscoreData);

    useEffect(() => {
        setBoxscoreData(returnedCollections[activeBoxscoreID].gameInfo);
        setTransitioning(false);
        console.log(pitchingStats);
    }, [activeBoxscoreID]);

    if (!boxscoreData) {
        return "...Loading";
    }

    return (
        <>
            <Head>
                <title>
                    {transitioning
                        ? `Select a boxscore`
                        : `${boxscoreData.teams
                              .map((team, i) => {
                                  return team.name.abbreviation;
                              })
                              .join(" @ ")} | ${boxscoreData.league} boxscore`}
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />

                {/* <meta
                    name="description"
                    content={`${boxScores[winningTeamIndex].team_name.id}`}
                /> */}
                <link
                    rel="icon"
                    href={`/favicon-${boxscoreData.league.toLowerCase()}.png`}
                />
            </Head>
            <Grid container component="section" className="section">
                <Grid item xs={12} sm={12} md={3} className="relative">
                    <VerticalTabs {...returnedCollections} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={9}
                    component={Paper}
                    className=""
                >
                    <Container maxWidth="xl" className="py-12 h-full  ">
                        {!transitioning ? (
                            <>
                                <BoxscoreShowcase
                                    {...boxscoreData}
                                    lastUpdated={
                                        returnedCollections[activeBoxscoreID]
                                            .lastUpdated
                                    }
                                />

                                <Boxscore {...boxscoreData} />
                                {returnedCollections[activeBoxscoreID].gameInfo
                                    .league === "MLB" && (
                                    <BoxscoreShowcasePitching
                                        {...boxscoreData}
                                    />
                                )}

                                <BoxscoreTable {...boxscoreData} />
                            </>
                        ) : (
                            <Box className="flex h-screen w-full justify-center items-center bg-black bg-opacity-25">
                                <Typography variant="h3" align="center">
                                    Select an {transitioningLeague} boxscore
                                </Typography>
                            </Box>
                        )}
                        {/* <SwipeableEdgeDrawer /> */}
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}
export async function getServerSideProps(context) {
    const gameIDs = [
        "6c974274-4bfc-4af8-a9c4-8b926637ba74",
        "eed38457-db28-4658-ae4f-4d4d38e9e212",
    ];
    const { db } = await connectToDatabase();
    const boxscoresCollection = db.collection("Collection");

    let gameObjects = {};
    let itemExists = {};
    let res = {};
    let result = {};

    for (let i = 0; i < gameIDs.length; i++) {
        itemExists = await boxscoresCollection.findOne({
            gameID: gameIDs[i],
        });

        let currentTime = Math.round(Date.now() / 1000);

        if (itemExists) {
            console.log("Item does exist");
            // Item exists
            // Check if lastupdate is greater than 15 seconds old
            if (currentTime - itemExists.lastUpdated > 15) {
                // Finditem and update

                console.log("Item exists but needs to be updated");

                res = await fetch(`${API_URL}/api/boxscores/${gameIDs[i]}`);
                const { payload } = await res.json();

                console.log(payload);

                result = await boxscoresCollection.findOneAndUpdate(
                    {
                        gameID: gameIDs[i],
                    },
                    { $set: payload },
                    { returnNewDocument: true }
                );

                gameObjects[gameIDs[i]] = result.value;
            } else {
                console.log("Item exists but doesn yet need to be udpated");
                // Proceed with cached data data
                gameObjects[gameIDs[i]] = itemExists;
            }
        } else {
            console.log("item does not exist");
            // Create item
            // console.log("no item going API");
            // callBoxscoreAPI();
            res = await fetch(`${API_URL}/api/boxscores/${gameIDs[i]}`);
            const { payload } = await res.json();

            result = await boxscoresCollection.insertOne(payload);
            gameObjects[gameIDs[i]] = result;
        }
    }

    const returnedCollections = JSON.parse(JSON.stringify(gameObjects));

    if (!gameObjects) {
        return {
            notFound: true,
        };
    }

    return {
        props: { returnedCollections }, // will be passed to the page component as props
    };
}
