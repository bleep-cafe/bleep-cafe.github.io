import "./index.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Index from "./routes/Index"
import NotFound from "./routes/NotFound"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
