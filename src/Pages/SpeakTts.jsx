import { Button } from '@mui/material'
import Speech from 'speak-tts'

const SpeakTts = () => {
    const speech = new Speech()
    speech.setLanguage('en-GB')
    // speech.setVoice('Google UK English Male')
    function initiateSpeak() {
        speech.init({ rate: .9, voice: "Google UK English Male" }).then((data) => {
            console.log(data)
        }).catch(e => {
            console.log('error', e)
        })
    }
    function talk() {
        speech.speak({ text: "hellow world" })
    }
    return (
        <div>
            <Button onClick={initiateSpeak}>Get Speech</Button>
            <Button onClick={talk}>Talk Speech</Button>

        </div>
    )
}

export default SpeakTts