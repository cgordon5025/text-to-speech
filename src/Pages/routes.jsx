import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { TtsProvider } from "../Context/TtsContext";
import AutoReadPage from "./AutoReadPage";
import ManualReadPage from "./ManualReadPage";
import PreQueuedList from "./PreQueuedList";
import Home from "./Home"
import OriginalTts from "./OriginalTts";
import JustPlayground from "./JustPlayground";
const RoutersContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Playground' element={<JustPlayground />} />
            <Route path='autoRead' element={<AutoReadPage />} />
            <Route path='manualRead' element={<ManualReadPage />} />
            <Route path="PreQueuedList" element={<PreQueuedList />} />
            <Route path="originalTts" element={<OriginalTts />} />
        </Routes>
    )
}

const RenderRoutes = () => {
    return (
        <TtsProvider>
            <Box component='div' sx={{ backgroundColor: "#F3F6F9", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Box component='div' sx={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
                    <Typography as={Link} to={`/autoRead`}>To Auto Read Testing</Typography>
                    <Typography as={Link} to={`/PreQueuedList`}>To Pre-Queued List Testing</Typography>
                    <Typography as={Link} to={'/originalTts'}>To original Tts Testing</Typography>
                </Box>
                <RoutersContainer />
            </Box>
        </TtsProvider>
    )
}

export default RenderRoutes