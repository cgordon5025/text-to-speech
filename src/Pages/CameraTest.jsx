import { Box, Grid, Button } from "@mui/material"
import { useCameraContext } from "../Context/CameraContext"
import { useRecordWebcam } from "react-record-webcam"

const CameraTest = () => {
    const { recording, handleStopRecording, handleStartRecording, cameraSettings, videoData } = useCameraContext()

    const { activeRecordings, openCamera, createRecording, devicesByType, stopRecording, download, startRecording } = useRecordWebcam({ options: cameraSettings.options, mediaRecorderOptions: cameraSettings.recorderOptions });

    const tempStart = async () => {
        const recording = await createRecording(devicesByType?.video[0]?.deviceId, devicesByType?.audio[0]?.deviceId)
        if (recording) {
            await openCamera(recording.id)
        }
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div>
                        {activeRecordings.map((recording) => {
                            return (
                                <video style={{ width: "200px", marginBottom: "2.5%" }} ref={recording.webcamRef} autoPlay muted />

                            )
                        })}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleStartRecording}>open Cam Recording</Button>
                </Grid>
                {/* <Grid item xs={4}>
                    <Button onClick={() => startRecording(activeRecordings[0]?.id)}>Start Recording</Button>
                </Grid> */}
                <Grid item xs={4}>
                    <Button onClick={() => stopRecording(activeRecordings[0]?.id)}>Stop Recording</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={() => download(activeRecordings[0]?.id)}>Download Recording</Button>
                </Grid>
                {/* <Grid item xs={4}>
                    <Button onClick={tempStart}>open Cam Recording</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={() => startRecording(activeRecordings[0]?.id)}>Start Recording</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={() => stopRecording(activeRecordings[0]?.id)}>Stop Recording</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={() => download(activeRecordings[0]?.id)}>Download Recording</Button>
                </Grid> */}
            </Grid>
        </Box >
    )
}

export default CameraTest   