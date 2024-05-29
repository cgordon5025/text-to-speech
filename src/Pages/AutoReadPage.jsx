import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material"
import { AutoReadComponent } from "../Components/AutoReadComponent";
import DefaultContainer from "../Components/DefaultContainer";
import Playground from "../Adventure/Playground";
import AdventureContainer from "../Adventure/AdventureContainer";
const AutoComponent = () => {
    return (
        <div id="outerDiv AutoComp">
            <DefaultContainer style={{ position: "absolute", top: "0px", background: "none" }}>
                <div style={{ width: "100%", height: "100%", position: "relative", backgroundPosition: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ backgroundColor: "white" }}>
                        <Typography textAlign='center'>Auto Reading page</Typography>
                        <AutoReadComponent text={"Testing testing 123"} autoRead={true} presetId={"autoRead:1"} />
                        <AutoReadComponent text={"Second Sentence"} autoRead={true} presetId={"autoRead:2"} />
                        <AutoReadComponent text={"Third Sentence this is a longer sentence to read"} autoRead={true} presetId={"autoRead:3"} />
                        <AutoReadComponent text={"Fourth sentence. The quick brown fox jumped over the lazy dog and then the lazy dog jumped over the quick brown fox."} autoRead={true} presetId={"autoRead:4"} />
                    </div>
                </div>
            </DefaultContainer >
        </div >
    )
}
const AutoReadPage = () => {
    return (
        <AdventureContainer id='adventureContainer' survey={() => <AutoComponent />} backgroundColor="#8EDAF2">
            {/* <Playground
                camera={0}
                helper={"Fox"}
                helperAction={`FoxAction01`} /> */}
        </AdventureContainer>
    )
}

export default AutoReadPage