import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { ActionTypes } from './useListbox.types';
import areArraysEqual from '../utils/areArraysEqual';

/**
 * Gets the current state. If the selectedValue is controlled,
 * the `value` prop is the source of truth instead of the internal state.
 */
function getControlledState(internalState, props) {
  if (props.value !== undefined) {
    return _extends({}, internalState, {
      selectedValue: props.value
    });
  }
  return internalState;
}
function areOptionsEqual(option1, option2, optionComparer) {
  if (option1 === option2) {
    return true;
  }
  if (option1 === null || option2 === null) {
    return false;
  }
  return optionComparer(option1, option2);
}

/**
 * Triggers change event handlers (onChange and onHighlightChange) when reducer returns changed state.
 *
 * @param nextState The next state returned by the reducer.
 * @param internalPreviousState The previous state. If the component is controlled, this is merged with the props to determine the final state.
 * @param propsRef The props with defaults applied.
 * @param lastActionRef The last action that was dispatched.
 */
function useStateChangeDetection(nextState, internalPreviousState, propsRef, lastActionRef) {
  React.useEffect(() => {
    if (!propsRef.current || lastActionRef.current === null) {
      // Detect changes only if an action has been dispatched.
      return;
    }
    if (lastActionRef.current.type === ActionTypes.setValue || lastActionRef.current.type === ActionTypes.setHighlight) {
      // Don't fire change events when the value has been changed externally (e.g. by changing the controlled prop).
      return;
    }
    const previousState = getControlledState(internalPreviousState, propsRef.current);
    const {
      optionComparer,
      onChange
    } = propsRef.current;
    const previousSelectedValues = previousState?.selectedValues ?? [];
    const nextSelectedValues = nextState.selectedValues;
    if (!areArraysEqual(nextSelectedValues, previousSelectedValues, optionComparer)) {
      onChange?.(lastActionRef.current.event, nextSelectedValues);
    }

    // Fires the highlightChange event when reducer returns changed `highlightedValue`.
    if (!areOptionsEqual(internalPreviousState.highlightedValue, nextState.highlightedValue, propsRef.current.optionComparer)) {
      propsRef.current?.onHighlightChange?.(lastActionRef.current.event, nextState.highlightedValue);
    }
    lastActionRef.current = null;
  }, [nextState.selectedValues, nextState.highlightedValue, internalPreviousState, propsRef, lastActionRef]);
}

/**
 * @ignore - do not document.
 */
export default function useControllableReducer(internalReducer, externalReducer, props) {
  const {
    value,
    defaultValue
  } = props.current;
  const actionRef = React.useRef(null);
  const initialSelectedValues = (value === undefined ? defaultValue : value) ?? [];
  const initialState = {
    highlightedValue: null,
    selectedValues: initialSelectedValues
  };
  const combinedReducer = React.useCallback((state, action) => {
    actionRef.current = action;
    if (externalReducer) {
      return externalReducer(getControlledState(state, action.props), action);
    }
    return internalReducer(getControlledState(state, action.props), action);
  }, [externalReducer, internalReducer]);
  const [nextState, dispatch] = React.useReducer(combinedReducer, initialState);
  const dispatchWithProps = React.useCallback(action => {
    dispatch(_extends({
      props: props.current
    }, action));
  }, [dispatch, props]);
  const previousState = React.useRef(initialState);
  React.useEffect(() => {
    previousState.current = nextState;
  }, [previousState, nextState]);
  useStateChangeDetection(nextState, previousState.current, props, actionRef);
  return [getControlledState(nextState, props.current), dispatchWithProps];
}