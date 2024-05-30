import { Button } from '@mui/material'
import Speech from 'speak-tts'

const SpeakTts = () => {
    const speech = new Speech()
    // speech.setLanguage('en-GB')
    // speech.setVoice('Google UK English Male')

    function initiateSpeak() {
        speech.init().then((data) => {
            var temp = data.voices.filter((voice) => {
                return voice.lang === 'en-GB'
            })
            return temp
        }).then((res) => {
            res.map((voice) => {
                console.log(voice)
                if (voice.voiceURI.includes("Male")) {
                    console.log('male voice')
                    console.log(voice)
                }
            })
        }).catch(e => {
            console.log('error', e)
        })
        // speech.init({ rate: .9, voice: "Google UK English Male" }).then((data) => {
        //     console.log(data)
        // }).catch(e => {
        //     console.log('error', e)
        // })
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