import { TableCell, TableHead, TableRow } from "@mui/material";

export default function BoxscoreTableHead(props) {
    return (
        <TableHead>
            <TableRow>
                {tableHeader[props.league].map((headerCol, i) => {
                    return <TableCell key={i}>{headerCol}</TableCell>;
                })}
            </TableRow>
        </TableHead>
    );
}
