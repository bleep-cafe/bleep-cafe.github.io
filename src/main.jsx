import "./index.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Index from "./routes/Index"
import Playground from "./routes/Playground"
import NotFound from "./routes/NotFound"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/play" element={<Playground />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
