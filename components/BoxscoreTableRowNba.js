import {
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper,
} from "@mui/material";

export default function BoxscoreTableRowNba(props) {
    // console.log(props);
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label={`${props.league} boxscore table`}>
                    <TableHead>
                        <TableRow>
                            {props.header.map((headerCol, i) => {
                                return (
                                    <TableCell key={i}>{headerCol}</TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stats.map((stat) => (
                            <TableRow
                                key={stat.display_name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {stat.display_name}
                                </TableCell>

                                <TableCell>{stat.minutes}</TableCell>
                                <TableCell>{stat.points}</TableCell>
                                <TableCell>
                                    {stat.field_goals_made} -{" "}
                                    {stat.field_goals_attempted}
                                </TableCell>
                                <TableCell>
                                    {stat.three_point_field_goals_made} -{" "}
                                    {stat.three_point_field_goals_attempted}
                                </TableCell>
                                <TableCell>
                                    {stat.offensive_rebounds +
                                        stat.defensive_rebounds}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
