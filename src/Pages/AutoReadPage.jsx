import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material"
import { AutoReadComponent } from "../Components/AutoReadComponent";
import DefaultContainer from "../Components/DefaultContainer";
import Playground from "../Adventure/Playground";
import AdventureContainer from "../Adventure/AdventureContainer";
const AutoComponent = () => {
    return (
        <DefaultContainer>
            <Typography textAlign='center'>Auto Reading page</Typography>
            <AutoReadComponent text={"Testing testing 123"} autoRead={true} presetId={"autoRead:1"} />
            <AutoReadComponent text={"Second Sentence"} autoRead={true} presetId={"autoRead:2"} />
            <AutoReadComponent text={"Third Sentence this is a longer sentence to read"} autoRead={true} presetId={"autoRead:3"} />
            <AutoReadComponent text={"Fourth sentence. The quick brown fox jumped over the lazy dog and then the lazy dog jumped over the quick brown fox."} autoRead={true} presetId={"autoRead:4"} />
        </DefaultContainer>
    )
}
const AutoReadPage = () => {
    return (
        <AdventureContainer survey={() => <AutoComponent />} backgroundColor="#8EDAF2">
            <Playground
                camera={0}
                helper={"Fox"}
                helperAction={`FoxAction01`} />
        </AdventureContainer>
    )
}

export default AutoReadPage