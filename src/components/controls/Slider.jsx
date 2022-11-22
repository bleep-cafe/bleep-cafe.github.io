import * as RadixLabel from "@radix-ui/react-label"
import * as RadixSlider from "@radix-ui/react-slider"
import * as React from "react"

import { mean } from "../../util/maths"

export default function Slider({ label, value, min = 0, max = 100, step = 1, defaultValue = mean(min, max), onValueChange, formatter, ...props }) {
    return (
        <RadixLabel.Root {...props}>
            <span className="text-xs font-bold">
                {label}
            </span>

            <RadixSlider.Root
                className="relative flex items-center w-full h-4"
                defaultValue={[defaultValue]}
                min={min}
                max={max}
                step={step}
                value={[value ?? defaultValue]}
                onValueChange={onValueChange}
                aria-label={label}>
                <RadixSlider.Track className="relative h-1 rounded grow bg-neutral-700">
                    <RadixSlider.Range className="absolute h-full rounded bg-gradient-to-r from-pink-400 to-pink-500" />
                </RadixSlider.Track>
                <RadixSlider.Thumb className="block w-4 h-4 bg-white rounded shadow-lg" />
            </RadixSlider.Root>

            <span className="block text-xs text-right">
                {formatter?.(value ?? defaultValue) ?? value ?? defaultValue}
            </span>
        </RadixLabel.Root>
    )
}
