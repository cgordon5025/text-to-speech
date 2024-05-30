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
            let conditionMet = false
            console.log(res)
            res.forEach((voice, index) => {
                if (conditionMet) {
                    return
                }
                if (voice.voiceURI.includes("Male")) {
                    speech.setVoice(voice.name)
                    console.log('the original for windows')
                    conditionMet = true
                    return;
                } else if (voice.voiceURI === 'Android Speech Recognition and Synthesis from Google en-gb-x-rjs-local') {
                    speech.setVoice(voice.name)
                    console.log('the one for chrome')
                    conditionMet = true
                    return;
                } else if (index === res.length - 1 && !conditionMet) {
                    console.log('none of the above found, using this one', voice)
                    speech.setVoice(voice.name)
                    return;
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
        console.log(speech)
    }
    return (
        <div>
            <Button onClick={initiateSpeak}>Get Speech</Button>
            <Button onClick={talk}>Talk Speech</Button>

        </div>
    )
}

export default SpeakTts