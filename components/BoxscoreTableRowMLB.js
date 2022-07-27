import { useEffect } from "react";
import {
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper,
} from "@mui/material";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function BoxscoreTableRowMLB(props) {
    const { pitchingStats, setPitchingStats } = useContext(AuthContext);

    useEffect(() => {
        props.stats.pitching.map((stat) => {
            if (stat.win) {
                setPitchingStats((oldStats) => {
                    return { ...oldStats, win: stat.display_name };
                });
            }

            if (stat.loss) {
                setPitchingStats((oldStats) => {
                    return { ...oldStats, loss: stat.display_name };
                });
            }

            if (stat.save) {
                setPitchingStats((oldStats) => {
                    return { ...oldStats, save: stat.display_name };
                });
            }
        });
    }, []);
    return (
        <>
            <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
                <Table aria-label={`${props.league} hitting boxscore table`}>
                    <TableHead className="bg-blue-100">
                        <TableRow>
                            {props.header.hitting.map((headerCol, i) => {
                                return (
                                    <TableCell key={i}>
                                        {i === 0 &&
                                            `${props.name.abbreviation}`}{" "}
                                        {headerCol}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stats.hitting.map((stat) => {
                            return (
                                <TableRow
                                    key={stat.display_name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {stat.display_name}{" "}
                                        <span className="text-xs text-grey-600">
                                            {stat.position}
                                        </span>
                                    </TableCell>

                                    <TableCell>{stat.at_bats}</TableCell>
                                    <TableCell>{stat.runs}</TableCell>

                                    <TableCell>{stat.hits}</TableCell>

                                    <TableCell>{stat.rbi}</TableCell>
                                    <TableCell>{stat.walks}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table aria-label={`${props.league} pitching boxscore table`}>
                    <TableHead className="bg-blue-100">
                        <TableRow>
                            {props.header.pitching.map((headerCol, i) => {
                                return (
                                    <TableCell key={i}>
                                        {i === 0 &&
                                            `${props.name.abbreviation}`}{" "}
                                        {headerCol}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stats.pitching.map((stat) => {
                            return (
                                <TableRow
                                    key={stat.display_name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {stat.display_name}{" "}
                                        <span className="text-xs text-grey-600">
                                            {stat.position}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        {stat.innings_pitched}
                                    </TableCell>
                                    <TableCell>{stat.hits_allowed}</TableCell>

                                    <TableCell>{stat.earned_runs}</TableCell>

                                    <TableCell>
                                        {stat.pitch_count} -{" "}
                                        {stat.pitches_strikes}
                                    </TableCell>
                                    <TableCell>{stat.strike_outs}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
