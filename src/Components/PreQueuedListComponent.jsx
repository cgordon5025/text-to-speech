import { Box, IconButton, Typography } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

import { useTtsContext } from "../Context/TtsContext";
import { useEffect } from "react";
import "./TextToSpeech.css"


export const PreQueuedListComponent = ({ text, autoRead, presetId, ...rest }) => {
    const { isSpeaking, prequeuePhrase, handlePrequeueStop, isActivePreCue } = useTtsContext()
    const handlePlayClick = () => { prequeuePhrase(text, presetId, false, true) }
    const displayTitle = `${isSpeaking ? "Play" : "Stop"} audio`

    const isActive = isActivePreCue(presetId)

    const handleStopClick = () => {
        handlePrequeueStop()
    }

    useEffect(() => {
        if (text) {
            if (autoRead && presetId === 'autoRead:1') {
                prequeuePhrase(presetId, true)
            } else {
                prequeuePhrase(presetId, true, false)
            }
        }
    }, [text])

    return (
        <Box component="div" display="flex" alignItems="flex-center" justifyContent="center">
            <Typography {...rest}>
                <IconButton
                    className="bttn"
                    size="small"
                    title={displayTitle}
                    aria-label={displayTitle}
                    onClick={!isActive ? handlePlayClick : handleStopClick}
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
