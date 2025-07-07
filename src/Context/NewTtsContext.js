import { useContext, createContext, useState, useEffect, useRef } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk"

export const NewTtsContext = createContext()

export const useNewTtsContext = () => useContext(NewTtsContext);

const defaultPhrases = [
    {
        id: "preCued:1",
        phrase: "Hi this is pre cued"
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
const apiKey = "removed"
const region = "eastus"

const sortPhrases = (array) => {
    array.sort((a, b) => {
        const numA = parseInt(a.id.split(':')[1]);
        const numB = parseInt(b.id.split(':')[1]);
        return numA - numB;
    })
    return [...new Set(array)]
    // return array
}
export const NewTtsProvider = ({ children }) => {
    const [loadStatus, setLoadStatus] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isInit, setIsInit] = useState(false)
    const [speechConfig, setSpeechConfig] = useState(null)
    const [audioConfig, setAudioConfig] = useState(null);
    const synthRef = useRef(null);
    const audioRef = useRef(null);
    const sourceNodeRef = useRef(null);
    const [phrases, setPhrases] = useState([])

    useEffect(() => {
        if (!apiKey || !region) return;

        try {
            const _speechConfig = SpeechSDK.SpeechConfig.fromSubscription(apiKey, region);
            _speechConfig.speechSynthesisVoiceName = "en-GB-OllieMultilingualNeural"
            const _audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            setSpeechConfig(_speechConfig);
            setLoadStatus(true);

        } catch (error) {
            console.log("failed to init speech cnofig: ", error)
        }
    }, [apiKey, region])

    const manualPlay = async (text, id) => {
        setPhrases([{ text: text, id: id }])
        await handlePlayAudio(text, true)
    }
    const sudoInit = async () => {
        console.log("trying to sudoinit")
        try {
            if (!isInit) {
                // setPhrases([{ text: "Lets go", id: "test" }])

                // await handlePlayAudio("lets go", false)
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const buffer = ctx.createBuffer(1, 1, 22050); // empty buffer
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.start(0);
                await ctx.resume();
                setIsInit(true)
                console.log("🟢 Audio context initialized via silent kick");
            }
        } catch (err) {
            console.warn("⚠️ Audio context init failed:", err);
        }
    }


    const autoPlay = async (text, ids) => {
        const sentences = text.split(/(?<=[.!?])\s+/);
        const items = sentences.map((s, i) => ({ text: s, id: ids[i] }))
        setPhrases([...items])
        for (const item of items) {
            console.log("trying to speak: ", item)
            await handlePlayAudio(item.text, false)
            console.log("done speaking")
            setPhrases(prev => prev.slice(1));
        }
    }
    useEffect(() => {
        console.log("phrases:", phrases)
    }, [phrases])
    useEffect(() => {
        console.log("has permission: ", isInit)
    }, [isInit])
    const stopAudio = () => {
        if (sourceNodeRef.current) {
            try {
                sourceNodeRef.current.stop();
                setIsSpeaking(false);
            } catch (e) {
                console.error("Error stopping audio:", e);
            }
        }

        if (audioRef.current) {
            audioRef.current.close();
            audioRef.current = null;
        }
    }

    const handlePlayAudio = (text, stopPrev) => {
        if (!speechConfig) {
            console.log("the config aint ready")
            return;
        }
        if (!isInit) {
            // sudoInit().then(() => handlePlayAudio(text, stopPrev))
        }
        console.log("trying to speak")
        return new Promise((resolve, reject) => {
            const _stream = SpeechSDK.AudioOutputStream.createPullStream();

            const _audioContext = SpeechSDK.AudioConfig.fromStreamOutput(_stream);

            const speechSynthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, _audioContext);
            synthRef.current = speechSynthesizer
            setIsSpeaking(true)
            speechSynthesizer.speakTextAsync(
                text,
                async (result) => {
                    console.log("speakTextAsync success callback fired", result);

                    if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                        const arrayBuffer = result.audioData;
                        try {
                            if (stopPrev) {
                                if (sourceNodeRef.current) {
                                    try {
                                        console.log("here is the issue")
                                        sourceNodeRef.current.stop();
                                    }                    // ⬅️ NEW
                                    catch (e) { console.warn("source already stopped", e); }  // ⬅️ NEW
                                    sourceNodeRef.current = null;                            // ⬅️ NEW
                                }
                                if (audioRef.current) {
                                    try {
                                        console.log("no wait here it is:")
                                        await audioRef.current.close();
                                    }           // ⬅️ NEW
                                    catch (e) { console.warn("ctx already closed", e); }      // ⬅️ NEW
                                    audioRef.current = null;                          // ⬅️ NEW
                                }
                            }
                            const context = new (window.AudioContext || window.webkitAudioContext());
                            audioRef.current = context;

                            const audioBuffer = await context.decodeAudioData(arrayBuffer);
                            const source = context.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(context.destination);
                            source.start()

                            sourceNodeRef.current = source;
                            setIsSpeaking(true)
                            source.onended = () => {
                                setIsSpeaking(false)
                                console.log("its reached the end of the statement")
                                // setPhrases(prev => prev.slice(1));
                                speechSynthesizer.close();
                                synthRef.current = null;
                                resolve()
                            }
                        } catch (error) {
                            console.log("audio decode error: ", error)
                            speechSynthesizer.close();
                            synthRef.current = null
                            setPhrases(prev => prev.slice(1));
                            reject(error)
                        }
                    } else {
                        console.error("Synthesis failed:", result.errorDetails);
                        speechSynthesizer.close();
                        synthRef.current = null

                        reject(result.errorDetails);
                    }

                    // console.log("the result is: ", result)
                    // if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    //     console.log("✅ Finished speaking:", text);
                    //     setIsSpeaking(false);
                    //     // setPhrases(prev => prev.slice(1));
                    //     // speechSynthesizer.close();
                    //     resolve();
                    // } else {
                    //     console.error("❌ Synthesis failed:", result.errorDetails);
                    //     setIsSpeaking(false);
                    //     // setPhrases(prev => prev.slice(1));
                    //     speechSynthesizer.close();
                    //     reject(result.errorDetails);
                    // }
                },
                error => {
                    console.error("❌ Speech SDK error:", error);
                    setIsSpeaking(false);
                    // setPhrases(prev => prev.slice(1));
                    speechSynthesizer.close();
                    synthRef.current = null
                    reject(error);
                }
            )
        })
    }
    const isActiveComponent = (id) => {
        return id === phrases[0]?.id && isSpeaking
    }

    return (<NewTtsContext.Provider value={{
        isActiveComponent,
        isSpeaking,
        manualPlay,
        sudoInit,
        autoPlay,
        isInit,
        stopAudio
    }}>{children}</NewTtsContext.Provider>)
}