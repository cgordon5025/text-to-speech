import Playground from "../Adventure/Playground";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { NoToneMapping } from "three";
import DefaultContainer from "../Components/DefaultContainer";
const JustPlayground = () => {
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DefaultContainer
                style={{
                    position: "relative",
                    background: "#8EDAF2"
                }}>
                <Canvas
                    // frameloop="demand"
                    gl={{
                        antialias: true,
                        toneMapping: NoToneMapping
                    }}
                >
                    <Suspense fallback={null}>
                        <Playground
                            camera={0}
                            helper={"Fox"}
                            helperAction={"FoxAction01"} />
                    </Suspense>
                </Canvas>
            </DefaultContainer>
        </div>
    )
}

export default JustPlayground