import React, { useState, useEffect, createContext } from "react";
const AuthContext = createContext();
export const AuthProvider = (props) => {
    const gameIDs = [
        "6c974274-4bfc-4af8-a9c4-8b926637ba74",
        "eed38457-db28-4658-ae4f-4d4d38e9e212",
    ];
    const [activeBoxscoreID, setActiveBoxscoreID] = useState(gameIDs[1]);
    const [transitioning, setTransitioning] = useState(false);
    const [transitioningLeague, setTransitioningLeague] = useState(null);
    const [pitchingStats, setPitchingStats] = useState({});

    return (
        <AuthContext.Provider
            value={{
                gameIDs,
                activeBoxscoreID,
                setActiveBoxscoreID,
                transitioning,
                setTransitioning,
                transitioningLeague,
                setTransitioningLeague,
                pitchingStats,
                setPitchingStats,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
