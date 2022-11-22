import * as RadixLabel from "@radix-ui/react-label"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"
import * as React from "react"

export default function Radio({ label, value, options = [], defaultValue = options[0], onValueChange, ...props }) {
    return (
        <div {...props}>
            <span className="mb-2 text-xs font-bold">
                {label}
            </span>

            <RadixRadioGroup.Root
                className="flex flex-col gap-2"
                value={value}
                defaultValue={defaultValue}
                aria-label={label}
                onValueChange={onValueChange}>
                {options.map(option => <RadioItem value={option} key={option} />)}
            </RadixRadioGroup.Root>
        </div>
    )
}

function RadioItem({ value, ...props }) {
    return (
        <RadixLabel.Root className="flex items-center" {...props}>
            <RadixRadioGroup.Item className="w-4 h-4 border rounded-full bg-neutral-50 border-neutral-200" value={value}>
                <RadixRadioGroup.Indicator className="
                    flex items-center justify-center w-full h-full relative 
                    after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-pink-500"
                />
            </RadixRadioGroup.Item>

            <span className="ml-2 text-xs">
                {value}
            </span>
        </RadixLabel.Root>
    )
}
