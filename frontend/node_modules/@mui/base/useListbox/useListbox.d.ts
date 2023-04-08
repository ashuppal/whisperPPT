import { UseListboxParameters, OptionState, UseListboxOptionSlotProps, UseListboxRootSlotProps } from './useListbox.types';
import { EventHandlers } from '../utils/types';
/**
 * @ignore - internal hook.
 *
 * The useListbox is a lower-level utility that is used to build a listbox component.
 * It's used to manage the state of the listbox and its options.
 * Contains the logic for keyboard navigation, selection, and focus management.
 */
export default function useListbox<TOption>(props: UseListboxParameters<TOption>): {
    getRootProps: <TOther extends EventHandlers = {}>(otherHandlers?: TOther) => UseListboxRootSlotProps<TOther>;
    getOptionProps: <TOther_1 extends EventHandlers = {}>(option: TOption, otherHandlers?: TOther_1) => UseListboxOptionSlotProps<TOther_1>;
    getOptionState: (option: TOption) => OptionState;
    highlightedOption: TOption | null;
    selectedOption: TOption[];
    setSelectedValue: (values: TOption[]) => void;
    setHighlightedValue: (option: TOption | null) => void;
};
