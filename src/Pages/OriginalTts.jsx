import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { OriginalTtsComponent } from "../Components/OriginalTtsComponent";
import { useTtsContext } from "../Context/TtsContext";
import DefaultContainer from "../Components/DefaultContainer";
import Playground from "../Adventure/Playground";
import AdventureContainer from "../Adventure/AdventureContainer";
const mySentences = [
    "Sentence one, will continue speaking until it gets cut off by the next",
    "Sentence two, will continue until the song is done",
    "Sentence 3 a b c d e f g h i j k l m n o p q r s t u v w x y z",
    "Sentence 4 z y x q v u t s r q p o m n l k j i h g f e d c b a"
]
const TtsComponent = () => {
    return (
        <DefaultContainer style={{ position: "absolute", top: "0px", background: "none" }}>
            <div style={{ width: "100%", height: "100%", position: "relative", backgroundPosition: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ backgroundColor: "white" }}>
                <OriginalTtsComponent text={mySentences[0]} presetId="original:1" />
                <OriginalTtsComponent text={mySentences[1]} presetId="original:2" />
                <OriginalTtsComponent text={mySentences[2]} presetId="original:3" />
                <OriginalTtsComponent text={mySentences[3]} presetId="original:4" />
            </div>
        </div>
        </DefaultContainer >
    )
}
const OriginalTts = () => {
    const { Tts } = useTtsContext()
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === "/originalTts") {
            Tts(mySentences[0])
            // this should read only once
        }
    }, [location])

    return (
        <AdventureContainer survey={() => <TtsComponent />} backgroundColor="#8EDAF2">
            {/* <Playground
                camera={0}
                helper={"Fox"}
                helperAction={`FoxAction01`} /> */}
        </AdventureContainer>
    )
}
export default OriginalTts