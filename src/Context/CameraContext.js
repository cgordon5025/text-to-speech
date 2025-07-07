import React, { useState, useContext, useEffect } from "react";
export const CameraContext = React.createContext()

export const useCameraContext = () => useContext(CameraContext)

export const CameraProvider = ({ children }) => {
    const [cameraSettings, setCameraSettings] = useState({
        options: {
            fileName: "test",
            fileType: "mp4"
        },

        recorderOptions: {
            mimeType: "video/mp4"
        },
        constraints: {
            aspectRatio: 1.7,
            height: 720,
            width: 1200
        },
        open: false,
        preview: null,
        stop: null,
        start: false,
        processing: false
    })
    const [recording, setRecording] = useState()
    const [videoData, setVideoData] = useState({
        totalChunks: null,
        savedChunks: null,
        recording: null
    })

    const handleOpenCamera = () => {
        setCameraSettings((prevSettings) => ({ ...prevSettings, open: true }))
    }
    const handleStartRecording = () => {
        setCameraSettings((prevSettings) => ({ ...prevSettings, start: true }))
    }

    const handleStopRecording = () => {
        setCameraSettings((prevSettings) => ({ ...prevSettings, stop: true, start: false }))
    }

    const handleDoneProcessing = () => {
        setCameraSettings((prevSettings) => ({ ...prevSettings, processing: true }))
    }
    useEffect(() => {
        console.log("the vid data is: ", videoData)
    }, [videoData])

    return <CameraContext.Provider value={{
        cameraSettings, recording, setRecording, videoData, setVideoData,
        handleOpenCamera, handleStartRecording, handleStopRecording, handleDoneProcessing
    }}>{children}
    </CameraContext.Provider>
}