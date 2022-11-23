import { useContext } from "react";
import { GraphContext } from "../contexts/graphContext";

export function useGraphStore(...args) {
    return useContext(GraphContext)(...args);
}
