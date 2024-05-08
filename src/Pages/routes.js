import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { TtsProvider } from "../Context/TtsContext";
import AutoReadPage from "./AutoReadPage";
import ManualReadPage from "./ManualReadPage";
import PreCuedList from "./PreCuedList";
import Home from "./Home"
const RoutersContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='autoRead' element={<AutoReadPage />} />
            <Route path='manualRead' element={<ManualReadPage />} />
            <Route path="PreCuedList" element={<PreCuedList />} />
        </Routes>
    )
}

const RenderRoutes = () => {
    return (
        <TtsProvider>
            <Box component='div' sx={{ backgroundColor: "#F3F6F9", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Box component='div' sx={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
                    <Typography as={Link} to={`/autoRead`}>To AutoRead Testing</Typography>
                    <Typography as={Link} to={`/PreCuedList`}>To Pre-cued List Testing</Typography>
                </Box>
                <RoutersContainer />
            </Box>
        </TtsProvider>
    )
}

export default RenderRoutes