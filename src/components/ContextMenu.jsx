import * as RadixContextMenu from "@radix-ui/react-context-menu"

export function Root({ content, className = "", children, ...props }) {
    return (
        <RadixContextMenu.Root>
            <RadixContextMenu.Trigger>
                {children}
            </RadixContextMenu.Trigger>

            <RadixContextMenu.Portal>
                <RadixContextMenu.Content
                    className={className + "  bg-neutral-700 text-white rounded shadow-lg"}
                    {...props}
                >
                    {content}
                </RadixContextMenu.Content>
            </RadixContextMenu.Portal>
        </RadixContextMenu.Root>
    )
}

export default Root

export function Item({ className = "", ...props }) {
    return <RadixContextMenu.Item
        className={className + " flex items-center px-2 w-40 hover:bg-neutral-900"}
        {...props}
    />
}
