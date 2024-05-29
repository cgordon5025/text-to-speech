import React, { useState, useEffect } from "react";
import { Box } from "@mui/material"
import DefaultContainer from "../Components/DefaultContainer";
import { PreQueuedListComponent } from "../Components/PreQueuedListComponent";
import AdventureContainer from "../Adventure/AdventureContainer";
import Playground from "../Adventure/Playground";
const PreQueuedComponent = () => {
    return (
        <DefaultContainer style={{ position: "absolute", top: "0px", background: "none" }}>
            <div style={{ width: "100%", height: "100%", position: "relative", backgroundPosition: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div id='inner' style={{ backgroundColor: "white" }}>
                    <PreQueuedListComponent text={"Hi this is precued"} autoRead={true} presetId={"preCued:1"} />
                    <PreQueuedListComponent text={"Here is my second sentence"} autoRead={true} presetId={"preCued:2"} />
                    <PreQueuedListComponent text={"Third Sentence this is a longer sentence to read"} autoRead={true} presetId={"preCued:3"} />
                    <PreQueuedListComponent text={"Fourth sentence. The quick brown fox jumped of the lazy dog and then the lazy dog jumped over the quick brown fox."} autoRead={true} presetId={"preCued:4"} />
                </div>
            </div>
        </DefaultContainer>
    )
}
const PreQueuedList = () => {
    return (
        <AdventureContainer survey={() => <PreQueuedComponent />} backgroundColor="#8EDAF2">
            {/* <Playground
                camera={0}
                helper={"Fox"}
                helperAction={`FoxAction01`} /> */}
        </AdventureContainer>
    )
}

export default PreQueuedList