import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export default function Checkbox({ checked, onCheckedChange, ...props }) {
    return (
        <RadixCheckbox.Root checked={checked} onCheckedChange={onCheckedChange} {...props} className="w-4 h-4 border rounded bg-neutral-50 border-neutral-200 mx-2 my-1">
            <RadixCheckbox.Indicator>
                <CheckIcon className="text-pink-500"/>
            </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
    )
}