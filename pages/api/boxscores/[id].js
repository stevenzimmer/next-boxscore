export default async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    switch (method) {
        case "GET":
            try {
                const jsonres = await fetch(
                    `https://chumley.barstoolsports.com/dev/data/games/${id}.json`
                );

                const data = await jsonres.json();

                const payload = {
                    lastUpdated: Math.round(Date.now() / 1000),
                    gameID: id,
                    gameInfo: {
                        status: data.event_information.status,
                        league: data.league,
                        winnerIndex:
                            data.away_period_scores.reduce((a, b) => a + b, 0) >
                            data.home_period_scores.reduce((a, b) => a + b, 0)
                                ? "0"
                                : "1",
                        teams: [
                            {
                                name: {
                                    id: data.away_team.team_id,
                                    abbreviation: data.away_team.abbreviation,
                                    full: data.away_team.full_name,
                                },
                                scores: data.away_period_scores,
                                stats: data.away_stats
                                    ? data.away_stats
                                    : {
                                          // Baseball data
                                          hitting: data.away_batters,
                                          fielding: data.away_fielding,
                                          pitching: data.away_pitchers,
                                      },
                            },
                            {
                                name: {
                                    id: data.home_team.team_id,
                                    abbreviation: data.home_team.abbreviation,
                                    full: data.home_team.full_name,
                                },
                                scores: data.home_period_scores,
                                stats: data.home_stats
                                    ? data.home_stats
                                    : {
                                          // Baseball data
                                          hitting: data.home_batters,
                                          fielding: data.home_fielding,
                                          pitching: data.home_pitchers,
                                      },
                            },
                        ],
                    },
                };

                return res.status(200).json({
                    success: true,
                    payload,
                });
            } catch (err) {
                // console.log("GET err", err);
                res.status(400).json({
                    success: false,
                    message: "this is a gett",
                });
            }

            break;

        default:
    }
};
