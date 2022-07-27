import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import AuthContext from "@/context/AuthContext";
export default function BoxscoreShowcasePitching(props) {
    const { pitchingStats } = useContext(AuthContext);

    function PitchingBox(props) {
        return (
            <Typography
                variant="h5"
                sx={{
                    fontWeight: props.win ? `600` : `400`,
                    fontSize: ["18px", "24px"],
                }}
            >
                {props.children}
            </Typography>
        );
    }

    return (
        <div className="flex justify-center mb-20">
            <div className="w-11/12 lg:w-7/12">
                <div className="flex flex-wrap justify-center -mx-6">
                    <div className="px-6">
                        <PitchingBox win={true}>Win</PitchingBox>
                        <PitchingBox win={true}>
                            {pitchingStats.win}
                        </PitchingBox>
                    </div>
                    <div className="px-6">
                        <PitchingBox>LOSS</PitchingBox>
                        <PitchingBox>{pitchingStats.loss}</PitchingBox>
                    </div>
                    {pitchingStats.save && (
                        <div className="px-6">
                            <PitchingBox>SAVE</PitchingBox>
                            <PitchingBox>{pitchingStats.save}</PitchingBox>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
