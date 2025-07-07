import { useEffect } from "react";
import { useCameraContext } from "../Context/CameraContext";
import { useRecordWebcam } from "react-record-webcam";

const RecordWebcam = () => {
    const { cameraSettings, status, handleStartRecording, handleDoneProcessing, handleOpenCamera, setVideoData } = useCameraContext()
    const { activeRecordings, createRecording, devicesByType, openCamera, startRecording, errorMessage, stopRecording, download } = useRecordWebcam({ options: cameraSettings.options, mediaRecorderOptions: cameraSettings.recorderOptions });

    useEffect(() => {
        if (cameraSettings.start && activeRecordings[0]?.id) {
            console.log("staring the recordings")
            console.log("the active in this use effect is: ", activeRecordings[0])
            setVideoData(prevState => ({ ...prevState, recording: activeRecordings[0] }))
            startRecording(activeRecordings[0].id)
        }
    }, [cameraSettings.start])
    useEffect(() => {
        if (cameraSettings.open && activeRecordings[0]?.id && activeRecordings[0]?.status == "OPEN") {
            handleStartRecording()
            console.log("setting to start")
        }
    }, [cameraSettings.open])
    useEffect(() => {
        if (cameraSettings.stop && activeRecordings[0]?.id) {
            console.log("stopping the recording")
            stop()
        }
    }, [cameraSettings.stop])

    useEffect(() => {
        // UNLIKE THE TSCREEN REPO, THIS NEED TO BE LOADED LIKE SO BC IT IS OPENING BEFORE THE DEVICES ARE READY
        if (devicesByType?.video && devicesByType?.audio) {
            // NOTE ADDING IN TEMPORARILY SO THAT I CNA TEST WITHOUT IT GETTING STUCK
            // handleOpenCamera()
            start()
        }
    }, [devicesByType])
    useEffect(() => {
        console.log("some error with the camera is happeneing: ", errorMessage)
    }, [errorMessage])

    useEffect(() => {
        console.log("something is changing with the active recording: ", activeRecordings)
    }, [activeRecordings])

    const start = async () => {
        const recording = await createRecording(devicesByType?.video[0]?.deviceId, devicesByType?.audio[0]?.deviceId);
        if (recording?.id) {
            console.log("the camera is opening: ", recording)
            await openCamera(recording.id)
            handleOpenCamera()
        }
    }

    const stop = async () => {
        await stopRecording(activeRecordings[0].id)
        setTimeout(() => {
            download(activeRecordings[0].id)
        }, 2000)
    }
}

export default RecordWebcam