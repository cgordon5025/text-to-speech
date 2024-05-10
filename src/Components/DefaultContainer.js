import React from "react";
import { Paper, Container as MuiContainer } from "@mui/material";
function DefaultContainer({
    children,
    style = {}
}) {
    return (
        <MuiContainer
            square
            disableGutters
            elevation={12}
            component={Paper} sx={{
                width: "1000px",
                height: "600px",
                ...style
            }}>
            {children}
        </MuiContainer>
    )
}

export default DefaultContainer