import { Typography } from "@mui/material";
// import { PlayCircle } from "@mui/icons-material";
import { useNewTtsContext } from "../Context/NewTtsContext";
import { useEffect, useState } from "react"
import { AzureComponent } from "../Components/AzureComponent";
import DefaultContainer from "../Components/DefaultContainer";
const AzureTts = () => {
    const { autoPlay, isInit } = useNewTtsContext();
    const [safetyStop, setSafetyStop] = useState(false)
    useEffect(() => {
        if (safetyStop && isInit) {
            autoPlay("Testing testing 123. Second Sentence. Third Sentence this is a longer sentence to read. Fourth sentenc, the quick brown fox jumped over the lazy dog and then the lazy dog jumped over the quick brown fox.",
                [
                    "azure:1", "azure:2", "azure:3", "azure:4"
                ])
            // sudoInit().then(() => {
            //     autoPlay("Testing testing 123. Second Sentence. Third Sentence this is a longer sentence to read. Fourth sentenc, the quick brown fox jumped over the lazy dog and then the lazy dog jumped over the quick brown fox.",
            //         [
            //             "azure:1", "azure:2", "azure:3", "azure:4"
            //         ])
            // })
            console.log("trying to auto read")
        } else {
            console.log("in the safety")
            // autoPlay("", [""])
            // sudoInit()
            setSafetyStop(true)
        }
    }, [safetyStop, isInit])
    return (
        <DefaultContainer style={{ position: "absolute", top: "0px", background: "none" }}>
            <div style={{ width: "100%", height: "100%", position: "relative", backgroundPosition: "cover", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Typography textAlign="center">This is the Azure reading page</Typography>
                <AzureComponent text={"Testing testing 123"} presetId={"azure:1"} />
                <AzureComponent text={"Second Sentence"} presetId={"azure:2"} />
                <AzureComponent text={"Third Sentence this is a longer sentence to read"} presetId={"azure:3"} />
                <AzureComponent text={"Fourth sentence. The quick brown fox jumped over the lazy dog and then the lazy dog jumped over the quick brown fox."} presetId={"azure:4"} />
            </div>
        </DefaultContainer >
    )


}

const ManualReadComponent = () => {

}
export default AzureTts