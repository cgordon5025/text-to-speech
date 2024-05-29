import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three"
import DefaultContainer from "../Components/DefaultContainer";
export default function AdventureContainer({ children, survey, backgroundColor }) {
    return (
        <div id='adventureContainer' style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DefaultContainer
                style={{
                    position: "relative",
                    background: backgroundColor
                }}>
                <Canvas
                    // frameloop="demand"
                    gl={{
                        antialias: true,
                        toneMapping: NoToneMapping
                    }}
                >
                    <Suspense fallback={null}>
                        {children}
                    </Suspense>
                </Canvas>
                {survey()}
            </DefaultContainer>
        </div>
    )
}