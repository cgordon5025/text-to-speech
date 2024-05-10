import { Box, IconButton, Typography } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

import { useTtsContext } from "../Context/TtsContext";
import { useEffect, useState } from "react";
import "./TextToSpeech.css"

export const OriginalTtsComponent = ({ text, autoRead, presetId, ...rest }) => {
    const { isSpeaking, Tts, stopTts } = useTtsContext()
    const [isActive, setIsActive] = useState(false)
    const handlePlayClick = () => {
        Tts(text)
        setIsActive(true)
    }
    const displayTitle = `${isSpeaking ? "Play" : "Stop"} audio`
    useEffect(() => {
        if (!isSpeaking) {
            setIsActive(false)
        }
    }, [isSpeaking])
    // const isActive = isActivePreCue(presetId)

    const handleStopClick = () => {
        stopTts()
        setIsActive(false)
    }

    return (
        <Box component="div" display="flex" alignItems="flex-center" justifyContent="center">
            <Typography {...rest}>
                <IconButton
                    className="bttn"
                    size="small"
                    title={displayTitle}
                    aria-label={displayTitle}
                    onClick={isActive ? handleStopClick : handlePlayClick}
                    style={{ marginTop: "-4px", color: isActive ? '#74b9ff' : "#000", transition: 'all' }}
                    data-state={isActive ? 'play' : 'stop'}
                >
                    <PlayCircle />
                </IconButton>
                {text}
            </Typography>
        </Box>
    )
}
