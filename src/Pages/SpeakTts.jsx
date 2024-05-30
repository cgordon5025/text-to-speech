import { Button } from '@mui/material'
import Speech from 'speak-tts'

const SpeakTts = () => {
    const speech = new Speech()
    speech.setLanguage('en-GB')
    speech.setRate(.9)
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
        console.log('clicking')
        speech.speak({
            text: "Hi my name is Spot! Welcome to the t Screen. Together we are going to discover more about you. As you answer questions I would like to see your whole face and see how you are feeling. Can you see your face?",
            queue: false,
            listeners: {
                onstart: () => {
                    console.log("Start utterance")
                },
                onend: () => {
                    console.log("End utterance")
                },
                onresume: () => {
                    console.log("Resume utterance")
                },
                onboundary: (event) => {
                    console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
                }
            }
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })
    }
    return (
        <div>
            <Button onClick={initiateSpeak}>Get Speech</Button>
            <Button onClick={talk}>Talk Speech</Button>

        </div>
    )
}

export default SpeakTts