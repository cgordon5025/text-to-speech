import { createContext, useContext, useState, useEffect, useRef } from "react";

export const TtsContext = createContext()

export const useTtsContext = () => useContext(TtsContext)


export const TtsProvider = ({ children }) => {
    const [finalVoice, setFinalVoice] = useState()
    const [loadStatus, setLoadStatus] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [phrases, setPhrases] = useState([])
    const [preCuedPhrases, setPreCuedPhrases] = useState([])
    const synth = window.speechSynthesis
    const defaultPhrases = [
        {
            id: "preCued:1",
            phrase: "Hi this is precued"
        },
        {
            id: "preCued:2",
            phrase: "Here is my second sentence"
        }, {
            id: "preCued:3",
            phrase: "Third sentence is a bit longer sentence to read"
        }, {
            id: "preCued:4",
            phrase: "Fourth sentence. The quick brown fox jumped over the lazy dog and then the lazy dog jumped over the quick brown fox"
        },

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
        const readPhrases = async () => {
            // TODO: PERHAPS THIS CONDITION UP FRONT IS CAUSING IT?
            // think of way to prevent repeats, run a set before this? like if set/all original then run??
            if (!isSpeaking && phrases.length > 0) {
                const retrySpeech = () => {
                    synth.speak(utterThis)
                }
                const rate = .9
                // console.log(_phrase)
                // const utterThis = new SpeechSynthesisUtterance(_phrase.phrase)
                const utterThis = new SpeechSynthesisUtterance(phrases[0]?.text)
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
                        // setTimeout(retrySpeech, 250)
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
    useEffect(() => {
        const readPhrases = async () => {
            // TODO: PERHAPS THIS CONDITION UP FRONT IS CAUSING IT?
            // think of way to prevent repeats, run a set before this? like if set/all original then run??
            if (!isSpeaking && preCuedPhrases.length > 0) {
                const retrySpeech = () => {
                    synth.speak(utterThis)
                }
                const rate = .9
                const _phrase = defaultPhrases.find(phrase => phrase.id === preCuedPhrases[0].id)
                const utterThis = new SpeechSynthesisUtterance(_phrase.phrase)
                // TODO FIGURE OUT THE TIMING ON THIS DUE TO ASYNC AND LOOK AT QUESTION 4
                utterThis.addEventListener("start", () => {
                    setIsSpeaking(true)
                })
                utterThis.addEventListener("end", () => {
                    setIsSpeaking(false)
                    // if (phrases.length > 0) {
                    setPreCuedPhrases(array => array.slice(1))
                    // }
                })
                utterThis.onerror = (event) => {
                    if (event.error === 'not-allowed') {
                        // setTimeout(retrySpeech, 250)
                    } else {
                        setIsSpeaking(false)
                        setPreCuedPhrases([])
                    }
                }
                utterThis.rate = rate
                utterThis.voice = finalVoice
                synth.speak(utterThis)
            }
        }
        readPhrases()
    }, [preCuedPhrases, isSpeaking])
    // const queuePhrase = (id, firstQuestion, manualClick) => {
    //     if (firstQuestion) {
    //         if (!manualClick) {
    //             setPhrases(prevPhrases => [...prevPhrases, { id: id }])
    //         } else {
    //             synth.cancel()
    //             setPhrases([{ id: id }])
    //         }
    //     } else if (!firstQuestion && !manualClick) {
    //         setPhrases(prevPhrases => {
    //             const sortedPhrases = sortPhrases([...prevPhrases, { id: id }])
    //             return [... new Set(sortedPhrases)]
    //         })
    //     } else if (manualClick) {
    //         setPhrases(prevPhrases => [...prevPhrases, { id: id }])
    //     }
    // }
    //  NOTE ORIGINAL CODE
    const prequeuePhrase = (id, firstQuestion, manualClick) => {
        if (firstQuestion) {
            if (!manualClick) {
                setPreCuedPhrases(prevPhrases => [...prevPhrases, { id: id }])
            } else {
                synth.cancel()
                setPreCuedPhrases([{ id: id }])
            }
        } else if (!firstQuestion && !manualClick) {
            setPreCuedPhrases(prevPhrases => {
                const sortedPhrases = sortPhrases([...prevPhrases, { id: id }])
                return [... new Set(sortedPhrases)]
            })
        } else if (manualClick) {
            setPreCuedPhrases(prevPhrases => [...prevPhrases, { id: id }])
        }
    }
    const queuePhrase = (text, id, firstQuestion, manualClick) => {
        const synth = window.speechSynthesis
        if (firstQuestion) {
            if (!manualClick) {
                setPhrases(prevPhrases => [...prevPhrases, { id: id, text: text }])
            } else {
                synth.cancel()
                setPhrases([{ id: id, text: text }])
            }
        } else if (!firstQuestion && !manualClick) {
            setPhrases(prevPhrases => {
                const sortedPhrases = sortPhrases([...prevPhrases, { id: id, text: text }])
                return [... new Set(sortedPhrases)]
            })
        } else if (manualClick) {
            setPhrases(prevPhrases => [...prevPhrases, { id: id, text: text }])
        }
    }
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
    const isActivePreCue = (id) => {
        return id === preCuedPhrases[0]?.id && isSpeaking
    }
    return (<TtsContext.Provider value={{
        loadVoice,
        finalVoice,
        isActiveComponent,
        isSpeaking,
        prequeuePhrase,
        // spokenWords,
        queuePhrase,
        handleStop,
        isActivePreCue
    }}>{children}</TtsContext.Provider>)
}