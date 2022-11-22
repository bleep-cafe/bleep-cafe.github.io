import * as RadixTooltip from "@radix-ui/react-tooltip"

import React from "react"

export default function Tooltip({ children, content, side, ...props }) {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root {...props}>
                <RadixTooltip.Trigger asChild>
                    {children}
                </RadixTooltip.Trigger>

                <RadixTooltip.Portal>
                    <RadixTooltip.Content className="w-64 px-4 py-2 text-sm text-white rounded-lg shadow bg-neutral-700" side={side || "top"} sideOffset={5}>
                        {content}
                        <RadixTooltip.Arrow className="shadow fill-neutral-700" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}
