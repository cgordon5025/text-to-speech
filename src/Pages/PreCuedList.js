import React, { useState, useEffect } from "react";
import { PlayCircle } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material"
import { PreCuedListComponent } from "../Components/PreCuedListComponent";
const PreCuedList = () => {
    return (
        <Box>
            <Typography>Auto Reading page</Typography>
            <PreCuedListComponent text={"Hi this is precued"} autoRead={true} presetId={"preCued:1"} />
            <PreCuedListComponent text={"Here is my second sentence"} autoRead={true} presetId={"preCued:2"} />
            <PreCuedListComponent text={"Third Sentence this is a longer sentence to read"} autoRead={true} presetId={"preCued:3"} />
            <PreCuedListComponent text={"Fourth sentence. The quick brown fox jumped of the lazy dog and then the lazy dog jumped over the quick brown fox."} autoRead={true} presetId={"preCued:4"} />


        </Box>
    )
}

export default PreCuedList