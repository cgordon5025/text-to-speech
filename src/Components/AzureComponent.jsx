import { Box, IconButton, Typography } from "@mui/material";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { useNewTtsContext } from "../Context/NewTtsContext";
import "./TextToSpeech.css"
export const AzureComponent = ({ text, autoPlay, presetId, ...rest }) => {
    const { manualPlay, isActiveComponent, stopAudio } = useNewTtsContext();
    const componentId = presetId ? presetId : "";

    const handlePlayClick = () => {
        manualPlay(text, presetId)
    }

    const handleStopClick = () => {
        stopAudio()
    }
    const isActive = isActiveComponent(componentId)
    return (
        <Box component="div" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
            <Typography style={{ display: "flex" }}>
                <IconButton
                    onClick={!isActive ? handlePlayClick : handleStopClick}
                    style={{ marginTop: "-4px", color: isActive ? "74b9ff" ?? '#0984e3' : "fff" ?? "#000", transition: 'all' }}
                    // style={{ marginTop: session?.type === "TweenScreen" ? "-4px" : "", color: isActive ? buttonColorStop ?? '#0984e3' : buttonColorPlay ?? "#000", transition: 'all' }}
                    data-state={isActive ? 'play' : 'stop'}>
                    {isActive ? <StopCircle /> : <PlayCircle />}
                </IconButton>
                <span>{text}</span>
            </Typography>
        </Box>
    )
}