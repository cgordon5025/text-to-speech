import { createContext, useContext, useState, useEffect, useRef } from "react";

export const TtsContext = createContext()

export const useTtsContext = () => useContext(TtsContext)


export const TtsProvider = ({ children }) => {
    const [finalVoice, setFinalVoice] = useState()
    const [loadStatus, setLoadStatus] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [phrases, setPhrases] = useState([])
    const synth = window.speechSynthesis

    const weirdPhrase = "If you get in trouble or do something you shouldn't do, which fits?"
    const adjustedPhrase = "If you get in trouble or do something you shouldn't doo, which fits?"
    const defaultPhrases = [
        {
            id: "0.1.1.1",
            phrase: "Hi my name is Spot"
        },
        {
            id: "0.1.1.2",
            phrase: "Hi my name is Hootie"
        },
        {
            id: "0.1.1.3",
            phrase: "Hi my name is Snap"
        },
        {
            id: "0.1.1.4",
            phrase: "Hi my name is Ginger"
        },
        {
            id: "0.1.2",
            phrase: "Welcome to the t Screen"
        },
        {
            id: "0.1.3",
            phrase: "Together we are going to discover more about you"
        },
        {
            id: "0.1.4",
            phrase: "As you answer questions I would like to see your whole face and see how you are feeling"
        },
        {
            id: "0.1.5",
            phrase: "Can you see your face?"
        }
    ]
    const loadVoice = async () => {
        const primaryVoice = await synth.getVoices().filter((voice) => voice.voiceURI === "Google UK English Male")
        const chromebookVoice1 = await synth.getVoices().filter((voice) => voice.voiceURI === "Android Speech Services by Google en-gb-x-rjs-local");
        const chromebookVoice2 = await synth.getVoices().filter((voice) => voice.voiceURI === "Android Speech Recognition and Synthesis from Google en-gb-x-rjs-local");
        const backupVoice = await synth.getVoices().filter((voice) => voice.lang === "en-GB");
        const voices = []
        if (primaryVoice !== null) {
            voices.push(...primaryVoice)
        }
        if (chromebookVoice1 !== null) {
            voices.push(...chromebookVoice1)
        }
        if (chromebookVoice2 !== null) {
            voices.push(...chromebookVoice2)
        }
        if (backupVoice !== null) {
            voices.push(...backupVoice)
        }
        const myVoice = voices[0]
        if (myVoice !== undefined || myVoice !== null) {
            setLoadStatus(true)
        }
        await setFinalVoice(myVoice)
    }
    useEffect(() => {
        if (!finalVoice) {
            loadVoice()
        }
    }, [loadStatus])
    // update this
    // useEffect(() => {
    //     setSpokenWords(transcript)
    // }, [transcript])
    const sortPhrases = (array) => {
        array.sort((a, b) => {
            const numA = parseInt(a.id.split(':')[1]);
            const numB = parseInt(b.id.split(':')[1]);
            return numA - numB;
        })
        return [...new Set(array)]
        // return array
    }
    useEffect(() => {
        console.log(phrases)
    }, [phrases])
    useEffect(() => {
        const readPhrases = async () => {
            // TODO: PERHAPS THIS CONDITION UP FRONT IS CAUSING IT?
            // think of way to prevent repeats, run a set before this? like if set/all original then run??
            if (!isSpeaking && phrases.length > 0) {
                const retrySpeech = () => {
                    synth.speak(utterThis)
                }
                const rate = .9
                const _phrase = defaultPhrases.find(phrase => phrase.id === phrases[0].id)
                console.log(_phrase)
                const utterThis = new SpeechSynthesisUtterance(_phrase.phrase)
                // const utterThis = phrases.length > 0 && phrases[0].text === weirdPhrase ?
                //     new SpeechSynthesisUtterance(adjustedPhrase) :
                //     new SpeechSynthesisUtterance(phrases[0]?.text)
                // TODO FIGURE OUT THE TIMING ON THIS DUE TO ASYNC AND LOOK AT QUESTION 4
                utterThis.addEventListener("start", () => {
                    setIsSpeaking(true)
                })
                utterThis.addEventListener("end", () => {
                    setIsSpeaking(false)
                    // if (phrases.length > 0) {
                    setPhrases(array => array.slice(1))
                    // }
                })
                utterThis.onerror = (event) => {
                    console.log(event)
                    if (event.error === 'not-allowed') {
                        setTimeout(retrySpeech, 250)
                    } else {
                        setIsSpeaking(false)
                        setPhrases([])
                    }
                }
                utterThis.rate = rate
                utterThis.voice = finalVoice
                synth.speak(utterThis)
            }
        }
        readPhrases()
    }, [phrases, isSpeaking])

    const queuePhrase = (id, firstQuestion, manualClick) => {
        if (firstQuestion) {
            if (!manualClick) {
                setPhrases(prevPhrases => [...prevPhrases, { id: id }])
            } else {
                synth.cancel()
                setPhrases([{ id: id }])
            }
        } else if (!firstQuestion && !manualClick) {
            setPhrases(prevPhrases => {
                const sortedPhrases = sortPhrases([...prevPhrases, { id: id }])
                return [... new Set(sortedPhrases)]
            })
        } else if (manualClick) {
            setPhrases(prevPhrases => [...prevPhrases, { id: id }])
        }
    }
    //  NOTE ORIGINAL CODE
    // const queuePhrase = (text, id, firstQuestion, manualClick) => {
    //     const synth = window.speechSynthesis
    //     if (firstQuestion) {
    //         if (!manualClick) {
    //             setPhrases(prevPhrases => [...prevPhrases, { id: id, text: text }])
    //         } else {
    //             synth.cancel()
    //             setPhrases([{ id: id, text: text }])
    //         }
    //     } else if (!firstQuestion && !manualClick) {
    //         setPhrases(prevPhrases => {
    //             const sortedPhrases = sortPhrases([...prevPhrases, { id: id, text: text }])
    //             return [... new Set(sortedPhrases)]
    //         })
    //     } else if (manualClick) {
    //         setPhrases(prevPhrases => [...prevPhrases, { id: id, text: text }])
    //     }
    // }
    const handleStop = () => {
        if (isSpeaking) {
            setPhrases(array => array.slice(1))
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
        }
    }
    const isActiveComponent = (id) => {
        return id === phrases[0]?.id && isSpeaking
    }

    return (<TtsContext.Provider value={{
        loadVoice,
        finalVoice,
        isActiveComponent,
        isSpeaking,
        // spokenWords,
        queuePhrase,
        handleStop,
    }}>{children}</TtsContext.Provider>)
}