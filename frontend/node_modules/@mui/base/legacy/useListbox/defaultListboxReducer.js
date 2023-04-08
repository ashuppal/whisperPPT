import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { ActionTypes } from './useListbox.types';
var pageSize = 5;
function findValidOptionToHighlight(index, lookupDirection, options, focusDisabled, isOptionDisabled, wrapAround) {
  if (options.length === 0 || options.every(function (o, i) {
    return isOptionDisabled(o, i);
  })) {
    return -1;
  }
  var nextFocus = index;
  for (;;) {
    // No valid options found
    if (!wrapAround && lookupDirection === 'next' && nextFocus === options.length || !wrapAround && lookupDirection === 'previous' && nextFocus === -1) {
      return -1;
    }
    var nextFocusDisabled = focusDisabled ? false : isOptionDisabled(options[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === 'next' ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + options.length) % options.length;
      }
    } else {
      return nextFocus;
    }
  }
}
function getNewHighlightedOption(options, previouslyHighlightedOption, diff, highlightDisabledOptions, isOptionDisabled, disableListWrap, optionComparer) {
  var _options$nextIndex;
  var maxIndex = options.length - 1;
  var defaultHighlightedIndex = -1;
  var previouslyHighlightedIndex = previouslyHighlightedOption == null ? -1 : options.findIndex(function (option) {
    return optionComparer(option, previouslyHighlightedOption);
  });
  var nextIndexCandidate;
  var lookupDirection;
  var wrapAround;
  switch (diff) {
    case 'reset':
      if (defaultHighlightedIndex === -1) {
        return null;
      }
      nextIndexCandidate = 0;
      lookupDirection = 'next';
      wrapAround = false;
      break;
    case 'start':
      nextIndexCandidate = 0;
      lookupDirection = 'next';
      wrapAround = false;
      break;
    case 'end':
      nextIndexCandidate = maxIndex;
      lookupDirection = 'previous';
      wrapAround = false;
      break;
    default:
      {
        var newIndex = previouslyHighlightedIndex + diff;
        wrapAround = !disableListWrap;
        if (newIndex < 0) {
          if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(diff) > 1) {
            nextIndexCandidate = 0;
            lookupDirection = 'next';
          } else {
            nextIndexCandidate = maxIndex;
            lookupDirection = 'previous';
          }
        } else if (newIndex > maxIndex) {
          if (!wrapAround || Math.abs(diff) > 1) {
            nextIndexCandidate = maxIndex;
            lookupDirection = 'previous';
          } else {
            nextIndexCandidate = 0;
            lookupDirection = 'next';
          }
        } else {
          nextIndexCandidate = newIndex;
          lookupDirection = diff >= 0 ? 'next' : 'previous';
        }
      }
  }
  var nextIndex = findValidOptionToHighlight(nextIndexCandidate, lookupDirection, options, highlightDisabledOptions, isOptionDisabled, wrapAround);
  return (_options$nextIndex = options[nextIndex]) != null ? _options$nextIndex : null;
}
function moveHighlight(previouslyHighlightedOption, diff, props) {
  var options = props.options,
    isOptionDisabled = props.isOptionDisabled,
    disableListWrap = props.disableListWrap,
    disabledItemsFocusable = props.disabledItemsFocusable,
    optionComparer = props.optionComparer;
  return getNewHighlightedOption(options, previouslyHighlightedOption, diff, disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : function () {
    return false;
  }, disableListWrap != null ? disableListWrap : false, optionComparer != null ? optionComparer : function (o1, o2) {
    return o1 === o2;
  });
}
function toggleSelection(option, selectedOptions, selectionLimit, optionComparer) {
  if (selectionLimit === 0) {
    return [];
  }

  // Selection limit = 1 is a special case - we don't want to allow deselecting the option.
  if (selectionLimit === 1) {
    if (optionComparer(selectedOptions[0], option)) {
      return selectedOptions;
    }
    return [option];
  }

  // The toggled option is selected; remove it from the selection.
  if (selectedOptions.some(function (so) {
    return optionComparer(so, option);
  })) {
    return selectedOptions.filter(function (so) {
      return !optionComparer(so, option);
    });
  }

  // The toggled option is not selected and the selected array is shorter than the limit - add to the selection.
  if (selectionLimit === null || selectedOptions.length < selectionLimit) {
    return [].concat(_toConsumableArray(selectedOptions), [option]);
  }

  // Truncate the selection to the limit (discard items with lower indexes).
  var newSelection = selectedOptions.slice(selectedOptions.length - selectionLimit + 1);
  newSelection.push(option);
  return newSelection;
}
function handleOptionSelection(option, state, props) {
  var _props$optionComparer = props.optionComparer,
    optionComparer = _props$optionComparer === void 0 ? function (o, v) {
      return o === v;
    } : _props$optionComparer,
    _props$isOptionDisabl = props.isOptionDisabled,
    isOptionDisabled = _props$isOptionDisabl === void 0 ? function () {
      return false;
    } : _props$isOptionDisabl,
    selectionLimit = props.selectionLimit;
  var selectedValues = state.selectedValues;
  var optionIndex = props.options.findIndex(function (o) {
    return props.optionComparer(option, o);
  });
  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }

  // if the option is already selected, remove it from the selection, otherwise add it
  var newSelectedValues = toggleSelection(option, selectedValues, selectionLimit, optionComparer);
  return {
    selectedValues: newSelectedValues,
    highlightedValue: option
  };
}
function handleKeyDown(event, state, parameters) {
  var previouslySelectedValue = state.highlightedValue;
  switch (event.key) {
    case 'Home':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 'start', parameters)
      });
    case 'End':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 'end', parameters)
      });
    case 'PageUp':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -pageSize, parameters)
      });
    case 'PageDown':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, pageSize, parameters)
      });
    case 'ArrowUp':
      // TODO: extend current selection with Shift modifier
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -1, parameters)
      });
    case 'ArrowDown':
      // TODO: extend current selection with Shift modifier
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 1, parameters)
      });
    case 'Enter':
    case ' ':
      if (state.highlightedValue === null) {
        return state;
      }
      return handleOptionSelection(state.highlightedValue, state, parameters);
    default:
      break;
  }
  return state;
}
function handleBlur(state) {
  return _extends({}, state, {
    highlightedValue: null
  });
}
var textCriteriaMatches = function textCriteriaMatches(nextFocus, searchString, stringifyOption) {
  var _stringifyOption;
  var text = (_stringifyOption = stringifyOption(nextFocus)) == null ? void 0 : _stringifyOption.trim().toLowerCase();
  if (!text || text.length === 0) {
    // Make option not navigable if stringification fails or results in empty string.
    return false;
  }
  return text.indexOf(searchString) === 0;
};
function handleTextNavigation(state, searchString, props) {
  var options = props.options,
    isOptionDisabled = props.isOptionDisabled,
    disableListWrap = props.disableListWrap,
    disabledItemsFocusable = props.disabledItemsFocusable,
    optionComparer = props.optionComparer,
    optionStringifier = props.optionStringifier;
  var startWithCurrentOption = searchString.length > 1;
  var nextOption = startWithCurrentOption ? state.highlightedValue : getNewHighlightedOption(options, state.highlightedValue, 1, disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : function () {
    return false;
  }, disableListWrap != null ? disableListWrap : false, optionComparer);

  // use `for` instead of `while` prevent infinite loop
  for (var _index = 0; _index < options.length; _index += 1) {
    // Return un-mutated state if looped back to the currently highlighted value
    if (!nextOption || !startWithCurrentOption && state.highlightedValue === nextOption) {
      return state;
    }
    if (textCriteriaMatches(nextOption, searchString, optionStringifier) && (!isOptionDisabled(nextOption, options.indexOf(nextOption)) || disabledItemsFocusable)) {
      // The nextOption is the element to be highlighted
      return _extends({}, state, {
        highlightedValue: nextOption
      });
    }
    // Move to the next element.
    nextOption = getNewHighlightedOption(options, nextOption, 1, disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : function () {
      return false;
    }, disableListWrap != null ? disableListWrap : false, optionComparer);
  }

  // No option match text search criteria
  return state;
}
function handleOptionsChange(options, state, props) {
  var _options$find, _state$selectedValues;
  var optionComparer = props.optionComparer;
  var newHighlightedOption = state.highlightedValue == null ? null : (_options$find = options.find(function (option) {
    return optionComparer(option, state.highlightedValue);
  })) != null ? _options$find : null;

  // exclude selected values that are no longer in the options
  var selectedValues = (_state$selectedValues = state.selectedValues) != null ? _state$selectedValues : [];
  var newSelectedValues = selectedValues.filter(function (selectedValue) {
    return options.some(function (option) {
      return optionComparer(option, selectedValue);
    });
  });
  return {
    highlightedValue: newHighlightedOption,
    selectedValues: newSelectedValues
  };
}
export default function defaultListboxReducer(state, action) {
  var type = action.type;
  switch (type) {
    case ActionTypes.keyDown:
      return handleKeyDown(action.event, state, action.props);
    case ActionTypes.optionClick:
      return handleOptionSelection(action.option, state, action.props);
    case ActionTypes.blur:
      return handleBlur(state);
    case ActionTypes.setValue:
      return _extends({}, state, {
        selectedValues: action.value
      });
    case ActionTypes.setHighlight:
      return _extends({}, state, {
        highlightedValue: action.highlight
      });
    case ActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, action.props);
    case ActionTypes.optionsChange:
      return handleOptionsChange(action.options, state, action.props);
    default:
      return state;
  }
}