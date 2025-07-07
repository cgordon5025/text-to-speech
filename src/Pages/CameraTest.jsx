import { Box, Grid, Button } from "@mui/material"
import { useCameraContext } from "../Context/CameraContext"
import { useRecordWebcam } from "react-record-webcam"

const CameraTest = () => {
    const { recording, handleStopRecording, handleStartRecording, cameraSettings, videoData } = useCameraContext
    console.log(videoData)
    // const { activeRecordings } = useRecordWebcam({ options: cameraSettings.options, mediaRecorderOptions: cameraSettings.recorderOptions });
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div>
                        <video style={{ width: "200px", marginBottom: "2.5%" }} ref={videoData.recording.webcamRef} autoPlay muted />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleStartRecording}>Start Recording</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleStopRecording}>Stop Recording</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CameraTest   