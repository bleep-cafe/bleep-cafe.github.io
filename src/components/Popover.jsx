import * as RadixPopover from "@radix-ui/react-popover"

import { Cross2Icon } from "@radix-ui/react-icons"
import React from "react"

export default function Popover({ children, content, side, ...props }) {
    return (
        <RadixPopover.Root {...props}>
            <RadixPopover.Trigger asChild>
                {children}
            </RadixPopover.Trigger>

            <RadixPopover.Portal>
                <RadixPopover.Content className="relative w-64 px-4 py-2 text-sm text-white rounded-lg shadow bg-neutral-700" side={side || "top"} sideOffset={5}>
                    <div className="mt-6">{content}</div>

                    <RadixPopover.Close className="absolute top-0 right-0 p-1 m-2 transition rounded-full hover:bg-neutral-600" aria-label="Close">
                        <Cross2Icon />
                    </RadixPopover.Close>
                    <RadixPopover.Arrow className="shadow fill-neutral-700" />
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    )
}
