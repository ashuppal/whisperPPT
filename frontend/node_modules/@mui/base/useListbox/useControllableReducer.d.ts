import * as React from 'react';
import { ListboxAction, ListboxReducer, ListboxState, UseListboxParametersWithDefaults } from './useListbox.types';
/**
 * @ignore - do not document.
 */
export default function useControllableReducer<TOption>(internalReducer: ListboxReducer<TOption>, externalReducer: ListboxReducer<TOption> | undefined, props: React.RefObject<UseListboxParametersWithDefaults<TOption>>): [ListboxState<TOption>, (action: ListboxAction<TOption>) => void];
