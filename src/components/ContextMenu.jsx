import * as RadixContextMenu from "@radix-ui/react-context-menu"

export function Root({ content, className = "", children, ...props }) {
    return (
        <RadixContextMenu.Root>
            <RadixContextMenu.Trigger>
                {children}
            </RadixContextMenu.Trigger>

            <RadixContextMenu.Portal>
                <RadixContextMenu.Content
                    className={className + " bg-white rounded shadow-lg"}
                    {...props}
                >
                    {content}
                </RadixContextMenu.Content>
            </RadixContextMenu.Portal>
        </RadixContextMenu.Root>
    )
}

export function Item({ className = "", ...props }) {
    return <RadixContextMenu.Item
        className={`${className} group flex items-center pl-4 pr-2 w-56 
            hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-400 hover:text-white`
        }
        {...props}
    />
}

export function Divider({ className = "", ...props }) {
    return <RadixContextMenu.Separator
        className={className + " mx-4 my-1 h-[1px] bg-gradient-to-r from-indigo-500 to-blue-400"}
        {...props}
    />
}

export default Root
