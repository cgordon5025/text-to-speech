import React, { useState, useEffect } from "react";
import { PlayCircle } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material"
import DefaultContainer from "../Components/DefaultContainer";
import { AutoReadComponent } from "../Components/AutoReadComponent";
import Playground from "../Adventure/Playground";
import AdventureContainer from "../Adventure/AdventureContainer";
const ManualComponent = () => {
    return (
        <DefaultContainer>
            <Typography>Auto Reading page</Typography>
            <AutoReadComponent text={"Testing testing 123"} autoRead={true} presetId={"autoRead:1"} />
            <AutoReadComponent text={"Second Sentence"} autoRead={true} presetId={"autoRead:2"} />
            <AutoReadComponent text={"Third Sentence this is a longer sentence to read"} autoRead={true} presetId={"autoRead:3"} />
            <AutoReadComponent text={"Fourth sentence. The quick brown fox jumped of the lazy dog and then the lazy dog jumped over the quick brown fox."} autoRead={true} presetId={"autoRead:4"} />
        </DefaultContainer>
    )
}
const ManualReadPage = () => {
    return (
        <AdventureContainer survey={() => <ManualComponent />} backgroundColor="#8EDAF2">
            <Playground
                camera={0}
                helper={"Fox"}
                helperAction={`FoxAction01`} />
        </AdventureContainer>
    )
}

export default ManualReadPage