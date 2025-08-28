(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/api.js
  async function getStops() {
    const res = await fetch("/stops");
    if (!res.ok)
      throw new Error("Failed to fetch stops");
    return res.json();
  }
  async function createStop(location) {
    const res = await fetch("/stops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location })
    });
    if (!res.ok)
      throw new Error("Failed to create stop");
    return res.json();
  }
  async function removeStop(id) {
    const res = await fetch(`/stops/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok)
      throw new Error("Failed to delete stop");
    return res.json();
  }

  // node_modules/@moaqzdev/toast/dist/utils.mjs
  var o = "@moaqzdev/toast";
  var i = { _dispatchToast(s6, t7) {
    Object.assign(t7, { type: s6 });
    const a5 = new CustomEvent(o, { detail: t7 });
    document.dispatchEvent(a5);
  }, success(s6) {
    this._dispatchToast("success", s6);
  }, error(s6) {
    this._dispatchToast("error", s6);
  }, warning(s6) {
    this._dispatchToast("warning", s6);
  }, info(s6) {
    this._dispatchToast("info", s6);
  }, confirm(s6) {
    this._dispatchToast("confirm", s6);
  } };

  // node_modules/active-table/dist/activeTable.js
  var GenericElementUtils = class {
    static hideElements(...D) {
      D.forEach((w2) => w2.style.display = "none");
    }
    static getStyleWidth(D, w2) {
      return Number.parseFloat(D.style[w2]) || 0;
    }
    static doesElementExistInDom(D) {
      return !!D.parentElement;
    }
    static isFirstChildInParent(D) {
      var w2;
      return ((w2 = D.parentElement) == null ? void 0 : w2.firstChild) === D;
    }
  };
  GenericElementUtils.NOT_SELECTABLE_CLASS = "not-selectable";
  var SVGIconUtils = class {
    // REF-10
    static createSVGElement(D) {
      return new DOMParser().parseFromString(D, "image/svg+xml").documentElement;
    }
  };
  SVGIconUtils.WHITE_FILTER = `brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(3877%)
    hue-rotate(184deg) brightness(103%) contrast(100%)`;
  SVGIconUtils.LIGHT_GREY_FILTER = `brightness(0) saturate(100%) invert(68%) sepia(0%) saturate(317%)
    hue-rotate(84deg) brightness(92%) contrast(93%)`;
  SVGIconUtils.HEADER_FILTER = `brightness(0) saturate(100%) invert(34%) sepia(0%) saturate(1075%)
    hue-rotate(211deg) brightness(96%) contrast(90%)`;
  SVGIconUtils.DROPDOWN_ITEM_FILTER = `brightness(0) saturate(100%) invert(7%) sepia(23%) saturate(258%)
    hue-rotate(63deg) brightness(99%) contrast(97%)`;
  var StaticDropdown = class {
  };
  StaticDropdown.DROPDOWN_CLASS = "static-dropdown";
  StaticDropdown.ITEM_CLASS = "static-dropdown-item";
  StaticDropdown.ACTIVE_ITEM_CLASS = "active-static-dropdown-item";
  var _DropdownItemHighlightUtils = class it {
    // Accepted behaviour - fadeFocused is triggered twice when moving to a different item
    static fadeCurrentlyHighlighted(D) {
      const w2 = D.dropdownItem;
      w2 && (w2.classList.contains(StaticDropdown.ACTIVE_ITEM_CLASS) && w2.classList.remove(StaticDropdown.ACTIVE_ITEM_CLASS), w2.style.backgroundColor = "", delete D.dropdownItem);
    }
    static highlightNew(D, w2) {
      it.fadeCurrentlyHighlighted(D), w2.focus(), D.dropdownItem = w2, w2.classList.contains(StaticDropdown.ITEM_CLASS) ? w2.classList.add(StaticDropdown.ACTIVE_ITEM_CLASS) : w2.classList.contains(DropdownItem.DROPDOWN_INPUT_CLASS) || (w2.style.backgroundColor = it.HOVER_BACKGROUND_COLOR);
    }
  };
  _DropdownItemHighlightUtils.HOVER_BACKGROUND_COLOR = "#eaeaea";
  var DropdownItemHighlightUtils = _DropdownItemHighlightUtils;
  var DropdownItemEvents = class {
    // prettier-ignore
    static addItemEvents(D, w2) {
      w2.addEventListener(
        "mouseenter",
        DropdownItemHighlightUtils.highlightNew.bind(this, D, w2)
      ), w2.addEventListener(
        "mouseleave",
        DropdownItemHighlightUtils.fadeCurrentlyHighlighted.bind(this, D)
      );
    }
  };
  var _DropdownItem = class ee {
    static toggleItem(D, w2) {
      D.style.display = w2 ? ee.DISPLAY : ee.HIDDEN;
    }
    static isDisplayed(D) {
      return D.style.display === ee.DISPLAY;
    }
    static createDropdownItemBaseElement(D) {
      const w2 = document.createElement(D);
      return w2.classList.add(ee.DROPDOWN_ITEM_IDENTIFIER), w2;
    }
    static createItem(D) {
      const w2 = ee.createDropdownItemBaseElement("div");
      return D && (w2.tabIndex = D.children.length), w2.classList.add(ee.DROPDOWN_ITEM_CLASS, GenericElementUtils.NOT_SELECTABLE_CLASS), w2;
    }
    // no need to sanitize paste as input element already does it
    static addInputItem(D, w2) {
      const O = ee.createItem(w2);
      O.classList.add(ee.DROPDOWN_INPUT_ITEM_CLASS);
      const x2 = ee.createDropdownItemBaseElement("input");
      x2.classList.add(ee.DROPDOWN_INPUT_CLASS), O.appendChild(x2), w2.appendChild(O), DropdownItemEvents.addItemEvents(D._activeOverlayElements, x2);
    }
    // REF-10
    static insertIcon(D, w2) {
      const { svgString: O, containerStyles: x2 } = w2, U = document.createElement("div");
      U.classList.add(ee.DROPDOWN_ITEM_ICON_CONTAINER_CLASS), Object.assign(U.style, x2 == null ? void 0 : x2.dropdown);
      const F = SVGIconUtils.createSVGElement(O);
      F.style.filter = SVGIconUtils.DROPDOWN_ITEM_FILTER, U.appendChild(F), D.insertBefore(U, D.children[0]);
    }
    static addPlaneButtonItem(D, w2, O) {
      const x2 = ee.createItem(D), U = ee.createDropdownItemBaseElement("div");
      return U.innerText = w2 || ee.DROPDOWN_ITEM_EMPTY_PLACEHOLDER_TEXT, w2.trim() === "" && U.classList.add(ee.DROPDOWN_ITEM_EMPTY_CLASS), x2.append(U), D && (O !== void 0 && D.children[O] ? D.insertBefore(x2, D.children[O]) : D.appendChild(x2)), x2;
    }
    // prettier-ignore
    static createButtonItemNoEvents(D, w2, ...O) {
      const x2 = ee.addPlaneButtonItem(D, w2.text);
      return w2.iconSettings && ee.insertIcon(x2, w2.iconSettings), O.length > 0 && x2.classList.add(...O), x2;
    }
    static addTitle(D, w2) {
      const O = ee.createDropdownItemBaseElement("div");
      O.classList.add(ee.DROPDOWN_ITEM_CLASS, ee.DROPDOWN_TITLE_ITEM_CLASS), O.innerText = w2, D.appendChild(O);
    }
    static addDivider(D) {
      const w2 = ee.createDropdownItemBaseElement("div");
      w2.classList.add(ee.DROPDOWN_ITEM_DIVIDER_CLASS), D.appendChild(w2);
    }
    // prettier-ignore
    static addButtonItem(D, w2, O, ...x2) {
      const U = ee.createButtonItemNoEvents(w2, O, ...x2);
      return DropdownItemEvents.addItemEvents(D._activeOverlayElements, U), U;
    }
    // prettier-ignore
    static addNewButtonItems(D, w2, O) {
      return O.map((x2) => ee.addButtonItem(D, w2, x2));
    }
    static addButtonItemElements(D, w2, O) {
      O.forEach((x2) => {
        x2.tabIndex = w2.children.length, w2.appendChild(x2), DropdownItemEvents.addItemEvents(D._activeOverlayElements, x2);
      });
    }
    static removeItems(D) {
      Array.from(D.children).forEach((w2) => w2.remove());
    }
    static doesElementContainItemClass(D) {
      return D.classList.contains(ee.DROPDOWN_ITEM_IDENTIFIER);
    }
    static doesElementContainInputClass(D) {
      return D.classList.contains(ee.DROPDOWN_INPUT_CLASS);
    }
    static getInputElement(D) {
      return D.getElementsByClassName(ee.DROPDOWN_INPUT_ITEM_CLASS)[0];
    }
    static toggleUsability(D, w2) {
      const O = D.children[0];
      w2 ? (D.classList.remove(ee.DISABLED_ITEM_CLASS), O.style.filter = "") : (D.classList.add(ee.DISABLED_ITEM_CLASS), O.style.filter = SVGIconUtils.LIGHT_GREY_FILTER);
    }
  };
  _DropdownItem.DROPDOWN_ITEM_CLASS = "dropdown-item";
  _DropdownItem.DISABLED_ITEM_CLASS = "dropdown-disabled-item";
  _DropdownItem.ACTIVE_ITEM_CLASS = "active-dropdown-item";
  _DropdownItem.DROPDOWN_INPUT_CLASS = "dropdown-input";
  _DropdownItem.DROPDOWN_ITEM_ICON_CONTAINER_CLASS = "dropdown-item-icon-container";
  _DropdownItem.DROPDOWN_INPUT_ITEM_CLASS = "dropdown-input-item";
  _DropdownItem.DROPDOWN_TITLE_ITEM_CLASS = "dropdown-title-item";
  _DropdownItem.DROPDOWN_ITEM_DIVIDER_CLASS = "dropdown-item-divider";
  _DropdownItem.DROPDOWN_ITEM_EMPTY_CLASS = "dropdown-item-empty";
  _DropdownItem.DROPDOWN_ITEM_EMPTY_PLACEHOLDER_TEXT = "...";
  _DropdownItem.DROPDOWN_ITEM_IDENTIFIER = "dropdown-item-identifier";
  _DropdownItem.HIDDEN = "none";
  _DropdownItem.DISPLAY = "";
  var DropdownItem = _DropdownItem;
  var OuterDropdownItem = class {
    static unsetHoverColors(D) {
      D.forEach((w2) => w2.style.backgroundColor = "");
    }
    static unsetActiveItem(D) {
      const w2 = D.getElementsByClassName(DropdownItem.ACTIVE_ITEM_CLASS)[0];
      w2 == null || w2.classList.remove(DropdownItem.ACTIVE_ITEM_CLASS);
    }
    static setActive(D, w2) {
      const O = D.find((x2) => x2.innerText === w2);
      O == null || O.classList.add(DropdownItem.ACTIVE_ITEM_CLASS);
    }
    static setActiveByIndex(D, w2) {
      D[w2].classList.add(DropdownItem.ACTIVE_ITEM_CLASS);
    }
  };
  var ElementStyle = class _ElementStyle {
    static setStyle(D, w2, O) {
      D.style[w2] = O;
    }
    // prettier-ignore
    static moveStyles(D, w2, ...O) {
      O.forEach((x2) => {
        D.style[x2] && _ElementStyle.setStyle(w2, x2, D.style[x2]);
      });
    }
    static unsetStyle(D, w2) {
      const O = Object.keys(w2).reduce((x2, U) => (x2[U] = "", x2), {});
      Object.assign(D.style, O);
    }
    static unsetAllCSSStates(D, w2) {
      w2.click && _ElementStyle.unsetStyle(D, w2.click), w2.hover && _ElementStyle.unsetStyle(D, w2.hover), w2.default && _ElementStyle.unsetStyle(D, w2.default);
    }
    static generateStatefulCSS(D, w2, O) {
      const x2 = D.default || {}, U = Object.assign(JSON.parse(JSON.stringify({ ...x2, ...w2 })), D == null ? void 0 : D.hover), F = Object.assign(JSON.parse(JSON.stringify({ ...U, ...O })), D == null ? void 0 : D.click);
      return { default: x2, hover: U, click: F };
    }
  };
  var _ToggleableElement = class Te {
    static set(D, w2) {
      D.classList.add(Te.ACTIVE_BUTTON_CLASS), Object.assign(D.style, w2);
    }
    static unset(D, w2) {
      D.classList.remove(Te.ACTIVE_BUTTON_CLASS), ElementStyle.unsetStyle(D, w2);
    }
    static toggleActive(D, w2) {
      const O = !!D.classList.contains(Te.ACTIVE_BUTTON_CLASS);
      return O ? (Te.unset(D, w2), D.dispatchEvent(new MouseEvent("mouseenter"))) : Te.set(D, w2), O;
    }
    static unsetActive(D, w2) {
      !!D.classList.contains(Te.ACTIVE_BUTTON_CLASS) && (Te.unset(D, w2), D.dispatchEvent(new MouseEvent("mouseleave")));
    }
    static setActive(D, w2) {
      !!D.classList.contains(Te.ACTIVE_BUTTON_CLASS) || Te.set(D, w2);
    }
  };
  _ToggleableElement.ACTIVE_BUTTON_CLASS = "toggleable-button-active";
  _ToggleableElement.AUTO_STYLING_CLASS = "toggleable-button-auto-styling";
  var ToggleableElement = _ToggleableElement;
  var _Dropdown = class ve {
    static createBase() {
      const D = document.createElement("div");
      return D.classList.add(ve.DROPDOWN_CLASS), D.style.width = `${ve.DROPDOWN_WIDTH}px`, D.style.paddingTop = ve.DROPDOWN_VERTICAL_PX, D.style.paddingBottom = ve.DROPDOWN_VERTICAL_PX, ve.hide(D), D;
    }
    static isDisplayed(D) {
      return (D == null ? void 0 : D.style.display) === ve.CSS_DISPLAY_VISIBLE;
    }
    static display(...D) {
      D.forEach((w2) => {
        w2.style.display = ve.CSS_DISPLAY_VISIBLE;
      });
    }
    static hide(...D) {
      GenericElementUtils.hideElements(...D);
    }
    static isPartOfDropdownElement(D) {
      return D.classList.contains(ve.DROPDOWN_CLASS) || DropdownItem.doesElementContainItemClass(D);
    }
  };
  _Dropdown.DROPDOWN_CLASS = "active-table-dropdown";
  _Dropdown.CSS_DISPLAY_VISIBLE = "grid";
  _Dropdown.DROPDOWN_WIDTH = 176;
  _Dropdown.DROPDOWN_VERTICAL_PX = "4px";
  var Dropdown = _Dropdown;
  var _OuterDropdownButtonEvents = class xe {
    static mouseClickButton(D, w2, O) {
      const { element: x2 } = w2;
      x2.classList.contains(xe.DO_NOT_DISPLAY_DROPDOWN_CLASS) ? x2.classList.remove(xe.DO_NOT_DISPLAY_DROPDOWN_CLASS) : O(D, w2);
    }
    static mouseDownButton(D) {
      const { element: w2, button: O, activeButtonStyle: x2 } = D;
      Dropdown.isDisplayed(w2) && (w2.classList.add(xe.DO_NOT_DISPLAY_DROPDOWN_CLASS), ToggleableElement.unsetActive(O, x2));
    }
    static getDisplayFunc(D) {
      return D.startsWith("top") ? OuterDropdownElement.display : OuterDropdownElement.displayReactToBottomVisibility;
    }
    // prettier-ignore
    static set(D, w2, O, x2, U) {
      const F = U || xe.getDisplayFunc(O);
      w2.addEventListener("mousedown", xe.mouseDownButton.bind(this, x2)), w2.addEventListener(
        "click",
        xe.mouseClickButton.bind(this, D, x2, F)
      );
    }
  };
  _OuterDropdownButtonEvents.DO_NOT_DISPLAY_DROPDOWN_CLASS = "do-not-display-class";
  var OuterDropdownButtonEvents = _OuterDropdownButtonEvents;
  var VH = "vh";
  var VW = "vw";
  var LITElementTypeConverters = class {
    static convertToBoolean(Y) {
      return typeof Y == "string" ? Y === "true" : !!Y;
    }
    static convertToFunction(value) {
      if (typeof value == "function")
        return value;
      if (typeof value == "string") {
        const evaluatedExpression = eval(value);
        if (typeof evaluatedExpression == "function")
          return evaluatedExpression;
      }
      return () => {
      };
    }
  };
  var ObjectUtils = class {
    static createTwoWayObject(D) {
      return Object.keys(D).forEach((w2) => {
        D[D[w2]] = w2;
      }), D;
    }
    static convertStringToFunction(D, w2) {
      typeof D[w2] == "string" && (D[w2] = LITElementTypeConverters.convertToFunction(
        D[w2]
      ));
    }
    // method to check if value is not nullish
    static areValuesFullyDefined(...D) {
      return D.findIndex((O) => O == null) === -1;
    }
    static removeProperties(D, ...w2) {
      w2.forEach((O) => {
        delete D[O];
      });
    }
  };
  var RegexUtils = class {
    static extractIntegerStrs(D) {
      return D.match(/\d+/g);
    }
    static extractFloatStrs(D) {
      return D.match(/-?\d+(\.\d+)?$/g);
    }
  };
  var StringDimensionUtils = class _StringDimensionUtils {
    static processDimension(D, w2) {
      return D < w2 ? w2 : D;
    }
    // prettier-ignore
    static processPercentageDimension(D, w2, O, x2) {
      w2 > 100 && (w2 = 100);
      const F = (O ? D.getBoundingClientRect().width : D.offsetHeight) * (w2 / 100);
      return { number: _StringDimensionUtils.processDimension(F, x2), isPercentage: true };
    }
    // can also parse numbers incase the client used that
    // if this returns a number 0 for a %, the likelyhood is that the parent element does not have that dimension set
    // prettier-ignore
    static generateNumberDimensionFromClientString(D, w2, O, x2, U = 0) {
      const F = w2[O], W = typeof F == "string";
      let G = W ? Number(RegexUtils.extractIntegerStrs(F)[0]) : F;
      if (W) {
        if (F.includes("%"))
          return _StringDimensionUtils.processPercentageDimension(D, G, x2, U);
        F.includes(VH) ? G = window.innerHeight * (G / 100) : F.includes(VW) && (G = window.innerWidth * (G / 100));
      }
      return { number: _StringDimensionUtils.processDimension(G, U), isPercentage: false };
    }
    static removeAllDimensions(D) {
      if (D)
        return ObjectUtils.removeProperties(D, "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight"), D;
    }
  };
  var PageButtonStyle = class _PageButtonStyle {
    // prettier-ignore
    static unsetAllCSSStates(D, w2, O) {
      ElementStyle.unsetAllCSSStates(D, w2[O]);
    }
    static unsetAll(D, w2, O) {
      D.classList.contains(w2.activeButtonClass) ? _PageButtonStyle.unsetAllCSSStates(D, w2, "activeButton") : D.classList.contains(PageButtonElement.DISABLED_PAGINATION_BUTTON_CLASS) ? ElementStyle.unsetStyle(D, w2.disabledButtons) : _PageButtonStyle.unsetAllCSSStates(D, w2, O ? "actionButtons" : "buttons");
    }
    static setDefault(D, w2, O) {
      _PageButtonStyle.unsetAll(D, w2, O), O ? Object.assign(D.style, w2.actionButtons.default) : Object.assign(D.style, w2.buttons.default);
    }
    // prettier-ignore
    static setActive(D, w2, O) {
      O && (_PageButtonStyle.unsetAllCSSStates(O, w2, "activeButton"), Object.assign(O.style, w2.buttons.default)), D.classList.contains(PageButtonElement.DISABLED_PAGINATION_BUTTON_CLASS) ? ElementStyle.unsetStyle(D, w2.disabledButtons) : _PageButtonStyle.unsetAllCSSStates(D, w2, "buttons"), Object.assign(D.style, w2.activeButton.default);
    }
    static setDisabled(D, w2, O) {
      _PageButtonStyle.setDefault(D, w2, O), Object.assign(D.style, w2.disabledButtons);
    }
    static mouseDown(D, w2, O) {
      D.classList.contains(w2.activeButtonClass) ? Object.assign(D.style, w2.activeButton.click) : O ? Object.assign(D.style, w2.actionButtons.click) : Object.assign(D.style, w2.buttons.click), PaginationVisibleButtonsUtils.overrideOnMouseEvent(D, w2);
    }
    static mouseEnter(D, w2, O) {
      D.classList.contains(PageButtonElement.DISABLED_PAGINATION_BUTTON_CLASS) || (D.classList.contains(w2.activeButtonClass) ? (_PageButtonStyle.unsetAllCSSStates(D, w2, "activeButton"), Object.assign(D.style, w2.activeButton.default), Object.assign(D.style, w2.activeButton.hover)) : (_PageButtonStyle.setDefault(D, w2, O), O ? Object.assign(D.style, w2.actionButtons.hover) : Object.assign(D.style, w2.buttons.hover)), PaginationVisibleButtonsUtils.overrideOnMouseEvent(D, w2));
    }
    static mouseLeave(D, w2, O) {
      D.classList.contains(PageButtonElement.DISABLED_PAGINATION_BUTTON_CLASS) || (D.classList.contains(w2.activeButtonClass) ? (_PageButtonStyle.unsetAll(D, w2, false), Object.assign(D.style, w2.activeButton.default)) : _PageButtonStyle.setDefault(D, w2, O), PaginationVisibleButtonsUtils.overrideOnMouseEvent(D, w2));
    }
  };
  var _FilterInputElement = class Pe {
    static setPlaceholder(D, w2, O) {
      if (w2 && w2 !== "") {
        const x2 = O || Pe.DEFAULT_PLACEHOLDER_TEMPLATE;
        D.placeholder = x2.replace(Pe.TEMPLATE_VARIABLE, w2);
      } else
        D.placeholder = Pe.DEFAULT_PLACEHOLDER;
    }
    static createElement(D, w2, O) {
      const x2 = document.createElement("input");
      x2.classList.add(Pe.INPUT_CLASS);
      const U = (O == null ? void 0 : O.placeholderColor) || "#656565";
      return x2.style.setProperty("--active-table-filter-placeholder-color", U), Object.assign(x2.style, O == null ? void 0 : O.input), Pe.setPlaceholder(x2, D, w2), x2;
    }
    static create(D, w2, O) {
      const x2 = FilterInternalUtils.generateDefaultHeaderName(O, D.defaultColumnHeaderName), U = Pe.createElement(x2, D.placeholderTemplate, w2.styles);
      return D.inputElement = U, U;
    }
  };
  _FilterInputElement.INPUT_CLASS = "filter-rows-input";
  _FilterInputElement.TEMPLATE_VARIABLE = "{headerName}";
  _FilterInputElement.DEFAULT_PLACEHOLDER = "Filter";
  _FilterInputElement.DEFAULT_PLACEHOLDER_TEMPLATE = `Filter ${_FilterInputElement.TEMPLATE_VARIABLE}...`;
  var FilterInputElement = _FilterInputElement;
  var FilterInputEvents = class _FilterInputEvents {
    static unsetEvents(D) {
      D && D.forEach((w2) => w2.inputElement.oninput = () => {
      });
    }
    static updateSameInputValues(D, w2) {
      D.forEach((O) => {
        O.elements === w2.elements && (O.inputElement.value = w2.inputElement.value);
      });
    }
    static getFilterData(D) {
      return D.map((w2) => ({
        filterText: w2.isCaseSensitive ? w2.inputElement.value : w2.inputElement.value.toLocaleLowerCase(),
        colCells: w2.elements.slice(1),
        isCaseSensitive: w2.isCaseSensitive
      }));
    }
    static splitChunksAndExecute(D, w2) {
      const O = D.filter((U) => U.filterText !== "");
      O.length === 0 && O.push(D[0]);
      const x2 = Math.ceil(O[0].colCells.length / FilterInternalUtils.CHUNK_SIZE);
      for (let U = 0; U < x2; U += 1) {
        const F = U * FilterInternalUtils.CHUNK_SIZE, W = O.map((G) => ({ ...G, chunk: G.colCells.slice(F, F + FilterInternalUtils.CHUNK_SIZE) }));
        w2(W);
      }
    }
    static setEvents(D, w2, O) {
      if (!w2.elements)
        return;
      const x2 = FilterInternalUtils.getFilterFunc(D), U = O.filter((F) => F !== w2);
      w2.inputElement.oninput = () => {
        _FilterInputEvents.updateSameInputValues(U, w2), _FilterInputEvents.splitChunksAndExecute(_FilterInputEvents.getFilterData(O), x2);
      };
    }
  };
  var ARROW_DOWN_SVG_STRING = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
		<g transform="translate(-288.000000, 0.000000)">
			<g transform="translate(288.000000, 0.000000)">
				<path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" fill-rule="nonzero"></path>
				<path d="M12.7071,15.7072 C12.3166,16.0977 11.6834,16.0977 11.2929,15.7072 L5.63604,10.0503 C5.24551,9.65982 5.24551,9.02666 5.63604,8.63613 C6.02656,8.24561 6.65973,8.24561 7.05025,8.63613 L12,13.5859 L16.9497,8.63613 C17.3403,8.24561 17.9734,8.24561 18.364,8.63613 C18.7545,9.02666 18.7545,9.65982 18.364,10.0503 L12.7071,15.7072 Z" fill="#09244B"></path>
			</g>
		</g>
	</g>
</svg>`;
  var _FilterButtonElement = class mt {
    static create(D = {}) {
      const w2 = document.createElement("div");
      w2.classList.add("filter-rows-dropdown-button", ToggleableElement.AUTO_STYLING_CLASS), FilterElements.applyStatefulStyles(w2, mt.HOVER_STYLE, D);
      const O = SVGIconUtils.createSVGElement(ARROW_DOWN_SVG_STRING);
      return w2.appendChild(O), w2;
    }
  };
  _FilterButtonElement.ACTIVE_STYLE = {
    filter: (
      // eslint-disable-next-line max-len
      "brightness(0) saturate(100%) invert(14%) sepia(59%) saturate(2970%) hue-rotate(219deg) brightness(98%) contrast(126%)"
    )
  };
  _FilterButtonElement.HOVER_STYLE = {
    filter: (
      // eslint-disable-next-line max-len
      "brightness(0) saturate(100%) invert(31%) sepia(1%) saturate(75%) hue-rotate(327deg) brightness(100%) contrast(99%)"
    )
  };
  var FilterButtonElement = _FilterButtonElement;
  var OuterDropdownItemEvents = class {
    // prettier-ignore
    static itemMouseDownCommon(D, w2, O) {
      const { _activeOverlayElements: { outerContainerDropdown: x2 } } = this, U = O.target.innerText;
      if (!x2)
        return;
      D == null || D(this, U, O);
      const F = Array.from(x2.element.children);
      w2 == null || w2(this._activeOverlayElements, F), x2.element.classList.contains(StaticDropdown.DROPDOWN_CLASS) || (OuterDropdownItem.unsetActiveItem(x2.element), OuterDropdownItem.setActive(F, U), DropdownItemHighlightUtils.fadeCurrentlyHighlighted(this._activeOverlayElements));
    }
  };
  var FilterDropdownItemEvents = class _FilterDropdownItemEvents {
    static resetInput(D, w2, O, x2) {
      const U = x2.target, F = U.tabIndex === -1 ? U.parentElement.tabIndex : U.tabIndex, W = w2._columnsDetails[F].elements;
      W !== D.elements && (D.elements = W, FilterInternalUtils.resetInput(w2, D), FilterInternalUtils.unsetFilter(D.inputElement));
    }
    static setEvents(D, w2, O, x2) {
      const U = _FilterDropdownItemEvents.resetInput.bind(this, O), F = FilterDropdownElement.hide.bind(this, x2);
      w2.onmousedown = OuterDropdownItemEvents.itemMouseDownCommon.bind(D, U, F);
    }
  };
  var FilterDropdownItem = class _FilterDropdownItem {
    static setActive(D, w2, O) {
      const x2 = D._columnsDetails.findIndex((U) => U.elements === O.elements);
      OuterDropdownItem.setActiveByIndex(Array.from(w2.children), x2);
    }
    static addItems(D, w2, O) {
      var U;
      const x2 = (U = D.data[0]) == null ? void 0 : U.map((F) => String(F));
      x2 == null || x2.forEach((F) => {
        const W = { text: F }, G = DropdownItem.addButtonItem(D, w2.element, W);
        FilterDropdownItemEvents.setEvents(D, G, O, w2.activeButtonStyle);
      });
    }
    static populate(D, w2, O) {
      w2.element.replaceChildren(), _FilterDropdownItem.addItems(D, w2, O), _FilterDropdownItem.setActive(D, w2.element, O);
    }
  };
  var FilterDropdownElement = class _FilterDropdownElement {
    static hide(D, w2) {
      OuterDropdownElement.hide(w2, D);
    }
    // prettier-ignore
    static display(D, w2, O, x2) {
      O.data[0] && (FilterDropdownItem.populate(O, x2, w2), D(O, x2));
    }
    // prettier-ignore
    static create(D, w2, O, x2, U) {
      const F = FilterButtonElement.create(U);
      w2.appendChild(F);
      const W = (U == null ? void 0 : U.active) || {}, G = { ...FilterButtonElement.ACTIVE_STYLE, ...W }, X = _FilterDropdownElement.hide.bind(this, G, D._activeOverlayElements), K = OuterDropdownButtonEvents.getDisplayFunc(O), q = _FilterDropdownElement.display.bind(this, K, x2), { element: Q } = OuterDropdownElement.create(
        D,
        F,
        O,
        G,
        ["filter-rows-dropdown"],
        X,
        q
      );
      return Q;
    }
  };
  var StatefulCSSEvents = class _StatefulCSSEvents {
    static apply(D, w2, O) {
      ElementStyle.unsetAllCSSStates(O, D), Object.assign(O.style, w2);
    }
    static mouseUp(D, w2, O) {
      w2 && O.classList.contains(w2) || (_StatefulCSSEvents.apply(D, D.default, O), Object.assign(O.style, D.hover));
    }
    static mouseDown(D, w2, O) {
      w2 && O.classList.contains(w2) || Object.assign(O.style, D.click);
    }
    static mouseLeave(D, w2, O) {
      w2 && O.classList.contains(w2) || _StatefulCSSEvents.apply(D, D.default, O);
    }
    static mouseEnter(D, w2, O) {
      w2 && O.classList.contains(w2) || Object.assign(O.style, D.hover);
    }
    // can change the styling on another element by using the otherElement argument
    static getEvents(D, w2, O, x2) {
      const U = x2 || D;
      return {
        mouseenter: _StatefulCSSEvents.mouseEnter.bind(this, w2, O, U),
        mouseleave: _StatefulCSSEvents.mouseLeave.bind(this, w2, O, U),
        mousedown: _StatefulCSSEvents.mouseDown.bind(this, w2, O, U),
        mouseup: _StatefulCSSEvents.mouseUp.bind(this, w2, O, U)
      };
    }
    static setEvents(D, w2, O, x2) {
      const U = _StatefulCSSEvents.getEvents(D, w2, O, x2);
      return D.addEventListener("mouseenter", U.mouseenter), D.addEventListener("mouseleave", U.mouseleave), D.addEventListener("mousedown", U.mousedown), D.addEventListener("mouseup", U.mouseup), U;
    }
  };
  var FilterInputCaseEvents = class _FilterInputCaseEvents {
    static clickButton(D, w2, O) {
      const x2 = O || {}, U = ToggleableElement.toggleActive(D, { color: "#000000", ...x2 });
      w2.isCaseSensitive = !U, FilterInternalUtils.resetInput(this, w2), w2.inputElement.dispatchEvent(new Event("input"));
    }
    static setEvents(D, w2, O, x2) {
      w2.onclick = _FilterInputCaseEvents.clickButton.bind(D, w2, O, x2);
    }
  };
  var FilterInputCaseElement = class _FilterInputCaseElement {
    static createButton(D = {}) {
      const w2 = document.createElement("div");
      return w2.classList.add("filter-rows-case-button"), w2.textContent = "Aa", FilterElements.applyStatefulStyles(w2, { color: "#626262" }, D), w2;
    }
    static create(D, w2, O, x2) {
      const U = _FilterInputCaseElement.createButton(x2 == null ? void 0 : x2.caseIcon);
      w2.appendChild(U), setTimeout(() => {
        var F;
        return FilterInputCaseEvents.setEvents(D, U, O, (F = x2 == null ? void 0 : x2.caseIcon) == null ? void 0 : F.active);
      });
    }
  };
  var _FilterElements = class He {
    static createContainerElement(D) {
      const w2 = document.createElement("div");
      return w2.classList.add("filter-rows-container"), w2.style.order = String(D || 0), w2;
    }
    // the order at which the elements are added is very important - please check the css selectors
    // prettier-ignore
    static createComponent(D, w2, O) {
      var G;
      const x2 = O.position || He.DEFAULT_INPUT_POSITION, U = He.createContainerElement(O.order), F = FilterInternalUtils.addConfig(D, O);
      if (O.dropdown !== false) {
        const X = FilterDropdownElement.create(
          D,
          U,
          x2,
          F,
          (G = O.styles) == null ? void 0 : G.dropdownIcon
        );
        setTimeout(() => U.appendChild(X));
      }
      O.caseButton !== false && FilterInputCaseElement.create(D, U, F, O.styles);
      const W = FilterInputElement.create(F, O, D.data);
      U.appendChild(W), OuterContainerElements.addToContainer(x2, w2, U);
    }
    static create(D, w2) {
      typeof D.filter == "boolean" ? He.createComponent(D, w2, {}) : Array.isArray(D.filter) ? D.filter.forEach((O) => {
        He.createComponent(D, w2, O);
      }) : D.filter && He.createComponent(D, w2, D.filter), setTimeout(() => FilterInternalUtils.resetAllInputs(D));
    }
    static applyStatefulStyles(D, w2, O = {}) {
      const x2 = ElementStyle.generateStatefulCSS(O, w2, { color: "#484848" });
      Object.assign(D.style, x2.default), setTimeout(() => StatefulCSSEvents.setEvents(D, x2, ToggleableElement.ACTIVE_BUTTON_CLASS));
    }
  };
  _FilterElements.DEFAULT_INPUT_POSITION = "top-right";
  var FilterElements = _FilterElements;
  var CALENDAR_ICON_SVG_STRING = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" viewBox="0 0 10 10" version="1.1">
  <g id="surface1">
    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 1.070312 9.285156 L 8.929688 9.285156 L 8.929688 3.570312 L 1.070312 3.570312 Z M 3.214844 2.5 L 3.214844 0.894531 C 3.214844 0.839844 3.199219 0.796875 3.164062 0.765625 C 3.128906 0.730469 3.085938 0.714844 3.035156 0.714844 L 2.679688 0.714844 C 2.625 0.714844 2.582031 0.730469 2.550781 0.765625 C 2.515625 0.796875 2.5 0.839844 2.5 0.894531 L 2.5 2.5 C 2.5 2.550781 2.515625 2.59375 2.550781 2.628906 C 2.582031 2.660156 2.625 2.679688 2.679688 2.679688 L 3.035156 2.679688 C 3.085938 2.679688 3.128906 2.660156 3.164062 2.628906 C 3.199219 2.59375 3.214844 2.550781 3.214844 2.5 Z M 7.5 2.5 L 7.5 0.894531 C 7.5 0.839844 7.484375 0.796875 7.449219 0.765625 C 7.417969 0.730469 7.375 0.714844 7.320312 0.714844 L 6.964844 0.714844 C 6.914062 0.714844 6.871094 0.730469 6.835938 0.765625 C 6.800781 0.796875 6.785156 0.839844 6.785156 0.894531 L 6.785156 2.5 C 6.785156 2.550781 6.800781 2.59375 6.835938 2.628906 C 6.871094 2.660156 6.914062 2.679688 6.964844 2.679688 L 7.320312 2.679688 C 7.375 2.679688 7.417969 2.660156 7.449219 2.628906 C 7.484375 2.59375 7.5 2.550781 7.5 2.5 Z M 9.644531 2.144531 L 9.644531 9.285156 C 9.644531 9.480469 9.570312 9.648438 9.429688 9.789062 C 9.289062 9.929688 9.121094 10 8.929688 10 L 1.070312 10 C 0.878906 10 0.710938 9.929688 0.570312 9.789062 C 0.429688 9.648438 0.355469 9.480469 0.355469 9.285156 L 0.355469 2.144531 C 0.355469 1.949219 0.429688 1.78125 0.570312 1.640625 C 0.710938 1.5 0.878906 1.429688 1.070312 1.429688 L 1.785156 1.429688 L 1.785156 0.894531 C 1.785156 0.648438 1.875 0.4375 2.046875 0.261719 C 2.222656 0.0859375 2.433594 0 2.679688 0 L 3.035156 0 C 3.28125 0 3.492188 0.0859375 3.667969 0.261719 C 3.839844 0.4375 3.929688 0.648438 3.929688 0.894531 L 3.929688 1.429688 L 6.070312 1.429688 L 6.070312 0.894531 C 6.070312 0.648438 6.160156 0.4375 6.332031 0.261719 C 6.507812 0.0859375 6.71875 0 6.964844 0 L 7.320312 0 C 7.566406 0 7.777344 0.0859375 7.953125 0.261719 C 8.125 0.4375 8.214844 0.648438 8.214844 0.894531 L 8.214844 1.429688 L 8.929688 1.429688 C 9.121094 1.429688 9.289062 1.5 9.429688 1.640625 C 9.570312 1.78125 9.644531 1.949219 9.644531 2.144531 Z M 9.644531 2.144531 "/>
  </g>
</svg>`;
  var _DateCellCalendarIconElement = class je {
    // need a container as mousedown target kept being different parts of svg
    // hence svgIcon has no pointer events
    static createContainer() {
      const D = document.createElement("div");
      return D.classList.add(je.CALENDAR_ICON_CONTAINER_CLASS), D;
    }
    // REF-10
    static createSVGElement() {
      const D = SVGIconUtils.createSVGElement(CALENDAR_ICON_SVG_STRING);
      return D.style.pointerEvents = "none", D.style.height = "25px", D;
    }
    static createSVG() {
      const D = je.createSVGElement(), w2 = je.createContainer();
      return w2.appendChild(D), w2;
    }
    static get() {
      return je.CALENDAR_ICON_ELEMENT.cloneNode(true);
    }
  };
  _DateCellCalendarIconElement.CALENDAR_ICON_CONTAINER_CLASS = "calender-icon-container";
  _DateCellCalendarIconElement.CALENDAR_ICON_ELEMENT = _DateCellCalendarIconElement.createSVG();
  var DateCellCalendarIconElement = _DateCellCalendarIconElement;
  var ColumnDetailsUtils = class _ColumnDetailsUtils {
    static getColumnsByWidth(D) {
      var x2;
      const w2 = [], O = [];
      for (let U = 0; U < D.length; U += 1) {
        const F = D[U];
        ((x2 = F.settings.widths) == null ? void 0 : x2.staticWidth) !== void 0 ? O.push(F) : w2.push(F);
      }
      return { dynamicWidth: w2, staticWidth: O };
    }
    static aggregateItems(D) {
      return D.labelDetails ? Object.keys(D.itemsDetails).map((w2) => ({ name: w2, backgroundColor: D.itemsDetails[w2].backgroundColor })) : Object.keys(D.itemsDetails).map((w2) => ({ name: w2 }));
    }
    static getDetails(D) {
      const w2 = {
        width: D.elements[0].offsetWidth,
        typeName: D.activeType.name
      };
      return D.activeType.cellDropdownProps && (w2.cellDropdownItems = _ColumnDetailsUtils.aggregateItems(D.cellDropdown)), w2;
    }
    static getAllColumnsDetails(D) {
      return D.map((w2) => _ColumnDetailsUtils.getDetails(w2));
    }
  };
  var FireEvents = class {
    // prettier-ignore
    static onCellUpdate(D, w2, O, x2, U) {
      const F = { text: String(w2), rowIndex: O, columnIndex: x2, updateType: U };
      D.onCellUpdate(F), D.dispatchEvent(new CustomEvent("cell-update", { detail: F }));
    }
    static onDataUpdate(D) {
      const w2 = JSON.parse(JSON.stringify(D.data));
      D.onDataUpdate(w2), D.dispatchEvent(new CustomEvent("data-update", { detail: w2 }));
    }
    static onColumnsUpdate(D) {
      const w2 = ColumnDetailsUtils.getAllColumnsDetails(D._columnsDetails);
      D.onColumnsUpdate(w2), D.dispatchEvent(new CustomEvent("columns-update", { detail: w2 }));
    }
    static onRender(D) {
      D.onRender(), D.dispatchEvent(new CustomEvent("render"));
    }
  };
  var StaticTable = class _StaticTable {
    // because we don't set the table width for maxWidth property, its width is made up of columns widths -
    // they don't always add up to a precise expected value, e.g. if expected 500, they can add up to a 498
    // and 499. Hence instead of doing === tableElement.offsetWidth, we do <= tableElement.offsetWidth + 2
    // number 2 seems enough but can increase if this method is returning false in valid scenarios
    static isTableAtMaxWidth(D, w2) {
      return w2.maxWidth !== void 0 && w2.maxWidth <= D.offsetWidth + 2;
    }
    static isStaticTableWidth(D, w2) {
      return w2.width !== void 0 || _StaticTable.isTableAtMaxWidth(D, w2);
    }
  };
  var StaticTableWidthUtils = class _StaticTableWidthUtils {
    // REF-11
    static togglePreserveNarrowColumns(D, w2, O) {
      O || (w2.style.display = D ? "block" : "");
    }
    // when the client has not provided the 'width' value for the table, but a 'maxWidth' is present, need to
    // temporarily set the width at the start in order to help the MaximumColumns class to determine what columns fit
    // prettier-ignore
    static toggleWidthUsingMaxWidth(D, w2) {
      const { _tableElementRef: O, _tableDimensions: { maxWidth: x2, preserveNarrowColumns: U } } = D;
      O && x2 !== void 0 && (O.style.width = w2 ? `${x2}px` : "", _StaticTableWidthUtils.togglePreserveNarrowColumns(w2, O, U));
    }
    // prettier-ignore
    static setTableWidth(D) {
      const { _tableDimensions: { preserveNarrowColumns: w2, width: O }, _tableElementRef: x2 } = D;
      x2 && O !== void 0 && (x2.style.width = `${O}px`, _StaticTableWidthUtils.togglePreserveNarrowColumns(true, x2, w2));
    }
    // This only runs when the table width is set
    // prettier-ignore
    static changeTableWidthForNonDynamicColumns(D, w2, O, x2, U) {
      D.length === 0 || w2.dynamicWidth.length > 0 ? O.offsetWidth !== x2 && (O.style.width = `${x2}px`) : O.style.width = `${U}px`;
    }
    static resetDynamicWidthColumns(D, w2) {
      D.forEach((O) => {
        O.elements[0].style.width = `${w2.newColumnWidth}px`;
      });
    }
    static setNewColumnWidth(D, w2, O) {
      if (w2 > 0) {
        const x2 = D - O.staticWidth;
        O.newColumnWidth = x2 / w2;
      }
    }
    static resetColumnSizes(D, w2, O) {
      const x2 = ColumnDetailsUtils.getColumnsByWidth(D);
      return _StaticTableWidthUtils.setNewColumnWidth(w2, x2.dynamicWidth.length, O), _StaticTableWidthUtils.resetDynamicWidthColumns(x2.dynamicWidth, O), x2;
    }
    static changeWidthsBasedOnColumnInsertRemove(D, w2) {
      const { _tableElementRef: O, _tableDimensions: x2, _columnsDetails: U } = D;
      if (!O)
        return;
      const { width: F, maxWidth: W, staticWidth: G } = x2;
      if (F !== void 0) {
        const X = _StaticTableWidthUtils.resetColumnSizes(U, F, x2);
        _StaticTableWidthUtils.changeTableWidthForNonDynamicColumns(U, X, O, F, G);
      } else
        w2 && StaticTable.isTableAtMaxWidth(O, x2) && _StaticTableWidthUtils.resetColumnSizes(U, W, x2);
      setTimeout(() => FireEvents.onColumnsUpdate(D));
    }
  };
  var ConvertCellTypeUtils = class {
    static preprocessCell(D) {
      D.style.cursor = "";
    }
  };
  var CellStructureUtils = class {
    static setColumn(D, w2, O, x2) {
      const { elements: U } = D._columnsDetails[w2];
      U.slice(1).forEach((F, W) => {
        const G = W + 1;
        O(D, F, w2, G), D._columnsDetails[w2].settings.isCellTextEditable && x2(D, F, G, w2);
      });
    }
  };
  var FocusedCellUtils = class {
    static createEmpty() {
      return {};
    }
    static setHeaderCell(D, w2, O) {
      D.element = w2, D.rowIndex = 0, D.columnIndex = O;
    }
    static setIndexCell(D, w2, O) {
      D.element = w2, D.rowIndex = O, delete D.columnIndex;
    }
    static set(D, w2, O, x2) {
      D.element = w2, D.rowIndex = O, D.columnIndex = x2;
    }
    static incrementColumnIndex(D, w2) {
      D.columnIndex !== void 0 && w2 <= D.columnIndex && (D.columnIndex += 1);
    }
    static purge(D) {
      delete D.columnIndex, delete D.element, delete D.rowIndex;
    }
  };
  var KEYBOARD_KEY = /* @__PURE__ */ ((Y) => (Y.ESCAPE = "Escape", Y.ENTER = "Enter", Y.TAB = "Tab", Y.ARROW_UP = "ArrowUp", Y.ARROW_DOWN = "ArrowDown", Y.ARROW_RIGHT = "ArrowRight", Y.ARROW_LEFT = "ArrowLeft", Y))(KEYBOARD_KEY || {});
  var _Browser = class {
    // can't use DateCellInputElement class as this is called before CellElement class can be used
    static createDateInput() {
      const D = document.createElement("input");
      return D.type = "date", D;
    }
    static createColorInput() {
      const D = document.createElement("input");
      return D.type = "color", D;
    }
  };
  _Browser.IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  _Browser.IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  _Browser.IS_CHROMIUM = window.chrome;
  _Browser.IS_INPUT_DATE_SUPPORTED = _Browser.createDateInput().type === "date" && "showPicker" in HTMLInputElement.prototype;
  _Browser.IS_COLOR_PICKER_SUPPORTED = _Browser.createColorInput().type === "color" && "showPicker" in HTMLInputElement.prototype;
  var Browser = _Browser;
  var ColumnSettingsStyleUtils = class _ColumnSettingsStyleUtils {
    static applySettingsStyleOnCell(D, w2, O) {
      var x2;
      Object.assign(w2.style, D.cellStyle || {}, O ? ((x2 = D.headerStyles) == null ? void 0 : x2.default) || {} : {});
    }
    // prettier-ignore
    static setNewHeaderStyle(D, w2) {
      var W;
      const { settings: O, elements: x2 } = w2, U = O.cellStyle || ((W = O.headerStyles) == null ? void 0 : W.default);
      U && _ColumnSettingsStyleUtils.applySettingsStyleOnCell(O, x2[0], true);
      const F = U ? O : void 0;
      w2.headerStateColors = ColumnDetails.createHeaderStateColors(
        D._defaultColumnsSettings,
        F,
        D._defaultCellHoverColors
      ), ColumnSettingsBorderUtils.overwriteSideBorderIfSiblingsHaveSettings(w2, [x2[0]]);
    }
    static unsetHeaderSettingStyle(D, w2) {
      Object.keys(w2).forEach((O) => {
        ElementStyle.setStyle(D, O, "");
      });
    }
    // prettier-ignore
    static resetHeaderStyleToDefault(D, w2, O) {
      var F;
      (F = w2.headerStyles) != null && F.default && _ColumnSettingsStyleUtils.unsetHeaderSettingStyle(D[0], w2.headerStyles.default), w2.cellStyle && ElementStyle.unsetStyle(D[0], w2.cellStyle);
      const { cellStyle: x2, headerStyles: U } = O;
      CellElement.setDefaultCellStyle(D[0], x2, U == null ? void 0 : U.default);
    }
    // prettier-ignore
    static changeHeaderStyleFunc(D, w2) {
      var G, X, K;
      const O = this._columnsDetails[D], { elements: x2, settings: { isHeaderTextEditable: U } } = O;
      _ColumnSettingsStyleUtils.resetHeaderStyleToDefault(x2, w2, this._defaultColumnsSettings), _ColumnSettingsStyleUtils.setNewHeaderStyle(this, O);
      const F = (K = (X = (G = this._defaultColumnsSettings.columnDropdown) == null ? void 0 : G.displaySettings) == null ? void 0 : X.openMethod) == null ? void 0 : K.cellClick, W = !F && U;
      CellElement.prepContentEditable(
        CellElement.getTextElement(x2[0]),
        !!W,
        F
      );
    }
    // prettier-ignore
    static changeStyleFunc(D, w2, O) {
      ProcessedDataTextStyle.resetDataCellsStyle(
        D,
        w2,
        _ColumnSettingsStyleUtils.changeHeaderStyleFunc.bind(D, w2, O),
        O.cellStyle
      );
    }
    static doStylesHaveVisibleDimension(D, w2) {
      for (let O = 0; O < w2.length; O += 1) {
        const x2 = D[w2[O]];
        if (x2) {
          const U = RegexUtils.extractIntegerStrs(String(x2));
          if (U.length > 0 && Number(U[0]) > 0)
            return true;
        }
      }
      return false;
    }
    // REF-23
    // prettier-ignore
    static doesSettingHaveSideBorderStyle(D) {
      var O;
      const w2 = D.cellStyle || ((O = D.headerStyles) == null ? void 0 : O.default);
      return w2 ? _ColumnSettingsStyleUtils.doStylesHaveVisibleDimension(
        w2,
        ["border", "borderLeft", "borderLeftWidth", "borderRight", "borderRightWidth"]
      ) : false;
    }
  };
  var ResetColumnStyles = class _ResetColumnStyles {
    static applyDefaultStyles(D, w2) {
      const { cellStyle: O, headerStyles: x2 } = w2;
      CellElement.setDefaultCellStyle(D[0], O, x2 == null ? void 0 : x2.default), D.slice(1).forEach((U) => {
        CellElement.setDefaultCellStyle(U, O);
      });
    }
    static unsetLastAppliedStyle(D, w2) {
      Object.keys(D.lastAppliedStyle).forEach((O) => {
        ElementStyle.setStyle(w2, O, "");
      });
    }
    // if this operation turns out to be expensive - try to save and reuse the default style
    // prettier-ignore
    static setDefaultStyle(D, w2, O, x2, U) {
      _ResetColumnStyles.unsetLastAppliedStyle(w2, O), U && ElementStyle.unsetStyle(O, U), CellElement.setDefaultCellStyle(O, x2.cellStyle), ColumnSettingsStyleUtils.applySettingsStyleOnCell(D.settings, O, false);
    }
  };
  var _ProcessedDataTextStyle = class Ae {
    // prettier-ignore
    static setCustomStyle(D, w2, O, x2, U, F, W) {
      if (D) {
        ResetColumnStyles.setDefaultStyle(O, U, F, W);
        const G = D(String(w2), x2);
        Object.assign(F.style, G), U.lastAppliedStyle = G, ColumnSettingsBorderUtils.overwriteSideBorderIfSiblingsHaveSettings(O, [F]);
      }
    }
    // prettier-ignore
    static setFailedValidationStyle(D, w2, O) {
      const { textValidation: x2 } = D.activeType, U = x2.failedStyle || Ae.DEFAULT_FAILED_VALIDATION_STYLE;
      Object.assign(O.style, U), w2.lastAppliedStyle = U;
    }
    // prettier-ignore
    static setStyle(D, w2, O, x2, U, F) {
      let W = false;
      return D ? x2 != null && x2.changeStyleFunc || (ResetColumnStyles.setDefaultStyle(w2, O, U, F), O.lastAppliedStyle = {}, W = true) : (x2 != null && x2.changeStyleFunc && ResetColumnStyles.setDefaultStyle(w2, O, U, F), Ae.setFailedValidationStyle(w2, O, U), W = true), W && ColumnSettingsBorderUtils.overwriteSideBorderIfSiblingsHaveSettings(w2, [U]), W;
    }
    // prettier-ignore
    static setCellStyle(D, w2, O, x2 = false) {
      const U = D._columnsDetails[O], F = U.elements[w2], W = U.processedStyle[w2], G = CellElement.getText(F), { textValidation: { func: X }, customTextProcessing: K } = U.activeType;
      let q = false;
      if (X) {
        const Q = X(G);
        (x2 || W.isValid !== Q) && (q = Ae.setStyle(
          Q,
          U,
          W,
          K,
          F,
          D._defaultColumnsSettings
        ), W.isValid = Q);
      }
      !q && (K != null && K.changeStyleFunc) && Ae.setCustomStyle(
        K.changeStyleFunc,
        G,
        U,
        w2,
        W,
        F,
        D._defaultColumnsSettings
      );
    }
    static setStyleOnColumn(D, w2) {
      const O = D._columnsDetails[w2];
      O.elements.slice(1).forEach((x2, U) => {
        const F = U + 1;
        Ae.setCellStyle(D, F, w2, true), ColumnSettingsBorderUtils.overwriteSideBorderIfSiblingsHaveSettings(O, [x2]);
      });
    }
    static unsetStyleOnColumn(D, w2, O) {
      const x2 = D._columnsDetails[w2];
      x2.elements.slice(1).forEach((U, F) => {
        const W = F + 1, G = x2.processedStyle[W];
        ResetColumnStyles.setDefaultStyle(x2, G, U, D._defaultColumnsSettings, O);
      });
    }
    // using this to first unset the previous processed style, allow new settings/type to be applied and then set
    // new style
    // prettier-ignore
    static resetDataCellsStyle(D, w2, O, x2) {
      Ae.unsetStyleOnColumn(D, w2, x2), O(), Ae.setStyleOnColumn(D, w2);
    }
    // prettier-ignore
    // this is used for a case where the default style has been set and need to reapply the processed style
    // without having to rerun the validation/changeStyleFunc functions
    static reapplyCellsStyle(D, w2) {
      const O = D._columnsDetails[w2], { textValidation: { func: x2 }, customTextProcessing: U } = O.activeType;
      (x2 || U != null && U.changeStyleFunc) && O.elements.slice(1).forEach((F, W) => {
        const G = W + 1;
        Object.assign(F.style, O.processedStyle[G].lastAppliedStyle);
      });
    }
    static getDefaultProcessedTextStyle() {
      return { isValid: true, lastAppliedStyle: {} };
    }
  };
  _ProcessedDataTextStyle.DEFAULT_FAILED_VALIDATION_STYLE = { color: "grey" };
  var ProcessedDataTextStyle = _ProcessedDataTextStyle;
  var NumberOfIdenticalCells = class {
    // columnsDetails instead of row from data because during startup - data is already be populated and
    // not yet added to the table, hence we are automatically marking headers as duplicate and setting them
    // to default, however the end headers that are not duplicate may not be displayed due to max columns,
    // hence using columnsDetails to mark duplicates as headers are added instead
    // prettier-ignore
    static get(D, w2) {
      return w2.map((O) => O.elements.length > 0 ? CellElement.getText(O.elements[0]) : "").filter((O) => O === D).length;
    }
  };
  var EMPTY_STRING = "";
  var DataUtils = class _DataUtils {
    static createEmptyStringDataArray(D) {
      return new Array(D).fill(EMPTY_STRING);
    }
    static isTextEmpty(D, w2) {
      return D !== EMPTY_STRING ? (typeof w2 == "string" ? w2.trim() : w2) === EMPTY_STRING : false;
    }
    // note that NumberOfIdenticalCells.get uses the at.data top row, so it needs to be up-to-date
    // prettier-ignore
    static shouldBeSetToDefault(D, w2, O, x2, U) {
      const { allowDuplicateHeaders: F, _columnsDetails: W } = D;
      return _DataUtils.isTextEmpty(O, w2) || x2 === 0 && !F && NumberOfIdenticalCells.get(w2, W) > 1 || x2 > 0 && !(U.func === void 0 || U.func(String(w2)));
    }
    // prettier-ignore
    static processCellText(D, w2, O, x2) {
      let U = typeof x2 == "string" ? x2.trim() : x2;
      const F = D._columnsDetails[O];
      if (!F)
        return U;
      const { activeType: { textValidation: W, customTextProcessing: G }, settings: { defaultText: X } } = F;
      return w2 > 0 && (G != null && G.changeTextFunc && (U = G.changeTextFunc(String(U), w2)), !W.setTextToDefaultOnFail && U !== EMPTY_STRING) ? U : _DataUtils.shouldBeSetToDefault(D, U, X, w2, W) ? X : U;
    }
  };
  var CELL_UPDATE_TYPE = /* @__PURE__ */ ((Y) => (Y.UPDATE = "Update", Y.ADD = "Add", Y.REMOVED = "Removed", Y))(CELL_UPDATE_TYPE || {});
  var CellEvents = class _CellEvents {
    static executeUpdateOperation(D, w2) {
      return (w2 == null ? void 0 : w2[D]) === void 0 || w2[D] === true;
    }
    // this is directly handled by operations that do not insert new cells as those handle the instructions below
    // in a different order asynchronously for maximum efficiency
    // prettier-ignore
    static updateCell(D, w2, O, x2, U) {
      return _CellEvents.executeUpdateOperation("processText", U) && (w2 = DataUtils.processCellText(D, O, x2, w2)), _CellEvents.executeUpdateOperation("updateData", U) && (D.data[O][x2] = w2), U != null && U.element && CellElement.setNewText(D, U.element, w2, false, false), _CellEvents.executeUpdateOperation("updateTableEvent", U) && D.onDataUpdate(D.data), O > 0 && ProcessedDataTextStyle.setCellStyle(D, O, x2), _CellEvents.executeUpdateOperation("updateCellEvent", U) && FireEvents.onCellUpdate(D, w2, O, x2, CELL_UPDATE_TYPE.UPDATE), w2;
    }
    // this is used for cases where updateCell should only be called if it has to be set to default
    // prettier-ignore
    static setCellToDefaultIfNeeded(D, w2, O, x2, U = true) {
      const F = CellElement.getText(x2), W = DataUtils.processCellText(D, w2, O, F);
      return W !== F ? (_CellEvents.updateCell(
        D,
        W,
        w2,
        O,
        { element: x2, processText: false, updateTableEvent: U }
      ), true) : false;
    }
    // prettier-ignore
    static removeTextIfDefault(D, w2, O, x2) {
      const { isDefaultTextRemovable: U, defaultText: F } = D._columnsDetails[O].settings;
      U && F !== EMPTY_STRING && F === CellElement.getText(x2) && _CellEvents.updateCell(
        D,
        EMPTY_STRING,
        w2,
        O,
        { element: x2, processText: false }
      );
    }
  };
  var CheckboxEvents = class _CheckboxEvents {
    // REF-29
    static focusCheckbox(D, w2, O) {
      Browser.IS_SAFARI || FocusedCellUtils.set(this._focusedElements.cell, D, w2, O);
    }
    // REF-29
    static blurCheckbox() {
      Browser.IS_SAFARI || FocusedCellUtils.purge(this._focusedElements.cell);
    }
    static changeValueCheckbox(D, w2, O) {
      const x2 = O.target;
      CellEvents.updateCell(this, String(x2.checked), D, w2, { processText: false });
    }
    static keyDownCheckbox(D) {
      D.key === KEYBOARD_KEY.ENTER && D.target.click();
    }
    static setEvents(D, w2, O, x2) {
      w2.onkeydown = _CheckboxEvents.keyDownCheckbox, w2.onchange = _CheckboxEvents.changeValueCheckbox.bind(D, O, x2), w2.onfocus = _CheckboxEvents.focusCheckbox.bind(D, w2, O, x2), w2.onblur = _CheckboxEvents.blurCheckbox.bind(D);
    }
  };
  var CheckboxCellEvents = class _CheckboxCellEvents {
    static mouseDownCell(D) {
      const w2 = D.target;
      w2.classList.contains(CellElement.CELL_CLASS) && w2.children[0].click();
    }
    // REF-29
    static focusCell(D) {
      D.target.children[0].focus();
    }
    static setEvents(D, w2, O, x2) {
      if (!D._columnsDetails[x2].settings.isCellTextEditable)
        return;
      w2.onblur = () => {
      }, w2.onfocus = _CheckboxCellEvents.focusCell, w2.onmouseenter = () => {
      }, w2.onmouseleave = () => {
      }, w2.oninput = () => {
      }, w2.onmousedown = _CheckboxCellEvents.mouseDownCell.bind(D);
      const U = CheckboxCellElement.getCheckboxElement(w2);
      CheckboxEvents.setEvents(D, U, O, x2);
    }
  };
  var CheckboxElement = class _CheckboxElement {
    static createCheckbox(D) {
      const w2 = document.createElement("input");
      return w2.type = "checkbox", w2.style.cursor = D ? "pointer" : "auto", w2.style.pointerEvents = D ? "" : "none", w2;
    }
    static setCellTextAsCheckbox(D, w2) {
      const O = _CheckboxElement.createCheckbox(w2);
      D.replaceChildren(O);
    }
  };
  var CheckboxCellElement = class _CheckboxCellElement {
    static isCheckbox(D) {
      return (D == null ? void 0 : D.type) === "checkbox";
    }
    static isCheckboxCell(D) {
      return _CheckboxCellElement.isCheckbox(D.children[0]);
    }
    static getCheckboxElement(D) {
      if (_CheckboxCellElement.isCheckboxCell(D))
        return D.children[0];
      if (_CheckboxCellElement.isCheckbox(D))
        return D;
    }
    static getValue(D) {
      const w2 = _CheckboxCellElement.getCheckboxElement(D);
      if (w2)
        return String(w2.checked);
    }
    static setValue(D, w2) {
      const O = _CheckboxCellElement.getCheckboxElement(D);
      return O ? (O.checked = w2 === "true", true) : false;
    }
    // prettier-ignore
    static setCellTextAsAnElement(D, w2, O, x2) {
      const { settings: { isCellTextEditable: U } } = D._columnsDetails[x2], F = CellElement.getText(w2);
      CheckboxElement.setCellTextAsCheckbox(w2, U), w2.contentEditable = "false", w2.style.cursor = U ? "pointer" : "default", CellEvents.updateCell(D, F, O, x2, { element: w2 });
    }
    // prettier-ignore
    static setCellCheckboxStructure(D, w2, O, x2) {
      ConvertCellTypeUtils.preprocessCell(w2), _CheckboxCellElement.setCellTextAsAnElement(D, w2, x2, O);
    }
    // prettier-ignore
    static setColumnCheckboxStructure(D, w2) {
      CellStructureUtils.setColumn(
        D,
        w2,
        _CheckboxCellElement.setCellCheckboxStructure,
        CheckboxCellEvents.setEvents
      );
    }
  };
  var CaretPosition = class _CaretPosition {
    static setSelectionToEndOfText(D, w2) {
      const O = CellElement.getTextElement(D), x2 = document.createRange();
      x2.setStart(O.childNodes[0], CellElement.getText(O).length || 0), x2.collapse(true), w2.removeAllRanges(), w2.addRange(x2);
    }
    static getSelection(D) {
      var x2;
      const w2 = D.shadowRoot;
      return w2.getSelection ? w2.getSelection() : ((x2 = window.document.activeElement) == null ? void 0 : x2.shadowRoot) === w2 ? window.document.getSelection() : null;
    }
    static setToEndOfText(D, w2) {
      if (CheckboxCellElement.isCheckboxCell(w2))
        return;
      let O = _CaretPosition.getSelection(D);
      Browser.IS_SAFARI && !O && (w2.focus(), O = _CaretPosition.getSelection(D)), O && _CaretPosition.setSelectionToEndOfText(w2, O);
    }
  };
  var ArrayUtils = class {
    static transpose(D) {
      if (D.length === 0)
        return D;
      const w2 = [], O = Math.max(D.length, D[0].length);
      e:
        for (let x2 = 0; x2 < O; x2 += 1) {
          const U = [];
          for (let F = 0; F < O && D[F] !== void 0; F += 1) {
            if (D[F][x2] === void 0)
              break e;
            U.push(D[F][x2]);
          }
          w2.push(U);
        }
      return w2;
    }
    static shuffle(D) {
      return D.sort(() => Math.random() - 0.5);
    }
    static swap(D, w2, O) {
      const x2 = D[w2];
      D[w2] = D[O], D[O] = x2;
    }
  };
  var _LabelColorUtils = class Be {
    static generateNewPasteleColor() {
      return `hsl(${Math.floor(Math.random() * 360)}, 95%, 90%)`;
    }
    static setNewLatestPasteleColor() {
      Be.LATEST_PASTELE_COLOR = Be.generateNewPasteleColor();
    }
    static getLatestPasteleColor() {
      return Be.LATEST_PASTELE_COLOR;
    }
    static getLatestPasteleColorAndSetNew() {
      const D = Be.getLatestPasteleColor();
      return Be.setNewLatestPasteleColor(), D;
    }
    // REF-34
    // these colors are used before the above
    static generateDefaultColors() {
      return ArrayUtils.shuffle([
        "hsl(154deg 96% 90%)",
        "hsl(50deg 96% 90%)",
        "hsl(171deg 96% 90%)",
        "hsl(76deg 96% 90%)",
        "hsl(315deg 96% 90%)",
        "hsl(251deg 96% 90%)",
        "hsl(209deg 84% 92%)",
        "hsl(0deg 100% 81%)",
        "hsl(29deg 100% 79%)",
        "hsl(31deg 73% 75%)",
        "hsl(137deg 80% 80%)",
        "hsl(60deg 100% 82%)",
        "hsl(219deg 100% 84%)",
        "hsl(93deg 62% 74%)",
        "hsl(54deg 93% 84%)",
        "hsl(146deg 100% 90%)",
        "hsl(334deg 100% 87%)",
        "hsl(19deg 95% 84%)",
        "hsl(203deg 95% 84%)",
        "hsl(76deg 100% 78%)",
        "hsl(0deg 100% 86%)",
        "hsl(42deg 82% 82%)",
        "hsl(97deg 100% 87%)"
      ]);
    }
    // this is a solution for same label text across different columns to have the same colors
    static generateGlobalItemColors() {
      return {
        newColors: Be.generateDefaultColors(),
        existingColors: {}
      };
    }
  };
  _LabelColorUtils.LATEST_PASTELE_COLOR = _LabelColorUtils.generateNewPasteleColor();
  var LabelColorUtils = _LabelColorUtils;
  var ScrollbarUtils = class {
    static isVerticalPresent(D) {
      return D.scrollHeight > D.clientHeight;
    }
    static isHorizontalPresent(D) {
      return D.scrollWidth > D.clientWidth;
    }
  };
  var _CellDropdownHorizontalScrollFix = class lt {
    static setPropertiesIfHorizontalScrollPresent(D) {
      const { element: w2, scrollbarPresence: O, customDropdownStyle: x2 } = D;
      ScrollbarUtils.isHorizontalPresent(w2) && ScrollbarUtils.isVerticalPresent(w2) ? (O.horizontal = true, w2.style.paddingBottom = lt.NEW_BOTTOM_PADDING_IF_PRESENT) : (O.horizontal = false, w2.style.paddingBottom = (x2 == null ? void 0 : x2.paddingBottom) || Dropdown.DROPDOWN_VERTICAL_PX);
    }
    static scrollDownFurther(D) {
      D.scrollTop += lt.SCROLL_FURTHER_BOTTOM_PX;
    }
  };
  _CellDropdownHorizontalScrollFix.NEW_BOTTOM_PADDING_IF_PRESENT = "8px";
  _CellDropdownHorizontalScrollFix.SCROLL_FURTHER_BOTTOM_PX = 14;
  var CellDropdownHorizontalScrollFix = _CellDropdownHorizontalScrollFix;
  var _RGBAToHex = class rt {
    static extractIndividualNumbers(D) {
      return D.match(rt.REGEX);
    }
    static convert(D) {
      return `#${rt.extractIndividualNumbers(D).slice(1).map(
        (w2, O) => (O === 3 ? Math.round(parseFloat(w2) * 255) : parseFloat(w2)).toString(16).padStart(2, "0").replace("NaN", "")
      ).join("")}`;
    }
  };
  _RGBAToHex.REGEX = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/;
  var RGBAToHex = _RGBAToHex;
  var _OptionColorButton = class we {
    // buttonLevelElement is either input or button
    static extractRelativeParentElements(D) {
      var U;
      const w2 = D.parentElement, O = (U = w2.previousSibling) == null ? void 0 : U.previousSibling, x2 = w2.parentElement;
      return { containerElement: w2, textElement: O, dropdownItemElement: x2 };
    }
    static changeVisibility(D, w2, O) {
      const x2 = D.children[2];
      if (x2.style.display = O ? "block" : "none", O) {
        const U = x2.children[0], F = Browser.IS_SAFARI ? 9 : 5;
        U.style.left = `${O.offsetWidth - w2 + F}px`;
        const W = x2.children[1];
        W.style.left = `${O.offsetWidth - w2}px`;
      }
    }
    static createIcon() {
      const D = document.createElement("div");
      return D.innerText = we.COLOR_ICON_TEXT, D.classList.add(we.COLOR_BUTTON_ICON_CLASS), D;
    }
    static createButton() {
      const D = document.createElement("div");
      D.classList.add(OptionButton.BUTTON_CLASS, we.COLOR_BUTTON_CLASS);
      const w2 = we.createIcon();
      return D.appendChild(w2), D;
    }
    static createInput() {
      const D = document.createElement("input");
      return D.type = "color", D.style.top = Browser.IS_SAFARI ? "0px" : "14px", D.classList.add(we.COLOR_INPUT_CLASS), D;
    }
    static createContainer() {
      const D = document.createElement("div");
      return D.classList.add(OptionButton.BUTTON_CONTAINER_CLASS), D;
    }
    static create(D, w2) {
      const O = we.createContainer(), x2 = we.createInput();
      O.appendChild(x2);
      const U = we.createButton();
      return O.appendChild(U), OptionColorButtonEvents.setEvents(O, x2, D, w2), O;
    }
  };
  _OptionColorButton.COLOR_INPUT_CLASS = "color-input";
  _OptionColorButton.COLOR_BUTTON_CLASS = "option-color-button";
  _OptionColorButton.COLOR_BUTTON_ICON_CLASS = "cell-dropdown-option-color-button-icon";
  _OptionColorButton.COLOR_ICON_TEXT = "c";
  var OptionColorButton = _OptionColorButton;
  var OptionColorButtonEvents = class _OptionColorButtonEvents {
    static updateCellElements(D, w2) {
      const { itemText: O, backgroundColor: x2 } = w2;
      D.elements.slice(1).forEach((U) => {
        const F = U.children[0];
        F.innerText === O && (F.style.backgroundColor = x2);
      });
    }
    // prettier-ignore
    static updateIfUpdatable(D, w2, O) {
      const { itemText: x2, backgroundColor: U } = O, F = D.cellDropdown.itemsDetails[x2];
      F && (!F.isCustomBackgroundColor || w2 === D.activeType.name) && (F.backgroundColor = U, _OptionColorButtonEvents.updateCellElements(D, O));
    }
    // prettier-ignore
    static updateElements(D, w2, O) {
      D.forEach((x2) => {
        x2.cellDropdown.labelDetails && _OptionColorButtonEvents.updateIfUpdatable(x2, w2, O);
      });
    }
    static updateColorStates(D, w2) {
      var F, W, G;
      const { itemText: O, backgroundColor: x2 } = w2;
      (W = (F = D.activeType.cellDropdownProps) == null ? void 0 : F.options) == null || W.forEach((X) => {
        X.text === O && (X.backgroundColor = x2);
      });
      const U = (G = D.cellDropdown.labelDetails) == null ? void 0 : G.globalItemColors.existingColors;
      U != null && U[O] && (U[O] = x2);
    }
    // prettier-ignore
    static updateColumnLabelColors(D, w2) {
      const { cellDropdown: { labelDetails: O }, activeType: x2 } = w2;
      !O || !O.colorPickerNewValue || (_OptionColorButtonEvents.updateColorStates(w2, O.colorPickerNewValue), _OptionColorButtonEvents.updateElements(D, x2.name, O.colorPickerNewValue), delete O.colorPickerNewValue, setTimeout(() => w2.fireColumnsUpdate()));
    }
    // important to note that mouse/key down events are not fired when clicked on picker
    static windowEventClosePicker(D, w2) {
      if (w2.cellDropdown) {
        const O = w2.cell.columnIndex;
        OptionButton.hideAfterColorPickerContainerClose(D, D[O]);
      }
    }
    // bug fix comments are for code that fixes a firefox bug where color picker is still open after closing the dropdown
    static inputEvent(D, w2) {
      if (!Dropdown.isDisplayed(D.element))
        return;
      const O = w2.target, { containerElement: x2, textElement: U, dropdownItemElement: F } = OptionColorButton.extractRelativeParentElements(O), W = U.textContent, G = O.value;
      F.style.backgroundColor = G;
      const X = D.itemsDetails[W];
      X.backgroundColor !== G && (X.backgroundColor = G, D.labelDetails.colorPickerNewValue = { backgroundColor: G, itemText: W }, setTimeout(() => {
        var K;
        (K = D.labelDetails).colorPickerContainer ?? (K.colorPickerContainer = x2);
      }));
    }
    // prettier-ignore
    static mouseDownContainer(D, w2, O) {
      const { cellDropdown: { labelDetails: x2 } } = w2;
      if (!x2)
        return;
      if (x2.colorPickerContainer) {
        delete x2.colorPickerContainer, _OptionColorButtonEvents.updateColumnLabelColors(D, w2);
        return;
      }
      const U = O.target, { containerElement: F, dropdownItemElement: W } = OptionColorButton.extractRelativeParentElements(U), G = U.previousSibling;
      G.value = RGBAToHex.convert(getComputedStyle(W).backgroundColor), G.showPicker(), setTimeout(() => x2.colorPickerContainer = F);
    }
    // prettier-ignore
    static setEvents(D, w2, O, x2) {
      D.onmousedown = _OptionColorButtonEvents.mouseDownContainer.bind(this, O, x2), w2.oninput = _OptionColorButtonEvents.inputEvent.bind(this, x2.cellDropdown);
    }
  };
  var FocusNextRowCell = class {
    // does not work in Safari
    static focus(D, w2, O, x2) {
      x2.preventDefault();
      const U = O[w2 + 1];
      U && (U.focus(), CaretPosition.setToEndOfText(D, U));
    }
    static focusOrBlurSelect(D, w2) {
      const O = D[w2 + 1];
      if (O)
        return O.dispatchEvent(new Event("mousedown")), O.scrollIntoView({ block: "nearest" }), O;
      D[w2].children[0].blur();
    }
  };
  var ARROW_DOWN_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12">
  <g style="pointer-events: none" transform="matrix(0.6315789 0 0 0.6315789 0 0)">
    <g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
      <path d="M0 87.5L350 507.5L700 87.5L0 87.5z" stroke="none" fill="#3e3e3e" fill-rule="nonzero" />
    </g>
  </g>
</svg>
`;
  var _ArrowDownIconElement = class Ve {
    static toggle(D, w2) {
      if (!D)
        return;
      const O = D.children[1];
      O.style.display = w2 ? "block" : "none";
      const x2 = O.children[0];
      !w2 && x2.style.filter && (x2.style.filter = "");
    }
    static setActive(D) {
      const w2 = D.children[1].children[0];
      w2.style.filter = `brightness(0) saturate(100%) invert(24%) sepia(73%) saturate(631%)
      hue-rotate(171deg) brightness(98%) contrast(98%)`;
    }
    // need a container to allow absolute positioning for the icon
    static createContainer() {
      const D = document.createElement("div");
      return D.classList.add(Ve.ARROW_ICON_CONTAINER_CLASS), D.style.display = "none", D;
    }
    // REF-10
    static createSVGElement() {
      const D = SVGIconUtils.createSVGElement(ARROW_DOWN_ICON_SVG_STRING);
      return D.classList.add(Ve.ARROW_ICON_CLASS), D;
    }
    static createSVG() {
      const D = Ve.createSVGElement(), w2 = Ve.createContainer();
      return w2.appendChild(D), w2;
    }
    static get() {
      return Ve.ARROW_ICON_ELEMENT.cloneNode(true);
    }
  };
  _ArrowDownIconElement.ARROW_ICON_CLASS = "arrow-down-icon";
  _ArrowDownIconElement.ARROW_ICON_CONTAINER_CLASS = "arrow-down-icon-container";
  _ArrowDownIconElement.ARROW_ICON_ELEMENT = _ArrowDownIconElement.createSVG();
  var ArrowDownIconElement = _ArrowDownIconElement;
  var TableBorderDimensionsUtils = class _TableBorderDimensionsUtils {
    static generateDefault() {
      return {
        leftWidth: 0,
        rightWidth: 0,
        topWidth: 0,
        bottomWidth: 0
      };
    }
    static getWidth(D, w2) {
      return D.style[w2] === "" ? 1 : Number.parseFloat(D.style[w2]) || 0;
    }
    static generateUsingElement(D) {
      return {
        leftWidth: _TableBorderDimensionsUtils.getWidth(D, "borderLeftWidth"),
        rightWidth: _TableBorderDimensionsUtils.getWidth(D, "borderRightWidth"),
        topWidth: _TableBorderDimensionsUtils.getWidth(D, "borderTopWidth"),
        bottomWidth: _TableBorderDimensionsUtils.getWidth(D, "borderBottomWidth")
      };
    }
  };
  var _UpdateIndexColumnWidth = class te {
    static wrapColumnTextAndGetDefaultWidth(D) {
      const { _tableBodyElementRef: w2, data: O, _tableDimensions: x2 } = D;
      return ExtractElements.textRowsArrFromTBody(w2, O).forEach((U) => {
        U.children[0].classList.remove(IndexColumn.INDEX_CELL_OVERFLOW_CLASS);
      }), x2.isColumnIndexCellTextWrapped = true, ToggleAdditionElements.update(D, true, AddNewColumnElement.toggle), IndexColumn.DEFAULT_WIDTH;
    }
    static changeTableWidths(D, w2) {
      const O = w2 - D._tableDimensions.indexColumnWidth;
      D._tableDimensions.indexColumnWidth = w2, TableElement.changeStaticWidthTotal(D._tableDimensions, O), StaticTableWidthUtils.changeWidthsBasedOnColumnInsertRemove(D, true);
    }
    static changeCellAndTableWidths(D, w2, O) {
      const x2 = w2.children[0];
      te.changeTableWidths(D, O), x2.style.width = `${O}px`;
    }
    static forceWrap(D, w2) {
      const O = te.wrapColumnTextAndGetDefaultWidth(D);
      te.changeCellAndTableWidths(D, w2, O);
    }
    static shouldTextBeWrapped(D) {
      return !D._tableDimensions.isColumnIndexCellTextWrapped && TableDimensionsUtils.hasSetTableWidthBeenBreached(D);
    }
    static changeWidth(D, w2, O) {
      te.changeCellAndTableWidths(D, w2, O), te.shouldTextBeWrapped(D) && te.forceWrap(D, w2);
    }
    // important to note that on initial render if the font library has not been downloaded
    // scrollWidth will give the wrong number. This is usually not a problem when using
    // small numbers or cache
    static getCellWidth(D) {
      return D.scrollWidth + (Number.parseInt(getComputedStyle(D).borderRightWidth) || 0);
    }
    // need to keep track of first cell because upon using pagination and uploading a new file, drag and droping a new file,
    // or using updateData method with a lot of data does not refresh the cell with original value
    // to reproduce the error, simply set the code in timeout to: firstCell.textContent = firstCellContent
    static temporarilySetFirstRowCellWithLastNumber(D, w2, O) {
      const x2 = D.textContent;
      D.id || (D.id = w2 ? te.TEMPORARY_INDEX_NUMBER : te.TEMPORARY_INVISIBLE_INDEX_NUMBER), D.textContent = O.textContent, setTimeout(() => {
        D.id !== "" && (D.textContent = x2, D.removeAttribute("id"));
      });
    }
    static getIndexColumnWidthWithAsyncFix(D, w2, O) {
      if (O.scrollWidth === 0) {
        const x2 = D.children[0];
        return te.temporarilySetFirstRowCellWithLastNumber(x2, w2, O), te.getCellWidth(x2);
      }
      return te.getCellWidth(O);
    }
    // this works because the 'block' display style is not set on the table
    // checking if the cells width is overflown and if so - increase its width (cannot decrease the width)
    static updateColumnWidthWhenOverflow(D, w2, O) {
      const x2 = !!D.dataStartsAtHeader, U = te.getIndexColumnWidthWithAsyncFix(w2, x2, O);
      if (D._tableDimensions.indexColumnWidth !== U && U !== 0) {
        const F = U + (Browser.IS_FIREFOX ? 4 : 0);
        Browser.IS_SAFARI ? setTimeout(() => te.changeWidth(D, w2, F)) : te.changeWidth(D, w2, F);
      }
    }
    // when the table element display property is 'block', the 'overflow: hidden;' property does not actually work
    // and instead the lastCell width is changed automatically, all we do here is check if the expected width
    // (at.tableDimensions.indexColumnWidth) is different to the actual one and if so, we change it to actual
    static checkAutoColumnWidthUpdate(D, w2) {
      if (w2.offsetWidth !== D._tableDimensions.indexColumnWidth) {
        let O = w2.offsetWidth;
        D.offsetWidth !== D.scrollWidth && (O = te.wrapColumnTextAndGetDefaultWidth(D)), te.changeTableWidths(D, O);
      }
    }
    static updatedBasedOnTableStyle(D, w2, O, x2 = false) {
      x2 ? te.forceWrap(D, w2) : D._tableDimensions.preserveNarrowColumns || D._tableDimensions.maxWidth !== void 0 ? te.updateColumnWidthWhenOverflow(D, w2, O) : D._tableDimensions.width !== void 0 && te.checkAutoColumnWidthUpdate(D, O);
    }
    static getFirstVisibleRow(D) {
      const { _pagination: w2, _tableBodyElementRef: O, dataStartsAtHeader: x2 } = D;
      return x2 && w2 ? w2.visibleRows[0] : O == null ? void 0 : O.children[0];
    }
    static updatedBasedOnVisiblity(D, w2, O = false) {
      const x2 = te.getFirstVisibleRow(D);
      D._pagination && D.filter ? x2 ? te.updatedBasedOnTableStyle(D, x2, w2, O) : setTimeout(() => {
        const U = te.getFirstVisibleRow(D);
        U && te.updatedBasedOnTableStyle(D, U, w2, O);
      }) : x2 && te.updatedBasedOnTableStyle(D, x2, w2, O);
    }
    // used when a new row is added
    // forceWrap - REF-19
    static update(D, w2, O = false) {
      var U;
      if (D._tableDimensions.isColumnIndexCellTextWrapped)
        return;
      if (!w2) {
        const { _tableBodyElementRef: F, data: W } = D;
        w2 = ExtractElements.textRowsArrFromTBody(F, W);
      }
      const x2 = (U = w2[w2.length - 1]) == null ? void 0 : U.children[0];
      x2 && te.updatedBasedOnVisiblity(D, x2, O);
    }
    // used when a new column is added to see if wrapping is needed
    // CAUTION-2 - this runs before re-render but stay cautions
    static wrapTextWhenNarrowColumnsBreached(D) {
      D._frameComponents.displayIndexColumn && te.shouldTextBeWrapped(D) && te.update(D, void 0, true);
    }
  };
  _UpdateIndexColumnWidth.TEMPORARY_INDEX_NUMBER = "temp-index-number";
  _UpdateIndexColumnWidth.TEMPORARY_INVISIBLE_INDEX_NUMBER = "temp-invisible-index-number";
  var UpdateIndexColumnWidth = _UpdateIndexColumnWidth;
  var _IndexColumn = class be {
    static updateIndexes(D, w2) {
      const { _tableBodyElementRef: O, data: x2, dataStartsAtHeader: U } = D, F = ExtractElements.textRowsArrFromTBody(O, x2, w2), W = Number(U);
      F.forEach((G, X) => {
        const K = G.children[0], q = w2 + X + W;
        K.innerText = String(q);
      }), UpdateIndexColumnWidth.update(D, F.length === 0 ? void 0 : F);
    }
    // prettier-ignore
    static createCell(D, w2) {
      var q, Q;
      const { _tableDimensions: O, _defaultColumnsSettings: x2, _frameComponents: { styles: U, cellColors: F, inheritHeaderColors: W } } = D, G = CellElement.createBaseCell(w2);
      G.classList.add(be.INDEX_CELL_CLASS, GenericElementUtils.NOT_SELECTABLE_CLASS);
      const { displaySettings: X, canEditHeaderRow: K } = D.rowDropdown;
      return G.style.cursor = (q = X.openMethod) != null && q.cellClick && (!w2 || K) ? "pointer" : "default", O.isColumnIndexCellTextWrapped || G.classList.add(be.INDEX_CELL_OVERFLOW_CLASS), Object.assign(G.style, x2.cellStyle, (U == null ? void 0 : U.default) || {}), w2 && Object.assign(
        G.style,
        W ? (Q = x2.headerStyles) == null ? void 0 : Q.default : {},
        F.header.default
      ), G;
    }
    static createHeaderCell(D) {
      const w2 = be.createCell(D, true);
      return D.dataStartsAtHeader && (w2.innerText = "1"), w2.style.width = be.DEFAULT_WIDTH_PX, Browser.IS_SAFARI && setTimeout(() => w2.style.width = be.DEFAULT_WIDTH_PX), w2;
    }
    static createDataCell(D, w2) {
      const O = be.createCell(D, false), x2 = D.dataStartsAtHeader ? w2 + 1 : w2;
      return O.innerText = String(x2), O;
    }
    static createAndPrependToRow(D, w2, O) {
      const x2 = O === 0 ? be.createHeaderCell(D) : be.createDataCell(D, O);
      D._columnsDetails[0] && ColumnSettingsBorderUtils.unsetSubjectBorder([x2], D._columnsDetails[0].elements, "right", 0), w2.appendChild(x2);
    }
  };
  _IndexColumn.INDEX_CELL_CLASS = "index-cell";
  _IndexColumn.INDEX_CELL_OVERFLOW_CLASS = "index-cell-overflow";
  _IndexColumn.DEFAULT_WIDTH = 30;
  _IndexColumn.DEFAULT_WIDTH_PX = `${_IndexColumn.DEFAULT_WIDTH}px`;
  var IndexColumn = _IndexColumn;
  var UNSET_NUMBER_IDENTIFIER = -1;
  var _TableDimensionsUtils = class $e {
    // REF-19
    static setIsColumnIndexCellTextWrapped(D, w2) {
      w2 && (typeof w2 == "object" && w2.wrapIndexCellText ? D.isColumnIndexCellTextWrapped = true : D.isColumnIndexCellTextWrapped === void 0 && (D.isColumnIndexCellTextWrapped = false));
    }
    static setPreserveNarrowColumnsProp(D, w2) {
      w2.preserveNarrowColumns = D.preserveNarrowColumns;
    }
    // prettier-ignore
    static setDimension(D, w2) {
      const { tableStyle: O, _tableDimensions: x2, _tableElementRef: U, parentElement: F } = D;
      if (!U || !F)
        return;
      const W = StringDimensionUtils.generateNumberDimensionFromClientString(
        F,
        O,
        w2,
        true,
        $e.MINIMAL_TABLE_WIDTH
      );
      W.number > 0 && (D.overflow && OverflowUtils.processNumberDimension(x2, W), x2[w2] = W.number, x2.isPercentage = W.isPercentage);
    }
    // CAUTION-3
    // prettier-ignore
    static setTableDimensions(D) {
      const { tableStyle: w2, _tableDimensions: O, _frameComponents: { displayIndexColumn: x2 } } = D;
      w2.width !== void 0 ? $e.setDimension(D, "width") : w2.maxWidth !== void 0 && $e.setDimension(D, "maxWidth"), $e.setPreserveNarrowColumnsProp(D, O), $e.setIsColumnIndexCellTextWrapped(O, x2);
    }
    static hasSetTableWidthBeenBreached(D) {
      const { width: w2, maxWidth: O } = D._tableDimensions, x2 = D.offsetWidth, U = w2 || O;
      return U ? Math.ceil(U) < x2 : false;
    }
    static record(D) {
      D._tableDimensions.recordedParentWidth = D.parentElement.offsetWidth, D._tableDimensions.recordedParentHeight = D.parentElement.offsetHeight, D._tableDimensions.recordedWindowWidth = window.innerWidth, D._tableDimensions.recordedWindowHeight = window.innerHeight;
    }
    static getDefault() {
      return {
        recordedParentWidth: 0,
        recordedParentHeight: 0,
        recordedWindowWidth: 0,
        recordedWindowHeight: 0,
        border: TableBorderDimensionsUtils.generateDefault(),
        staticWidth: UNSET_NUMBER_IDENTIFIER,
        newColumnWidth: 140,
        indexColumnWidth: IndexColumn.DEFAULT_WIDTH
      };
    }
  };
  _TableDimensionsUtils.MINIMAL_TABLE_WIDTH = 70;
  var TableDimensionsUtils = _TableDimensionsUtils;
  var MaximumRows = class {
    static canAddMore(D) {
      var U;
      const { _columnsDetails: w2, maxRows: O } = D, x2 = (U = w2[0]) == null ? void 0 : U.elements.length;
      return !(x2 !== void 0 && O !== void 0 && O > 0 && O <= x2);
    }
  };
  var FrameComponentsColors = class _FrameComponentsColors {
    // prettier-ignore
    static getInheritedHeaderColors(D) {
      var x2, U, F, W, G, X;
      const { _defaultColumnsSettings: { headerStyles: w2, cellStyle: O } } = D;
      return {
        default: {
          backgroundColor: ((x2 = w2 == null ? void 0 : w2.default) == null ? void 0 : x2.backgroundColor) || (O == null ? void 0 : O.backgroundColor) || "",
          color: ((U = w2 == null ? void 0 : w2.default) == null ? void 0 : U.color) || (O == null ? void 0 : O.color) || ""
        },
        hover: {
          backgroundColor: ((F = w2 == null ? void 0 : w2.hoverColors) == null ? void 0 : F.backgroundColor) || ((W = w2 == null ? void 0 : w2.default) == null ? void 0 : W.backgroundColor) || (O == null ? void 0 : O.backgroundColor) || D._defaultCellHoverColors.backgroundColor,
          color: ((G = w2 == null ? void 0 : w2.hoverColors) == null ? void 0 : G.color) || ((X = w2 == null ? void 0 : w2.default) == null ? void 0 : X.color) || (O == null ? void 0 : O.color) || D._defaultCellHoverColors.color
        }
      };
    }
    // prettier-ignore
    static getHoverColorValue(D, w2) {
      var U, F, W;
      const { _frameComponents: { styles: O }, _defaultCellHoverColors: x2 } = D;
      return ((U = O == null ? void 0 : O.hoverColors) == null ? void 0 : U[w2]) || ((F = O == null ? void 0 : O.default) == null ? void 0 : F[w2]) || ((W = D._defaultColumnsSettings.cellStyle) == null ? void 0 : W[w2]) || x2[w2];
    }
    static getDefaultColorValue(D, w2) {
      var O, x2, U;
      return ((x2 = (O = D._frameComponents.styles) == null ? void 0 : O.default) == null ? void 0 : x2[w2]) || ((U = D._defaultColumnsSettings.cellStyle) == null ? void 0 : U[w2]) || "";
    }
    // prettier-ignore
    static setEventColors(D) {
      const w2 = {
        default: {
          backgroundColor: _FrameComponentsColors.getDefaultColorValue(D, "backgroundColor"),
          color: _FrameComponentsColors.getDefaultColorValue(D, "color")
        },
        hover: {
          backgroundColor: _FrameComponentsColors.getHoverColorValue(D, "backgroundColor"),
          color: _FrameComponentsColors.getHoverColorValue(D, "color")
        }
      }, { _frameComponents: { cellColors: O, inheritHeaderColors: x2 } } = D;
      O.data = w2, O.header = x2 ? _FrameComponentsColors.getInheritedHeaderColors(D) : w2;
    }
    static getColorsBasedOnParam(D, w2) {
      const { data: O, header: x2 } = D;
      return w2 === 0 ? x2 : O;
    }
    static getDefaultCellColors() {
      return {
        data: {
          default: { backgroundColor: "", color: "" },
          hover: { backgroundColor: "", color: "" }
        },
        header: {
          default: { backgroundColor: "", color: "" },
          hover: { backgroundColor: "", color: "" }
        }
      };
    }
  };
  var CellHighlightUtils = class {
    static fade(D, w2) {
      D.style.backgroundColor = (w2 == null ? void 0 : w2.backgroundColor) || "", D.style.color = (w2 == null ? void 0 : w2.color) || "";
    }
    static highlight(D, w2) {
      w2 != null && w2.backgroundColor && (D.style.backgroundColor = w2.backgroundColor), w2 != null && w2.color && (D.style.color = w2.color);
    }
    static unsetDefaultHoverProperties(D) {
      D.backgroundColor = "", D.color = "";
    }
    static getDefaultHoverProperties() {
      return { backgroundColor: "#f7f7f7", color: "" };
    }
  };
  var ElementOffset = class {
    static processLeft(D, w2) {
      return Browser.IS_FIREFOX ? D += w2.leftWidth : Browser.IS_SAFARI && (D -= w2.leftWidth), D;
    }
    static processTop(D, w2) {
      return Browser.IS_FIREFOX ? D += w2.topWidth : Browser.IS_SAFARI && (D -= w2.topWidth), D;
    }
    static processWidth(D, w2) {
      return Browser.IS_FIREFOX && (D += w2.leftWidth), D;
    }
  };
  var VisibilityUtils = class {
    static headerChanged(D) {
      setTimeout(() => {
        D._visiblityInternal.filters && FilterInternalUtils.resetAllInputs(D);
      });
    }
    static completeReset(D) {
      D._visiblityInternal.filters && FilterInternalUtils.completeReset(D);
    }
  };
  var _CaretDisplayFix = class _e {
    static removeContentEditable(D) {
      D.removeAttribute(_e.CONTENT_EDITABLE);
    }
    // THIS HAS TO BE CALLED IN A FOCUS EVENT!!!!!!!!!!!!!!!!!
    static setContentEditable(D) {
      D.setAttribute(_e.CONTENT_EDITABLE, "true");
    }
    static removeTabIndex(D) {
      D.removeAttribute(_e.TAB_INDEX);
    }
    static setTabIndex(D) {
      D.setAttribute(_e.TAB_INDEX, "0");
    }
    static removeBRPadding(D, w2) {
      const x2 = CellElement.getTextElement(w2).childNodes[0];
      x2.tagName === _e.BR_TAG_NAME && (x2.remove(), CaretPosition.setToEndOfText(D, w2));
    }
    static addBRPaddingToEmptyCell(D, w2) {
      const O = CellElement.getTextElement(D);
      w2 === EMPTY_STRING && O.childNodes.length === 0 && O.appendChild(document.createElement(_e.BR_TAG_NAME));
    }
    // caret is placed too far on top left
    // this happens when cell text is programmatically set to empty or when the user doubeclicks text and clicks backspace
    // natively firefox adds a 'br' element to replace the text when the user deletes it when clicking backspace for each
    // letter however it does not for the cases outlined previously, hence this is needed
    static toggleCellTextBRPadding(D, w2, O) {
      const x2 = CellElement.getText(w2);
      O && x2 !== EMPTY_STRING ? _e.removeBRPadding(D, w2) : _e.addBRPaddingToEmptyCell(w2, x2);
    }
    static isIssueBrowser() {
      return Browser.IS_FIREFOX || Browser.IS_SAFARI;
    }
  };
  _CaretDisplayFix.CONTENT_EDITABLE = "contenteditable";
  _CaretDisplayFix.TAB_INDEX = "tabindex";
  _CaretDisplayFix.BR_TAG_NAME = "BR";
  var CaretDisplayFix = _CaretDisplayFix;
  var _CellTextElement = class et {
    static set(D, w2) {
      D.innerText = "", D.contentEditable = "false", CaretDisplayFix.isIssueBrowser() && CaretDisplayFix.removeTabIndex(D), D.appendChild(w2);
    }
    static createTextElement(D, w2) {
      const O = document.createElement("div");
      return O.innerText = D, D === "" && CaretDisplayFix.addBRPaddingToEmptyCell(O, ""), O.classList.add(et.CELL_TEXT_DIV_CLASS), CellElement.prepContentEditable(O, w2), O;
    }
    static setCellTextAsAnElement(D, w2) {
      const O = CellElement.getText(D), x2 = et.createTextElement(O, w2);
      return et.set(D, x2), x2;
    }
  };
  _CellTextElement.CELL_TEXT_DIV_CLASS = "cell-text-div";
  var CellTextElement = _CellTextElement;
  var _HeaderIconCellElement = class ye {
    static createTextElement(D, w2) {
      const O = CellTextElement.setCellTextAsAnElement(D, w2);
      return O.classList.add(ye.TEXT_CLASS), O.style.pointerEvents = w2 ? "" : "none", O;
    }
    static setScale(D, w2) {
      const O = (w2 == null ? void 0 : w2.x) || 1.2, x2 = (w2 == null ? void 0 : w2.y) || 1.2, U = `scale(${O}, ${x2})`;
      D.style.transform = U, D.style.webkitTransform = U;
    }
    static createSvgIcon(D, w2) {
      var x2, U;
      const O = SVGIconUtils.createSVGElement(D.svgString);
      return ye.setScale(O, (x2 = w2.headerIconStyle) == null ? void 0 : x2.scale), O.style.filter = ((U = w2.headerIconStyle) == null ? void 0 : U.filterColor) || SVGIconUtils.HEADER_FILTER, O;
    }
    static createSVGContainer(D) {
      const w2 = document.createElement("div"), { containerStyles: O } = D;
      return O != null && O.dropdown && Object.assign(w2.style, O == null ? void 0 : O.dropdown), O != null && O.headerCorrections && Object.assign(w2.style, O == null ? void 0 : O.headerCorrections), w2.classList.add(ye.ICON_CONTAINER_CLASS), w2;
    }
    static createSVG(D, w2) {
      const O = ye.createSVGContainer(D), x2 = ye.createSvgIcon(D, w2);
      return O.appendChild(x2), O;
    }
    static changeHeaderIcon(D) {
      const { elements: w2, activeType: O, settings: x2 } = D, U = ye.createSVG(O.dropdownItem.settings.iconSettings, x2), F = w2[0];
      F.replaceChild(U, F.children[0]);
    }
    static setHeaderIconStructure(D, w2, O) {
      var K, q, Q;
      const { activeType: x2, settings: U } = D._columnsDetails[O], F = ye.createSVG(x2.dropdownItem.settings.iconSettings, U), W = (Q = (q = (K = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : K.displaySettings) == null ? void 0 : q.openMethod) == null ? void 0 : Q.cellClick, G = U.isHeaderTextEditable && !W, X = ye.createTextElement(w2, G);
      w2.insertBefore(F, X);
    }
  };
  _HeaderIconCellElement.TEXT_CLASS = "header-icon-side-text";
  _HeaderIconCellElement.ICON_CONTAINER_CLASS = "header-icon-container";
  var HeaderIconCellElement = _HeaderIconCellElement;
  var _DateCellInputElement = class Se {
    static isInputElement(D) {
      return (D == null ? void 0 : D.type) === Se.ELEMENT_TYPE;
    }
    static toggle(D, w2) {
      if (!D)
        return;
      const O = D.children[1];
      O.style.display = w2 ? "block" : "none";
    }
    static extractInputElementFromCell(D) {
      return D.children[1].children[0];
    }
    static convertTextToInputValue(D, w2) {
      if (w2.calendar && (w2.textValidation.func === void 0 || w2.textValidation.func(D))) {
        const x2 = w2.calendar.toYMDFunc(D);
        return [x2[0], x2[1].padStart(2, "0"), x2[2].padStart(2, "0")].join("-");
      }
      return "-";
    }
    static updateInputBasedOnTextDiv(D, w2) {
      const O = Se.convertTextToInputValue(CellElement.getText(D), w2);
      Se.extractInputElementFromCell(D).value = O;
    }
    static createInputElement(D, w2) {
      const O = document.createElement("input");
      return O.type = Se.ELEMENT_TYPE, O.classList.add(Se.DATE_INPUT_CLASS), O.value = Se.convertTextToInputValue(D, w2), O;
    }
    static createInputElementContainer() {
      const D = document.createElement("div");
      return D.classList.add(Se.DATE_INPUT_CONTAINER_CLASS), D.style.display = "none", D;
    }
    static addDateInputElement(D, w2, O) {
      const x2 = Se.createInputElementContainer(), U = Se.createInputElement(CellElement.getText(w2), O);
      x2.appendChild(U);
      const F = DateCellCalendarIconElement.get();
      x2.appendChild(F), D.appendChild(x2);
    }
  };
  _DateCellInputElement.ELEMENT_TYPE = "date";
  _DateCellInputElement.DATE_INPUT_CLASS = "date-input";
  _DateCellInputElement.DATE_INPUT_CONTAINER_CLASS = "date-input-container";
  var DateCellInputElement = _DateCellInputElement;
  var DateCellTextElement = class {
    static convertInputValueToText(D, w2, O) {
      const x2 = RegexUtils.extractIntegerStrs(D);
      return x2 ? O.fromYMDFunc(x2) : w2;
    }
    static setCellTextAsAnElement(D, w2) {
      const O = CellTextElement.setCellTextAsAnElement(D, w2);
      return O.style.float = "left", O;
    }
  };
  var _DateCellCalendarIconEvents = class at {
    static mouseDownIcon(D, w2, O) {
      const { _focusedElements: x2, _activeOverlayElements: U } = this, W = O.target.previousSibling, G = CellElement.getCellElement(W);
      setTimeout(() => {
        FocusedCellUtils.set(x2.cell, G, D, w2), U.datePickerCell = G, Browser.IS_SAFARI ? W.dispatchEvent(new MouseEvent("click")) : W.showPicker();
      }, at.PICKER_DISPLAY_DELAY_ML);
    }
    static setEvents(D, w2, O, x2) {
      w2.onmousedown = at.mouseDownIcon.bind(D, O, x2);
    }
  };
  _DateCellCalendarIconEvents.PICKER_DISPLAY_DELAY_ML = Browser.IS_FIREFOX ? 190 : 0;
  var DateCellCalendarIconEvents = _DateCellCalendarIconEvents;
  var MOUSE_EVENT = /* @__PURE__ */ ((Y) => (Y.DOWN = "Down", Y))(MOUSE_EVENT || {});
  var DateCellInputEvents = class _DateCellInputEvents {
    // outstanding bug is when the user opens picker and moves with arrow keys, then clicks escape
    // the picker fires a clear event and does not actually close itself and instead goes to the
    // initially opened up date. The key up event for the escape button is also not fired.
    static escapeKeyInput(D) {
      if (D._activeOverlayElements.datePickerCell) {
        const w2 = D._focusedElements.cell.element;
        D._hoveredElements.dateCell !== w2 && DateCellInputElement.toggle(w2, false), delete D._activeOverlayElements.datePickerCell;
      }
    }
    // this is triggered when a date is selected via the date picker
    // prettier-ignore
    static inputInput(D, w2, O) {
      const { elements: x2, settings: { defaultText: U }, activeType: { calendar: F } } = this._columnsDetails[w2];
      if (!F)
        return;
      const W = O.target.value, G = DateCellTextElement.convertInputValueToText(W, U, F), X = x2[D];
      CellEvents.updateCell(this, G, D, w2, { element: X });
    }
    // this is triggered when the user clicks on picker buttons
    static changeInput() {
      const D = this._focusedElements.cell.element;
      !this._userKeyEventsState[MOUSE_EVENT.DOWN] && // do not hide icon when currently hovered
      this._hoveredElements.dateCell !== D && DateCellInputElement.toggle(D, false), delete this._activeOverlayElements.datePickerCell;
    }
    // the user does not use the actual input element and the events are triggered via the date picker
    static setEvents(D, w2, O, x2) {
      w2.onchange = _DateCellInputEvents.changeInput.bind(D), w2.oninput = _DateCellInputEvents.inputInput.bind(D, O, x2);
    }
  };
  var FocusNextColumnCellFromTextDiv = class _FocusNextColumnCellFromTextDiv {
    static focusDifferentColumnCell(D, w2, O) {
      const { elements: x2, activeType: U, settings: F } = D._columnsDetails[w2], W = x2[O];
      if (!F.isCellTextEditable || O === 0 && !F.isHeaderTextEditable || // REF-29
      Browser.IS_SAFARI && CheckboxCellElement.isCheckboxCell(W))
        return _FocusNextColumnCellFromTextDiv.focusOrBlurNext(D, w2, O);
      U.cellDropdownProps ? W.dispatchEvent(new Event("mousedown")) : (CellWithTextEvents.programmaticBlur(D), CellElement.getTextElement(W).focus()), W.scrollIntoView({ block: "nearest" });
    }
    static focusOrBlurNextRowFirstCell(D, w2) {
      const O = D._columnsDetails[0], x2 = w2 + 1;
      O.elements[x2] ? _FocusNextColumnCellFromTextDiv.focusDifferentColumnCell(D, 0, x2) : D._focusedElements.cell.element.children[0].blur();
    }
    static focusOrBlurNext(D, w2, O) {
      D._columnsDetails[w2 + 1] ? _FocusNextColumnCellFromTextDiv.focusDifferentColumnCell(D, w2 + 1, O) : _FocusNextColumnCellFromTextDiv.focusOrBlurNextRowFirstCell(D, O);
    }
  };
  var CellTextEvents = class {
    static tabOutOfCell(D, w2, O, x2) {
      x2.preventDefault(), DataCellEvents.keyDownCell.bind(D, w2, O)(x2), FocusNextColumnCellFromTextDiv.focusOrBlurNext(D, O, w2);
    }
  };
  var DateCellTextEvents = class _DateCellTextEvents {
    static keyDownOnText(D, w2, O) {
      O.key === KEYBOARD_KEY.TAB && CellTextEvents.tabOutOfCell(this, D, w2, O);
    }
    static inputText(D, w2) {
      if (Browser.IS_INPUT_DATE_SUPPORTED) {
        const { activeType: O } = this._columnsDetails[D], x2 = CellElement.getCellElement(w2.target);
        DateCellInputElement.updateInputBasedOnTextDiv(x2, O);
      }
    }
    static blurText(D, w2, O) {
      const x2 = O.target;
      DataCellEvents.blur(this, D, w2, x2);
    }
    static setEvents(D, w2, O, x2) {
      D._columnsDetails[x2].settings.isCellTextEditable && (w2.onfocus = CellWithTextEvents.focusText.bind(D, O, x2, null), w2.onblur = _DateCellTextEvents.blurText.bind(D, O, x2), w2.oninput = _DateCellTextEvents.inputText.bind(D, x2), w2.onkeydown = _DateCellTextEvents.keyDownOnText.bind(D, O, x2));
    }
  };
  var DateCellEvents = class _DateCellEvents {
    static mouseLeaveCell(D) {
      if (delete this._hoveredElements.dateCell, Browser.IS_INPUT_DATE_SUPPORTED) {
        const w2 = D.target;
        if (this._activeOverlayElements.datePickerCell === w2)
          return;
        DateCellInputElement.toggle(w2, false);
      }
    }
    static mouseEnterCell(D) {
      this._hoveredElements.dateCell = D.target, Browser.IS_INPUT_DATE_SUPPORTED && DateCellInputElement.toggle(this._hoveredElements.dateCell, true);
    }
    static setEvents(D, w2, O, x2) {
      if (!D._columnsDetails[x2].settings.isCellTextEditable)
        return;
      w2.onblur = () => {
      }, w2.onfocus = () => {
      }, w2.onmouseenter = _DateCellEvents.mouseEnterCell.bind(D), w2.onmouseleave = _DateCellEvents.mouseLeaveCell.bind(D), w2.onmousedown = CellWithTextEvents.mouseDown.bind(D, null);
      const U = w2.children[0];
      if (DateCellTextEvents.setEvents(D, U, O, x2), Browser.IS_INPUT_DATE_SUPPORTED) {
        const F = w2.children[1];
        DateCellInputEvents.setEvents(D, F, O, x2);
        const W = F.children[1];
        DateCellCalendarIconEvents.setEvents(D, W, O, x2);
      }
    }
  };
  var DateCellElement = class _DateCellElement {
    // prettier-ignore
    static setCellDateStructure(D, w2, O) {
      ConvertCellTypeUtils.preprocessCell(w2), w2.style.cursor = "text";
      const { isCellTextEditable: x2 } = D._columnsDetails[O].settings, U = DateCellTextElement.setCellTextAsAnElement(w2, x2);
      Browser.IS_INPUT_DATE_SUPPORTED && DateCellInputElement.addDateInputElement(
        w2,
        U,
        D._columnsDetails[O].activeType
      );
    }
    static setColumnDateStructure(D, w2) {
      CellStructureUtils.setColumn(D, w2, _DateCellElement.setCellDateStructure, DateCellEvents.setEvents);
    }
  };
  var _SelectCellTextElement = class Ct {
    static setCellTextAsAnElement(D, w2, O) {
      const { isCellTextEditable: x2 } = D._columnsDetails[O].settings;
      CellTextElement.setCellTextAsAnElement(w2, x2).classList.add(Ct.TEXT_CLASS);
    }
    // prettier-ignore
    static finaliseEditedText(D, w2, O) {
      var K, q;
      const x2 = D._columnsDetails[O], { cellDropdown: U, activeType: F, settings: W } = x2, G = CellElement.getText(w2), X = !!((K = U.itemsDetails[G]) != null && K.backgroundColor);
      (q = F.cellDropdownProps) != null && q.canAddMoreOptions && G !== EMPTY_STRING && !X && (!W.isDefaultTextRemovable || G !== W.defaultText) && CellDropdownItem.addNewItem(D, w2, x2, w2.style.backgroundColor);
    }
  };
  _SelectCellTextElement.TEXT_CLASS = "select-cell-text";
  var SelectCellTextElement = _SelectCellTextElement;
  var SelectCellBaseEvents = class {
    static blurIfDropdownFocused(D) {
      D._focusedElements.cellDropdown && CellWithTextEvents.programmaticBlur(D);
    }
  };
  var SelectCellEvents = class _SelectCellEvents {
    static mouseLeaveCell(D, w2) {
      delete this._hoveredElements.selectCell;
      const O = w2.target, { cellDropdown: x2 } = this._columnsDetails[D];
      (!Dropdown.isDisplayed(x2.element) || x2.displayedCellElement !== O) && ArrowDownIconElement.toggle(O, false);
    }
    static mouseEnterCell(D) {
      this._hoveredElements.selectCell = D.target, ArrowDownIconElement.toggle(this._hoveredElements.selectCell, true);
    }
    static mouseDownCell(D) {
      var O;
      const w2 = D.target;
      if (w2.classList.contains(CellElement.CELL_CLASS))
        CellWithTextEvents.mouseDownCell(this, SelectCellBaseEvents.blurIfDropdownFocused, w2, D);
      else if (w2.classList.contains(ArrowDownIconElement.ARROW_ICON_CLASS)) {
        const x2 = (O = w2.parentElement) == null ? void 0 : O.parentElement;
        CellWithTextEvents.mouseDownCell(this, SelectCellBaseEvents.blurIfDropdownFocused, x2, D);
      }
    }
    static setEvents(D, w2, O, x2) {
      if (!D._columnsDetails[x2].settings.isCellTextEditable)
        return;
      w2.onblur = () => {
      }, w2.onfocus = () => {
      }, w2.onmouseenter = _SelectCellEvents.mouseEnterCell.bind(D), w2.onmouseleave = _SelectCellEvents.mouseLeaveCell.bind(D, x2), w2.onmousedown = _SelectCellEvents.mouseDownCell.bind(D);
      const U = w2.children[0];
      SelectCellTextBaseEvents.setEvents(D, U, O, x2);
    }
  };
  var SelectCellElement = class _SelectCellElement {
    static setCellSelectStructure(D, w2, O) {
      ConvertCellTypeUtils.preprocessCell(w2), SelectCellTextElement.setCellTextAsAnElement(D, w2, O), w2.appendChild(ArrowDownIconElement.get()), SelectCell.setPointerCursorIfCantAdd(w2, D._columnsDetails[O].activeType);
    }
    static setColumnSelectStructure(D, w2) {
      CellStructureUtils.setColumn(D, w2, _SelectCellElement.setCellSelectStructure, SelectCellEvents.setEvents);
    }
  };
  var LabelCellEvents = class {
    static setEvents(D, w2, O, x2) {
      if (!D._columnsDetails[x2].settings.isCellTextEditable)
        return;
      w2.onblur = () => {
      }, w2.onfocus = () => {
      }, w2.onmouseenter = () => {
      }, w2.onmouseleave = () => {
      }, w2.onmousedown = CellWithTextEvents.mouseDown.bind(D, SelectCellBaseEvents.blurIfDropdownFocused);
      const U = w2.children[0];
      SelectCellTextBaseEvents.setEvents(D, U, O, x2);
    }
  };
  var LabelCellElement = class _LabelCellElement {
    // prettier-ignore
    static setCellLabelStructure(D, w2, O) {
      var W;
      ConvertCellTypeUtils.preprocessCell(w2);
      const { cellDropdown: { itemsDetails: x2 }, settings: { isCellTextEditable: U } } = D._columnsDetails[O], F = ((W = x2[CellElement.getText(w2)]) == null ? void 0 : W.backgroundColor) || "";
      LabelCellTextElement.setCellTextAsAnElement(w2, F, U), SelectCell.setPointerCursorIfCantAdd(w2, D._columnsDetails[O].activeType);
    }
    static setColumnLabelStructure(D, w2) {
      CellStructureUtils.setColumn(D, w2, _LabelCellElement.setCellLabelStructure, LabelCellEvents.setEvents);
    }
  };
  var SelectCell = class {
    static convertCell(D, w2, O) {
      var U;
      (U = D._columnsDetails[w2].activeType.cellDropdownProps) != null && U.isBasicSelect ? SelectCellElement.setCellSelectStructure(D, O, w2) : LabelCellElement.setCellLabelStructure(D, O, w2);
    }
    static convertColumn(D, w2, O) {
      var x2;
      (x2 = O.cellDropdownProps) != null && x2.isBasicSelect ? SelectCellElement.setColumnSelectStructure(D, w2) : LabelCellElement.setColumnLabelStructure(D, w2);
    }
    static setEvents(D, w2, O, x2) {
      var F;
      const { activeType: U } = D._columnsDetails[x2];
      (F = U.cellDropdownProps) != null && F.isBasicSelect ? SelectCellEvents.setEvents(D, w2, O, x2) : LabelCellEvents.setEvents(D, w2, O, x2);
    }
    // prettier-ignore
    static finaliseEditedText(D, w2, O, x2 = false) {
      var F;
      const { activeType: U } = D._columnsDetails[O];
      (F = U.cellDropdownProps) != null && F.isBasicSelect ? SelectCellTextElement.finaliseEditedText(D, w2, O) : LabelCellTextElement.finaliseEditedText(D, w2, O, x2);
    }
    static setPointerCursorIfCantAdd(D, w2) {
      var O;
      if (D.style.cursor = "pointer", !((O = w2.cellDropdownProps) != null && O.canAddMoreOptions)) {
        const x2 = D.children[0];
        x2.style.caretColor = "transparent", x2.style.cursor = "pointer";
      }
    }
  };
  var DataCellElement = class _DataCellElement {
    static setCellDataStructure(D, w2, O) {
      w2.innerText = CellElement.getTextElement(w2).innerText;
      const { isCellTextEditable: x2 } = D._columnsDetails[O].settings;
      CellElement.prepContentEditable(w2, x2);
    }
    static setColumnDataStructure(D, w2) {
      CellStructureUtils.setColumn(D, w2, _DataCellElement.setCellDataStructure, DataCellEvents.setEvents);
    }
  };
  var ChangeColumnType = class _ChangeColumnType {
    static setInvalidCellToDefault(D, w2, O) {
      const x2 = w2 + 1, U = D._columnsDetails[O].elements[x2];
      return CellEvents.setCellToDefaultIfNeeded(D, x2, O, U, false);
    }
    static setInvalidCellsToDefault(D, w2) {
      let O = false;
      D.data.slice(1).forEach((x2, U) => {
        _ChangeColumnType.setInvalidCellToDefault(D, U, w2) && !O && (O = true);
      }), O && setTimeout(() => FireEvents.onDataUpdate(D));
    }
    static setNew(D, w2, O) {
      const x2 = D._columnsDetails[O];
      return x2.activeType = x2.settings.types.find((U) => U.name === w2), x2.activeType;
    }
    static setNewStructureBasedOnType(D, w2, O) {
      delete D._columnsDetails[w2].cellDropdown.labelDetails, O.cellDropdownProps ? (CellDropdown.setUpDropdown(D, w2), SelectCell.convertColumn(D, w2, O)) : O.calendar ? DateCellElement.setColumnDateStructure(D, w2) : O.checkbox ? CheckboxCellElement.setColumnCheckboxStructure(D, w2) : DataCellElement.setColumnDataStructure(D, w2);
    }
    // this is required as switching to another type makes it difficult to overwrite text element (as there isn't one) for
    // checkboxes when validation fails
    static resetCheckboxElements(D) {
      D.elements.slice(1).forEach((w2) => {
        w2.innerText = CellElement.getText(w2);
      });
    }
    static resetAndChangeFunc(D, w2, O) {
      const x2 = D._columnsDetails[O];
      x2.activeType.checkbox && _ChangeColumnType.resetCheckboxElements(x2);
      const U = _ChangeColumnType.setNew(D, w2, O);
      U.textValidation.func && U.textValidation.setTextToDefaultOnFail && _ChangeColumnType.setInvalidCellsToDefault(D, O), _ChangeColumnType.setNewStructureBasedOnType(D, O, U), D.displayHeaderIcons && HeaderIconCellElement.changeHeaderIcon(D._columnsDetails[O]), setTimeout(() => FireEvents.onColumnsUpdate(D));
    }
    // prettier-ignore
    static change(D, w2) {
      const O = this._columnsDetails[w2].activeType;
      D !== O.name && ProcessedDataTextStyle.resetDataCellsStyle(
        this,
        w2,
        _ChangeColumnType.resetAndChangeFunc.bind(this, this, D, w2)
      );
    }
  };
  var CheckboxValidationFunc = class {
    // cannot place this inside the CheckboxCellElement class as certain dependencies are not imported in time
    static getDefault() {
      return (D) => {
        const w2 = String(D).trim().toLocaleLowerCase();
        return w2 === "" || w2 === "0" || w2 === "00" || w2 === "false" ? "false" : "true";
      };
    }
  };
  var CURRENCY_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
	<g transform="matrix(0.84210527 0 0 0.84210527 0 0)">
		<g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
			<g>
				<path d="M441.1 297.29C 422.358 282.915 397.057 271.728 364.155 263.138L364.155 263.138L364.155 113.058C 378.792 114.1439 405.382 119.14 452.362 140.058C 458.8308 142.9291 466.339 142.1322 472.061 137.97209C 477.7837 133.81189 480.854 126.91709 480.1157 119.87809C 479.38132 112.84289 474.9477 106.73009 468.4867 103.843094C 413.2097 79.230095 381.8067 74.17909 364.15668 73.300095L364.15668 73.300095L364.15668 42.152092C 364.15668 34.335693 357.82077 27.996092 350.00067 27.996092C 342.18057 27.996092 335.84467 34.33589 335.84467 42.152092L335.84467 42.152092L335.84467 73.93709C 307.65366 76.28479 280.86768 87.23009 259.09866 105.29208C 234.52066 125.13208 220.09067 154.91309 219.75467 186.49509C 219.5242 216.7761 234.14967 245.24908 258.89966 262.7021C 277.64166 277.0771 302.94266 288.2641 335.84467 296.8541L335.84467 296.8541L335.84467 446.93408C 321.20767 445.84818 294.60666 440.84818 247.63766 419.93408L247.63766 419.93408L247.63766 419.93018C 241.16887 417.05908 233.66066 417.856 227.93866 422.01608C 222.21596 426.17627 219.14566 433.07108 219.88396 440.11008C 220.61833 447.14526 225.05196 453.2581 231.51295 456.14508C 286.72797 480.73108 318.18097 485.80908 335.84296 486.69608L335.84296 486.69608L335.84296 517.8371C 335.84296 525.6535 342.17886 531.9931 349.99896 531.9931C 357.81906 531.9931 364.15497 525.6533 364.15497 517.8371L364.15497 517.8371L364.15497 486.0521C 392.34598 483.7044 419.13196 472.7591 440.90097 454.69708C 465.47897 434.8571 479.90897 405.07608 480.24496 373.49408C 480.47543 343.21307 465.84998 314.74008 441.09998 297.28708L441.09998 297.28708L441.1 297.29zM282.99 231.22801C 268.099 221.23581 259.232 204.42702 259.392 186.49802C 259.81778 166.59201 269.1029 147.90802 284.712 135.54501C 299.302 123.52501 317.06 115.99001 335.841 113.85401L335.841 113.85401L335.841 255.71402C 316.907 250.75702 299.013 242.46402 282.989 231.22601zM415.27997 424.448L415.28387 424.448C 400.69388 436.468 382.93588 444.003 364.15488 446.139L364.15488 446.139L364.15488 304.279C 383.08887 309.236 400.98288 317.529 417.00687 328.767C 431.89786 338.7592 440.76486 355.568 440.60486 373.497C 440.17908 393.403 430.89395 412.087 415.28485 424.45z" stroke="none" fill="#000000" fill-rule="nonzero" />
			</g>
		</g>
	</g>
</svg>`;
  var CHECKBOX_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="13">
  <g transform="matrix(0.68421054 0 0 0.68421054 0 0)">
    <g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
      <g>
        <path d="M521.77 0L178.24002 0C 119.416016 0 70.01002 49.41 70.01002 108.23L70.01002 108.23L70.01002 454.11002C 70.01002 512.934 119.42001 562.34 178.24002 562.34L178.24002 562.34L524.12 562.34C 582.944 562.34 632.35 512.93005 632.35 454.11002L632.35 454.11002L632.35 108.23001C 629.99835 49.40601 582.94 7.6293945E-06 521.76 7.6293945E-06L521.76 7.6293945E-06L521.77 0zM587.653 451.77C 587.653 487.063 559.419 515.30096 524.122 515.30096L524.122 515.30096L178.242 515.29706C 142.949 515.29706 114.711006 487.06305 114.711006 451.76605L114.711006 451.76605L114.71491 108.23605C 114.71491 72.943054 142.94891 44.705055 178.24591 44.705055L178.24591 44.705055L524.1259 44.705055C 559.41895 44.705055 587.6569 72.93906 587.6569 108.23605z" stroke="none" fill="#010101" fill-rule="nonzero" />
        <path d="M479.41 164.71L293.53 350.59003L222.94 280.00003C 213.5298 270.58984 201.764 270.58984 192.35 280.00003C 182.9398 289.41022 182.9398 301.17603 192.35 310.59003L192.35 310.59003L279.409 397.64902C 281.7684 400.0006 286.4715 402.3521 293.534 402.3521C 300.5926 402.3521 305.3 400.00052 307.651 395.29352L307.651 395.29352L510.001 192.94351C 517.05963 185.88492 517.05963 171.76752 510.001 164.70952C 500.59082 155.29543 486.47 155.29543 479.411 164.70952L479.411 164.70952L479.41 164.71z" stroke="none" fill="#010101" fill-rule="nonzero" />
      </g>
    </g>
  </g>
</svg>`;
  var SELECT_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="14">
	<g transform="matrix(0.9 0 0 0.93333334 0 0)">
		<g transform="matrix(0.03 0 0 0.03 2.5000005 -0)">
			<g transform="matrix(1 0 0 1 -86.77152 -33.81399)">
				<g transform="matrix(1 0 0 1 -13.737094 17.33647)">
					<path d="M399.537 218.885L277.33 218.885C 262.315 218.885 254.544 236.996 265.421 247.859L265.421 247.859L328.596 310.981C 335.328 317.708 346.201 317.708 352.933 310.466L352.933 310.466L411.966 247.343C 421.805 236.476 414.555 218.885 399.537 218.885z" stroke="none" fill="#000000" fill-rule="nonzero" />
					<path d="M340.559 56.069C 226.133 56.069 128.026 151.307 128.026 265.753C 128.026 380.198 224.339 475.408 338.765 475.408C 453.191 475.408 547.665 380.561 547.665 266.116C 547.665 151.67 454.985 56.069 340.559 56.069zM338.765 452.542C 235.73 452.542 152.37 369.168 152.37 266.116C 152.37 163.063 235.73 79.689 338.765 79.689C 441.8 79.689 525.16 163.063 525.16 266.116C 525.157 369.168 441.797 452.542 338.765 452.542z" stroke="none" fill="#000000" fill-rule="nonzero" />
				</g>
			</g>
		</g>
	</g>
</svg>`;
  var NUMBER_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">
	<g transform="matrix(0.7368421 0 0 0.7368421 0 0)">
		<g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
			<path d="M577.5 175L471.36 175L489.78598 55.160004C 490.4813 49.101402 487.96957 43.117004 483.15707 39.367004C 478.34848 35.620903 471.93008 34.644302 466.22308 36.796703C 460.51608 38.949005 456.34418 43.917805 455.2071 49.909702L455.2071 49.909702L435.9371 174.9997L296.35712 174.9997L314.7831 55.1597C 315.66983 50.4917 314.61905 45.6597 311.87292 41.7807C 309.12292 37.901802 304.91592 35.308 300.21692 34.5971C 295.51773 33.88226 290.7325 35.11272 286.95493 37.999397C 283.18152 40.886097 280.74402 45.186897 280.20493 49.909397L280.20493 49.909397L260.93494 174.99939L157.49493 174.99939C 151.24103 174.99939 145.46393 178.3353 142.33893 183.74939C 139.21393 189.16348 139.21393 195.83539 142.33893 201.24939C 145.46393 206.66339 151.24123 209.99939 157.49493 209.99939L157.49493 209.99939L255.49493 209.99939L234.02194 349.9994L122.49194 349.9994C 116.238045 349.9994 110.460945 353.3353 107.335945 358.7494C 104.210945 364.16348 104.210945 370.8354 107.335945 376.2494C 110.460945 381.6634 116.23824 384.9994 122.49194 384.9994L122.49194 384.9994L228.63194 384.9994L210.20595 504.8394C 209.31923 509.5074 210.37001 514.33936 213.11615 518.2184C 215.86615 522.0973 220.07315 524.6911 224.77216 525.402C 229.47136 526.1168 234.25656 524.88635 238.03415 521.9997C 241.80756 519.113 244.24506 514.8122 244.78415 510.0897L244.78415 510.0897L264.05414 384.9997L403.63416 384.9997L385.20816 504.8397C 384.32144 509.5077 385.37222 514.3397 388.11835 518.2187C 390.86835 522.0976 395.07535 524.6914 399.77435 525.4023C 404.47354 526.1171 409.25876 524.88666 413.03635 522C 416.80975 519.1133 419.24725 514.8125 419.78635 510.09L419.78635 510.09L439.05634 385L542.49634 385C 548.75024 385 554.52734 381.6641 557.65234 376.25C 560.77734 370.8359 560.77734 364.164 557.65234 358.75C 554.52734 353.336 548.75006 350 542.49634 350L542.49634 350L444.49634 350L466.03934 210L577.4993 210C 583.75323 210 589.53033 206.6641 592.65533 201.25C 595.78033 195.8359 595.78033 189.164 592.65533 183.75C 589.53033 178.336 583.75305 175 577.4993 175L577.4993 175L577.5 175zM430.5 210L408.957 350L269.497 350L291.04 210z" stroke="none" fill="#000000" fill-rule="nonzero" />
		</g>
	</g>
</svg>`;
  var LABEL_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">
	<g transform="matrix(0.7368421 0 0 0.7368421 0 0)">
		<g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
			<g>
				<path d="M279.16 122.86L470.53 122.86L470.53 95.829C 470.53 82.16901 464.9362 69.755005 455.913 60.735C 446.8896 51.7116 434.475 46.118 420.835 46.118L420.835 46.118L165.825 46.118C 152.165 46.118 139.75099 51.7118 130.73099 60.735C 121.70759 69.7584 116.11399 82.173004 116.11399 95.829L116.11399 95.829L116.11399 350.839C 116.11399 364.47998 121.707794 376.913 130.73099 385.917C 139.7544 394.9404 152.16899 400.534 165.82498 400.534L165.82498 400.534L192.85599 400.534L192.85599 209.164C 192.85599 185.41 202.5669 163.836 218.19199 148.195C 233.81708 132.55402 255.40298 122.85901 279.16098 122.85901L279.16098 122.85901L279.16 122.86zM507.14 122.86L534.171 122.86C 557.92505 122.86 579.499 132.5709 595.14 148.196C 610.765 163.821 620.476 185.407 620.476 209.16501L620.476 209.16501L620.476 464.175C 620.476 487.929 610.76514 509.503 595.14 525.144C 579.499 540.785 557.929 550.48 534.171 550.48L534.171 550.48L279.161 550.48C 255.40701 550.48 233.83301 540.7691 218.19202 525.144C 202.55103 509.51886 192.85602 487.93298 192.85602 464.175L192.85602 464.175L192.85602 437.14398L165.82501 437.14398C 142.07101 437.14398 120.49701 427.43307 104.85601 411.80798C 89.23101 396.18298 79.52001 374.597 79.52001 350.839L79.52001 350.839L79.52001 95.828995C 79.52001 72.075 89.23091 50.500996 104.85601 34.859993C 120.49701 19.234993 142.06702 9.523993 165.82501 9.523993L165.82501 9.523993L420.83502 9.523993C 444.58902 9.523993 466.16302 19.234894 481.80402 34.859993C 497.445 50.50099 507.14 72.07099 507.14 95.828995zM534.171 159.469L279.161 159.469C 265.52002 159.469 253.087 165.06279 244.08301 174.086C 235.0596 183.1094 229.466 195.524 229.466 209.18L229.466 209.18L229.466 464.19C 229.466 477.831 235.0598 490.264 244.08301 499.284C 253.10641 508.3074 265.521 513.901 279.161 513.901L279.161 513.901L534.171 513.901C 547.831 513.901 560.245 508.3072 569.265 499.284C 578.2884 490.2606 583.882 477.846 583.882 464.19L583.882 464.19L583.882 209.18001C 583.882 195.539 578.2882 183.106 569.265 174.086C 560.24164 165.06259 547.827 159.469 534.171 159.469z" stroke="none" fill="#000000" fill-rule="nonzero" />
			</g>
		</g>
	</g>
</svg>`;
  var TEXT_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12">
  <g transform="matrix(0.6315789 0 0 0.6315789 0 0)">
    <g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
      <g>
        <path d="M84 32.48L616 32.48L616 92.96L84 92.96L84 32.48z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M84 177.52L470.4 177.52L470.4 238L84 238L84 177.52z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M84 322.56L616 322.56L616 383.04L84 383.04L84 322.56z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M84 467.6L470.4 467.6L470.4 528.08L84 528.08L84 467.6z" stroke="none" fill="#000000" fill-rule="nonzero" />
      </g>
    </g>
  </g>
</svg>`;
  var DEFAULT_COLUMN_TYPES = /* @__PURE__ */ ((Y) => (Y.TEXT = "Text", Y.NUMBER = "Number", Y.CURRENCY = "Currency", Y.DATE_DMY = "Date d-m-y", Y.DATE_MDY = "Date m-d-y", Y.CHECKBOX = "Checkbox", Y.SELECT = "Select", Y.LABEL = "Label", Y))(DEFAULT_COLUMN_TYPES || {});
  var _CalendarFunctionalityUtils = class {
    static mdYCellTextToYMD(D) {
      const w2 = RegexUtils.extractIntegerStrs(D);
      return [w2[2], w2[0], w2[1]];
    }
    static yMDToMDYCellText(D) {
      return [D[1], D[2], D[0]].join("-");
    }
    static dMYCellTextToYMD(D) {
      const w2 = RegexUtils.extractIntegerStrs(D);
      return [w2[2], w2[1], w2[0]];
    }
    static yMDToDMYCellText(D) {
      return [D[2], D[1], D[0]].join("-");
    }
  };
  _CalendarFunctionalityUtils.DEFAULT_TYPES_FUNCTIONALITY = {
    [DEFAULT_COLUMN_TYPES.DATE_DMY]: {
      toYMDFunc: (Y) => _CalendarFunctionalityUtils.dMYCellTextToYMD(Y),
      fromYMDFunc: (Y) => _CalendarFunctionalityUtils.yMDToDMYCellText(Y)
    },
    [DEFAULT_COLUMN_TYPES.DATE_MDY]: {
      toYMDFunc: (Y) => _CalendarFunctionalityUtils.mdYCellTextToYMD(Y),
      fromYMDFunc: (Y) => _CalendarFunctionalityUtils.yMDToMDYCellText(Y)
    }
  };
  var CalendarFunctionalityUtils = _CalendarFunctionalityUtils;
  var _Validation = class {
    static setSelectValidation(D, w2, O) {
      var U, F;
      if (!((U = D.cellDropdownProps) != null && U.options) || (F = D.cellDropdownProps) != null && F.canAddMoreOptions)
        return;
      const x2 = new Set(D.cellDropdownProps.options.map((W) => W.text));
      D.textValidation ?? (D.textValidation = {}), D.textValidation.func = (W) => !!x2.has(W) || !w2 && W === O;
    }
  };
  _Validation.DEFAULT_TYPES_REGEX = {
    [DEFAULT_COLUMN_TYPES.CURRENCY]: new RegExp(
      // eslint-disable-next-line max-len
      /^(([$€£¥]\s*?-?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?)|(-?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?\s*?[$€£¥]))$/
    ),
    // \s*? is used to allow spaces between symbols
    [DEFAULT_COLUMN_TYPES.DATE_DMY]: new RegExp(
      /^(0?[1-9]|[12][0-9]|3[01])\s*?[/-]\s*?(0?[1-9]|1[012])\s*?[/-]\s*?\d{4}$/
    ),
    [DEFAULT_COLUMN_TYPES.DATE_MDY]: new RegExp(
      /^(0?[1-9]|1[012])\s*?[/-]\s*?(0?[1-9]|[12][0-9]|3[01])\s*?[/-]\s*?\d{4}$/
    )
  };
  _Validation.DEFAULT_TYPES_FUNCTIONALITY = {
    [DEFAULT_COLUMN_TYPES.NUMBER]: (Y) => Y !== EMPTY_STRING && !isNaN(Y),
    [DEFAULT_COLUMN_TYPES.CURRENCY]: (Y) => _Validation.DEFAULT_TYPES_REGEX[DEFAULT_COLUMN_TYPES.CURRENCY].test(Y),
    [DEFAULT_COLUMN_TYPES.DATE_DMY]: (Y) => _Validation.DEFAULT_TYPES_REGEX[DEFAULT_COLUMN_TYPES.DATE_DMY].test(Y),
    [DEFAULT_COLUMN_TYPES.DATE_MDY]: (Y) => _Validation.DEFAULT_TYPES_REGEX[DEFAULT_COLUMN_TYPES.DATE_MDY].test(Y)
  };
  var Validation = _Validation;
  var CellElementIndex = class {
    static getViaColumnIndex(D, w2) {
      const O = Number(w2);
      return D * 2 + O;
    }
  };
  var _Sort = class me {
    static extractNumberFromString(D) {
      const w2 = RegexUtils.extractFloatStrs(D);
      return w2 && w2.length > 0 ? Number(w2[0]) : 0;
    }
    // cannot safely identify if nothing has been changed, hence need to send out an update for all cells
    // prettier-ignore
    static update(D, w2) {
      const { _tableBodyElementRef: O, _frameComponents: { displayIndexColumn: x2 }, data: U } = D, F = O.children;
      w2.forEach((W, G) => {
        const X = G + 1, K = F[X].children;
        W.forEach((q, Q) => {
          const le = CellElementIndex.getViaColumnIndex(Q, !!x2), re = K[le];
          CellEvents.updateCell(
            D,
            q,
            X,
            Q,
            { processText: false, element: re, updateTableEvent: false, updateData: false }
          ), ColumnTypesUtils.updateDataElements(D, G, Q, re);
        });
      }), U.splice(1, w2.length, ...w2), setTimeout(() => FireEvents.onDataUpdate(D));
    }
    static sortStringsColumnAscending(D, w2) {
      D.sort((O, x2) => String(O[w2]).localeCompare(String(x2[w2])));
    }
    static sortStringsColumnDescending(D, w2) {
      D.sort((O, x2) => String(x2[w2]).localeCompare(String(O[w2])));
    }
    static sortStrings(D, w2, O) {
      O ? me.sortStringsColumnAscending(D, w2) : me.sortStringsColumnDescending(D, w2);
    }
    // prettier-ignore
    static parseComparedText(D, w2, O, x2) {
      const U = x2(D);
      if (U === void 0)
        return O ? 1 : -1;
      const F = x2(w2);
      return F === void 0 ? O ? -1 : 1 : [U, F];
    }
    static validateType(D, w2) {
      return D === void 0 || D(w2) ? w2 : void 0;
    }
    // prettier-ignore
    static validateAndSort(D, w2, O, x2, U) {
      const F = me.parseComparedText(D, w2, U, me.validateType.bind(this, x2));
      return typeof F == "number" ? F : (U ? O.ascendingFunc : O.descendingFunc)(F[0], F[1]);
    }
    static sortViaSortFuncs(D, w2, O, x2) {
      const { sorting: U, textValidation: F } = D;
      U && w2.sort(
        (W, G) => me.validateAndSort(W[O], G[O], U, F.func, x2)
      );
    }
    static compareDates(D, w2) {
      return new Date(...D) - new Date(...w2);
    }
    static parseYMDFormat(D, w2, O) {
      return me.validateType(D, O) ? w2.toYMDFunc(O) : void 0;
    }
    // prettier-ignore
    static sortDates(D, w2, O, x2) {
      const { calendar: U, textValidation: F } = D;
      U && w2.sort((W, G) => {
        const X = me.parseComparedText(
          W[O],
          G[O],
          true,
          me.parseYMDFormat.bind(this, F.func, U)
        );
        return typeof X == "number" ? X : x2 ? me.compareDates(X[0], X[1]) : me.compareDates(X[1], X[0]);
      });
    }
    static sortColumn(D, w2, O) {
      const x2 = D.data.slice(1), { activeType: U } = D._columnsDetails[w2];
      U.calendar ? me.sortDates(U, x2, w2, O) : U.sorting ? me.sortViaSortFuncs(U, x2, w2, O) : me.sortStrings(x2, w2, O), me.update(D, x2);
    }
  };
  _Sort.DEFAULT_TYPES_SORT_FUNCS = {
    [DEFAULT_COLUMN_TYPES.NUMBER]: {
      ascendingFunc: (Y, D) => Number(Y) - Number(D),
      descendingFunc: (Y, D) => Number(D) - Number(Y)
    },
    [DEFAULT_COLUMN_TYPES.CURRENCY]: {
      ascendingFunc: (Y, D) => _Sort.extractNumberFromString(Y) - _Sort.extractNumberFromString(D),
      descendingFunc: (Y, D) => _Sort.extractNumberFromString(D) - _Sort.extractNumberFromString(Y)
    }
  };
  var Sort = _Sort;
  var _DefaultColumnTypes = class Et {
    // REF-28
    static createDropdownItemsForDefaultTypes() {
      Et.DEFAULT_TYPES.forEach((D) => {
        const w2 = {
          text: D.name,
          iconSettings: D.iconSettings || DropdownButtonItemConf.DEFAULT_ITEM.iconSettings
        };
        D.dropdownItem = {
          element: DropdownItem.createButtonItemNoEvents(void 0, w2),
          settings: w2
        };
      });
    }
  };
  _DefaultColumnTypes.FALLBACK_TYPE = {
    name: DEFAULT_COLUMN_TYPES.TEXT,
    iconSettings: {
      svgString: TEXT_ICON_SVG_STRING,
      containerStyles: {
        dropdown: { marginLeft: "-0.25px", marginRight: "6px", marginTop: "2.5px" },
        headerCorrections: { marginTop: "2.5px" }
      }
    }
  };
  _DefaultColumnTypes.DEFAULT_TYPES = [
    _DefaultColumnTypes.FALLBACK_TYPE,
    {
      name: DEFAULT_COLUMN_TYPES.NUMBER,
      textValidation: { func: Validation.DEFAULT_TYPES_FUNCTIONALITY[DEFAULT_COLUMN_TYPES.NUMBER] },
      sorting: Sort.DEFAULT_TYPES_SORT_FUNCS[DEFAULT_COLUMN_TYPES.NUMBER],
      iconSettings: {
        svgString: NUMBER_ICON_SVG_STRING,
        containerStyles: {
          dropdown: { marginLeft: "-1px", marginRight: "4.5px", marginTop: "2px" },
          headerCorrections: { marginTop: "2.5px" }
        }
      }
    },
    {
      name: DEFAULT_COLUMN_TYPES.CURRENCY,
      textValidation: { func: Validation.DEFAULT_TYPES_FUNCTIONALITY[DEFAULT_COLUMN_TYPES.CURRENCY] },
      sorting: Sort.DEFAULT_TYPES_SORT_FUNCS[DEFAULT_COLUMN_TYPES.CURRENCY],
      iconSettings: {
        svgString: CURRENCY_ICON_SVG_STRING,
        containerStyles: {
          dropdown: { marginLeft: "-2px", marginRight: "4px", marginTop: "1px" },
          headerCorrections: { marginRight: "3px", marginTop: "2px" }
        }
      }
    },
    {
      name: DEFAULT_COLUMN_TYPES.SELECT,
      select: {},
      iconSettings: {
        svgString: SELECT_ICON_SVG_STRING,
        containerStyles: {
          dropdown: { marginTop: "0px", marginRight: "3px", marginLeft: "-2.75px" },
          headerCorrections: { marginTop: "1px" }
        }
      }
    },
    {
      name: DEFAULT_COLUMN_TYPES.LABEL,
      label: {},
      iconSettings: {
        svgString: LABEL_ICON_SVG_STRING,
        containerStyles: {
          dropdown: { marginTop: "1.5px", marginRight: "5.5px", marginLeft: "-1px" },
          headerCorrections: { marginTop: "2.5px", marginRight: "5.5px", marginLeft: "0px" }
        }
      }
    },
    {
      name: DEFAULT_COLUMN_TYPES.CHECKBOX,
      iconSettings: {
        svgString: CHECKBOX_ICON_SVG_STRING,
        containerStyles: {
          dropdown: { marginRight: "6px", marginTop: "2px" },
          headerCorrections: { marginRight: "5px", marginLeft: "1px", marginTop: "3px" }
        }
      },
      checkbox: true,
      customTextProcessing: {
        changeTextFunc: CheckboxValidationFunc.getDefault()
      }
    },
    {
      name: DEFAULT_COLUMN_TYPES.DATE_DMY,
      textValidation: { func: Validation.DEFAULT_TYPES_FUNCTIONALITY[DEFAULT_COLUMN_TYPES.DATE_DMY] },
      calendar: CalendarFunctionalityUtils.DEFAULT_TYPES_FUNCTIONALITY[DEFAULT_COLUMN_TYPES.DATE_DMY],
      iconSettings: {
        svgString: CALENDAR_ICON_SVG_STRING,
        containerStyles: {
          dropdown: { marginLeft: "1.25px", marginRight: "8px", marginTop: "-1.5px" },
          headerCorrections: { marginTop: "0px" }
        }
      }
    },
    {
      name: DEFAULT_COLUMN_TYPES.DATE_MDY,
      textValidation: { func: Validation.DEFAULT_TYPES_FUNCTIONALITY[DEFAULT_COLUMN_TYPES.DATE_MDY] },
      calendar: CalendarFunctionalityUtils.DEFAULT_TYPES_FUNCTIONALITY[DEFAULT_COLUMN_TYPES.DATE_MDY],
      iconSettings: {
        svgString: CALENDAR_ICON_SVG_STRING,
        containerStyles: {
          dropdown: { marginLeft: "1.25px", marginRight: "8px", marginTop: "-1.5px" },
          headerCorrections: { marginTop: "0px" }
        }
      }
    }
  ];
  var DefaultColumnTypes = _DefaultColumnTypes;
  var DropdownButtonItemConf = class {
  };
  DropdownButtonItemConf.DEFAULT_ITEM = {
    text: DefaultColumnTypes.FALLBACK_TYPE.name,
    iconSettings: DefaultColumnTypes.FALLBACK_TYPE.iconSettings
  };
  var ColumnTypesUtils = class _ColumnTypesUtils {
    static getTypeByName(D, w2) {
      return D.find((O) => O.name.toLocaleLowerCase() === (w2 == null ? void 0 : w2.toLocaleLowerCase()));
    }
    static getTypeBasedOnProperties(D, w2) {
      if (w2) {
        const O = _ColumnTypesUtils.getTypeByName(D.types, w2);
        if (O)
          return O;
      }
      if (D.defaultColumnTypeName) {
        const O = _ColumnTypesUtils.getTypeByName(D.types, D.defaultColumnTypeName);
        if (O)
          return O;
      }
    }
    static getActiveType(D, w2) {
      const O = _ColumnTypesUtils.getTypeBasedOnProperties(D, w2);
      if (O)
        return O;
      const x2 = D.types.find((F) => !F.textValidation.func);
      if (x2)
        return x2;
      const U = D.types[0];
      return U || DefaultColumnTypes.FALLBACK_TYPE;
    }
    // prettier-ignore
    static getReusableDefaultIcon(D) {
      var x2;
      const w2 = (x2 = D.reusableIconName) == null ? void 0 : x2.toLocaleLowerCase(), O = DefaultColumnTypes.DEFAULT_TYPES.find((U) => U.name.toLocaleLowerCase() === w2);
      return O != null && O.iconSettings ? O.iconSettings : DropdownButtonItemConf.DEFAULT_ITEM.iconSettings;
    }
    static processDropdownItemSettings(D) {
      const { name: w2, iconSettings: O } = D;
      let x2;
      O ? O.reusableIconName ? x2 = _ColumnTypesUtils.getReusableDefaultIcon(O) : (x2 = O, Object.keys(O).length === 0 ? x2 = DropdownButtonItemConf.DEFAULT_ITEM.iconSettings : O.svgString || (x2.svgString ?? (x2.svgString = DropdownButtonItemConf.DEFAULT_ITEM.iconSettings.svgString), x2.containerStyles ?? (x2.containerStyles = DropdownButtonItemConf.DEFAULT_ITEM.iconSettings.containerStyles))) : x2 = DropdownButtonItemConf.DEFAULT_ITEM.iconSettings;
      const U = { text: w2, iconSettings: x2 }, F = D;
      F.dropdownItem ?? (F.dropdownItem = { element: null, settings: U }), setTimeout(() => {
        var W;
        (W = F.dropdownItem).element ?? (W.element = DropdownItem.createButtonItemNoEvents(void 0, U));
      });
    }
    static processTextValidationProps(D) {
      var w2;
      D.textValidation ?? (D.textValidation = {}), (w2 = D.textValidation).setTextToDefaultOnFail ?? (w2.setTextToDefaultOnFail = true);
    }
    static processCheckbox(D) {
      var w2;
      D.checkbox && !((w2 = D.customTextProcessing) != null && w2.changeTextFunc) && (D.customTextProcessing ?? (D.customTextProcessing = {}), D.customTextProcessing.changeTextFunc = CheckboxValidationFunc.getDefault());
    }
    static processSelectOptions(D) {
      if (typeof D.select == "object" && D.select.options) {
        const w2 = D.select;
        w2.options = D.select.options.map((O) => ({ text: O }));
      } else if (typeof D.label == "object" && D.label.options) {
        const w2 = D.label;
        w2.options = JSON.parse(JSON.stringify(D.label.options));
      }
    }
    static processSelect(D, w2, O) {
      var U;
      const x2 = D;
      D.select === true || D.label === true ? x2.cellDropdownProps = { isBasicSelect: !D.label } : (typeof D.select == "object" || typeof D.label == "object") && (x2.cellDropdownProps = D.select || D.label, x2.cellDropdownProps.isBasicSelect = !D.label, _ColumnTypesUtils.processSelectOptions(D), Validation.setSelectValidation(x2, w2, O)), x2.cellDropdownProps && x2.cellDropdownProps.canAddMoreOptions === void 0 && (x2.cellDropdownProps.canAddMoreOptions = !((U = x2.cellDropdownProps) != null && U.options));
    }
    // the reason why this is needed is when the argument is JSON stringified, properties that hold functions are removed,
    // hence they can only be applied to the component as strings
    static convertStringFunctionsToRealFunctions(D) {
      D.textValidation && ObjectUtils.convertStringToFunction(D.textValidation, "func"), D.customTextProcessing && (ObjectUtils.convertStringToFunction(D.customTextProcessing, "changeTextFunc"), ObjectUtils.convertStringToFunction(D.customTextProcessing, "changeStyleFunc")), D.sorting && (ObjectUtils.convertStringToFunction(D.sorting, "ascendingFunc"), ObjectUtils.convertStringToFunction(D.sorting, "descendingFunc")), D.calendar && (ObjectUtils.convertStringToFunction(D.calendar, "toYMDFunc"), ObjectUtils.convertStringToFunction(D.calendar, "fromYMDFunc"));
    }
    // this is important because when types get processed - their resultant structure is not be the same, hence if
    // the same one is used in different settings (e.g. defaultColumnTypes set in default and custom settings),
    // the processing of the same type again would not work
    // JSON.stringify loses element and function references, hence they need to be manually reassigned
    static createTypeDeepCopy(D) {
      const w2 = JSON.parse(JSON.stringify(D));
      return D.dropdownItem && (w2.dropdownItem = D.dropdownItem), D.textValidation && (w2.textValidation = D.textValidation), D.customTextProcessing && (w2.customTextProcessing = D.customTextProcessing), D.sorting && (w2.sorting = D.sorting), D.calendar && (w2.calendar = D.calendar), w2;
    }
    static process(D, w2, O) {
      return D.map((x2) => {
        const U = _ColumnTypesUtils.createTypeDeepCopy(x2);
        return _ColumnTypesUtils.convertStringFunctionsToRealFunctions(U), _ColumnTypesUtils.processSelect(U, w2, O), _ColumnTypesUtils.processCheckbox(U), _ColumnTypesUtils.processTextValidationProps(U), _ColumnTypesUtils.processDropdownItemSettings(U), U;
      });
    }
    static getAvailableTypes(D) {
      let w2 = [...DefaultColumnTypes.DEFAULT_TYPES];
      const { availableDefaultColumnTypes: O, customColumnTypes: x2 } = D;
      if (O) {
        const U = O.map((F) => F.toLocaleLowerCase());
        w2 = w2.filter((F) => U.indexOf(F.name.toLocaleLowerCase()) > -1);
      }
      return x2 && w2.push(...x2), w2.length === 0 && w2.push(DefaultColumnTypes.FALLBACK_TYPE), w2;
    }
    static getProcessedTypes(D) {
      const { isDefaultTextRemovable: w2, defaultText: O } = D, x2 = _ColumnTypesUtils.getAvailableTypes(D);
      return _ColumnTypesUtils.process(x2, w2, O);
    }
    // updates label color, date input etc.
    // prettier-ignore
    static updateDataElements(D, w2, O, x2) {
      const { _columnsDetails: U, _tableDimensions: F } = D, W = U[O];
      w2 !== 0 && (W.activeType.cellDropdownProps ? (CellDropdown.updateCellDropdown(
        x2,
        W.cellDropdown,
        F.border,
        W.settings.defaultText,
        true
      ), SelectCell.finaliseEditedText(D, x2.children[0], O, true)) : Browser.IS_INPUT_DATE_SUPPORTED && W.activeType.calendar && DateCellInputElement.updateInputBasedOnTextDiv(x2, W.activeType));
    }
  };
  var MoveUtils = class {
    // prettier-ignore
    static setNewElementText(D, w2, O, x2, U) {
      const F = CellElement.getText(O);
      return CellEvents.updateCell(D, w2, U, x2, { element: O, processText: false }), ColumnTypesUtils.updateDataElements(D, U, x2, O), F;
    }
  };
  var MoveColumn = class _MoveColumn {
    // prettier-ignore
    static overwriteDataElements(D, w2, O, x2) {
      w2.slice(1).forEach((U, F) => {
        const W = F + 1, G = x2[W];
        MoveUtils.setNewElementText(D, G, U, O, W);
      });
    }
    // prettier-ignore
    static changeSettings(D, w2, O, x2, U) {
      HeaderText.onAttemptChange(D, O, w2, { colMove: true }), U !== x2.activeType && ChangeColumnType.change.bind(D)(U.name, w2);
    }
    // prettier-ignore
    static overwrite(D, w2, O, x2, U, F) {
      const { elements: W, activeType: G } = w2;
      MoveUtils.setNewElementText(D, x2[0], W[0], O, 0), _MoveColumn.changeSettings(D, O, W[0], w2, U), _MoveColumn.overwriteDataElements(D, W, O, x2);
      const X = W[0].style.width;
      return W[0].style.width = F, { overwrittenType: G, overwrittenWidth: X };
    }
    static firstChangeSettingsIfSettingsChanged(D, w2) {
      const { areSettingsDifferent: O } = ColumnSettingsUtils.parseSettingsChange(D);
      if (O) {
        const x2 = D._columnsDetails[w2];
        HeaderText.onAttemptChange(D, x2.elements[0], w2);
      }
    }
    // prettier-ignore
    static move(D, w2, O) {
      _MoveColumn.firstChangeSettingsIfSettingsChanged(D, w2);
      const x2 = D._columnsDetails[w2], U = D._columnsDetails[w2].elements.map((q) => CellElement.getText(q));
      CellHighlightUtils.fade(x2.elements[0], x2 == null ? void 0 : x2.headerStateColors.default);
      const F = O ? w2 + 1 : w2 - 1, W = D._columnsDetails[F], G = W.elements.map((q) => CellElement.getText(q)), X = W.elements[0].style.width, K = _MoveColumn.overwrite(
        D,
        x2,
        w2,
        G,
        W.activeType,
        X
      );
      FocusedCellUtils.set(D._focusedElements.cell, W.elements[0], 0, F), _MoveColumn.overwrite(
        D,
        W,
        F,
        U,
        K.overwrittenType,
        K.overwrittenWidth
      ), setTimeout(() => FireEvents.onColumnsUpdate(D));
    }
  };
  var ColumnSizerGenericUtils = class {
    // the current solution for using first row position as 'relative' with divider having 100% height only works for
    // these browsers
    static canHeightBeInherited() {
      return Browser.IS_CHROMIUM || Browser.IS_FIREFOX;
    }
    static getSizerDetailsViaElementId(D, w2) {
      const O = Number(RegexUtils.extractIntegerStrs(D)[0]), x2 = w2[O];
      return { columnSizer: x2.columnSizer, headerCell: x2.elements[0], sizerNumber: O };
    }
    static findNextResizableColumnHeader(D, w2) {
      const O = D.slice(w2 + 1).find((x2) => {
        var U;
        return !((U = x2.settings.widths) != null && U.staticWidth);
      });
      return O == null ? void 0 : O.elements[0];
    }
  };
  var _UpdateRowElement = class Ke {
    // required to allow the divider and all its elements to inherit its height (in non chrome or firefox browsers)
    static updateHeaderRowHeight(D) {
      ColumnSizerGenericUtils.canHeightBeInherited() || (D.style.height = Ke.UNSET, D.style.height = getComputedStyle(D).height);
    }
    // if this does not capture all events - use in HeaderText.onAttemptChange method instead
    static updateHeadRowHeightOnKeyDown(D) {
      var w2;
      if (!ColumnSizerGenericUtils.canHeightBeInherited()) {
        const O = (w2 = D.children) == null ? void 0 : w2[0];
        O && O.style.height !== Ke.UNSET && (O.style.height = Ke.UNSET, setTimeout(() => {
          O.style.height = `${O.offsetHeight}px`;
        }));
      }
    }
    static getUnsetHeightFunc(D, w2) {
      if (!ColumnSizerGenericUtils.canHeightBeInherited() && w2 === 0)
        return () => D.style.height = Ke.UNSET;
    }
  };
  _UpdateRowElement.UNSET = "unset";
  var UpdateRowElement = _UpdateRowElement;
  var RowHoverEvents = class _RowHoverEvents {
    static canStyleBeApplied(D, w2, O) {
      return (O > 0 || D.header) && (!AddNewRowElement.isAddNewRowRow(w2) || D.addNewRowButton);
    }
    static getRemoveColorFunc(D, w2, O, x2) {
      const U = D.rowHoverStyles;
      if (U != null && U.style && _RowHoverEvents.canStyleBeApplied(U, w2, O))
        return () => {
          ElementStyle.unsetStyle(w2, U.style), Object.assign(w2.style, x2);
        };
    }
    static addMouseLeaveEvent(D, w2, O, x2) {
      const U = _RowHoverEvents.getRemoveColorFunc(D, w2, O, x2), F = UpdateRowElement.getUnsetHeightFunc(w2, O);
      w2.onmouseleave = () => {
        U == null || U(), F == null || F();
      };
    }
    // prettier-ignore
    static addMouseEnterEvent(D, w2, O) {
      const { rowHoverStyles: x2, _focusedElements: { rowDragEl: U } } = D, F = x2 != null && x2.style && _RowHoverEvents.canStyleBeApplied(x2, w2, O) ? () => Object.assign(w2.style, x2 == null ? void 0 : x2.style) : void 0;
      w2.onmouseenter = () => {
        U || F == null || F();
      };
    }
    static addEvents(D, w2, O, x2) {
      _RowHoverEvents.addMouseEnterEvent(D, w2, O), _RowHoverEvents.addMouseLeaveEvent(D, w2, O, x2);
    }
    static process(D, w2) {
      D != null && D.style && (D.header ?? (D.header = true), D.addNewRowButton ?? (D.addNewRowButton = true), CellHighlightUtils.unsetDefaultHoverProperties(w2));
    }
  };
  var _StripedRows = class tt {
    static setRowStyle(D, w2, O) {
      const x2 = w2 % 2 ? O.even : O.odd;
      return Object.assign(D.style, x2), x2;
    }
    static process(D) {
      const { stripedRows: w2, _defaultCellHoverColors: O } = D;
      w2 && (typeof w2 == "boolean" ? D._stripedRows = tt.DEFAULT_PROPERTIES : D._stripedRows = {
        even: w2.even || tt.DEFAULT_PROPERTIES.even,
        odd: w2.odd || tt.DEFAULT_PROPERTIES.odd
      }, CellHighlightUtils.unsetDefaultHoverProperties(O));
    }
  };
  _StripedRows.DEFAULT_PROPERTIES = {
    odd: { backgroundColor: "" },
    even: { backgroundColor: "#dcdcdc7a" }
  };
  var StripedRows = _StripedRows;
  var CustomRowProperties = class _CustomRowProperties {
    static setStyle(D, w2, O, x2) {
      if (D._stripedRows)
        return x2 && AddNewRowElement.isAddNewRowRow(w2) && (O = +!D.dataStartsAtHeader), StripedRows.setRowStyle(w2, O, D._stripedRows);
    }
    // prettier-ignore
    static updateRow(D, w2, O, x2, U) {
      const F = _CustomRowProperties.setStyle(D, w2, O, x2);
      O === U ? RowHoverEvents.addEvents(D, w2, O, F) : setTimeout(() => {
        RowHoverEvents.addEvents(D, w2, O, F);
      });
    }
    // REF-32
    static isAddRowRowSame(D) {
      return !!(D.pagination && D._frameComponents.displayAddNewRow && PaginationUtils.getLastPossiblePageNumber(D) !== D._pagination.activePageNumber);
    }
    // this can be considered to be wasteful if no striped rows are used and we are resetting the same row events
    // every time this is called, however we are still traversing all rows from startIndex for code simplicity
    static update(D, w2 = 0) {
      if (!D._tableBodyElementRef)
        return;
      const O = Array.from(D._tableBodyElementRef.children), x2 = _CustomRowProperties.isAddRowRowSame(D), U = O.length - 1;
      O.slice(w2).forEach((F, W) => {
        const G = W + w2;
        _CustomRowProperties.updateRow(D, F, G, x2, U);
      });
    }
  };
  var MoveRow = class _MoveRow {
    // prettier-ignore
    static overwrite(D, w2, O) {
      const x2 = [];
      return D._columnsDetails.forEach((U, F) => {
        const W = MoveUtils.setNewElementText(
          D,
          w2[F],
          U.elements[O],
          F,
          O
        );
        x2.push(W);
      }), x2;
    }
    static moveDataRows(D, w2, O) {
      const x2 = D._columnsDetails.map(({ elements: F }) => CellElement.getText(F[O])), U = _MoveRow.overwrite(D, x2, w2);
      _MoveRow.overwrite(D, U, O);
    }
    static resetFocusedCell(D, w2) {
      const { _frameComponents: O, _focusedElements: x2 } = D, { element: U, rowIndex: F, columnIndex: W } = w2;
      O.displayIndexColumn ? FocusedCellUtils.setIndexCell(x2.cell, U, F) : FocusedCellUtils.set(x2.cell, U, F, W);
    }
    static moveHeaderToDataRow(D) {
      const { _columnsDetails: w2, _focusedElements: O } = D, x2 = { ...O.cell }, U = w2.map(({ elements: W }) => CellElement.getText(W[1])), F = _MoveRow.overwrite(D, U, 0);
      w2.forEach((W, G) => {
        FocusedCellUtils.set(O.cell, W.elements[0], 0, G), HeaderText.onAttemptChange(D, W.elements[0], G);
      }), _MoveRow.overwrite(D, F, 1), _MoveRow.resetFocusedCell(D, x2);
    }
    static move(D, w2, O) {
      const x2 = O ? w2 + 1 : w2 - 1;
      w2 === 0 || x2 === 0 ? _MoveRow.moveHeaderToDataRow(D) : _MoveRow.moveDataRows(D, w2, x2), CustomRowProperties.update(D, w2), D.pagination && PaginationUtils.updateOnRowMove(D, x2);
    }
  };
  var _Drag = class gt {
    static move(D, w2, O) {
      if (w2 === 0)
        return;
      const x2 = w2 > 0, U = x2 ? 1 : -1;
      for (let F = 0; F < Math.abs(w2); F += 1)
        O(D, gt.ORIGINAL_INDEX + F * U, x2);
      setTimeout(() => FocusedCellUtils.purge(D._focusedElements.cell), 5);
    }
  };
  _Drag.CELL_HIDDEN_CLASS = "cell-hidden";
  _Drag.DRAG_PX_TO_MOVE = 10;
  _Drag.ORIGINAL_INDEX = 0;
  var Drag = _Drag;
  var _DragRow = class J extends Drag {
    static resetElements(D) {
      var O, x2;
      (O = J.CLONE_ROW) == null || O.remove(), Array.from(D.children || []).forEach((U) => {
        U.classList.remove(Drag.CELL_HIDDEN_CLASS);
      }), (x2 = J.TARGET_LINE) == null || x2.remove();
    }
    static appendTargetLine(D) {
      J.TARGET_LINE = document.createElement("div"), J.TARGET_LINE.classList.add("row-drag-target-line"), J.TARGET_LINE.style.opacity = "0", D.appendChild(J.TARGET_LINE);
    }
    static prepareElements(D, w2, O) {
      w2.classList.add(J.ROW_CLONE_CLASS), w2.style.top = `${O.offsetTop}px`;
      const x2 = `${O.children[0].offsetHeight}px`, U = Array.from(O.children || []);
      Array.from(w2.children).forEach((F, W) => {
        F.style.width = `${U[W].offsetWidth}px`, F.style.height = x2;
      }), U.forEach((F) => {
        F.classList.add(Drag.CELL_HIDDEN_CLASS);
      }), J.appendTargetLine(D);
    }
    static calculateThresholdDown(D) {
      J.TARGET_DOWN_ROW && D && (J.THRESHOLD_DOWN = J.TARGET_DOWN_ROW.offsetTop + J.TARGET_DOWN_ROW.offsetHeight / 2 - D.offsetHeight);
    }
    static calculateThresholdUp() {
      J.TARGET_UP_ROW && (J.THRESHOLD_UP = J.TARGET_UP_ROW.offsetTop + J.TARGET_UP_ROW.offsetHeight / 2);
    }
    static initiateDragState(D, w2, O) {
      var F;
      if (J.TARGET_UP_ROW = O.previousSibling, J.TARGET_DOWN_ROW = (F = O.nextSibling) == null ? void 0 : F.nextSibling, !J.TARGET_UP_ROW && AddNewRowElement.isAddNewRowRow(J.TARGET_DOWN_ROW.children[0]))
        return;
      J.CLONE_ROW = w2, J.ACTIVE_ROW_TOP_PX = O.offsetTop, J.ACTIVE_INDEX = 0, J.calculateThresholdUp(), J.calculateThresholdDown(O);
      const x2 = Array.from(D.children);
      Drag.ORIGINAL_INDEX = x2.findIndex((W) => W === O);
      const U = x2[x2.length - 2].offsetHeight;
      J.MAX_DOWN = D.offsetHeight - O.offsetHeight - U;
    }
    static processRowCellsToDrag(D, w2) {
      const O = w2.parentElement;
      O.dispatchEvent(new MouseEvent("mouseleave"));
      const x2 = O.cloneNode(true);
      return O == null || O.insertAdjacentElement("afterend", x2), J.prepareElements(D, x2, O), J.initiateDragState(D, x2, O), O;
    }
    static applyEventsToElement(D, w2, O) {
      J.isDisabled(D) || (w2.onmousedown = () => {
        J.IS_MOUSE_DOWN = true;
      }, w2.onmousemove = () => {
        J.IS_MOUSE_DOWN && !D._focusedElements.rowDragEl && D._tableBodyElementRef && (J.INITIALISING_DRAG_PX += 1, J.INITIALISING_DRAG_PX > Drag.DRAG_PX_TO_MOVE && (D._focusedElements.rowDragEl = J.processRowCellsToDrag(D._tableBodyElementRef, O), FocusedCellUtils.set(D._focusedElements.cell, O, 0, Drag.ORIGINAL_INDEX)));
      });
    }
    static moveTargetLine(D, w2) {
      D.style.opacity = "1", D.style.top = `${w2}px`;
    }
    // Upon approaching the original row the target line is hidden
    static removeLineOnMoveDown(D) {
      D.style.opacity = "0", J.ACTIVE_INDEX = 0, J.THRESHOLD_TO_NO_LINE_DOWN = -1, J.calculateThresholdUp();
    }
    static attemptSwitchUp(D, w2) {
      var O;
      J.TARGET_UP_ROW && w2 && (((O = J.TARGET_UP_ROW.previousSibling) == null ? void 0 : O.previousSibling) === w2 ? (J.THRESHOLD_TO_NO_LINE_UP = w2.offsetTop + w2.offsetHeight / 2, J.THRESHOLD_DOWN = J.TARGET_UP_ROW.offsetTop + J.TARGET_UP_ROW.offsetHeight / 2, J.TARGET_DOWN_ROW = J.TARGET_UP_ROW, J.TARGET_UP_ROW = w2.previousSibling, J.TARGET_UP_ROW ? J.calculateThresholdUp() : J.THRESHOLD_UP = -1) : (J.moveTargetLine(D, J.TARGET_UP_ROW.offsetTop - 3), J.THRESHOLD_DOWN = J.THRESHOLD_UP, J.TARGET_DOWN_ROW = J.TARGET_UP_ROW, J.TARGET_UP_ROW = J.TARGET_UP_ROW.previousSibling, J.calculateThresholdUp(), J.ACTIVE_INDEX -= 1));
    }
    // Upon approaching the original row the target line is hidden
    static removeLineOnMoveUp(D, w2) {
      D.style.opacity = "0", J.ACTIVE_INDEX = 0, J.THRESHOLD_TO_NO_LINE_UP = -1, J.calculateThresholdDown(w2);
    }
    static attemptSwitchDown(D, w2) {
      var O;
      J.TARGET_DOWN_ROW && (J.TARGET_DOWN_ROW.nextSibling === w2 ? (J.THRESHOLD_TO_NO_LINE_DOWN = J.TARGET_DOWN_ROW.offsetTop + J.TARGET_DOWN_ROW.offsetHeight / 2, J.TARGET_UP_ROW = J.TARGET_DOWN_ROW, J.THRESHOLD_UP = J.TARGET_UP_ROW.offsetTop - J.TARGET_UP_ROW.offsetHeight / 2, J.TARGET_DOWN_ROW = (O = w2 == null ? void 0 : w2.nextSibling) == null ? void 0 : O.nextSibling, J.calculateThresholdDown(w2)) : (J.moveTargetLine(D, J.TARGET_DOWN_ROW.offsetTop + J.TARGET_DOWN_ROW.offsetHeight - 3), J.THRESHOLD_UP = J.THRESHOLD_DOWN, J.TARGET_UP_ROW = J.TARGET_DOWN_ROW, J.TARGET_DOWN_ROW = J.TARGET_DOWN_ROW.nextSibling, J.calculateThresholdDown(w2), J.ACTIVE_INDEX += 1));
    }
    static windowDrag(D, w2) {
      if (J.isDisabled(D) || !J.TARGET_LINE || !D._focusedElements.rowDragEl || !J.CLONE_ROW)
        return;
      const O = Math.max(0, J.ACTIVE_ROW_TOP_PX + w2.movementY), x2 = Math.min(O, J.MAX_DOWN);
      J.ACTIVE_ROW_TOP_PX = x2, J.CLONE_ROW.style.top = `${J.ACTIVE_ROW_TOP_PX}px`, J.ACTIVE_ROW_TOP_PX > J.THRESHOLD_DOWN ? J.attemptSwitchDown(J.TARGET_LINE, D._focusedElements.rowDragEl) : J.ACTIVE_ROW_TOP_PX < J.THRESHOLD_UP ? J.attemptSwitchUp(J.TARGET_LINE, D._focusedElements.rowDragEl) : J.THRESHOLD_TO_NO_LINE_DOWN >= 0 && J.THRESHOLD_TO_NO_LINE_DOWN < J.ACTIVE_ROW_TOP_PX ? J.removeLineOnMoveDown(J.TARGET_LINE) : J.THRESHOLD_TO_NO_LINE_UP >= 0 && J.THRESHOLD_TO_NO_LINE_UP > J.ACTIVE_ROW_TOP_PX && J.removeLineOnMoveUp(J.TARGET_LINE, D._focusedElements.rowDragEl);
    }
    static windowMouseUp(D) {
      J.IS_MOUSE_DOWN = false, !J.isDisabled(D) && D._focusedElements.rowDragEl && (J.resetElements(D._focusedElements.rowDragEl), delete D._focusedElements.rowDragEl, J.INITIALISING_DRAG_PX = 0, J.move(D, J.ACTIVE_INDEX, MoveRow.move));
    }
    // row dragging is cumbersome when filter/pagination enabled as some rows are hidden
    static isDisabled(D) {
      return D.dragRows === false || D.filter || D.pagination;
    }
  };
  _DragRow.ROW_CLONE_CLASS = "row-clone";
  _DragRow.INITIALISING_DRAG_PX = 0;
  _DragRow.ACTIVE_ROW_TOP_PX = 0;
  _DragRow.CLONE_ROW = null;
  _DragRow.IS_MOUSE_DOWN = false;
  _DragRow.ACTIVE_INDEX = 0;
  _DragRow.THRESHOLD_UP = 0;
  _DragRow.THRESHOLD_DOWN = 0;
  _DragRow.MAX_DOWN = 0;
  _DragRow.THRESHOLD_TO_NO_LINE_DOWN = -1;
  _DragRow.THRESHOLD_TO_NO_LINE_UP = -1;
  var DragRow = _DragRow;
  var _DragColumn = class Z extends Drag {
    static setHeaderElementsToDefault(D) {
      var O;
      const w2 = (O = D.parentElement) == null ? void 0 : O.children;
      Z.CLONE_CELLS.forEach((x2) => x2.remove()), Array.from(w2 || []).forEach((x2) => {
        x2.tagName === CellElement.HEADER_TAG && x2.classList.remove(Drag.CELL_HIDDEN_CLASS);
      }), Z.DIVIDERS.forEach((x2) => {
        x2.style.pointerEvents = "";
      });
    }
    static applyCloneHeaderCell(D, w2, O, x2) {
      w2.classList.add(Drag.CELL_HIDDEN_CLASS), D.classList.add(Z.HEADER_CELL_CLONE_CLASS), D.classList.add(Z.HEADER_CELL_CLONE_ANIMATION_CLASS), D.style.left = `${w2.offsetLeft}px`, D.style.height = x2, O == null || O.insertAdjacentElement("beforebegin", D), Z.CLONE_CELLS.push(D), Z.REAL_CELLS.push(w2);
    }
    static getThreshold(D, w2) {
      const O = Z.REAL_CELLS[Z.ACTIVE_INDEX + w2], x2 = Math.min(D.offsetWidth / 2, (O == null ? void 0 : O.offsetWidth) / 2) * w2;
      return D.offsetLeft + x2;
    }
    static initiateDragState(D, w2) {
      if (Z.ACTIVE_INDEX = Z.REAL_CELLS.findIndex((W) => w2 === W), Z.ACTIVE_INDEX + 2 >= Z.CLONE_CELLS.length && Z.ACTIVE_INDEX - 1 <= 0)
        return;
      D._focusedElements.colDragEl = Z.CLONE_CELLS[Z.ACTIVE_INDEX], D._focusedElements.colDragEl.classList.remove(Z.HEADER_CELL_CLONE_ANIMATION_CLASS), Z.ACTIVE_CELL_LEFT_PX = w2.offsetLeft, Z.THRESHOLD_LEFT = Z.getThreshold(w2, -1), Z.THRESHOLD_RIGHT = Z.getThreshold(w2, 1);
      const O = Z.REAL_CELLS[0];
      Z.MIN_LEFT = O.classList.contains(IndexColumn.INDEX_CELL_CLASS) ? O.offsetWidth : 0;
      const x2 = Z.REAL_CELLS[Z.REAL_CELLS.length - 1], U = x2.classList.contains(AddNewColumnElement.ADD_COLUMN_CELL_CLASS) ? 0 : x2.offsetWidth;
      Z.MAX_LEFT = x2.offsetLeft + U - w2.offsetWidth;
      const F = Z.REAL_CELLS[0].classList.contains(IndexColumn.INDEX_CELL_CLASS);
      Drag.ORIGINAL_INDEX = Z.ACTIVE_INDEX - (F ? 1 : 0);
    }
    static processHeaderCellsToDrag(D, w2, O) {
      var U;
      const x2 = `${w2.offsetHeight}px`;
      Array.from(((U = w2.parentElement) == null ? void 0 : U.children) || []).forEach((F) => {
        if (F.tagName === CellElement.HEADER_TAG) {
          const W = F.cloneNode(true);
          Z.applyCloneHeaderCell(W, F, O, x2);
        } else
          F.style.pointerEvents = "none", Z.DIVIDERS.push(F);
      }), Z.initiateDragState(D, w2);
    }
    static applyEventsToElement(D, w2, O) {
      D.dragColumns !== false && (w2.onmousedown = () => {
        Z.IS_MOUSE_DOWN = true;
      }, w2.onmousemove = () => {
        var x2;
        if (Z.IS_MOUSE_DOWN && !D._focusedElements.colDragEl && (Z.INITIALISING_DRAG_PX += 1, Z.INITIALISING_DRAG_PX > Drag.DRAG_PX_TO_MOVE)) {
          const U = (x2 = O.parentElement) == null ? void 0 : x2.children[O.parentElement.children.length - 1];
          Z.processHeaderCellsToDrag(D, O, U), FocusedCellUtils.set(D._focusedElements.cell, O, 0, Drag.ORIGINAL_INDEX);
        }
      });
    }
    static switch(D) {
      const w2 = Z.CLONE_CELLS[Z.ACTIVE_INDEX], O = Z.CLONE_CELLS[Z.ACTIVE_INDEX + D];
      D > 0 ? (Z.THRESHOLD_LEFT = Z.THRESHOLD_RIGHT - 5, Z.THRESHOLD_RIGHT = w2.offsetLeft + O.offsetWidth, O.style.left = `${O.offsetLeft - w2.offsetWidth}px`) : (Z.THRESHOLD_RIGHT = Z.THRESHOLD_LEFT + 5, Z.THRESHOLD_LEFT = w2.offsetLeft - O.offsetWidth, O.style.left = `${O.offsetLeft + w2.offsetWidth}px`), ArrayUtils.swap(Z.CLONE_CELLS, Z.ACTIVE_INDEX, Z.ACTIVE_INDEX + D), Z.ACTIVE_INDEX += D;
    }
    static windowDrag(D, w2, O) {
      if (D.dragColumns === false)
        return;
      const x2 = Math.max(Z.MIN_LEFT, Z.ACTIVE_CELL_LEFT_PX + O.movementX), U = Math.min(x2, Z.MAX_LEFT);
      Z.ACTIVE_CELL_LEFT_PX = U, w2.style.left = `${Z.ACTIVE_CELL_LEFT_PX}px`, Z.ACTIVE_CELL_LEFT_PX > Z.THRESHOLD_RIGHT ? Z.switch(1) : Z.ACTIVE_CELL_LEFT_PX < Z.THRESHOLD_LEFT && Z.switch(-1);
    }
    static windowMouseUp(D) {
      if (Z.IS_MOUSE_DOWN = false, D.dragColumns === false || !D._focusedElements.colDragEl)
        return;
      Z.setHeaderElementsToDefault(D._focusedElements.colDragEl), delete D._focusedElements.colDragEl, Z.INITIALISING_DRAG_PX = 0, Z.ACTIVE_CELL_LEFT_PX = 0, Z.CLONE_CELLS = [], Z.DIVIDERS = [];
      const w2 = Z.REAL_CELLS[0].classList.contains(IndexColumn.INDEX_CELL_CLASS);
      DragRow.move(D, Z.ACTIVE_INDEX - Drag.ORIGINAL_INDEX - (w2 ? 1 : 0), MoveColumn.move), Z.REAL_CELLS = [];
    }
  };
  _DragColumn.HEADER_CELL_CLONE_CLASS = "header-cell-clone";
  _DragColumn.HEADER_CELL_CLONE_ANIMATION_CLASS = "header-cell-clone-animation";
  _DragColumn.INITIALISING_DRAG_PX = 0;
  _DragColumn.ACTIVE_CELL_LEFT_PX = 0;
  _DragColumn.IS_MOUSE_DOWN = false;
  _DragColumn.CLONE_CELLS = [];
  _DragColumn.REAL_CELLS = [];
  _DragColumn.DIVIDERS = [];
  _DragColumn.ACTIVE_INDEX = 0;
  _DragColumn.THRESHOLD_RIGHT = 0;
  _DragColumn.THRESHOLD_LEFT = 0;
  _DragColumn.MAX_LEFT = 0;
  _DragColumn.MIN_LEFT = 0;
  var DragColumn = _DragColumn;
  var DropdownCellOverlay = class {
  };
  DropdownCellOverlay.HIDDEN_PX = "0px";
  DropdownCellOverlay.VISIBLE_PX = "10px";
  DropdownCellOverlay.DROPDOWN_CELL_OVERLAY_CLASS = "dropdown-cell-overlay";
  var _ColumnDropdownCellOverlay = class Le {
    static setDefault(D, w2) {
      var O;
      D.style.backgroundColor = ((O = w2 == null ? void 0 : w2.default) == null ? void 0 : O.backgroundColor) || "";
    }
    static resetDefaultColor(D, w2) {
      var x2;
      const O = w2 == null ? void 0 : w2.overlayStyles;
      (x2 = O == null ? void 0 : O.hover) != null && x2.backgroundColor && Le.setDefault(D, O);
    }
    static setHoverColor(D, w2) {
      var x2, U;
      const O = (U = (x2 = w2 == null ? void 0 : w2.overlayStyles) == null ? void 0 : x2.hover) == null ? void 0 : U.backgroundColor;
      O && (D.columnDropdownCellOverlay.style.backgroundColor = O);
    }
    static hide(D, w2) {
      const { columnDropdownCellOverlay: O } = w2, x2 = D._hoveredElements.headerCell;
      setTimeout(() => {
        x2 !== D._hoveredElements.headerCell && (O.style.height = DropdownCellOverlay.HIDDEN_PX);
      });
    }
    static setHorizontalDimensions(D) {
      const { columnDropdownCellOverlay: w2, elements: O } = D, x2 = O[0].offsetWidth / 100;
      w2.style.width = `${x2 * 50}px`, w2.style.right = `${x2 * 25}px`;
    }
    static display(D) {
      D.columnDropdownCellOverlay.style.height = DropdownCellOverlay.VISIBLE_PX, Le.setHorizontalDimensions(D);
    }
    static isDisplayed(D) {
      return D.style.height === DropdownCellOverlay.VISIBLE_PX;
    }
    static updateIfDisplayed(D) {
      Le.isDisplayed(D.columnDropdownCellOverlay) && Le.setHorizontalDimensions(D);
    }
    static create(D, w2, O) {
      const x2 = document.createElement("div");
      return x2.classList.add(DropdownCellOverlay.DROPDOWN_CELL_OVERLAY_CLASS), x2.classList.add(Le.COLUMN_DROPDOWN_CELL_OVERLAY_CLASS), x2.style.height = DropdownCellOverlay.HIDDEN_PX, Le.setDefault(x2, O), DragColumn.applyEventsToElement(D, x2, w2), x2;
    }
    static add(D, w2) {
      var W, G;
      const O = (G = (W = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : W.displaySettings) == null ? void 0 : G.overlayStyles, x2 = D._columnsDetails[w2].elements[0], U = Le.create(D, x2, O);
      return x2.nextSibling.appendChild(U), U;
    }
  };
  _ColumnDropdownCellOverlay.COLUMN_DROPDOWN_CELL_OVERLAY_CLASS = "column-dropdown-cell-overlay";
  var ColumnDropdownCellOverlay = _ColumnDropdownCellOverlay;
  var _MovableColumnSizerElement = class Ie {
    // this is recalculated as it depends on the column index that the sizer is on
    static setStaticProperties(D, w2, O) {
      D.style.marginRight = w2, D.style.width = O;
    }
    // the vertical line has no pointer events, hence it should not be expected to be passed in here
    static isMovableColumnSizer(D) {
      return D.classList.contains(Ie.MOVABLE_SIZER_CLASS);
    }
    static getVerticalLineHeight(D, w2) {
      let O = D.offsetHeight;
      if (w2) {
        const x2 = D.lastChild.offsetHeight;
        O -= x2;
      }
      return O;
    }
    static display(D, w2, O) {
      const x2 = w2.movableElement;
      x2.style.display = "flex";
      const U = x2.children[0];
      U.style.height = `${Ie.getVerticalLineHeight(D, O)}px`;
    }
    static hide(D) {
      D.style.display = "none", D.style.left = "";
    }
    static createVerticalLine(D) {
      const w2 = document.createElement("div");
      return w2.style.backgroundColor = D, w2.classList.add(Ie.VERTICAL_LINE_CLASS), w2;
    }
    static getMovableBackgroundColor(D) {
      return D.click || D.hover || Ie.DEFAULT_BACKGROUND_COLOR;
    }
    static create(D) {
      const w2 = Ie.getMovableBackgroundColor(D), O = document.createElement("div");
      O.style.backgroundColor = w2, O.classList.add(Ie.MOVABLE_SIZER_CLASS), Ie.hide(O);
      const x2 = Ie.createVerticalLine(w2);
      return O.appendChild(x2), O;
    }
  };
  _MovableColumnSizerElement.DEFAULT_BACKGROUND_COLOR = "#4668ed";
  _MovableColumnSizerElement.MOVABLE_SIZER_CLASS = "movable-column-sizer";
  _MovableColumnSizerElement.VERTICAL_LINE_CLASS = "movable-column-sizer-vertical-line";
  var MovableColumnSizerElement = _MovableColumnSizerElement;
  var MoveLimits = class _MoveLimits {
    // Borders of the side cells tend to breach over the limits of the table (when no side frame elements),
    // causing the offsets to give incorrect data and set the limits beyond the table. The breach magnitude is
    // influenced by the sizer start position when cells have borders - which is the very center position of
    // the total of those two borders width.
    // prettier-ignore
    static getSideLimitDelta(D) {
      const w2 = ExtractElements.getRightColumnSiblingCell(D);
      return ((Number.parseFloat(getComputedStyle(D).borderRightWidth) || 0) - (Number.parseFloat(getComputedStyle(w2).borderLeftWidth) || 0)) / 2;
    }
    static getRightLimitDynamicWidthTable() {
      return window.innerWidth;
    }
    // prettier-ignore
    static getRightLimitForMaxWidth(D, w2, O) {
      return StaticTable.isTableAtMaxWidth(D, w2) ? O ? Number.parseFloat(O.style.width) : 0 : w2.maxWidth - D.offsetWidth;
    }
    static getRightLimit(D, w2) {
      return D._tableDimensions.width !== void 0 ? Number.parseFloat(w2.style.width) : D._tableDimensions.maxWidth !== void 0 && D._tableElementRef ? _MoveLimits.getRightLimitForMaxWidth(D._tableElementRef, D._tableDimensions, w2) : _MoveLimits.getRightLimitDynamicWidthTable();
    }
    static getLeftLimit(D, w2) {
      let O = -D.offsetWidth;
      return w2 !== void 0 && (O += w2), O;
    }
    // prettier-ignore
    static generate(D, w2, O, x2, U, F) {
      const W = w2 || O ? _MoveLimits.getSideLimitDelta(F) : 0;
      return {
        left: _MoveLimits.getLeftLimit(F, w2 ? W : void 0) + x2,
        right: _MoveLimits.getRightLimit(D, U)
      };
    }
  };
  var SelectedColumnSizer = class _SelectedColumnSizer {
    // prettier-ignore
    static generateObj(D, w2, O, x2, U, F) {
      const W = w2.movableElement.offsetLeft;
      return {
        element: w2.element,
        moveLimits: MoveLimits.generate(D, O, x2, W, F, U),
        // this is to reflect the initial sizer offset to center itself in the cell divider
        initialOffset: W,
        mouseMoveOffset: W,
        fireColumnsUpdate: FireEvents.onColumnsUpdate.bind(this, D)
      };
    }
    static get(D, w2) {
      const O = D._columnsDetails[w2].columnSizer, x2 = w2 === 0, U = D._columnsDetails.length - 2 === w2, F = D._columnsDetails[w2].elements[0], W = ColumnSizerGenericUtils.findNextResizableColumnHeader(D._columnsDetails, w2);
      return _SelectedColumnSizer.generateObj(D, O, x2, U, F, W);
    }
  };
  var SEMI_TRANSPARENT_COLOR = "#ffffff01";
  var ColumnSizer = class _ColumnSizer {
    static shouldWidthBeIncreased(D) {
      return D > 4;
    }
    // prettier-ignore
    static getBackgroundImage(D, w2, O, x2, U) {
      if (x2 && U) {
        if (Number.parseInt(getComputedStyle(U).borderRightWidth) > 0 && (w2 > 0 || O === void 0 || O > 0))
          return ColumnSizerElement.EMPTY_BACKGROUND_IMAGE;
      } else if (D > 0)
        return ColumnSizerElement.EMPTY_BACKGROUND_IMAGE;
      return ColumnSizerElement.FILLED_BACKGROUND_IMAGE;
    }
    static getMarginRight(D, w2) {
      return w2 || !D ? "0px" : `${D.leftCellRight - D.rightCellLeft}px`;
    }
    static getTotalCellBorderWidth(D) {
      return D ? D.rightCellLeft + D.leftCellRight : 0;
    }
    static generateBorderWidthsInfo(D, w2) {
      var W, G, X;
      const O = {
        rightCellLeft: 0,
        leftCellLeft: 0,
        leftCellRight: 0,
        beforeLeftCellRight: void 0
      }, x2 = (W = D[w2 - 1]) == null ? void 0 : W.elements[0];
      x2 && (O.beforeLeftCellRight = Number.parseInt(getComputedStyle(x2).borderRightWidth) || 0);
      const U = (G = D[w2]) == null ? void 0 : G.elements[0];
      if (U) {
        const K = getComputedStyle(U);
        O.leftCellLeft = Number.parseInt(K.borderLeftWidth) || 0, O.leftCellRight = Number.parseInt(K.borderRightWidth) || 0;
      }
      const F = (X = D[w2 + 1]) == null ? void 0 : X.elements[0];
      return F && (O.rightCellLeft = Number.parseInt(getComputedStyle(F).borderLeftWidth) || 0), O;
    }
    // prettier-ignore
    static createObject(D, w2, O, x2, U, F, W) {
      const G = _ColumnSizer.generateBorderWidthsInfo(w2, O), X = _ColumnSizer.getTotalCellBorderWidth(G), K = w2.length - 1 === O, q = _ColumnSizer.getMarginRight(G, K), Q = _ColumnSizer.getBackgroundImage(
        X,
        G.leftCellLeft,
        G.beforeLeftCellRight,
        K,
        x2
      ), le = _ColumnSizer.shouldWidthBeIncreased(X), re = {
        element: D,
        styles: {
          default: {
            width: le ? `${X + 2}px` : "1.5px",
            backgroundImage: Q
          },
          hover: {
            width: le ? `${(X + 2) * 1.5}px` : "9px"
          },
          static: {
            marginRight: q
          }
        },
        isSideCellHovered: false,
        isSizerHovered: false,
        isMouseUpOnSizer: false
      };
      return W && (re.hoverColor = W.hover || ColumnSizerElement.DEFAULT_HOVER_COLOR), F && (re.movableElement = F), U && (re.overlayElement = U), re;
    }
    // prettier-ignore
    static create(D, w2) {
      const { _columnsDetails: O, _tableElementRef: x2, columnResizerColors: U } = D, F = ColumnSizerElement.create(w2, U.hover), W = MovableColumnSizerElement.create(U), G = ColumnSizerOverlayElement.create(), X = _ColumnSizer.createObject(
        F,
        O,
        w2,
        x2,
        G,
        W,
        U
      );
      return ColumnSizerOverlayElement.applyEvents(D, X), X;
    }
  };
  var _ColumnSizerFillerElement = class ft {
    static create(D) {
      const w2 = document.createElement("div");
      return w2.classList.add(ft.SIZER_FILLER_CLASS), w2.style.backgroundColor = D || ColumnSizerElement.DEFAULT_HOVER_COLOR, w2.style.display = "none", w2;
    }
    static setWidth(D, w2) {
      const O = Number.parseInt(w2);
      D.style.width = `${ColumnSizer.shouldWidthBeIncreased(O) ? O : 4}px`;
    }
    static display(D) {
      D.style.display = "block";
    }
    static hide(D) {
      D.style.display = "none";
    }
  };
  _ColumnSizerFillerElement.SIZER_FILLER_CLASS = "column-sizer-filler";
  var ColumnSizerFillerElement = _ColumnSizerFillerElement;
  var _ColumnSizerElement = class Ce {
    static isHovered(D) {
      return D.style.backgroundImage === Ce.EMPTY_BACKGROUND_IMAGE;
    }
    static setBackgroundImage(D, w2) {
      D.style.backgroundImage = w2;
    }
    static unsetBackgroundImage(D) {
      D.style.backgroundImage = Ce.EMPTY_BACKGROUND_IMAGE;
    }
    static setBackgroundColor(D, w2) {
      D.style.backgroundColor = w2;
    }
    static setTransitionTime(D) {
      D.style.transition = Ce.TRANSITION_TIME;
    }
    static unsetTransitionTime(D) {
      D.style.transition = "0.0s";
    }
    // is not used to unset background image
    static unsetElementsToDefault(D, w2, O = true) {
      O && Ce.setBackgroundColor(D, SEMI_TRANSPARENT_COLOR), ColumnSizerFillerElement.hide(D.children[0]), D.style.width = w2;
    }
    // this is recalculated as it depends on the column index that the sizer is on
    static setStaticProperties(D, w2) {
      D.style.marginRight = w2;
    }
    static setElementId(D, w2) {
      D.id = `${Ce.COLUMN_SIZER_ID_PREFIX}${w2}`;
    }
    static create(D, w2) {
      const O = document.createElement("div");
      Ce.setElementId(O, D), O.classList.add(Ce.COLUMN_SIZER_CLASS);
      const x2 = ColumnSizerFillerElement.create(w2);
      return O.append(x2), Ce.hide(O), O;
    }
    static display(D) {
      var w2;
      UpdateRowElement.updateHeaderRowHeight((w2 = D.parentElement) == null ? void 0 : w2.parentElement), D.style.display = "flex";
    }
    static hide(D) {
      D.style.display = "none";
    }
    static hideWithBlurAnimation(D) {
      setTimeout(() => {
        Ce.hide(D);
      }, Ce.HALF_TRANSITION_TIME_ML);
    }
    static hideWhenCellNotHovered(D, w2) {
      D.isSideCellHovered || (w2 ? Ce.hideWithBlurAnimation(D.element) : Ce.hide(D.element));
    }
    static setHoverStyle(D, w2, O, x2) {
      const { element: U, hoverColor: F } = D;
      ColumnSizerFillerElement.display(U.children[0]), O && Ce.setTransitionTime(U), Ce.setBackgroundColor(U, x2 || F), U.style.width = w2;
    }
  };
  _ColumnSizerElement.FILLED_BACKGROUND_IMAGE = "linear-gradient(180deg, #cdcdcd, #cdcdcd 75%, transparent 75%, transparent 100%)";
  _ColumnSizerElement.EMPTY_BACKGROUND_IMAGE = "none";
  _ColumnSizerElement.DEFAULT_HOVER_COLOR = "grey";
  _ColumnSizerElement.COLUMN_SIZER_CLASS = "column-sizer";
  _ColumnSizerElement.COLUMN_SIZER_ID_PREFIX = `${_ColumnSizerElement.COLUMN_SIZER_CLASS}-`;
  _ColumnSizerElement.TRANSITION_TIME_ML = 200;
  _ColumnSizerElement.TRANSITION_TIME = `${_ColumnSizerElement.TRANSITION_TIME_ML / 1e3}s`;
  _ColumnSizerElement.HALF_TRANSITION_TIME_ML = _ColumnSizerElement.TRANSITION_TIME_ML / 2;
  var ColumnSizerElement = _ColumnSizerElement;
  var _ColumnSizerOverlayEvents = class st {
    static overlayMouseEnter(D) {
      if (D.isSizerHovered = true, D.isMouseUpOnSizer || this._activeOverlayElements.selectedColumnSizer)
        return;
      const { width: w2 } = D.styles.hover;
      ColumnSizerElement.display(D.element), ColumnSizerElement.setTransitionTime(D.element), setTimeout(() => {
        D.isSizerHovered && ColumnSizerElement.setHoverStyle(D, w2, false);
      }, 1), setTimeout(() => {
        D.isSizerHovered && ColumnSizerElement.unsetBackgroundImage(D.element);
      }, st.MOUSE_PASSTHROUGH_TIME_ML);
    }
    // the constant if statement checking is used to prevent a bug where if a mouse leaves the sizer and immediately reenters
    // the timeouts would still proceed to execute the code below
    static unsetColorDuringTransition(D) {
      setTimeout(() => {
        D.isSizerHovered || (ColumnSizerElement.setBackgroundImage(D.element, D.styles.default.backgroundImage), setTimeout(() => {
          D.isSizerHovered || (ColumnSizerElement.unsetTransitionTime(D.element), ColumnSizerElement.setBackgroundColor(D.element, SEMI_TRANSPARENT_COLOR));
        }, ColumnSizerElement.HALF_TRANSITION_TIME_ML));
      }, ColumnSizerElement.HALF_TRANSITION_TIME_ML);
    }
    static overlayMouseLeave(D) {
      if (D.isSizerHovered = false, this._activeOverlayElements.selectedColumnSizer || D.isMouseUpOnSizer)
        return;
      const { element: w2, styles: O } = D;
      ColumnSizerElement.unsetElementsToDefault(w2, O.default.width);
      const x2 = ColumnSizerElement.isHovered(w2);
      setTimeout(() => {
        !this._activeOverlayElements.selectedColumnSizer && !D.isSizerHovered && (st.unsetColorDuringTransition(D), ColumnSizerElement.hideWhenCellNotHovered(D, x2));
      }, st.MOUSE_PASSTHROUGH_TIME_ML);
    }
    // we need to pass down the sizer element instead of the id as the id can change when columns are inserted/removed
    // prettier-ignore
    static overlayMouseDown(D) {
      const { _columnsDetails: w2, _tableBodyElementRef: O, _frameComponents: { displayAddNewRow: x2 } } = this, { columnSizer: U, sizerNumber: F } = ColumnSizerGenericUtils.getSizerDetailsViaElementId(D.id, w2), { element: W, styles: G } = U;
      MovableColumnSizerElement.display(O, U, x2), ColumnSizerElement.unsetElementsToDefault(W, G.default.width), ColumnSizerElement.setBackgroundImage(W, G.default.backgroundImage), this._activeOverlayElements.selectedColumnSizer = SelectedColumnSizer.get(this, F);
    }
  };
  _ColumnSizerOverlayEvents.MOUSE_PASSTHROUGH_TIME_ML = 50;
  var ColumnSizerOverlayEvents = _ColumnSizerOverlayEvents;
  var _ColumnSizerOverlayElement = class ht {
    // this is recalculated as it depends on the column index that the sizer is on
    static setStaticProperties(D, w2, O) {
      D.style.marginRight = w2, D.style.width = O;
    }
    static applyEvents(D, w2) {
      w2.overlayElement.onmouseenter = ColumnSizerOverlayEvents.overlayMouseEnter.bind(D, w2), w2.overlayElement.onmouseleave = ColumnSizerOverlayEvents.overlayMouseLeave.bind(D, w2), w2.overlayElement.onmousedown = ColumnSizerOverlayEvents.overlayMouseDown.bind(D, w2.element);
    }
    static create() {
      const D = document.createElement("div");
      return D.classList.add(ht.SIZER_OVERLAY_CLASS), D;
    }
  };
  _ColumnSizerOverlayElement.SIZER_OVERLAY_CLASS = "column-sizer-overlay";
  var ColumnSizerOverlayElement = _ColumnSizerOverlayElement;
  var InsertRemoveColumnSizer = class _InsertRemoveColumnSizer {
    static updateIdsOfAllSubsequent(D, w2) {
      D.slice(w2).forEach((O, x2) => {
        if (!O.columnSizer)
          return;
        const U = w2 + x2;
        ColumnSizerElement.setElementId(O.columnSizer.element, U);
      });
    }
    static applySizerStateToElements(D) {
      const { element: w2, movableElement: O, overlayElement: x2, styles: U } = D;
      ColumnSizerElement.unsetElementsToDefault(w2, U.default.width), ColumnSizerFillerElement.setWidth(w2.children[0], U.default.width), ColumnSizerElement.setStaticProperties(w2, U.static.marginRight), ColumnSizerElement.setBackgroundImage(w2, U.default.backgroundImage), MovableColumnSizerElement.setStaticProperties(O, U.static.marginRight, U.hover.width), ColumnSizerOverlayElement.setStaticProperties(x2, U.static.marginRight, U.hover.width);
    }
    static insertAtIndex(D, w2, O) {
      const x2 = w2.elements[0].nextSibling, U = ColumnSizer.create(D, O);
      w2.columnSizer = U, x2.appendChild(U.element), x2.appendChild(U.overlayElement), x2.appendChild(U.movableElement), _InsertRemoveColumnSizer.applySizerStateToElements(U);
    }
    // prettier-ignore
    static updateSizer(D, w2, O, x2) {
      const U = ColumnSizer.createObject(D.element, w2, O, x2);
      Object.assign(D, U), _InsertRemoveColumnSizer.applySizerStateToElements(D);
    }
    static updatePrevious(D, w2, O) {
      var F;
      const x2 = w2 - 1;
      if (x2 < 0)
        return;
      const { columnSizer: U } = D[x2];
      ((F = D[x2].settings.widths) == null ? void 0 : F.staticWidth) !== void 0 || !U || _InsertRemoveColumnSizer.updateSizer(U, D, w2, O);
    }
    static getNewColumnIndexIfWidthSet(D, w2) {
      var O;
      return D.length - 1 === w2 ? (O = D[w2 - 1]) != null && O.columnSizer ? -1 : w2 - 1 : w2;
    }
    static isNotResizable(D) {
      const { widths: w2, isColumnResizable: O } = D.settings;
      return (w2 == null ? void 0 : w2.staticWidth) !== void 0 || !O;
    }
    // REF-13
    static insert(D, w2) {
      const { _columnsDetails: O } = D;
      if (!_InsertRemoveColumnSizer.isNotResizable(O[w2])) {
        if (D._tableDimensions.width !== void 0) {
          if (w2 = _InsertRemoveColumnSizer.getNewColumnIndexIfWidthSet(D._columnsDetails, w2), w2 === -1 || _InsertRemoveColumnSizer.isNotResizable(O[w2]))
            return;
        } else
          _InsertRemoveColumnSizer.updatePrevious(O, w2, D._tableElementRef);
        _InsertRemoveColumnSizer.insertAtIndex(D, O[w2], w2), _InsertRemoveColumnSizer.updateIdsOfAllSubsequent(O, w2 + 1);
      }
    }
    // this is only used for when table width is static, otherwise it is removed directly with the column
    static removeSizer(D) {
      var w2, O, x2, U, F, W;
      (O = (w2 = D.columnSizer) == null ? void 0 : w2.element) == null || O.remove(), (U = (x2 = D.columnSizer) == null ? void 0 : x2.movableElement) == null || U.remove(), (W = (F = D.columnSizer) == null ? void 0 : F.overlayElement) == null || W.remove(), delete D.columnSizer;
    }
    // need to remove the sizer of the new last column as when width is set - last column does not have a sizer
    static removeIfLastColumn(D, w2) {
      return D.length === w2 && D[w2] && (w2 -= 1, _InsertRemoveColumnSizer.removeSizer(D[w2])), w2;
    }
    static remove(D, w2) {
      const { _tableDimensions: O, _columnsDetails: x2, _tableElementRef: U } = D;
      O.width !== void 0 && (w2 = _InsertRemoveColumnSizer.removeIfLastColumn(x2, w2)), _InsertRemoveColumnSizer.updatePrevious(x2, w2, U), _InsertRemoveColumnSizer.updateIdsOfAllSubsequent(x2, w2);
    }
    // This is used to cleanup sizers for columns that have or had static widths because they do not have sizers,
    // additionally when the table width is set the last column that is not static also does not have a sizer.
    static cleanUpCustomColumnSizers(D, w2) {
      const { _tableDimensions: O, _columnsDetails: x2 } = D;
      if (O.width === void 0)
        return;
      let U = false;
      for (let F = x2.length - 1; F >= 0; F -= 1) {
        const W = x2[F];
        if (_InsertRemoveColumnSizer.isNotResizable(W))
          W.columnSizer && _InsertRemoveColumnSizer.removeSizer(W);
        else if (U === false) {
          if (U = true, W.columnSizer && _InsertRemoveColumnSizer.removeSizer(W), F < w2)
            break;
        } else if (!W.columnSizer && x2.length - 1 !== F && _InsertRemoveColumnSizer.insertAtIndex(D, W, F), U === true && F < w2)
          break;
      }
    }
  };
  var DropdownDisplaySettingsUtil = class {
    static process(D) {
      D.isAvailable ?? (D.isAvailable = true), D.isAvailable ? (D.openMethod ?? (D.openMethod = {}), D.openMethod.overlayClick ? delete D.openMethod.cellClick : D.openMethod.cellClick ? delete D.openMethod.overlayClick : D.openMethod.overlayClick = true) : (delete D.openMethod, delete D.overlayStyles);
    }
  };
  var ColumnSettingsDefaultTextUtils = class {
    static unsetDefaultText(D, w2, O) {
      w2.elements.slice(1).forEach((x2, U) => {
        const F = U + 1;
        CellEvents.removeTextIfDefault(D, F, O, x2);
      });
    }
    static setDefaultText(D, w2, O) {
      w2.elements.slice(1).forEach((x2, U) => {
        const F = U + 1;
        CellEvents.setCellToDefaultIfNeeded(D, F, O, x2, false);
      }), setTimeout(() => FireEvents.onDataUpdate(D));
    }
  };
  var ColumnSettingsWidthUtils = class _ColumnSettingsWidthUtils {
    // prettier-ignore
    static getSettingsWidthNumber(D, w2, O = true) {
      return StringDimensionUtils.generateNumberDimensionFromClientString(
        D,
        w2,
        O ? "staticWidth" : "initialWidth",
        true,
        ColumnDetails.MINIMAL_COLUMN_WIDTH
      );
    }
    static updateColumnWidth(D, w2, O, x2) {
      const { _tableDimensions: U, _tableElementRef: F } = D, { number: W } = _ColumnSettingsWidthUtils.getSettingsWidthNumber(F, O);
      w2.style.width = `${W}px`, TableElement.changeStaticWidthTotal(U, x2 ? W : -W);
    }
    // prettier-ignore
    static changeWidth(D, w2, O, x2) {
      let U = false;
      O != null && O.staticWidth && (_ColumnSettingsWidthUtils.updateColumnWidth(D, w2, O, false), U = true), x2 != null && x2.staticWidth && (_ColumnSettingsWidthUtils.updateColumnWidth(D, w2, x2, true), U = true), U && StaticTableWidthUtils.changeWidthsBasedOnColumnInsertRemove(D, true);
    }
  };
  var ColumnDropdownCellOverlayEvents = class _ColumnDropdownCellOverlayEvents {
    static mouseClick(D, w2) {
      ColumnDropdown.display(this, D);
      const O = w2.elements[0];
      setTimeout(() => FocusedCellUtils.setHeaderCell(this._focusedElements.cell, O, D));
    }
    // prettier-ignore
    static mouseLeave(D) {
      var w2;
      ColumnDropdownCellOverlay.hide(this, D), delete this._hoveredElements.headerCell, ColumnDropdownCellOverlay.resetDefaultColor(
        D.columnDropdownCellOverlay,
        (w2 = this._defaultColumnsSettings.columnDropdown) == null ? void 0 : w2.displaySettings
      );
    }
    static mouseEnter(D) {
      var O;
      const w2 = D.elements[0];
      this._hoveredElements.headerCell = w2, ColumnDropdownCellOverlay.setHoverColor(D, (O = this._defaultColumnsSettings.columnDropdown) == null ? void 0 : O.displaySettings);
    }
    static setEvents(D, w2) {
      const O = D._columnsDetails[w2], { columnDropdownCellOverlay: x2 } = O;
      x2 && (x2.onmouseenter = _ColumnDropdownCellOverlayEvents.mouseEnter.bind(D, O), x2.onmouseleave = _ColumnDropdownCellOverlayEvents.mouseLeave.bind(D, O), x2.onclick = _ColumnDropdownCellOverlayEvents.mouseClick.bind(D, w2, O));
    }
  };
  var EditableHeaderIconTextEvents = class _EditableHeaderIconTextEvents {
    static keyDownOnText(D, w2, O) {
      UpdateRowElement.updateHeadRowHeightOnKeyDown(this._tableBodyElementRef), O.key === KEYBOARD_KEY.TAB && CellTextEvents.tabOutOfCell(this, D, w2, O);
    }
    // REF-15
    static blurText(D, w2, O) {
      const x2 = O.target, U = CellElement.getCellElement(x2);
      HeaderText.onAttemptChange(this, U, w2), DataCellEvents.blur(this, D, w2, x2);
    }
    static setEvents(D, w2, O, x2) {
      D._columnsDetails[x2].settings.isHeaderTextEditable && (w2.onfocus = CellWithTextEvents.focusText.bind(D, O, x2, null), w2.onblur = _EditableHeaderIconTextEvents.blurText.bind(D, O, x2), w2.onkeydown = _EditableHeaderIconTextEvents.keyDownOnText.bind(D, O, x2));
    }
  };
  var ColumnSizerCellEvents = class _ColumnSizerCellEvents {
    static hideColumnSizer(D) {
      if (!D)
        return;
      D.isSideCellHovered = false;
      const w2 = ColumnSizerElement.isHovered(D.element);
      setTimeout(() => {
        D.isSizerHovered || ColumnSizerElement.hideWhenCellNotHovered(D, w2);
      });
    }
    static cellMouseLeave(D, w2) {
      var O, x2;
      _ColumnSizerCellEvents.hideColumnSizer((O = D[w2 - 1]) == null ? void 0 : O.columnSizer), _ColumnSizerCellEvents.hideColumnSizer((x2 = D[w2]) == null ? void 0 : x2.columnSizer);
    }
    static displayColumnSizer(D) {
      D && (ColumnSizerElement.display(D.element), D.isSideCellHovered = true);
    }
    static cellMouseEnter(D, w2) {
      var O, x2;
      _ColumnSizerCellEvents.displayColumnSizer((O = D[w2 - 1]) == null ? void 0 : O.columnSizer), _ColumnSizerCellEvents.displayColumnSizer((x2 = D[w2]) == null ? void 0 : x2.columnSizer);
    }
  };
  var HeaderCellEvents = class _HeaderCellEvents {
    static mouseEnterCell(D, w2) {
      var O, x2, U, F;
      if (!this._activeOverlayElements.selectedColumnSizer) {
        const W = this._columnsDetails[D], G = w2.target;
        CellHighlightUtils.highlight(G, (O = W.headerStateColors) == null ? void 0 : O.hover), ColumnSizerCellEvents.cellMouseEnter(this._columnsDetails, D), ((F = (U = (x2 = this._defaultColumnsSettings.columnDropdown) == null ? void 0 : x2.displaySettings) == null ? void 0 : U.openMethod) == null ? void 0 : F.overlayClick) && ColumnDropdownCellOverlay.display(W), this._hoveredElements.headerCell = G;
      }
    }
    static mouseLeaveCell(D, w2) {
      var O, x2, U, F;
      Dropdown.isDisplayed(this._activeOverlayElements.columnDropdown) || (CellHighlightUtils.fade(w2.target, (O = this._columnsDetails[D].headerStateColors) == null ? void 0 : O.default), ColumnDropdownCellOverlay.hide(this, this._columnsDetails[D]), (F = (U = (x2 = this._defaultColumnsSettings.columnDropdown) == null ? void 0 : x2.displaySettings) == null ? void 0 : U.openMethod) != null && F.overlayClick && delete this._hoveredElements.headerCell), this._activeOverlayElements.selectedColumnSizer || ColumnSizerCellEvents.cellMouseLeave(this._columnsDetails, D);
    }
    static mouseClick(D, w2) {
      var U, F, W;
      const O = w2.target;
      CellEvents.removeTextIfDefault(this, 0, D, O), ((W = (F = (U = this._defaultColumnsSettings.columnDropdown) == null ? void 0 : U.displaySettings) == null ? void 0 : F.openMethod) == null ? void 0 : W.cellClick) && ColumnDropdown.display(this, D), setTimeout(() => FocusedCellUtils.setHeaderCell(this._focusedElements.cell, O, D));
    }
    static setEvents(D, w2, O) {
      w2.onmouseenter = _HeaderCellEvents.mouseEnterCell.bind(D, O), w2.onmouseleave = _HeaderCellEvents.mouseLeaveCell.bind(D, O), w2.onclick = _HeaderCellEvents.mouseClick.bind(D, O), DragColumn.applyEventsToElement(D, w2, w2);
    }
  };
  var EditableHeaderCellEvents = class _EditableHeaderCellEvents {
    static mouseClickCell(D, w2) {
      const O = w2.target;
      FocusedCellUtils.purge(this._focusedElements.cell), setTimeout(() => FocusedCellUtils.setHeaderCell(this._focusedElements.cell, O, D));
    }
    static setEvents(D, w2, O, x2) {
      if (w2.onmouseenter = HeaderCellEvents.mouseEnterCell.bind(D, x2), w2.onmouseleave = HeaderCellEvents.mouseLeaveCell.bind(D, x2), D.displayHeaderIcons) {
        w2.onfocus = () => {
        }, w2.onblur = () => {
        }, w2.onmousedown = CellWithTextEvents.mouseDown.bind(D, null), w2.onclick = _EditableHeaderCellEvents.mouseClickCell.bind(D, x2);
        const U = CellElement.getTextElement(w2);
        EditableHeaderIconTextEvents.setEvents(D, U, O, x2);
      } else
        w2.onclick = HeaderCellEvents.mouseClick.bind(D, x2);
    }
  };
  var CellEventsReset = class _CellEventsReset {
    static unset(D) {
      D.onfocus = () => {
      }, D.onblur = () => {
      }, D.onmouseenter = () => {
      }, D.onmouseleave = () => {
      }, D.onmousedown = () => {
      }, D.oninput = () => {
      }, D.onpaste = () => {
      }, D.onkeydown = () => {
      };
    }
    static setDataCellEvents(D, w2, O, x2) {
      const { settings: U, activeType: F } = D._columnsDetails[x2];
      if (!U.isCellTextEditable)
        return;
      DataCellEvents.setEvents(D, w2, O, x2);
      const { cellDropdownProps: W, calendar: G, checkbox: X } = F;
      W ? SelectCell.setEvents(D, w2, O, x2) : G ? DateCellEvents.setEvents(D, w2, O, x2) : X && CheckboxCellEvents.setEvents(D, w2, O, x2);
    }
    static setHeaderCellEvents(D, w2, O, x2) {
      var U, F, W;
      (W = (F = (U = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : U.displaySettings) == null ? void 0 : F.openMethod) != null && W.cellClick ? HeaderCellEvents.setEvents(D, w2, x2) : (DataCellEvents.setEvents(D, w2, O, x2), EditableHeaderCellEvents.setEvents(D, w2, 0, x2), ColumnDropdownCellOverlayEvents.setEvents(D, x2));
    }
    // REF-33
    static reset(D, w2, O, x2) {
      O === 0 ? _CellEventsReset.setHeaderCellEvents(D, w2, O, x2) : _CellEventsReset.setDataCellEvents(D, w2, O, x2), !D._frameComponents.displayIndexColumn && x2 === 0 && RowDropdownCellOverlayEvents.addCellEvents(D, O, w2);
    }
  };
  var ResetColumnStructure = class {
    static reset(D, w2, O) {
      const { elements: x2, activeType: U, settings: F } = w2;
      x2.slice(1).forEach((W) => {
        F.isCellTextEditable || CellEventsReset.unset(W);
      }), ChangeColumnType.setNewStructureBasedOnType(D, O, U), ColumnSettingsBorderUtils.resetBorderOverwritingState(w2), setTimeout(() => FireEvents.onColumnsUpdate(D));
    }
  };
  var ColumnSettingsUtils = class _ColumnSettingsUtils {
    static updateSizer(D, w2) {
      const { _columnsDetails: O, _tableElementRef: x2 } = D;
      if (!x2)
        return;
      const { columnSizer: U } = O[w2];
      U || InsertRemoveColumnSizer.insert(D, w2), InsertRemoveColumnSizer.cleanUpCustomColumnSizers(D, w2), U && InsertRemoveColumnSizer.updateSizer(U, O, w2, x2);
      const F = w2 - 1;
      if (w2 > 0 && O[F].columnSizer) {
        const { columnSizer: W } = O[F];
        InsertRemoveColumnSizer.updateSizer(W, O, F, x2);
      }
    }
    // prettier-ignore
    static change(D, w2, O, x2, U, F) {
      const W = D._columnsDetails[O];
      ColumnSettingsDefaultTextUtils.unsetDefaultText(D, W, O), W.settings = U, W.activeType = ColumnTypesUtils.getActiveType(U, W.settings.defaultColumnTypeName), ResetColumnStructure.reset(D, W, O), ColumnSettingsDefaultTextUtils.setDefaultText(D, W, O), F || ColumnSettingsWidthUtils.changeWidth(D, w2, x2.widths, U.widths), ColumnSettingsStyleUtils.changeStyleFunc(D, O, x2), ColumnSettingsBorderUtils.updateSiblingColumns(D, O), _ColumnSettingsUtils.updateSizer(D, O), D.displayHeaderIcons && HeaderIconCellElement.changeHeaderIcon(D._columnsDetails[O]), ColumnDropdownCellOverlay.updateIfDisplayed(W), AddNewColumnElement.toggle(D, true);
    }
    // prettier-ignore
    static parseSettingsChange(D) {
      const { _customColumnsSettings: w2, _columnsDetails: O, _focusedElements: { cell: { element: x2, columnIndex: U } } } = D, W = O[U].settings, G = w2[CellElement.getText(x2)];
      return { oldSettings: W, newSettings: G, areSettingsDifferent: G ? W !== G : false };
    }
    // prettier-ignore
    static changeColumnSettingsIfNameDifferent(D, w2, O, x2 = false) {
      const { oldSettings: U, newSettings: F, areSettingsDifferent: W } = _ColumnSettingsUtils.parseSettingsChange(D);
      W && _ColumnSettingsUtils.change(D, w2, O, U, F, x2);
    }
    static setDropdownSettings(D, w2) {
      !D || !w2 || (D.isSortAvailable ?? (D.isSortAvailable = w2.isSortAvailable), D.isDeleteAvailable ?? (D.isDeleteAvailable = w2.isDeleteAvailable), D.isInsertLeftAvailable ?? (D.isInsertLeftAvailable = w2.isInsertLeftAvailable), D.isInsertRightAvailable ?? (D.isInsertRightAvailable = w2.isInsertRightAvailable), D.isMoveAvailable ?? (D.isMoveAvailable = w2.isMoveAvailable));
    }
    static processCellDimensions(D) {
      const w2 = D.cellStyle;
      if (!w2)
        return;
      const O = D;
      if (w2.width) {
        const x2 = D.isColumnResizable === false ? "staticWidth" : "initialWidth";
        O.widths = { [x2]: w2.width };
      } else
        O.widths && D.isColumnResizable && O.widths.staticWidth && (O.widths = { initialWidth: O.widths.staticWidth });
      StringDimensionUtils.removeAllDimensions(w2);
    }
    static createInternalSettings(D, w2) {
      const O = D;
      return ColumnSettingsStyleUtils.doesSettingHaveSideBorderStyle(O) && (O.stylePrecedence = true), _ColumnSettingsUtils.setDropdownSettings(D.columnDropdown, w2.columnDropdown), Object.keys(w2).forEach((x2) => {
        O[x2] ?? (O[x2] = w2[x2]);
      }), O.types = ColumnTypesUtils.getProcessedTypes(O), _ColumnSettingsUtils.processCellDimensions(D), O;
    }
    static createInternalMap(D, w2) {
      return D.reduce((O, x2) => (O[x2.headerName] = _ColumnSettingsUtils.createInternalSettings(x2, w2), O), {});
    }
    static setDefaultTypeProperties(D) {
      const { _defaultColumnsSettings: w2 } = D;
      w2.availableDefaultColumnTypes = D.availableDefaultColumnTypes, w2.customColumnTypes = D.customColumnTypes, w2.defaultColumnTypeName = D.defaultColumnTypeName, w2.types = ColumnTypesUtils.getProcessedTypes(w2);
    }
    static setDefaultDropdownProperties(D) {
      var x2, U, F, W, G, X;
      const { _defaultColumnsSettings: w2 } = D, O = { openMethod: { cellClick: true } };
      w2.columnDropdown = D.columnDropdown || { displaySettings: O }, (x2 = w2.columnDropdown).displaySettings ?? (x2.displaySettings = O), DropdownDisplaySettingsUtil.process(w2.columnDropdown.displaySettings), (U = w2.columnDropdown).isSortAvailable ?? (U.isSortAvailable = true), (F = w2.columnDropdown).isDeleteAvailable ?? (F.isDeleteAvailable = true), (W = w2.columnDropdown).isInsertLeftAvailable ?? (W.isInsertLeftAvailable = true), (G = w2.columnDropdown).isInsertRightAvailable ?? (G.isInsertRightAvailable = true), (X = w2.columnDropdown).isMoveAvailable ?? (X.isMoveAvailable = true);
    }
    static setDefaultGenericProperties(D) {
      const { _defaultColumnsSettings: w2 } = D;
      w2.defaultText = D.defaultText ?? EMPTY_STRING, w2.isDefaultTextRemovable = D.isDefaultTextRemovable ?? true, w2.cellStyle = D.cellStyle, w2.isCellTextEditable = D.isCellTextEditable ?? true, w2.headerStyles = D.headerStyles, w2.isHeaderTextEditable = D.isHeaderTextEditable ?? w2.isCellTextEditable, w2.headerIconStyle = D.headerIconStyle, w2.isColumnResizable = D.isColumnResizable ?? true;
    }
    static setDefaultColumnsSettings(D) {
      const { _defaultColumnsSettings: w2 } = D;
      _ColumnSettingsUtils.setDefaultGenericProperties(D), _ColumnSettingsUtils.processCellDimensions(w2), _ColumnSettingsUtils.setDefaultDropdownProperties(D), _ColumnSettingsUtils.setDefaultTypeProperties(D);
    }
    // REF-21
    static setUpInternalSettings(D) {
      _ColumnSettingsUtils.setDefaultColumnsSettings(D), D._customColumnsSettings = _ColumnSettingsUtils.createInternalMap(
        D.customColumnsSettings,
        D._defaultColumnsSettings
      );
    }
  };
  var HeaderText = class {
    static onAttemptChange(D, w2, O, x2) {
      const U = x2 == null ? void 0 : x2.colRemove;
      U || ColumnSettingsUtils.changeColumnSettingsIfNameDifferent(D, w2, O, x2 == null ? void 0 : x2.colMove), D._visiblityInternal.filters && FilterInternalUtils.wasHeaderChanged(D._columnsDetails, D._visiblityInternal.filters, O, U) && VisibilityUtils.headerChanged(D);
    }
  };
  var NestedDropdownItem = class {
    static resetItemStyle(D) {
      Array.from(D.children).forEach((w2) => {
        const O = w2;
        O.style.backgroundColor = "", O.style.color = "";
      });
    }
  };
  NestedDropdownItem.NESTED_DROPDOWN_ITEM = "nested-dropdown-item";
  var DropdownItemNavigation = class _DropdownItemNavigation {
    static focusInputElement(D) {
      D.children[0].dispatchEvent(new MouseEvent("mouseenter"));
    }
    // either at the end when isNext is true or the start when isNext is false
    static focusItemWhenOnEdge(D, w2, O) {
      var F;
      if (DropdownItem.doesElementContainInputClass(D)) {
        const W = D.parentElement;
        return _DropdownItemNavigation.focusSiblingItem(W, w2, O);
      }
      ((F = D.parentElement) == null ? void 0 : F.parentElement).classList.contains(DropdownItem.DROPDOWN_ITEM_CLASS) && (w2 = D.parentElement);
      const U = O ? w2.children[0] : w2.children[w2.children.length - 1];
      return _DropdownItemNavigation.focusSiblingItem(U, w2, O, true);
    }
    // isEdgeItem means is it a start/end or inside item
    // prettier-ignore
    static focusSiblingItem(D, w2, O, x2 = false) {
      if (D.classList.contains(NestedDropdownItem.NESTED_DROPDOWN_ITEM)) {
        const F = D.children[2];
        Dropdown.isDisplayed(F) && Dropdown.hide(F);
      }
      const U = x2 ? D : D[O ? "nextSibling" : "previousSibling"];
      if (U) {
        if (!DropdownItem.isDisplayed(U) || U.classList.contains(DropdownItem.DROPDOWN_TITLE_ITEM_CLASS) || U.classList.contains(DropdownItem.DROPDOWN_ITEM_DIVIDER_CLASS))
          return _DropdownItemNavigation.focusSiblingItem(U, w2, O);
        if (U.classList.contains(DropdownItem.DROPDOWN_INPUT_ITEM_CLASS))
          return _DropdownItemNavigation.focusInputElement(U);
      } else
        return _DropdownItemNavigation.focusItemWhenOnEdge(D, w2, O);
      U.dispatchEvent(new MouseEvent("mouseenter"));
    }
    static focusFirstNestedDropdownItem(D) {
      if (D.classList.contains(NestedDropdownItem.NESTED_DROPDOWN_ITEM)) {
        const w2 = D.children[2];
        Dropdown.isDisplayed(w2) && w2.children[0].dispatchEvent(new MouseEvent("mouseenter"));
      }
    }
    static focusNestedDropdownParentItem(D) {
      var O;
      const w2 = (O = D.parentElement) == null ? void 0 : O.parentElement;
      w2.classList.contains(DropdownItem.DROPDOWN_ITEM_CLASS) && (Dropdown.hide(D.parentElement), w2.dispatchEvent(new MouseEvent("mouseenter")));
    }
  };
  var ColumnTypeDropdownItemEvents = class _ColumnTypeDropdownItemEvents {
    static onClickMiddleware(D) {
      ColumnSettingsUtils.parseSettingsChange(this).areSettingsDifferent || D(), ColumnDropdown.processTextAndHide(this);
    }
    // prettier-ignore
    static set(D, w2, O) {
      w2.forEach((x2) => {
        const U = x2;
        U.onclick = _ColumnTypeDropdownItemEvents.onClickMiddleware.bind(
          D,
          ChangeColumnType.change.bind(D, U.innerText.trim(), O)
        );
      });
    }
  };
  var ColumnTypeDropdownItem = class _ColumnTypeDropdownItem {
    static unsetActiveItem(D) {
      const w2 = D.getElementsByClassName(DropdownItem.ACTIVE_ITEM_CLASS)[0];
      w2 && (w2.children[0].style.filter = "", w2.classList.remove(DropdownItem.ACTIVE_ITEM_CLASS));
    }
    static reset(D) {
      _ColumnTypeDropdownItem.unsetActiveItem(D), DropdownItem.removeItems(D);
    }
    static setActiveItem(D, w2) {
      const O = D.find((x2) => CellElement.getText(x2) === w2);
      O && (O.classList.add(DropdownItem.ACTIVE_ITEM_CLASS), O.children[0].style.filter = SVGIconUtils.WHITE_FILTER);
    }
    // the items are repopulated every time column dropdown is opened
    static setUp(D, w2) {
      const { columnTypeDropdown: O } = D._activeOverlayElements, x2 = D._columnsDetails[w2], U = x2.settings.types.map((F) => F.dropdownItem.element);
      DropdownItem.addButtonItemElements(D, O, U), ColumnTypeDropdownItemEvents.set(D, U, w2), _ColumnTypeDropdownItem.setActiveItem(U, x2.activeType.name);
    }
  };
  var DropdownEvents = class {
    static itemKeyNavigation(D, w2, O) {
      if (O.key === KEYBOARD_KEY.TAB || O.key === KEYBOARD_KEY.ARROW_DOWN) {
        O.preventDefault();
        const x2 = D != null && D.activeElement ? O.target : w2.children[0];
        DropdownItemNavigation.focusSiblingItem(x2, w2, true);
      } else
        O.key === KEYBOARD_KEY.ARROW_UP ? DropdownItemNavigation.focusSiblingItem(O.target, w2, false) : O.key === KEYBOARD_KEY.ARROW_RIGHT ? DropdownItemNavigation.focusFirstNestedDropdownItem(O.target) : O.key === KEYBOARD_KEY.ARROW_LEFT && DropdownItemNavigation.focusNestedDropdownParentItem(O.target);
    }
  };
  var ColumnDropdownEvents = class _ColumnDropdownEvents {
    static focusNextColumnDropdown(D, w2) {
      var U, F, W;
      w2.preventDefault(), ColumnDropdown.processTextAndHide(D);
      let O = D._focusedElements.cell.columnIndex;
      O === D._columnsDetails.length - 1 && (O = -1);
      const x2 = D._columnsDetails[O + 1];
      (W = (F = (U = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : U.displaySettings) == null ? void 0 : F.openMethod) != null && W.cellClick ? x2.elements[0].click() : x2.columnDropdownCellOverlay.click();
    }
    static onKeyDown(D, w2) {
      if (w2.key === KEYBOARD_KEY.ENTER) {
        const O = w2.target;
        DropdownItem.doesElementContainInputClass(O) ? ColumnDropdown.processTextAndHide(this) : (O.dispatchEvent(new Event("mouseenter")), O.dispatchEvent(new Event("click")));
      } else
        w2.key === KEYBOARD_KEY.ESCAPE ? ColumnDropdown.processTextAndHide(this) : w2.key === KEYBOARD_KEY.TAB && this._columnsDetails.length > 0 ? _ColumnDropdownEvents.focusNextColumnDropdown(this, w2) : DropdownEvents.itemKeyNavigation(this.shadowRoot, D, w2);
    }
    static set(D, w2) {
      w2.onkeydown = _ColumnDropdownEvents.onKeyDown.bind(D, w2);
    }
  };
  function buildIcon$4(Y) {
    return `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" style="transform: ${Y}">
      <g transform="matrix(0.84210527 0 0 0.84210527 0 0)">
        <g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
          <path d="M186.67 193.5L186.67 58.33C 186.67 51.888603 191.8927 46.666 198.334 46.666C 204.7793 46.666 210.002 51.888702 210.002 58.33L210.002 58.33L210.002 193.5L260.08398 143.418C 264.64258 138.8594 272.029 138.8594 276.58398 143.418C 281.14258 147.9727 281.14258 155.359 276.58398 159.918L276.58398 159.918L206.58398 229.918C 202.02928 234.4727 194.64299 234.4727 190.08398 229.918L190.08398 229.918L120.083984 159.918C 115.52928 155.3594 115.52928 147.97299 120.083984 143.418C 124.642586 138.8594 132.02899 138.8594 136.58398 143.418L136.58398 143.418L186.67 193.5zM396.66998 93.33L326.66998 93.33L326.66998 443.33002L396.66998 443.33002zM420.00198 93.33L420.00198 443.33002L490.00198 443.33002L490.00198 93.33002zM151.672 490C 145.2267 490 140.004 484.7773 140.004 478.332L140.004 478.332L140.004 268.332C 140.004 261.8906 145.2267 256.668 151.672 256.668L151.672 256.668L245.004 256.668C 251.4454 256.668 256.672 261.8907 256.672 268.332L256.672 268.332L256.672 478.332C 256.672 484.7773 251.4454 490 245.004 490zM163.336 466.668L233.336 466.668L233.336 279.998L163.336 279.998zM315.00598 466.668C 308.56458 466.668 303.33798 461.4414 303.33798 455L303.33798 455L303.33798 81.67001C 303.33798 75.22472 308.56458 70.002014 315.00598 70.002014L315.00598 70.002014L501.67596 70.002014C 508.11737 70.002014 513.33997 75.22472 513.33997 81.67001L513.33997 81.67001L513.33997 455C 513.33997 461.4414 508.11728 466.668 501.67596 466.668z" stroke="none" fill="#000000" fill-rule="nonzero" />
        </g>
      </g>
    </svg>`;
  }
  var INSERT_LEFT_ICON_SVG_STRING = buildIcon$4("");
  var INSERT_RIGHT_ICON_SVG_STRING = buildIcon$4("rotate(180deg) scale(1, -1)");
  var INSERT_UP_ICON_SVG_STRING = buildIcon$4("rotate(90deg) scale(1, -1)");
  var INSERT_DOWN_ICON_SVG_STRING = buildIcon$4("rotate(-90deg)");
  function buildIcon$3(Y) {
    return `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9" height="9" style="transform: ${Y}">
      <g transform="matrix(0.47368425 0 0 0.47368425 0 0)">
        <g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
          <g>
            <path d="M169 139.73L308.72998 0L349.175 40.484L109.124985 280.544L348.645 520.054L308.74698 559.999L169.01698 420.26904C 92.164986 343.42105 29.286987 280.29904 29.286987 279.99902C 29.286987 279.699 92.165985 216.57303 169.01698 139.72902L169.01698 139.72902L169 139.73zM490.55 139.73L630.27997 0L670.725 40.484L430.675 280.544L670.195 520.054L630.297 559.999L490.56702 420.26904C 413.71503 343.42105 350.83704 280.29904 350.83704 279.99902C 350.83704 279.699 413.71603 216.57303 490.56702 139.72902z" stroke="none" fill="#000000" fill-rule="nonzero" />
          </g>
        </g>
      </g>
    </svg>`;
  }
  var MOVE_LEFT_ICON_SVG_STRING = buildIcon$3("");
  var MOVE_RIGHT_ICON_SVG_STRING = buildIcon$3("rotate(180deg)");
  var MOVE_UP_ICON_SVG_STRING = buildIcon$3("rotate(90deg)");
  var MOVE_DOWN_ICON_SVG_STRING = buildIcon$3("rotate(-90deg)");
  function buildIcon$2(Y) {
    return `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9" height="12" style="transform: ${Y}">
      <g transform="matrix(0.5 0 0 0.5 0 0)">
        <path d="M0 0L24 0L24 24L0 24L0 0z" stroke="none" fill="none" />
        <path d="M3 18L9 18L9 16L3 16L3 18zM3 6L3 8L21 8L21 6L3 6zM3 13L15 13L15 11L3 11L3 13z" stroke="none" fill="#000000" fill-rule="nonzero" />
      </g>
    </svg>`;
  }
  var SORT_ASC_ICON_SVG_STRING = buildIcon$2("scale(1, -1)");
  var SORT_DESC_ICON_SVG_STRING = buildIcon$2("");
  var TRASH_ICON_SVG_STRING = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="15">
  <g transform="matrix(1.0666668 0 0 1.0714285 0 0)">
    <g transform="matrix(0.027142858 0 0 0.027142858 0 0)">
      <g>
        <path d="M459.21 156.28L448.835 436.32C 448.6592 441.1247 444.4248 445.195 439.6006 445.195L439.6006 445.195L260.40057 445.195C 255.58028 445.195 251.34198 441.1091 251.16617 436.32L251.16617 436.32L240.79117 156.28C 240.50601 148.5534 234.00996 142.522 226.28317 142.807C 218.55658 143.09607 212.52518 149.58821 212.81018 157.315L212.81018 157.315L223.18118 437.355C 223.91946 457.195 240.51718 473.195 260.40018 473.195L260.40018 473.195L439.60016 473.195C 459.47516 473.195 476.08017 457.22202 476.81915 437.355L476.81915 437.355L487.19016 157.315C 487.4753 149.58841 481.44406 143.09601 473.71716 142.807C 465.99057 142.52185 459.49417 148.5531 459.20917 156.28L459.20917 156.28L459.21 156.28z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M338.8 212.8L338.8 403.2C 338.8 409.3875 343.81168 414.39902 349.999 414.39902C 356.1863 414.39902 361.198 409.38733 361.198 403.2L361.198 403.2L361.198 212.80002C 361.198 206.61252 356.1863 201.60101 349.999 201.60101C 343.81168 201.60101 338.8 206.61272 338.8 212.80002L338.8 212.80002L338.8 212.8z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M277.2 213.13L282.8016 403.53C 282.9852 409.7136 288.14142 414.581 294.32462 414.397C 300.5082 414.21732 305.3756 409.0572 305.19162 402.874L305.19162 402.874L299.59003 212.474C 299.41034 206.2904 294.2502 201.423 288.06702 201.607C 281.88342 201.78668 277.02002 206.9468 277.2 213.12999L277.2 213.12999L277.2 213.13z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M400.41 212.47L394.8084 402.87C 394.62482 409.0536 399.492 414.214 405.6754 414.393C 411.859 414.5766 417.0154 409.7094 417.19843 403.526L417.19843 403.526L422.80002 213.126C 422.9797 206.94241 418.11642 201.78201 411.933 201.60301C 405.74942 201.41942 400.58902 206.2866 400.41 212.47002L400.41 212.47002L400.41 212.47z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M210 162.4L490 162.4C 497.7305 162.4 504 156.1344 504 148.4C 504 140.6695 497.7305 134.4 490 134.4L490 134.4L210 134.4C 202.2695 134.4 196 140.6695 196 148.4C 196 156.1344 202.2695 162.4 210 162.4z" stroke="none" fill="#000000" fill-rule="nonzero" />
        <path d="M307.46 143.85L313.2881 123.44401C 314.5381 119.076805 320.20218 114.803406 324.75308 114.803406L324.75308 114.803406L375.2451 114.803406C 379.7959 114.803406 385.46008 119.07291 386.71008 123.44401L386.71008 123.44401L392.53818 143.85L419.46017 136.15471L413.63208 115.75271C 408.94458 99.35771 392.29608 86.80371 375.2451 86.80371L375.2451 86.80371L324.75308 86.80371C 307.7021 86.80371 291.05008 99.36271 286.3661 115.75271L286.3661 115.75271L280.538 136.15471L307.46 143.85z" stroke="none" fill="#000000" fill-rule="nonzero" />
      </g>
    </g>
  </g>
</svg>`;
  var ColumnDropdownButtonItemConf = class {
  };
  ColumnDropdownButtonItemConf.ITEMS = [
    {
      text: "Sort Ascending",
      iconSettings: {
        svgString: SORT_ASC_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginRight: "9px", marginTop: "2px" } }
      }
    },
    {
      text: "Sort Descending",
      iconSettings: {
        svgString: SORT_DESC_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginRight: "9px", marginTop: "1px" } }
      }
    },
    {
      text: "Insert Left",
      iconSettings: {
        svgString: INSERT_LEFT_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginLeft: "-2px", marginRight: "3px", marginTop: "1px" } }
      }
    },
    {
      text: "Insert Right",
      iconSettings: {
        svgString: INSERT_RIGHT_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginLeft: "-3px", marginRight: "4px", marginTop: "1px" } }
      }
    },
    {
      text: "Move Left",
      iconSettings: {
        svgString: MOVE_LEFT_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginLeft: "1px", marginRight: "7px", marginTop: "3.5px" } }
      }
    },
    {
      text: "Move Right",
      iconSettings: {
        svgString: MOVE_RIGHT_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginLeft: "1px", marginRight: "7px", marginTop: "1.5px" } }
      }
    },
    {
      text: "Delete",
      iconSettings: {
        svgString: TRASH_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginLeft: "-4px", marginRight: "5px", marginTop: "-1px" } }
      }
    }
  ];
  var UpdateCellsForColumns = class _UpdateCellsForColumns {
    // prettier-ignore
    static updateColumn(D, w2, O, x2, U) {
      U !== CELL_UPDATE_TYPE.REMOVED && CellEventsReset.reset(D, O, w2, x2), FireEvents.onCellUpdate(D, CellElement.getText(O), w2, x2, U);
    }
    // prettier-ignore
    static updateNextBeforeLastColumns(D, w2, O, x2) {
      ExtractElements.textCellsArrFromRow(w2.element).slice(O, x2).forEach((F, W) => {
        const G = W + O;
        _UpdateCellsForColumns.updateColumn(D, w2.index, F, G, CELL_UPDATE_TYPE.UPDATE);
      });
    }
    // the reason why last column details need to be passed here is because after removal of last element, its details are
    // no longer present here as this class's methods are run in setTimeouts, hence those details need to be captured
    // before these methods are executed
    // prettier-ignore
    static rebindAndFireUpdates(D, w2, O, x2, U) {
      _UpdateCellsForColumns.updateNextBeforeLastColumns(D, w2, O, U.index), _UpdateCellsForColumns.updateColumn(D, w2.index, U.element, U.index, x2);
    }
  };
  var LastColumn = class {
    // the reason why last column details are used is because after removal of the last column element, its details are
    // no longer present and update methods are run in setTimeouts, hence those details need to be captured before
    // their methods are executed
    static getDetails(D, w2) {
      const O = D.length - 1;
      return { element: D[O].elements[w2], index: O };
    }
  };
  var RemoveColumn = class _RemoveColumn {
    static reduceStaticWidthTotal(D, w2) {
      var O;
      if ((O = w2.widths) != null && O.staticWidth) {
        const { number: x2 } = ColumnSettingsWidthUtils.getSettingsWidthNumber(
          D._tableElementRef,
          w2.widths
        );
        TableElement.changeStaticWidthTotal(D._tableDimensions, -x2);
      }
    }
    static updateTableDimensions(D, w2) {
      _RemoveColumn.reduceStaticWidthTotal(D, w2), StaticTableWidthUtils.changeWidthsBasedOnColumnInsertRemove(D, false);
    }
    static cleanUpData(D) {
      D.length > 0 && D[0].length === 0 && D.splice(0);
    }
    static removeElements(D, w2, O) {
      const x2 = CellElementIndex.getViaColumnIndex(w2, O);
      D.children[x2].remove(), D.children[x2].remove();
    }
    static removeCell(D, w2, O, x2) {
      const U = LastColumn.getDetails(D._columnsDetails, O);
      _RemoveColumn.removeElements(w2, x2, !!D._frameComponents.displayIndexColumn), D.data[O].splice(x2, 1), setTimeout(() => {
        const F = { element: w2, index: O };
        UpdateCellsForColumns.rebindAndFireUpdates(D, F, x2, CELL_UPDATE_TYPE.REMOVED, U);
      });
    }
    static removeCellFromAllRows(D, w2) {
      ExtractElements.textRowsArrFromTBody(D._tableBodyElementRef, D.data).forEach((U, F) => {
        _RemoveColumn.removeCell(D, U, F, w2);
      }), _RemoveColumn.cleanUpData(D.data), HeaderText.onAttemptChange(D, D._columnsDetails[w2].elements[0], w2, { colRemove: true });
      const x2 = D._columnsDetails.splice(w2, 1)[0];
      return _RemoveColumn.updateTableDimensions(D, x2.settings), x2;
    }
    static remove(D, w2) {
      const O = _RemoveColumn.removeCellFromAllRows(D, w2);
      ToggleAdditionElements.update(D, false, AddNewColumnElement.toggle), ColumnSettingsBorderUtils.updateSiblingColumns(D, w2), setTimeout(() => {
        O.cellDropdown.element.remove(), InsertRemoveColumnSizer.remove(D, w2), InsertRemoveColumnSizer.cleanUpCustomColumnSizers(D, w2), w2 === 0 && D._columnsDetails.length > 0 && RowDropdownCellOverlay.resetOverlays(D), setTimeout(() => {
          FireEvents.onDataUpdate(D), FireEvents.onColumnsUpdate(D);
        });
      });
    }
    static removeEvent(D) {
      _RemoveColumn.remove(this, D);
    }
  };
  var ElementSiblingIterator = class {
    static create(D) {
      let w2 = D;
      return {
        next: () => {
          const O = w2.nextSibling;
          return O && (w2 = O), O;
        },
        currentElement: () => w2
      };
    }
  };
  var ColumnDropdownItemEvents = class _ColumnDropdownItemEvents {
    static onClickMiddleware(D) {
      D(), ColumnDropdown.processTextAndHide(this);
    }
    // prettier-ignore
    static setItemEvents(D, w2, O) {
      const x2 = O.getElementsByClassName(ColumnDropdownItem.SORT_ITEM_CLASS)[0], U = ElementSiblingIterator.create(x2);
      U.currentElement().onclick = _ColumnDropdownItemEvents.onClickMiddleware.bind(
        D,
        Sort.sortColumn.bind(this, D, w2, true)
      ), U.next().onclick = _ColumnDropdownItemEvents.onClickMiddleware.bind(
        D,
        Sort.sortColumn.bind(this, D, w2, false)
      ), U.next().onclick = _ColumnDropdownItemEvents.onClickMiddleware.bind(
        D,
        InsertNewColumn.insert.bind(this, D, w2)
      ), U.next().onclick = _ColumnDropdownItemEvents.onClickMiddleware.bind(
        D,
        InsertNewColumn.insert.bind(this, D, w2 + 1)
      ), U.next().onclick = _ColumnDropdownItemEvents.onClickMiddleware.bind(
        D,
        MoveColumn.move.bind(this, D, w2, false)
      ), U.next().onclick = _ColumnDropdownItemEvents.onClickMiddleware.bind(
        D,
        MoveColumn.move.bind(this, D, w2, true)
      ), U.next().onclick = _ColumnDropdownItemEvents.onClickMiddleware.bind(
        D,
        RemoveColumn.remove.bind(this, D, w2)
      );
    }
    // reason why using onInput for updating cells is because it works for paste
    // prettier-ignore
    static onInput(D, w2, O, x2) {
      setTimeout(() => {
        CellEvents.updateCell(this, x2.value, 0, D, { element: w2, processText: false }), O.style.top = ColumnDropdown.getTopPosition(this, w2);
      });
    }
    // prettier-ignore
    static setInputItemEvent(D, w2, O, x2, U) {
      x2.oninput = _ColumnDropdownItemEvents.onInput.bind(
        D,
        w2,
        O,
        U,
        x2
      );
    }
  };
  var SIDE = /* @__PURE__ */ ((Y) => (Y[Y.LEFT = 0] = "LEFT", Y[Y.RIGHT = 1] = "RIGHT", Y[Y.TOP = 2] = "TOP", Y[Y.BOTTOM = 3] = "BOTTOM", Y))(SIDE || {});
  var NestedDropdown = class _NestedDropdown {
    static create(D, w2) {
      const O = Dropdown.createBase();
      return O.style.top = `-${Number.parseInt(O.style.paddingTop) + 22}px`, D && w2 && DropdownItem.addNewButtonItems(D, O, w2), O;
    }
    static resetPosition(D) {
      D.style.left = "";
    }
    static hideDropdown(D) {
      const w2 = D.target.children[2];
      w2.style.display = "none", _NestedDropdown.resetPosition(w2);
    }
    // prettier-ignore
    static correctPosition(D, w2, O) {
      const x2 = ElementVisibility.getDetailsInWindow(D, O);
      if (!x2.isFullyVisible && x2.blockingSides.has(SIDE.RIGHT)) {
        D.style.left = `-${w2.style.width}`;
        const U = ElementVisibility.getDetailsInWindow(D, O);
        !U.isFullyVisible && U.blockingSides.has(SIDE.LEFT) && (D.style.left = "");
      }
    }
    // prettier-ignore
    static correctPositionForOverflow(D, w2, O) {
      const { _tableElementRef: x2, _overflow: U } = D;
      !x2 || !U || x2.offsetWidth !== U.overflowContainer.scrollWidth && (w2.style.left = `-${O.style.width}`, w2.getBoundingClientRect().x < 0 && (w2.style.left = ""));
    }
    static displayAndSetDropdownPosition(D) {
      const w2 = D.target.children[2], O = D.target.parentElement;
      w2.style.left = O.style.width, w2.style.display = O.style.display, this._overflow && OverflowUtils.isOverflowElement(this._overflow.overflowContainer) ? _NestedDropdown.correctPositionForOverflow(this, w2, O) : _NestedDropdown.correctPosition(w2, O, this._tableDimensions.border);
    }
  };
  var NestedDropdownItemEvents = class {
    // prettier-ignore
    static addEvents(D, w2) {
      w2.addEventListener("mouseenter", NestedDropdown.displayAndSetDropdownPosition.bind(D)), w2.addEventListener("mouseleave", NestedDropdown.hideDropdown), w2.children[1].addEventListener(
        "mouseenter",
        DropdownItemHighlightUtils.highlightNew.bind(this, D._activeOverlayElements, w2)
      );
    }
  };
  var _ColumnTypeDropdown = class nt {
    static setupParentItemData(D, w2) {
      var W;
      const { name: O, dropdownItem: x2 } = w2, U = ((W = x2.element) == null ? void 0 : W.children[0]).cloneNode(true);
      D.replaceChild(U, D.children[0]);
      const F = D.children[1];
      F.innerText = O;
    }
    static setUp(D, w2, O) {
      const { activeType: x2, settings: U } = D._columnsDetails[O], F = w2.getElementsByClassName(nt.COLUMN_TYPE_ITEM_CLASS)[0];
      if (nt.setupParentItemData(F, x2), U.types.length < 2)
        return F.style.pointerEvents = "none";
      F.style.pointerEvents = "", setTimeout(() => ColumnTypeDropdownItem.setUp(D, O));
    }
    // prettier-ignore
    static create(D, w2) {
      const O = DropdownItem.addButtonItem(
        D,
        w2,
        DropdownButtonItemConf.DEFAULT_ITEM,
        NestedDropdownItem.NESTED_DROPDOWN_ITEM,
        nt.COLUMN_TYPE_ITEM_CLASS
      );
      NestedDropdownItemEvents.addEvents(D, O);
      const x2 = NestedDropdown.create();
      O.appendChild(x2), D._activeOverlayElements.columnTypeDropdown = x2;
    }
  };
  _ColumnTypeDropdown.COLUMN_TYPE_ITEM_CLASS = "dropdown-column-type-item";
  var ColumnTypeDropdown = _ColumnTypeDropdown;
  var _ColumnDropdownItem = class Oe {
    static resetItems(D) {
      Array.from(D.children).forEach((O) => DropdownItem.toggleItem(O, true));
    }
    static addItems(D, w2) {
      setTimeout(() => {
        DropdownItem.addTitle(w2, "Property type"), ColumnTypeDropdown.create(D, w2), DropdownItem.addDivider(w2), ColumnDropdownButtonItemConf.ITEMS.slice(0, 2).forEach((O) => {
          DropdownItem.addButtonItem(D, w2, O, Oe.SORT_ITEM_CLASS);
        }), ColumnDropdownButtonItemConf.ITEMS.slice(2).forEach((O) => {
          DropdownItem.addButtonItem(D, w2, O);
        });
      });
    }
    // hide divider when there are no items below
    static hideDivider(D) {
      D.slice(4).find((O) => O.style.display !== "none") || DropdownItem.toggleItem(D[3], false);
    }
    static toggleItems(D, w2) {
      const { isSortAvailable: O, isDeleteAvailable: x2, isInsertLeftAvailable: U, isInsertRightAvailable: F, isMoveAvailable: W } = D;
      O || (DropdownItem.toggleItem(w2[4], false), DropdownItem.toggleItem(w2[5], false)), U || DropdownItem.toggleItem(w2[6], false), F || DropdownItem.toggleItem(w2[7], false), W || (DropdownItem.toggleItem(w2[8], false), DropdownItem.toggleItem(w2[9], false)), x2 || DropdownItem.toggleItem(w2[10], false), Oe.hideDivider(w2);
    }
    // prettier-ignore
    static setUpInputElement(D, w2, O, x2, U) {
      var G, X, K;
      const { isCellTextEditable: F, isHeaderTextEditable: W } = D._columnsDetails[w2].settings;
      if ((K = (X = (G = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : G.displaySettings) == null ? void 0 : X.openMethod) != null && K.overlayClick || (ObjectUtils.areValuesFullyDefined(W) ? !W : !F))
        DropdownItem.toggleItem(x2, false);
      else {
        const q = x2.children[0];
        q.value = D.data[0][w2], ColumnDropdownItemEvents.setInputItemEvent(D, w2, O, q, U);
      }
    }
    static setUp(D, w2, O, x2) {
      ColumnTypeDropdown.setUp(D, w2, O);
      const U = Array.from(w2.children);
      Oe.setUpInputElement(D, O, x2, U[0], w2), Oe.toggleItems(D._columnsDetails[O].settings.columnDropdown, U), Oe.updateItemsStyle(D, O, w2), ColumnDropdownItemEvents.setItemEvents(D, O, w2);
    }
    static updateMoveColumnItemsStyle(D, w2, O) {
      const { isMoveAvailable: x2 } = D._columnsDetails[w2].settings.columnDropdown;
      x2 && (DropdownItem.toggleUsability(O[8], true), DropdownItem.toggleUsability(O[9], true), w2 === 0 && DropdownItem.toggleUsability(O[8], false), w2 === D._columnsDetails.length - 1 && DropdownItem.toggleUsability(O[9], false));
    }
    static updateInsertColumnItemsStyle(D, w2) {
      MaximumColumns.canAddMore(D) ? (DropdownItem.toggleUsability(w2[6], true), DropdownItem.toggleUsability(w2[7], true)) : (DropdownItem.toggleUsability(w2[6], false), DropdownItem.toggleUsability(w2[7], false));
    }
    static updateItemsStyle(D, w2, O) {
      const x2 = Array.from(O.children);
      Oe.updateInsertColumnItemsStyle(D, x2), Oe.updateMoveColumnItemsStyle(D, w2, x2);
    }
  };
  _ColumnDropdownItem.SORT_ITEM_CLASS = "dropdown-sort-item";
  var ColumnDropdownItem = _ColumnDropdownItem;
  var ColumnDropdown = class _ColumnDropdown {
    static resetDropdownPosition(D) {
      D.style.left = "";
    }
    // prettier-ignore
    static processTextAndHide(D) {
      var X;
      const { _activeOverlayElements: w2, _columnsDetails: O, _focusedElements: { cell: { element: x2, columnIndex: U } } } = D, { columnDropdown: F, columnTypeDropdown: W, fullTableOverlay: G } = w2;
      !F || !G || !W || !x2 || (GenericElementUtils.doesElementExistInDom(x2) && (CellEvents.setCellToDefaultIfNeeded(D, 0, U, x2), HeaderText.onAttemptChange(D, x2, U)), CellHighlightUtils.fade(x2, (X = O[U]) == null ? void 0 : X.headerStateColors.default), Dropdown.hide(F, G, W), ColumnTypeDropdownItem.reset(W), _ColumnDropdown.resetDropdownPosition(F), ColumnDropdownItem.resetItems(F), DropdownItemHighlightUtils.fadeCurrentlyHighlighted(w2));
    }
    static create(D) {
      const w2 = Dropdown.createBase();
      return ColumnDropdownEvents.set(D, w2), DropdownItem.addInputItem(D, w2), ColumnDropdownItem.addItems(D, w2), w2;
    }
    // prettier-ignore
    static getDefaultDropdownTopPosition(D, w2, O) {
      return O ? `${Browser.IS_FIREFOX ? 1 + w2.topWidth : 1}px` : `${ElementOffset.processTop(D.offsetTop + D.offsetHeight, w2)}px`;
    }
    static getTopPosition(D, w2) {
      var x2, U, F;
      const O = (F = (U = (x2 = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : x2.displaySettings) == null ? void 0 : U.openMethod) == null ? void 0 : F.overlayClick;
      if (D._overflow) {
        const W = D._overflow.overflowContainer;
        return `${O ? W.scrollTop + 1 : W.scrollTop + w2.offsetHeight}px`;
      } else if (D._stickyProps.header) {
        const W = w2.parentElement.offsetTop;
        return `${(O ? 1 : w2.offsetHeight) + W}px`;
      }
      return _ColumnDropdown.getDefaultDropdownTopPosition(w2, D._tableDimensions.border, O);
    }
    static getLeftPropertyToCenterDropdown(D, w2) {
      return `${ElementOffset.processLeft(D.offsetLeft + D.offsetWidth / 2, w2) - Dropdown.DROPDOWN_WIDTH / 2}px`;
    }
    static displayAndSetDropdownPosition(D, w2, O) {
      O.style.left = _ColumnDropdown.getLeftPropertyToCenterDropdown(w2, D._tableDimensions.border), O.style.top = _ColumnDropdown.getTopPosition(D, w2), Dropdown.display(O);
      const x2 = ElementVisibility.getDetailsInWindow(O, D._tableDimensions.border);
      x2.isFullyVisible || (x2.blockingSides.has(SIDE.LEFT) ? O.style.left = "0px" : x2.blockingSides.has(SIDE.RIGHT) && (O.style.left = `${w2.offsetLeft + w2.offsetWidth - Dropdown.DROPDOWN_WIDTH}px`));
    }
    // no active table based overflow - REF-37
    static displayAndSetPositionForSticky(D, w2, O) {
      O.style.left = _ColumnDropdown.getLeftPropertyToCenterDropdown(w2, D._tableDimensions.border), O.style.top = _ColumnDropdown.getTopPosition(D, w2), Dropdown.display(O);
    }
    // prettier-ignore
    static displayAndSetPositionForOverflow(D, w2, O) {
      const { _tableElementRef: x2, _overflow: U, _tableDimensions: F } = D;
      if (!x2 || !(U != null && U.overflowContainer))
        return;
      const W = U.overflowContainer;
      O.style.left = _ColumnDropdown.getLeftPropertyToCenterDropdown(w2, F.border), O.style.top = _ColumnDropdown.getTopPosition(D, w2), Dropdown.display(O), x2.offsetWidth !== W.scrollWidth ? O.style.left = `${x2.offsetWidth - O.offsetWidth}px` : O.offsetLeft < 0 && (O.style.left = "0px");
    }
    static display(D, w2) {
      const O = D._activeOverlayElements.columnDropdown, x2 = D._columnsDetails[w2].elements[0];
      ColumnDropdownItem.setUp(D, O, w2, x2), D._overflow ? _ColumnDropdown.displayAndSetPositionForOverflow(D, x2, O) : D._stickyProps.header ? _ColumnDropdown.displayAndSetPositionForSticky(D, x2, O) : _ColumnDropdown.displayAndSetDropdownPosition(D, x2, O);
      const U = DropdownItem.getInputElement(O);
      U && DropdownItemNavigation.focusInputElement(U), FullTableOverlayElement.display(D);
    }
  };
  var FullTableOverlayEvents = class {
    // prettier-ignore
    static onMouseDown(D) {
      const { _activeOverlayElements: { columnDropdown: w2, rowDropdown: O } } = this;
      Dropdown.isDisplayed(w2) && !Dropdown.isPartOfDropdownElement(D.target) && ColumnDropdown.processTextAndHide(this), Dropdown.isDisplayed(O) && RowDropdown.hide(this);
    }
  };
  var FullTableOverlayElement = class {
    // at offsets is a bug fix for a situation where the user was able to click the table border, focus and unfocus a cell
    // and therefore not allow the column dropdown to close because there is nothing focused
    static display(D) {
      var O;
      const w2 = D._activeOverlayElements.fullTableOverlay;
      if (w2.style.width = `${D.offsetWidth}px`, w2.style.height = `${D.offsetHeight}px`, (O = D._overflow) != null && O.overflowContainer)
        w2.style.top = `${D.offsetTop}px`, w2.style.left = `${D.offsetLeft}px`;
      else {
        const x2 = D._tableElementRef.offsetTop - D.offsetTop;
        w2.style.top = `-${Browser.IS_FIREFOX ? x2 : x2 + D._tableDimensions.border.topWidth}px`, w2.style.left = `-${Browser.IS_FIREFOX ? 0 : D._tableDimensions.border.leftWidth}px`;
      }
      Dropdown.display(w2);
    }
    static create(D) {
      const w2 = document.createElement("div");
      return w2.id = "full-table-overlay", w2.style.backgroundColor = SEMI_TRANSPARENT_COLOR, w2.style.display = "none", w2.onmousedown = FullTableOverlayEvents.onMouseDown.bind(D), w2;
    }
  };
  var RowDropdownEvents = class _RowDropdownEvents {
    // the reason why we track window key events is because the table is not actually focused when it is displayed,
    // (unlike column dropdown which has an input), hence initially clicking tab does not focus the dropdown and
    // instead we need to focus it programmatically here. Once focused, the actual dropdown events can take over.
    // prettier-ignore
    static windowOnKeyDown(D, w2) {
      const { _activeOverlayElements: { rowDropdown: O, fullTableOverlay: x2 }, shadowRoot: U } = D;
      D._focusedElements.rowDropdown || !O || !x2 || (w2.key === KEYBOARD_KEY.ENTER || w2.key === KEYBOARD_KEY.ESCAPE ? RowDropdown.hide(D) : U != null && U.activeElement || (w2.key === KEYBOARD_KEY.TAB || w2.key === KEYBOARD_KEY.ARROW_DOWN ? (w2.preventDefault(), D._focusedElements.rowDropdown = O, DropdownItemNavigation.focusSiblingItem(O.children[0], O, true, true)) : w2.key === KEYBOARD_KEY.ARROW_UP && (D._focusedElements.rowDropdown = O, DropdownItemNavigation.focusSiblingItem(
        O.children[O.children.length - 1],
        O,
        false,
        true
      ))));
    }
    static dropdownOnKeyDown(D, w2) {
      if (w2.key === KEYBOARD_KEY.ENTER) {
        const O = w2.target;
        O.dispatchEvent(new Event("mouseenter")), O.dispatchEvent(new Event("click"));
      } else
        w2.key === KEYBOARD_KEY.ESCAPE && RowDropdown.hide(this);
      DropdownEvents.itemKeyNavigation(this.shadowRoot, D, w2);
    }
    static set(D, w2) {
      w2.onkeydown = _RowDropdownEvents.dropdownOnKeyDown.bind(D, w2);
    }
  };
  var RowDropdownButtonItemConf = class {
  };
  RowDropdownButtonItemConf.ITEMS = [
    {
      text: "Insert Up",
      iconSettings: {
        svgString: INSERT_UP_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginRight: "1px" } }
      }
    },
    {
      text: "Insert Down",
      iconSettings: {
        svgString: INSERT_DOWN_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginRight: "1px" } }
      }
    },
    {
      text: "Move Up",
      iconSettings: {
        svgString: MOVE_UP_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginRight: "8px", marginTop: "3.5px" } }
      }
    },
    {
      text: "Move Down",
      iconSettings: {
        svgString: MOVE_DOWN_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginLeft: "2px", marginRight: "6px", marginTop: "3.5px" } }
      }
    },
    {
      text: "Delete",
      iconSettings: {
        svgString: TRASH_ICON_SVG_STRING,
        containerStyles: { dropdown: { marginLeft: "-4px", marginRight: "5px", marginTop: "-1px" } }
      }
    }
  ];
  var IndexColumnEvents = class _IndexColumnEvents {
    static mouseEnterCell(D, w2) {
      const O = w2.target, { cellColors: x2 } = this._frameComponents, U = FrameComponentsColors.getColorsBasedOnParam(x2, D);
      CellHighlightUtils.highlight(O, U.hover);
    }
    static mouseLeaveCell(D, w2) {
      if (!Dropdown.isDisplayed(this._activeOverlayElements.rowDropdown)) {
        const { cellColors: O } = this._frameComponents, x2 = FrameComponentsColors.getColorsBasedOnParam(O, D);
        CellHighlightUtils.fade(w2.target, x2.default);
      }
    }
    static setEvents(D, w2, O) {
      var F;
      w2.onmouseenter = _IndexColumnEvents.mouseEnterCell.bind(D, O), w2.onmouseleave = _IndexColumnEvents.mouseLeaveCell.bind(D, O);
      const { displaySettings: x2, canEditHeaderRow: U } = D.rowDropdown;
      !U && O === 0 || (x2.isAvailable && ((F = x2.openMethod) != null && F.cellClick) ? w2.onclick = RowDropdown.display.bind(D, O, w2) : RowDropdownCellOverlayEvents.addCellEvents(D, O, w2));
    }
  };
  var UpdateCellsForRows = class _UpdateCellsForRows {
    // prettier-ignore
    static updateRowCells(D, w2, O, x2, U = true) {
      var W;
      if (ExtractElements.textCellsArrFromRow(w2).forEach((G, X) => {
        x2 !== CELL_UPDATE_TYPE.REMOVED && CellEventsReset.reset(D, G, O, X), U && FireEvents.onCellUpdate(D, CellElement.getText(G), O, X, x2);
      }), x2 !== CELL_UPDATE_TYPE.REMOVED) {
        const G = w2.children[0];
        if (D._frameComponents.displayIndexColumn && (IndexColumnEvents.setEvents(D, G, O), DragRow.applyEventsToElement(D, G, G)), (W = D.rowDropdown.displaySettings.openMethod) != null && W.overlayClick) {
          const X = RowDropdownCellOverlayEvents.setOverlayEvents(D, O, G);
          DragRow.applyEventsToElement(D, X, G);
        }
      }
    }
    static updateLastRow(D, w2, O) {
      var x2;
      (x2 = D._tableBodyElementRef) != null && x2.children && _UpdateCellsForRows.updateRowCells(D, O.element, O.index, w2);
    }
    static updateLowerBeforeLastRows(D, w2, O) {
      var U;
      const x2 = (U = D._tableBodyElementRef) == null ? void 0 : U.children;
      x2 && Array.from(x2).slice(w2, O).forEach((W, G) => {
        const X = G + w2, K = W;
        _UpdateCellsForRows.updateRowCells(D, K, X, CELL_UPDATE_TYPE.UPDATE);
      });
    }
    // REF-20
    // the reason why last row details need to be passed here is because after removal of last row, the last element details
    // are no longer available as this class's methods are run in setTimeouts, hence those details need to be captured
    // before these methods are executed
    // CAUTION-2 if the addition or removal of row causes the parent div to change width, this is indeed run after rerender,
    // however the onCellUpdate messages are required and event rebinding here still appears to be valid
    // prettier-ignore
    static rebindAndFireUpdates(D, w2, O, x2) {
      _UpdateCellsForRows.updateLowerBeforeLastRows(D, w2, x2.index), _UpdateCellsForRows.updateLastRow(D, O, x2);
    }
  };
  var RemoveRow = class _RemoveRow {
    // when the last row has been removed, there are no more columns
    static removeAllColumnsDetails(D) {
      const { _columnsDetails: w2 } = D;
      w2.forEach((O) => RemoveColumn.reduceStaticWidthTotal(D, O.settings)), w2.splice(0, w2.length);
    }
    static update(D, w2, O, x2) {
      const U = { element: O, index: x2 };
      UpdateCellsForRows.rebindAndFireUpdates(D, w2, CELL_UPDATE_TYPE.REMOVED, U), setTimeout(() => FireEvents.onDataUpdate(D)), !D._isRendering && (D.data.length === 0 && _RemoveRow.removeAllColumnsDetails(D), D._addColumnCellsElementsRef.splice(w2, 1));
    }
    static rowToBeRemovedIndexWhenPagination(D, w2) {
      var x2;
      const O = (x2 = D._tableBodyElementRef) == null ? void 0 : x2.children[w2];
      return D._pagination.visibleRows.findIndex((U) => U === O);
    }
    static removeRow(D, w2) {
      var U;
      const O = D.pagination ? _RemoveRow.rowToBeRemovedIndexWhenPagination(D, w2) : 0;
      (U = D._tableBodyElementRef) == null || U.children[w2].remove(), D._rowDropdownCellOverlays.splice(w2, 1);
      const x2 = D.data.splice(w2, 1);
      return x2[0].forEach((F, W) => {
        D._columnsDetails[W].elements.splice(w2, 1), D._columnsDetails[W].processedStyle.splice(w2, 1);
      }), D.pagination && PaginationUtils.updateOnRowChange(D, O), x2[0];
    }
    // REF-27
    static changeRowIndexIfRemoveHeaderWithDataBelow(D, w2) {
      return w2 === 0 && D._columnsDetails[0].elements.length > 1 ? (MoveRow.move(D, 0, true), 1) : w2;
    }
    static remove(D, w2) {
      var U;
      w2 = _RemoveRow.changeRowIndexIfRemoveHeaderWithDataBelow(D, w2);
      const O = D.data.length - 1, x2 = (U = D._tableBodyElementRef) == null ? void 0 : U.children[O];
      _RemoveRow.removeRow(D, w2), ToggleAdditionElements.update(D, false, AddNewRowElement.toggle), D._frameComponents.displayIndexColumn && IndexColumn.updateIndexes(D, w2), CustomRowProperties.update(D, w2), setTimeout(() => _RemoveRow.update(D, w2, x2, O));
    }
  };
  var RowDropdownItemEvents = class _RowDropdownItemEvents {
    static onClickMiddleware(D) {
      D(), RowDropdown.hide(this);
    }
    // prettier-ignore
    static set(D, w2, O) {
      const x2 = w2.getElementsByClassName(DropdownItem.DROPDOWN_ITEM_CLASS)[0], U = ElementSiblingIterator.create(x2);
      U.currentElement().onclick = _RowDropdownItemEvents.onClickMiddleware.bind(
        D,
        InsertNewRow.insert.bind(this, D, O, true)
      ), U.next().onclick = _RowDropdownItemEvents.onClickMiddleware.bind(
        D,
        InsertNewRow.insert.bind(this, D, O + 1, true)
      ), U.next().onclick = _RowDropdownItemEvents.onClickMiddleware.bind(
        D,
        MoveRow.move.bind(this, D, O, false)
      ), U.next().onclick = _RowDropdownItemEvents.onClickMiddleware.bind(
        D,
        MoveRow.move.bind(this, D, O, true)
      ), U.next().onclick = _RowDropdownItemEvents.onClickMiddleware.bind(
        D,
        RemoveRow.remove.bind(this, D, O)
      );
    }
  };
  var RowDropdownItem = class _RowDropdownItem {
    static updateDeleteRowItemStyle(D, w2, O) {
      DropdownItem.toggleUsability(O[4], !!(w2 > 0 || D.rowDropdown.canEditHeaderRow));
    }
    static updateMoveRowsItemsStyle(D, w2, O) {
      const { isMoveAvailable: x2, canEditHeaderRow: U } = D.rowDropdown;
      x2 && (DropdownItem.toggleUsability(O[2], true), DropdownItem.toggleUsability(O[3], true), (w2 === 0 || w2 === 1 && !U) && DropdownItem.toggleUsability(O[2], false), (w2 === D._columnsDetails[0].elements.length - 1 || w2 === 0 && !U) && DropdownItem.toggleUsability(O[3], false));
    }
    static updateInsertRowsItemsStyle(D, w2, O) {
      MaximumRows.canAddMore(D) ? (w2 === 0 && !D.rowDropdown.canEditHeaderRow ? DropdownItem.toggleUsability(O[0], false) : DropdownItem.toggleUsability(O[0], true), DropdownItem.toggleUsability(O[1], true)) : (DropdownItem.toggleUsability(O[0], false), DropdownItem.toggleUsability(O[1], false));
    }
    static updateItemStyle(D, w2, O) {
      const x2 = Array.from(w2.children);
      _RowDropdownItem.updateInsertRowsItemsStyle(D, O, x2), _RowDropdownItem.updateMoveRowsItemsStyle(D, O, x2), _RowDropdownItem.updateDeleteRowItemStyle(D, O, x2);
    }
    static update(D, w2, O) {
      _RowDropdownItem.updateItemStyle(D, w2, O), RowDropdownItemEvents.set(D, w2, O);
    }
    static setUpItems(D, w2) {
      setTimeout(() => {
        const { rowDropdown: O } = D, { isInsertUpAvailable: x2, isInsertDownAvailable: U, isMoveAvailable: F, isDeleteAvailable: W } = O, G = RowDropdownButtonItemConf.ITEMS.map((X) => DropdownItem.addButtonItem(D, w2, X));
        x2 || DropdownItem.toggleItem(G[0], false), U || DropdownItem.toggleItem(G[1], false), F || (DropdownItem.toggleItem(G[2], false), DropdownItem.toggleItem(G[3], false)), W || DropdownItem.toggleItem(G[4], false);
      });
    }
  };
  var RowDropdown = class _RowDropdown {
    // prettier-ignore
    static hide(D) {
      const {
        _activeOverlayElements: { rowDropdown: w2, fullTableOverlay: O },
        _focusedElements: { cell: { element: x2, rowIndex: U } },
        _frameComponents: { cellColors: F, displayIndexColumn: W }
      } = D;
      if (!w2 || !O || !x2)
        return;
      Dropdown.hide(w2, O);
      const G = FrameComponentsColors.getColorsBasedOnParam(F, U);
      W && CellHighlightUtils.fade(x2, G.default), DropdownItemHighlightUtils.fadeCurrentlyHighlighted(D._activeOverlayElements), setTimeout(() => {
        delete D._focusedElements.rowDropdown, FocusedCellUtils.purge(D._focusedElements.cell);
      });
    }
    static focusCell(D, w2, O) {
      const { _frameComponents: x2, _focusedElements: U } = D;
      x2.displayIndexColumn ? FocusedCellUtils.setIndexCell(U.cell, O, w2) : FocusedCellUtils.set(U.cell, O, w2, 0);
    }
    // prettier-ignore
    static correctPositionWhenBottomOverflow(D, w2, O) {
      const { top: x2 } = w2.parentElement.getBoundingClientRect(), U = x2 + D.border.topWidth;
      let F = window.innerHeight - U - w2.offsetHeight;
      Browser.IS_FIREFOX && (F += D.border.topWidth), w2.style.top = `${F}px`;
      const W = ElementVisibility.getDetailsInWindow(w2, D.border);
      !W.isFullyVisible && W.blockingSides.has(SIDE.TOP) && (w2.style.top = O);
    }
    static getLeft(D, w2) {
      var x2;
      const O = (x2 = D.rowDropdown.displaySettings.openMethod) == null ? void 0 : x2.cellClick;
      return `${ElementOffset.processWidth(O ? w2.offsetWidth : 5, D._tableDimensions.border)}px`;
    }
    static displayAndSetPosition(D, w2, O) {
      const x2 = `${ElementOffset.processTop(w2.offsetTop, D._tableDimensions.border)}px`;
      O.style.top = x2, O.style.left = _RowDropdown.getLeft(D, w2), Dropdown.display(O);
      const U = ElementVisibility.getDetailsInWindow(O, D._tableDimensions.border);
      U.isFullyVisible || U.blockingSides.has(SIDE.BOTTOM) && _RowDropdown.correctPositionWhenBottomOverflow(D._tableDimensions, O, x2);
    }
    // prettier-ignore
    static setOverflowPosition(D, w2, O, x2) {
      if (D._stickyProps.header && w2.tagName === CellElement.HEADER_TAG)
        if (D._overflow)
          O.style.top = `${x2.scrollTop}px`;
        else {
          const U = w2.parentElement.offsetTop, F = Number.parseInt(getComputedStyle(w2).borderTopWidth);
          O.style.top = `${U + F}px`;
        }
      else
        O.style.top = `${ElementOffset.processTop(w2.offsetTop, D._tableDimensions.border)}px`;
      O.style.left = _RowDropdown.getLeft(D, w2);
    }
    // no active table based overflow
    static displayAndSetPositionForSticky(D, w2, O) {
      const x2 = D.parentElement;
      _RowDropdown.setOverflowPosition(D, w2, O, x2), Dropdown.display(O);
    }
    static displayAndSetPositionOverflow(D, w2, O) {
      const { _tableElementRef: x2, _overflow: U, _stickyProps: F } = D;
      if (!x2 || !(U != null && U.overflowContainer))
        return;
      _RowDropdown.setOverflowPosition(D, w2, O, U.overflowContainer), Dropdown.display(O);
      const W = F.header && w2.tagName === CellElement.HEADER_TAG;
      x2.offsetHeight !== U.overflowContainer.scrollHeight && !W && (O.style.top = `${x2.offsetHeight - O.offsetHeight}px`);
    }
    static display(D, w2) {
      var x2;
      const O = this._activeOverlayElements.rowDropdown;
      RowDropdownItem.update(this, O, D), (x2 = this._overflow) != null && x2.overflowContainer ? _RowDropdown.displayAndSetPositionOverflow(this, w2, O) : this._stickyProps.header ? _RowDropdown.displayAndSetPositionForSticky(this, w2, O) : _RowDropdown.displayAndSetPosition(this, w2, O), FullTableOverlayElement.display(this), setTimeout(() => _RowDropdown.focusCell(this, D, w2));
    }
    static create(D) {
      const w2 = Dropdown.createBase();
      return RowDropdownEvents.set(D, w2), RowDropdownItem.setUpItems(D, w2), w2;
    }
  };
  var RowDropdownCellOverlayEvents = class _RowDropdownCellOverlayEvents {
    static mouseLeave(D, w2) {
      RowDropdownCellOverlay.hide(this, D), delete this._hoveredElements.leftMostCell, RowDropdownCellOverlay.resetDefaultColor(this.rowDropdown.displaySettings, w2);
    }
    static mouseEnter(D, w2) {
      this._hoveredElements.leftMostCell = D, RowDropdownCellOverlay.setHoverColor(this.rowDropdown.displaySettings, w2);
    }
    // prettier-ignore
    static setOverlayEvents(D, w2, O) {
      const x2 = D._rowDropdownCellOverlays[w2].element;
      return x2.onmouseenter = _RowDropdownCellOverlayEvents.mouseEnter.bind(
        D,
        O,
        x2
      ), x2.onmouseleave = _RowDropdownCellOverlayEvents.mouseLeave.bind(
        D,
        w2,
        x2
      ), x2.onclick = RowDropdown.display.bind(D, w2, O), x2;
    }
    static cellMouseLeave(D) {
      RowDropdownCellOverlay.hide(this, D), delete this._hoveredElements.leftMostCell;
    }
    static cellMouseEnter(D, w2) {
      RowDropdownCellOverlay.display(this, D), this._hoveredElements.leftMostCell = w2;
    }
    // This method is adding more events to existing cells instead of overwriting them, the reason for using this approach is
    // because we would instead need to add logic inside data cell events, select/label events, header events and more as
    // row dropdown overlay can appear above them if index column is not displayed
    // Interestingly using setting events like .onmousenter does not overwrite the events that have been added via
    // addEventListener, hence they need to be removed here before adding again
    static addCellEvents(D, w2, O) {
      const { displaySettings: x2, canEditHeaderRow: U } = D.rowDropdown;
      if (!x2.isAvailable || !U && w2 === 0)
        return;
      const F = D._rowDropdownCellOverlays[w2];
      if (F != null && F.cellElement) {
        const { cellElement: W, enter: G, leave: X } = F;
        W.removeEventListener("mouseenter", G), W.removeEventListener("mouseleave", X);
      }
      F.cellElement = O, F.enter = _RowDropdownCellOverlayEvents.cellMouseEnter.bind(D, w2, O), F.leave = _RowDropdownCellOverlayEvents.cellMouseLeave.bind(D, w2), O.addEventListener("mouseenter", F.enter), O.addEventListener("mouseleave", F.leave);
    }
  };
  var _RowDropdownCellOverlay = class Ue {
    static setDefault(D, w2) {
      var O;
      D.style.backgroundColor = ((O = w2 == null ? void 0 : w2.default) == null ? void 0 : O.backgroundColor) || "";
    }
    static resetDefaultColor(D, w2) {
      var x2;
      const O = D.overlayStyles;
      (x2 = O == null ? void 0 : O.hover) != null && x2.backgroundColor && Ue.setDefault(w2, O);
    }
    static setHoverColor(D, w2) {
      var x2, U;
      const O = (U = (x2 = D.overlayStyles) == null ? void 0 : x2.hover) == null ? void 0 : U.backgroundColor;
      O && (w2.style.backgroundColor = O);
    }
    static hide(D, w2) {
      const O = D._hoveredElements.leftMostCell;
      setTimeout(() => {
        if (O !== D._hoveredElements.leftMostCell) {
          const x2 = D._rowDropdownCellOverlays[w2].element;
          x2.style.width = DropdownCellOverlay.HIDDEN_PX;
        }
      });
    }
    static display(D, w2) {
      const O = D._columnsDetails[0], x2 = D._rowDropdownCellOverlays[w2].element;
      x2.style.width = DropdownCellOverlay.VISIBLE_PX;
      const U = O.elements[w2], { displayIndexColumn: F } = D._frameComponents, W = F ? U.previousSibling : U, G = W.offsetHeight / 100;
      x2.style.height = `${G * 60}px`, x2.style.top = `${G * 20}px`;
      const X = F ? O.elements[0].offsetWidth : 0;
      x2.style.left = `-${W.offsetWidth + X}px`;
    }
    static create(D) {
      const w2 = document.createElement("div");
      return w2.classList.add(Ue.ROW_DROPDOWN_CELL_OVERLAY_CLASS), w2.classList.add(DropdownCellOverlay.DROPDOWN_CELL_OVERLAY_CLASS), w2.style.width = DropdownCellOverlay.HIDDEN_PX, Ue.setDefault(w2, D), w2;
    }
    static getCellDividerElement(D, w2) {
      let O = D.nextSibling;
      return w2 && (O = O.nextSibling), O;
    }
    static add(D, w2, O) {
      const x2 = Ue.create(D.rowDropdown.displaySettings.overlayStyles), { displayIndexColumn: U } = D._frameComponents;
      Ue.getCellDividerElement(O, !!U).appendChild(x2), D._rowDropdownCellOverlays.splice(w2, 0, {
        element: x2,
        // these events are stubs and will be replaced by real ones in RowDropdownCellOverlayEvents.addCellEvents
        enter: () => {
        },
        leave: () => {
        }
      });
    }
    static resetOverlays(D) {
      var O;
      if (!((O = D.rowDropdown.displaySettings.openMethod) != null && O.overlayClick))
        return;
      D._rowDropdownCellOverlays.splice(0, D._rowDropdownCellOverlays.length), ExtractElements.textRowsArrFromTBody(D._tableBodyElementRef, D.data).forEach((x2, U) => {
        const F = x2.children[0];
        Ue.add(D, U, F), RowDropdownCellOverlayEvents.setOverlayEvents(D, U, F);
      });
    }
  };
  _RowDropdownCellOverlay.ROW_DROPDOWN_CELL_OVERLAY_CLASS = "row-dropdown-cell-overlay";
  var RowDropdownCellOverlay = _RowDropdownCellOverlay;
  var PaginationRowIndexes = class _PaginationRowIndexes {
    static getVisibleRowRealIndex(D, w2, O) {
      const x2 = Array.from(D.children), U = O === void 0 ? w2.visibleRows.length - 1 : O, F = w2.visibleRows[U];
      return x2.findIndex((W) => W === F);
    }
    static getVisibleRowIndex(D, w2, O) {
      const x2 = D.children[O];
      return w2.visibleRows.findIndex((U) => U === x2);
    }
    static getFilteredMaxVisibleRowIndex(D, w2) {
      const { rowsPerPage: O, visibleRows: x2 } = w2, U = _PaginationRowIndexes.getVisibleRowRealIndex(D, w2);
      return x2.length === O ? U : U + (O - x2.length);
    }
    static getRawMaxVisibleRowIndex(D) {
      const { _pagination: w2, _tableBodyElementRef: O, data: x2, _visiblityInternal: U } = D, { activePageNumber: F, rowsPerPage: W, isAllRowsOptionSelected: G } = w2;
      return G ? x2.length + 1 : U.filters ? _PaginationRowIndexes.getFilteredMaxVisibleRowIndex(O, w2) : F * W;
    }
    static getMaxVisibleRowIndex(D) {
      const { dataStartsAtHeader: w2 } = D;
      let O = _PaginationRowIndexes.getRawMaxVisibleRowIndex(D);
      return w2 || (O += 1), O;
    }
  };
  var _RowElement = class Re {
    static create() {
      const D = document.createElement("tr");
      return D.classList.add("row"), D;
    }
    static moveClassToLastVisibleRow(D, w2) {
      w2 && (w2.id = ""), D.id = Re.LAST_VISIBLE_ROW_ID;
    }
    static toggleNonAddRow(D, w2, O) {
      if (D.pagination && D._pagination) {
        const U = D._pagination.visibleRows[D._pagination.visibleRows.length - 1];
        if (U)
          return Re.moveClassToLastVisibleRow(U, O);
      }
      const { previousElementSibling: x2 } = w2;
      x2 && Re.moveClassToLastVisibleRow(x2, O);
    }
    // REF-25
    // Add new row element is always appended to the table, but not always visible (e.g. if the user has
    // chosen not to display it or max rows has been reached), hence we must always monitor its current
    // visibility and given that it can be safely assumed that it is the last row element, we can use
    // its isDisplayed method to help assign the last-visible row id to the correct row
    static toggleLastRowClass(D) {
      const w2 = D.shadowRoot, O = D._addRowCellElementRef.parentElement, x2 = w2.getElementById(Re.LAST_VISIBLE_ROW_ID);
      AddNewRowElement.isDisplayed(O.children[0]) ? O.id !== Re.LAST_VISIBLE_ROW_ID && Re.moveClassToLastVisibleRow(O, x2) : Re.toggleNonAddRow(D, O, x2);
    }
  };
  _RowElement.LAST_VISIBLE_ROW_ID = "last-visible-row";
  var RowElement = _RowElement;
  var CellDividerElement = class {
    static create(D) {
      const w2 = document.createElement("div");
      return w2.classList.add("cell-divider"), D === 0 && (w2.style.height = ColumnSizerGenericUtils.canHeightBeInherited() ? "100%" : "inherit"), w2;
    }
  };
  var InsertNewCell = class _InsertNewCell {
    // prettier-ignore
    static insertElementsToRow(D, w2, O, x2, U) {
      const F = CellElementIndex.getViaColumnIndex(x2, U);
      D.insertBefore(w2, D.children[F]);
      const W = CellDividerElement.create(O);
      D.insertBefore(W, D.children[F + 1]);
    }
    static updateColumnDetailsAndSizers(D, w2, O, x2) {
      const U = D._columnsDetails[O];
      if (U && w2 === 0) {
        const F = ColumnDropdownCellOverlay.add(D, O);
        ColumnDetails.updateWithNoSizer(U, F), InsertRemoveColumnSizer.insert(D, O), x2 && (InsertRemoveColumnSizer.cleanUpCustomColumnSizers(D, O), UpdateIndexColumnWidth.wrapTextWhenNarrowColumnsBreached(D));
      }
    }
    // prettier-ignore
    static insert(D, w2, O, x2, U, F, W) {
      const { _frameComponents: { displayIndexColumn: G }, data: X, _columnsDetails: K } = D, q = K[W];
      q.elements.splice(F, 0, O), q.processedStyle.splice(F, 0, ProcessedDataTextStyle.getDefaultProcessedTextStyle()), _InsertNewCell.insertElementsToRow(w2, O, F, W, !!G), X[F].splice(W, U ? 0 : 1, x2);
    }
    static convertCell(D, w2, O, x2) {
      const U = D._columnsDetails[O];
      w2 === 0 && D.displayHeaderIcons && HeaderIconCellElement.setHeaderIconStructure(D, x2, O), U.activeType && (U.activeType.cellDropdownProps ? w2 === 0 ? CellDropdown.setUpDropdown(D, O) : (SelectCell.convertCell(D, O, x2), SelectCell.finaliseEditedText(D, x2.children[0], O, true)) : w2 > 0 && (U.activeType.checkbox && CheckboxCellElement.setCellCheckboxStructure(D, x2, O, w2), U.activeType.calendar && DateCellElement.setCellDateStructure(D, x2, O)));
    }
    // REF-13
    // prettier-ignore
    static insertInitialColumnDetails(D, w2, O) {
      const { _columnsDetails: x2, _customColumnsSettings: U, _cellDropdownContainer: F, _defaultColumnsSettings: W } = D, G = CellDropdown.createAndAppend(F), X = ColumnDetails.createInitial(
        W,
        G,
        U[w2],
        D._defaultCellHoverColors,
        FireEvents.onColumnsUpdate.bind(this, D)
      );
      x2.splice(O, 0, X);
    }
    // isNewText indicates whether rowData is already in the data state or if it needs to be added
    // prettier-ignore
    static insertToRow(D, w2, O, x2, U, F) {
      O === 0 && _InsertNewCell.insertInitialColumnDetails(D, U, x2);
      const W = DataUtils.processCellText(D, O, x2, U), G = CellElement.createCellElement(D, W, x2, O === 0);
      _InsertNewCell.insert(D, w2, G, W, F, O, x2), _InsertNewCell.convertCell(D, O, x2, G), O === 0 ? (F && StaticTableWidthUtils.changeWidthsBasedOnColumnInsertRemove(D, true), ColumnSettingsBorderUtils.updateSiblingColumns(D, x2)) : ProcessedDataTextStyle.setCellStyle(D, O, x2), setTimeout(() => _InsertNewCell.updateColumnDetailsAndSizers(D, O, x2, F));
    }
  };
  var InsertNewRow = class _InsertNewRow {
    // CAUTION-2 if the addition or removal of row causes the parent div to change width, this is indeed run after rerender,
    // however the notification messages are necessary and the rebinding does not seem to cause issues, nevertheless take
    // note of this if editing any of the logic below
    static bindAndfireCellUpdates(D, w2) {
      var F;
      const O = D.data.length - 1, U = { element: (F = D._tableBodyElementRef) == null ? void 0 : F.children[O], index: O };
      UpdateCellsForRows.rebindAndFireUpdates(D, w2, CELL_UPDATE_TYPE.ADD, U), setTimeout(() => FireEvents.onDataUpdate(D));
    }
    static canStartRenderCellBeAdded(D, w2, O) {
      return w2 === 0 ? MaximumColumns.canAddMore(D) : D._columnsDetails[O];
    }
    // prettier-ignore
    static addCells(D, w2, O, x2, U) {
      const { _frameComponents: { displayIndexColumn: F, displayAddNewColumn: W } } = D;
      F && IndexColumn.createAndPrependToRow(D, O, x2), w2.forEach((G, X) => {
        (U || _InsertNewRow.canStartRenderCellBeAdded(D, x2, X)) && InsertNewCell.insertToRow(D, O, x2, X, G, U);
      }), W && AddNewColumnElement.createAndAppendToRow(D, O, x2), setTimeout(() => RowDropdownCellOverlay.add(D, x2, O.children[0]));
    }
    static updatePagination(D, w2, O, x2) {
      O ? PaginationUtils.updateOnRowChange(D, w2, x2) : PaginationUtils.initialRowUpdates(D, w2, x2);
    }
    static insertNewRow(D, w2, O, x2) {
      var W, G;
      const U = x2 || DataUtils.createEmptyStringDataArray(((W = D.data[0]) == null ? void 0 : W.length) || 1), F = RowElement.create();
      return D.pagination && _InsertNewRow.updatePagination(D, w2, O, F), (G = D._tableBodyElementRef) == null || G.insertBefore(F, D._tableBodyElementRef.children[w2]), O && D.data.splice(w2, 0, []), _InsertNewRow.addCells(D, U, F, w2, O), F;
    }
    // isNewText indicates whether rowData is already in the data state or if it needs to be added
    static insert(D, w2, O, x2) {
      if (!MaximumRows.canAddMore(D))
        return;
      const U = O && w2 === 0 && D._columnsDetails.length > 0;
      U && (w2 = 1);
      const F = _InsertNewRow.insertNewRow(D, w2, O, x2);
      O && (ToggleAdditionElements.update(D, true, AddNewRowElement.toggle), D._frameComponents.displayIndexColumn && IndexColumn.updateIndexes(D, w2 + 1), CustomRowProperties.update(D, w2)), U && MoveRow.move(D, 0, true), setTimeout(() => {
        D._isPopulatingTable ? UpdateCellsForRows.updateRowCells(D, F, w2, CELL_UPDATE_TYPE.ADD) : x2 ? w2 === D.data.length - 1 && _InsertNewRow.bindAndfireCellUpdates(D, 0) : _InsertNewRow.bindAndfireCellUpdates(D, w2);
      });
    }
    // prettier-ignore
    static insertEvent() {
      let D = this.data.length;
      if (this.pagination)
        if (this._visiblityInternal.filters && this._tableBodyElementRef)
          D = this.data.length === 1 && !this.dataStartsAtHeader ? 1 : PaginationRowIndexes.getVisibleRowRealIndex(this._tableBodyElementRef, this._pagination) + 1;
        else {
          const w2 = PaginationRowIndexes.getMaxVisibleRowIndex(this);
          w2 < D && (D = w2);
        }
      _InsertNewRow.insert(this, D, true);
    }
  };
  var AddNewRowEvents = class _AddNewRowEvents {
    static mouseEnterCell(D, w2) {
      CellHighlightUtils.highlight(w2.target, D.hover);
    }
    static mouseLeaveCell(D, w2) {
      CellHighlightUtils.fade(w2.target, D.default);
    }
    static setCellEvents(D, w2) {
      w2.onclick = InsertNewRow.insertEvent.bind(D);
      const O = D._frameComponents.cellColors.data;
      w2.onmouseenter = _AddNewRowEvents.mouseEnterCell.bind(this, O), w2.onmouseleave = _AddNewRowEvents.mouseLeaveCell.bind(this, O);
    }
  };
  var _AddNewRowElement = class ge {
    static isDisplayed(D) {
      return D.style.display === ge.VISIBLE;
    }
    static setDisplay(D, w2) {
      ge.isDisplayed(D) !== w2 && (D.style.display = w2 ? ge.VISIBLE : ge.HIDDEN);
    }
    static setDefaultStyle(D) {
      D.innerText = "+ New", D.style.width = "";
    }
    // prettier-ignore
    static createCell(D) {
      const { _defaultColumnsSettings: { cellStyle: w2 }, _frameComponents: { displayAddNewRow: O, styles: x2 }, rootCell: U } = D, F = CellElement.createDataCell(false, w2, x2 == null ? void 0 : x2.default);
      return F.id = ge.ID, O ? ge.setDefaultStyle(F) : (RootCellElement.convertToRootCell(F, U == null ? void 0 : U.text), F.addEventListener("click", ge.setDisplay.bind(this, F, false))), ge.setDisplay(F, O), F.colSpan = ge.DEFAULT_COL_SPAN, AddNewRowEvents.setCellEvents(D, F), F;
    }
    static create(D) {
      const w2 = RowElement.create(), O = ge.createCell(D);
      return w2.appendChild(O), O;
    }
    // prettier-ignore
    static toggle(D) {
      const { _tableBodyElementRef: w2, _addRowCellElementRef: O, _frameComponents: { displayAddNewRow: x2 } } = D;
      !(O != null && O.parentElement) || !w2 || (x2 && ge.setDisplay(O, MaximumRows.canAddMore(D)), RowElement.toggleLastRowClass(D));
    }
    static isAddNewRowRow(D) {
      var w2;
      return ((w2 = D == null ? void 0 : D.children[0]) == null ? void 0 : w2.id) === ge.ID;
    }
  };
  _AddNewRowElement.DEFAULT_COL_SPAN = 1e9;
  _AddNewRowElement.HIDDEN = "none";
  _AddNewRowElement.VISIBLE = "";
  _AddNewRowElement.ID = "add-new-row-cell";
  var AddNewRowElement = _AddNewRowElement;
  var ElementEvents = class {
    static toggleListeners(D, w2, O) {
      Object.keys(w2).forEach((x2) => {
        (w2[x2] || []).forEach((F) => {
          D[O ? "addEventListener" : "removeEventListener"](x2, F);
        });
      });
    }
    static convertToArrayObj(D) {
      return Object.keys(D).reduce((w2, O) => {
        const x2 = O, U = D[x2];
        return x2 && U && (w2[x2] = [U]), w2;
      }, {});
    }
    static getDefault() {
      return { rootCell: { styles: {} } };
    }
  };
  var RootCellEvents = class _RootCellEvents {
    static removeEvents(D, w2) {
      AddNewRowElement.setDefaultStyle(D), ElementEvents.toggleListeners(D, w2.styles, false), D.dispatchEvent(new MouseEvent("mouseenter")), delete w2.applied;
    }
    // setting, not apply here as this is only triggered once
    static setEventFunctions(D, w2, O) {
      if (O && (D._eventFunctions.rootCell.styles = ElementEvents.convertToArrayObj(
        StatefulCSSEvents.getEvents(w2, O)
      )), D._frameComponents.displayAddNewRow) {
        const x2 = RootCellElement.convertFromRootCell.bind(this, D), { styles: U } = D._eventFunctions.rootCell;
        U.click ?? (U.click = []), U.click.push(x2);
      }
    }
    static applyStyles(D, w2, O) {
      var U, F, W, G;
      const x2 = ElementStyle.generateStatefulCSS(w2, {}, {});
      (U = x2.default) != null && U.width && (O.style.width = x2.default.width), (F = x2.default) == null || delete F.width, (W = x2.hover) == null || delete W.width, (G = x2.click) == null || delete G.width, Object.assign(D.style, x2.default);
    }
    // prettier-ignore
    static applyEvents(D, w2) {
      const { _tableElementRef: O, rootCell: x2, _eventFunctions: { rootCell: U } } = D, F = x2 != null && x2.styles ? JSON.parse(JSON.stringify(x2.styles)) : null;
      F && O && _RootCellEvents.applyStyles(w2, F, O), Object.keys(U.styles).length === 0 && _RootCellEvents.setEventFunctions(D, w2, F), ElementEvents.toggleListeners(w2, U.styles, true), U.applied = true;
    }
  };
  var _RootCellElement = class Je {
    // prettier-ignore
    static convertFromRootCell(D) {
      const { _addRowCellElementRef: w2, rootCell: O, _eventFunctions: { rootCell: x2 } } = D;
      w2 && (w2.classList.remove(Je.ROOT_CELL_CLASS), O != null && O.styles && ElementStyle.unsetAllCSSStates(w2, O.styles), RootCellEvents.removeEvents(w2, x2));
    }
    static convertToRootCell(D, w2) {
      D.classList.add(Je.ROOT_CELL_CLASS), D.innerText = w2 || "+", D.style.width = `${TableDimensionsUtils.MINIMAL_TABLE_WIDTH}px`;
    }
    // addNewRowCell is preserved as it is reused as the root cell
    static removeRows(D) {
      Array.from(D.children).slice(0, D.children.length - 1).forEach((w2) => w2.remove());
    }
    // prettier-ignore
    static display(D) {
      const {
        _tableBodyElementRef: w2,
        _addColumnCellsElementsRef: O,
        _addRowCellElementRef: x2,
        rootCell: U,
        _frameComponents: { displayAddNewColumn: F, displayAddNewRow: W }
      } = D;
      if (!x2)
        return;
      const G = w2;
      F && O.splice(0, O.length), Je.removeRows(G), W && Je.convertToRootCell(x2, U == null ? void 0 : U.text), D._eventFunctions.rootCell.applied || RootCellEvents.applyEvents(D, x2), AddNewRowElement.setDisplay(x2, true);
    }
  };
  _RootCellElement.ROOT_CELL_CLASS = "root-cell";
  var RootCellElement = _RootCellElement;
  var ToggleAdditionElements = class {
    static update(D, w2, O) {
      D.data.length === 0 || D._columnsDetails.length === 0 ? RootCellElement.display(D) : O(D, w2);
    }
  };
  var InsertNewColumn = class _InsertNewColumn {
    static updateColumns(D, w2, O, x2) {
      const U = { element: w2, index: O }, F = LastColumn.getDetails(D._columnsDetails, O);
      UpdateCellsForColumns.rebindAndFireUpdates(D, U, x2, CELL_UPDATE_TYPE.ADD, F);
    }
    static insertToAllRows(D, w2, O) {
      ExtractElements.textRowsArrFromTBody(D._tableBodyElementRef, D.data).forEach((U, F) => {
        const W = O ? O[F] : EMPTY_STRING;
        InsertNewCell.insertToRow(D, U, F, w2, W, true), setTimeout(() => _InsertNewColumn.updateColumns(D, U, F, w2));
      });
    }
    // columnData is in a row format to populate the column by iterating through each row
    static insert(D, w2, O) {
      MaximumColumns.canAddMore(D) && (FocusedCellUtils.incrementColumnIndex(D._focusedElements.cell, w2), _InsertNewColumn.insertToAllRows(D, w2, O), ToggleAdditionElements.update(D, true, AddNewColumnElement.toggle), setTimeout(() => {
        FireEvents.onDataUpdate(D), FireEvents.onColumnsUpdate(D);
      }));
    }
    static insertEvent() {
      _InsertNewColumn.insert(this, this._columnsDetails.length);
    }
  };
  var InsertMatrix = class _InsertMatrix {
    // prettier-ignore
    static removeDataThatIsNotEditableFromNewRows(D, w2, O) {
      return D.slice(O).forEach((U, F) => {
        U.settings.isCellTextEditable || w2.forEach((W) => {
          W[F] = EMPTY_STRING;
        });
      }), w2;
    }
    // if the data does not fill the 2D array, fill cells with empty strings
    static createRowDataArrayWithEmptyCells(D, w2, O) {
      const x2 = DataUtils.createEmptyStringDataArray(D);
      return x2.splice(O, w2.length, ...w2), x2;
    }
    // prettier-ignore
    static createNewRows(D, w2, O) {
      _InsertMatrix.removeDataThatIsNotEditableFromNewRows(
        D._columnsDetails,
        w2,
        O
      ).forEach((U) => {
        var W;
        const F = _InsertMatrix.createRowDataArrayWithEmptyCells(
          ((W = D.data[0]) == null ? void 0 : W.length) || 0,
          U,
          O
        );
        InsertNewRow.insert(D, D.data.length, true, F);
      });
    }
    static changeColumnSettings(D, w2) {
      const { elements: O } = D._columnsDetails[w2];
      FocusedCellUtils.set(D._focusedElements.cell, O[0], 0, w2), HeaderText.onAttemptChange(D, O[0], w2);
    }
    static processNewColumn(D) {
      const w2 = D._columnsDetails.length - 1;
      CellEvents.setCellToDefaultIfNeeded(D, 0, w2, D._columnsDetails[w2].elements[0], false), _InsertMatrix.changeColumnSettings(D, w2);
    }
    // prettier-ignore
    static createNewColumns(D, w2, O) {
      ArrayUtils.transpose(w2).forEach((U) => {
        const F = _InsertMatrix.createRowDataArrayWithEmptyCells(
          D.data.length,
          U,
          O
        );
        InsertNewColumn.insert(D, D.data[0].length, F), _InsertMatrix.processNewColumn(D);
      });
    }
    // prettier-ignore
    static overwriteCell(D, w2, O, x2, U) {
      const { _frameComponents: { displayIndexColumn: F }, _columnsDetails: W } = D, G = CellElementIndex.getViaColumnIndex(x2, !!F), X = w2.children[G], K = W[x2];
      O === 0 && !K.settings.isHeaderTextEditable || O > 0 && !K.settings.isCellTextEditable || (O === 0 && CellElement.setNewText(D, X, U, false, false), CellEvents.updateCell(D, U, O, x2, { element: X, updateTableEvent: false }), ColumnTypesUtils.updateDataElements(D, O, x2, X), O === 0 && _InsertMatrix.changeColumnSettings(D, x2));
    }
    // prettier-ignore
    static overwriteRowData(D, w2, O, x2, U) {
      w2.forEach((F, W) => {
        const G = x2 + W;
        _InsertMatrix.overwriteCell(D, U, O, G, F);
      });
    }
    // prettier-ignore
    static setCaretToEndAndHighlightIfSelect(D, w2, O) {
      const { activeType: x2, cellDropdown: U, settings: { defaultText: F } } = D._columnsDetails[O];
      CaretPosition.setToEndOfText(D, w2), x2.cellDropdownProps && CellDropdown.updateCellDropdown(w2, U, D._tableDimensions.border, F, true);
    }
    // prettier-ignore
    static overwriteExistingCells(D, w2, O, x2) {
      const U = [];
      w2.forEach((W, G) => {
        var re;
        const X = O + G, K = (re = D._tableBodyElementRef) == null ? void 0 : re.children[X], q = D.data[0].length - x2, Q = W.slice(0, q);
        _InsertMatrix.overwriteRowData(D, Q, X, x2, K);
        const le = W.slice(q);
        U.push(le);
      });
      const F = D._focusedElements.cell.element;
      return setTimeout(() => _InsertMatrix.setCaretToEndAndHighlightIfSelect(D, F, x2)), U;
    }
    // no new rows should be created if no columns that are to be overwritten/created allow text edit
    static canNewRowsBeCreated(D, w2, O) {
      return D._columnsDetails.slice(O, O + w2[0].length).find((x2) => x2.settings.isCellTextEditable);
    }
    static insertColumnsInsideIfCantInsertRight(D, w2, O) {
      const U = D._columnsDetails.slice(O).findIndex((F) => F.settings.columnDropdown.isInsertRightAvailable === false);
      if (U !== -1)
        if (U === 0)
          w2.forEach((F) => F.splice(1, F.length - 1));
        else {
          const F = w2[0].length - (U + 1);
          for (let W = 0; W < F; W += 1)
            InsertNewColumn.insert(D, O + U + W);
        }
    }
    static getNewMatrixBasedOnColumns(D, w2, O) {
      var U, F;
      const x2 = (((U = D[0]) == null ? void 0 : U.length) || 0) - (((F = w2[0]) == null ? void 0 : F.length) || 0) - O;
      return x2 > 0 ? new Array(w2.length).fill(new Array(x2).fill(EMPTY_STRING)) : [];
    }
    // A matrix is a complete 2D array
    // prettier-ignore
    static insert(D, w2, O, x2, U) {
      const F = D.data.length - O;
      U || _InsertMatrix.insertColumnsInsideIfCantInsertRight(D, w2, x2);
      const W = w2.slice(0, F), G = U ? _InsertMatrix.getNewMatrixBasedOnColumns(w2, D.data, x2) : _InsertMatrix.overwriteExistingCells(D, W, O, x2);
      if (_InsertMatrix.createNewColumns(D, G, O), !U && !_InsertMatrix.canNewRowsBeCreated(D, w2, x2))
        return;
      const X = w2.slice(F);
      _InsertMatrix.createNewRows(D, X, x2), setTimeout(() => FireEvents.onDataUpdate(D));
    }
  };
  var _ParseCSVClipboardText = class ue {
    static preprocessText(D) {
      let w2 = D;
      return D.charAt(0) === ue.STRING_QUOTE_SYMBOL && (w2 = w2.substring(1)), D.charAt(D.length - 1) === ue.STRING_QUOTE_SYMBOL && (w2 = w2.substring(0, D.length - 2)), w2;
    }
    static getSeparatorSymbols(D) {
      return D.indexOf(ue.EXPLICIT_WINDOWS_NEW_LINE_SYMBOL) > -1 ? {
        newLine: ue.EXPLICIT_WINDOWS_NEW_LINE_SYMBOL,
        tab: ue.EXPLICIT_TAB_SYMBOL
      } : D.indexOf(ue.WINDOWS_NEW_LINE_SYMBOL) > -1 ? { newLine: ue.WINDOWS_NEW_LINE_SYMBOL, tab: ue.TAB_SYMBOL } : D.indexOf(ue.EXPLICIT_NEW_LINE_SYMBOL) > -1 || D.indexOf(ue.EXPLICIT_TAB_SYMBOL) > -1 ? { newLine: ue.EXPLICIT_NEW_LINE_SYMBOL, tab: ue.EXPLICIT_TAB_SYMBOL } : { newLine: ue.NEW_LINE_SYMBOL, tab: ue.TAB_SYMBOL };
    }
    static parse(D) {
      const w2 = ue.preprocessText(D), { newLine: O, tab: x2 } = ue.getSeparatorSymbols(w2);
      return w2.split(O).map((F) => F.split(x2).map((G) => G.replace(/\\"/g, "")));
    }
  };
  _ParseCSVClipboardText.STRING_QUOTE_SYMBOL = '"';
  _ParseCSVClipboardText.TAB_SYMBOL = "\\t";
  _ParseCSVClipboardText.NEW_LINE_SYMBOL = "\\n";
  _ParseCSVClipboardText.EXPLICIT_TAB_SYMBOL = "\\\\t";
  _ParseCSVClipboardText.EXPLICIT_NEW_LINE_SYMBOL = "\\\\n";
  _ParseCSVClipboardText.WINDOWS_NEW_LINE_SYMBOL = "\\r\\n";
  _ParseCSVClipboardText.EXPLICIT_WINDOWS_NEW_LINE_SYMBOL = "\\\\r\\\\n";
  var ParseCSVClipboardText = _ParseCSVClipboardText;
  var OverwriteCellsViaCSVOnPaste = class _OverwriteCellsViaCSVOnPaste {
    static trimCSVRowsIfPaginationAsync(D, w2, O, x2) {
      var G;
      const U = D.length + O;
      w2.length < U && (D = D.slice(0, D.length - (U - w2.length)));
      const F = ((G = w2[0]) == null ? void 0 : G.length) || 0, W = D[0].length + x2;
      if (F < W) {
        const X = D[0].length - (W - F);
        D.forEach((K) => K.splice(X));
      }
      return D;
    }
    static focusOriginalCellAfterProcess(D, w2) {
      const { element: O, rowIndex: x2, columnIndex: U } = D._focusedElements.cell;
      w2(), FocusedCellUtils.set(D._focusedElements.cell, O, x2, U);
    }
    // prettier-ignore
    static overwrite(D, w2, O, x2, U) {
      O.preventDefault();
      let F = ParseCSVClipboardText.parse(w2);
      D._pagination.async && (F = _OverwriteCellsViaCSVOnPaste.trimCSVRowsIfPaginationAsync(F, D.data, x2, U)), _OverwriteCellsViaCSVOnPaste.focusOriginalCellAfterProcess(
        D,
        InsertMatrix.insert.bind(this, D, F, x2, U)
      );
    }
    static isCSVData(D) {
      return D.indexOf(ParseCSVClipboardText.NEW_LINE_SYMBOL) > -1 || D.indexOf(ParseCSVClipboardText.TAB_SYMBOL) > -1;
    }
  };
  var KEYBOARD_COMBINATION_EVENT = /* @__PURE__ */ ((Y) => (Y.PASTE = "Paste", Y))(KEYBOARD_COMBINATION_EVENT || {});
  var KEYBOARD_EVENT = { ...KEYBOARD_COMBINATION_EVENT, [KEYBOARD_KEY.TAB]: KEYBOARD_KEY.TAB };
  var _UserKeyEventsStateUtils = class Tt {
    static createNew() {
      return { [KEYBOARD_KEY.TAB]: false, [KEYBOARD_EVENT.PASTE]: false, [MOUSE_EVENT.DOWN]: false };
    }
    static temporarilyIndicateEvent(D, w2) {
      D[w2] = true, setTimeout(() => D[w2] = false, Tt.KEY_PRESS_STATE_TIMEOUT_ML);
    }
  };
  _UserKeyEventsStateUtils.KEY_PRESS_STATE_TIMEOUT_ML = 5;
  var UserKeyEventsStateUtils = _UserKeyEventsStateUtils;
  var _PasteUtils = class St {
    static sanitizePastedTextData(D) {
      var O, x2;
      D.preventDefault();
      const w2 = (O = D.clipboardData) == null ? void 0 : O.getData("text/plain");
      (x2 = document.execCommand) == null || x2.call(document, "insertHTML", false, w2);
    }
    static extractClipboardText(D) {
      var w2;
      return JSON.stringify((w2 = D.clipboardData) == null ? void 0 : w2.getData(St.TEXT_DATA_FORMAT));
    }
  };
  _PasteUtils.TEXT_DATA_FORMAT = "text/plain";
  var PasteUtils = _PasteUtils;
  var UNDO_INPUT_TYPE = "historyUndo";
  var DataCellEvents = class _DataCellEvents {
    static keyDownCell(D, w2, O) {
      const { elements: x2, activeType: U } = this._columnsDetails[w2];
      O.key === KEYBOARD_KEY.TAB ? UserKeyEventsStateUtils.temporarilyIndicateEvent(this._userKeyEventsState, KEYBOARD_KEY.TAB) : O.key === KEYBOARD_KEY.ENTER && this.enterKeyMoveDown && !U.cellDropdownProps && FocusNextRowCell.focus(this, D, x2, O);
    }
    // using this instead of keydown because when this is fired the new cell text is available
    // prettier-ignore
    static inputCell(D, w2, O) {
      const x2 = O, U = x2.target;
      if (DateCellInputElement.isInputElement(U))
        return;
      const F = CellElement.getText(U);
      if (!this._userKeyEventsState[KEYBOARD_EVENT.PASTE]) {
        const W = x2.inputType === UNDO_INPUT_TYPE;
        CellElement.setNewText(this, U, F, false, W, false);
        const G = this._columnsDetails[w2];
        G.activeType.cellDropdownProps && D > 0 && CellDropdown.updateCellDropdown(
          U,
          G.cellDropdown,
          this._tableDimensions.border,
          G.settings.defaultText,
          true
        ), CellEvents.updateCell(this, F, D, w2, { processText: false });
      }
    }
    // prettier-ignore
    static pasteCell(D, w2, O) {
      UserKeyEventsStateUtils.temporarilyIndicateEvent(this._userKeyEventsState, KEYBOARD_EVENT.PASTE), PasteUtils.sanitizePastedTextData(O);
      const x2 = PasteUtils.extractClipboardText(O);
      if (OverwriteCellsViaCSVOnPaste.isCSVData(x2))
        OverwriteCellsViaCSVOnPaste.overwrite(this, x2, O, D, w2);
      else {
        const U = O.target, { cellDropdown: F, settings: { defaultText: W }, activeType: G } = this._columnsDetails[w2], X = U.tagName === "BR" ? U.parentElement : U;
        setTimeout(() => {
          G.cellDropdownProps && CellDropdown.updateCellDropdown(
            X,
            F,
            this._tableDimensions.border,
            W,
            true
          ), CellEvents.updateCell(this, CellElement.getText(X), D, w2, { processText: false });
        });
      }
    }
    // prettier-ignore
    // textContainerElement can be cell element for data cell, text element for select/label and date cells
    static blur(D, w2, O, x2) {
      CaretDisplayFix.isIssueBrowser() && CaretDisplayFix.removeContentEditable(x2), CellEvents.setCellToDefaultIfNeeded(D, w2, O, x2), FocusedCellUtils.purge(D._focusedElements.cell);
    }
    static blurCell(D, w2, O) {
      var x2, U, F;
      D === 0 && !((F = (U = (x2 = this._defaultColumnsSettings.columnDropdown) == null ? void 0 : x2.displaySettings) == null ? void 0 : U.openMethod) != null && F.cellClick) && HeaderText.onAttemptChange(this, O.target, w2), _DataCellEvents.blur(this, D, w2, O.target);
    }
    // textContainerElement can be cell element for data cell, text element for select/label and date cells
    static prepareText(D, w2, O, x2) {
      var F, W, G;
      const U = (G = (W = (F = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : F.displaySettings) == null ? void 0 : W.openMethod) == null ? void 0 : G.cellClick;
      CaretDisplayFix.isIssueBrowser() && (w2 > 0 || !U) && CaretDisplayFix.setContentEditable(x2), CellEvents.removeTextIfDefault(D, w2, O, x2);
    }
    static focusCell(D, w2, O) {
      const x2 = O.target;
      _DataCellEvents.prepareText(this, D, w2, x2);
      const { _userKeyEventsState: U, _focusedElements: F } = this;
      U[KEYBOARD_KEY.TAB] && CaretPosition.setToEndOfText(this, x2), FocusedCellUtils.set(F.cell, x2, D, w2);
    }
    static setEvents(D, w2, O, x2) {
      w2.onfocus = _DataCellEvents.focusCell.bind(D, O, x2), w2.onblur = _DataCellEvents.blurCell.bind(D, O, x2), w2.onmouseenter = () => {
      }, w2.onmouseleave = () => {
      }, w2.onmousedown = () => {
      }, w2.oninput = _DataCellEvents.inputCell.bind(D, O, x2), w2.onpaste = _DataCellEvents.pasteCell.bind(D, O, x2), w2.onkeydown = _DataCellEvents.keyDownCell.bind(D, O, x2);
    }
  };
  var SelectCellTextBaseEvents = class _SelectCellTextBaseEvents {
    // the reason why this is triggered by window is because when the user clicks on dropdown padding or delete button
    // keydown events will no longer be fired through the cell text - however we need to maintain the same behaviour
    // prettier-ignore
    static keyDownText(D, w2, O, x2) {
      const { cellDropdown: { activeItems: U, canAddMoreOptions: F }, elements: W } = D._columnsDetails[O];
      x2.key === KEYBOARD_KEY.ESCAPE ? CellWithTextEvents.programmaticBlur(D) : x2.key === KEYBOARD_KEY.TAB ? CellTextEvents.tabOutOfCell(D, w2, O, x2) : x2.key === KEYBOARD_KEY.ENTER ? (x2.preventDefault(), FocusNextRowCell.focusOrBlurSelect(W, w2)) : x2.key === KEYBOARD_KEY.ARROW_UP ? (x2.preventDefault(), CellDropdownItem.setSiblingItemOnCell(D, U, "previousSibling")) : x2.key === KEYBOARD_KEY.ARROW_DOWN ? (x2.preventDefault(), CellDropdownItem.setSiblingItemOnCell(D, U, "nextSibling")) : (D.dataStartsAtHeader || w2 > 0) && !F && x2.preventDefault();
    }
    static displayDropdown(D, w2, O) {
      var W;
      const x2 = CellDropdown.display(D, w2, O), { activeType: U, cellDropdown: F } = D._columnsDetails[w2];
      (W = U.cellDropdownProps) != null && W.isBasicSelect && x2 && (F.displayedCellElement = O, ArrowDownIconElement.toggle(O, true), ArrowDownIconElement.setActive(O));
    }
    static clearTypeSpecificProps(D, w2) {
      const { cellDropdown: O, activeType: x2 } = w2;
      x2.cellDropdownProps && (x2.cellDropdownProps.isBasicSelect ? (ArrowDownIconElement.toggle(O.displayedCellElement, false), delete O.displayedCellElement) : OptionButton.hideAfterColorPickerContainerClose(D, w2));
    }
    static blurring(D, w2, O, x2) {
      const U = D._columnsDetails[O];
      Dropdown.hide(U.cellDropdown.element), U.cellDropdown.itemsDetails[CellElement.getText(x2)] || SelectCell.finaliseEditedText(D, x2, O), _SelectCellTextBaseEvents.clearTypeSpecificProps(D._columnsDetails, U), DataCellEvents.blur(D, w2, O, x2);
    }
    static blurText(D, w2, O) {
      this._focusedElements.cellDropdown || _SelectCellTextBaseEvents.blurring(this, D, w2, O.target);
    }
    // prettier-ignore
    static setEvents(D, w2, O, x2) {
      w2.onblur = _SelectCellTextBaseEvents.blurText.bind(D, O, x2), w2.onfocus = CellWithTextEvents.focusText.bind(
        D,
        O,
        x2,
        _SelectCellTextBaseEvents.displayDropdown
      );
    }
  };
  var CellWithTextEvents = class _CellWithTextEvents {
    // prettier-ignore
    static focusText(D, w2, O, x2) {
      const U = x2.target, F = CellElement.getCellElement(U);
      DataCellEvents.prepareText(this, D, w2, U), O == null || O(this, w2, F), FocusedCellUtils.set(this._focusedElements.cell, F, D, w2), this._userKeyEventsState[KEYBOARD_KEY.TAB] && CaretPosition.setToEndOfText(this, U);
    }
    static programmaticBlur(D) {
      const { rowIndex: w2, columnIndex: O, element: x2 } = D._focusedElements.cell, U = CellElement.getTextElement(x2);
      U.blur(), D._focusedElements.cellDropdown && (SelectCellTextBaseEvents.blurring(D, w2, O, U), delete D._focusedElements.cellDropdown);
    }
    // prettier-ignore
    static mouseDownCell(D, w2, O, x2) {
      D._focusedElements.cellDropdown && _CellWithTextEvents.programmaticBlur(D);
      const U = CellElement.getTextElement(O);
      x2.preventDefault(), w2 == null || w2(D), CaretDisplayFix.isIssueBrowser() && U.focus(), CaretPosition.setToEndOfText(D, U);
    }
    static mouseDown(D, w2) {
      if (w2.target.classList.contains(CellElement.CELL_CLASS)) {
        const x2 = w2.target;
        _CellWithTextEvents.mouseDownCell(this, D, x2, w2);
      }
    }
  };
  var CellDropdownScrollbar = class {
    static setProperties(D) {
      const { element: w2, scrollbarPresence: O } = D;
      CellDropdownHorizontalScrollFix.setPropertiesIfHorizontalScrollPresent(D), O.vertical = ScrollbarUtils.isVerticalPresent(w2);
    }
  };
  var OptionDeleteButtonEvents = class _OptionDeleteButtonEvents {
    static delete(D, w2) {
      const { cellDropdown: O } = D, F = w2.target.parentElement.parentElement;
      delete O.itemsDetails[CellElement.getText(F.children[0])], F.remove(), Object.keys(O.itemsDetails).length === 0 ? CellWithTextEvents.programmaticBlur(this) : CellDropdownScrollbar.setProperties(O), setTimeout(() => FireEvents.onColumnsUpdate(this));
    }
    static addEvents(D, w2, O) {
      O.onclick = _OptionDeleteButtonEvents.delete.bind(D, w2);
    }
  };
  var _OptionDeleteButton = class Ge {
    static createIcon() {
      const D = document.createElement("div");
      return D.classList.add(Ge.DELETE_BUTTON_ICON_CLASS), D.innerText = Ge.DELETE_ICON_TEXT, D;
    }
    static createButton(D, w2) {
      const O = document.createElement("div");
      return O.classList.add(DropdownItem.DROPDOWN_ITEM_IDENTIFIER, OptionButton.BUTTON_CLASS), OptionDeleteButtonEvents.addEvents(D, w2, O), O;
    }
    static createContainer() {
      const D = document.createElement("div");
      return D.classList.add(OptionButton.BUTTON_CONTAINER_CLASS), D;
    }
    static create(D, w2) {
      const O = Ge.createContainer(), x2 = Ge.createButton(D, w2), U = Ge.createIcon();
      return x2.appendChild(U), O.appendChild(x2), O;
    }
    static changeVisibility(D, w2, O) {
      const x2 = D.children[1];
      if (x2.style.display = O ? "block" : "none", O) {
        const U = x2.children[0];
        U.style.left = `${O.offsetWidth - w2}px`;
      }
    }
  };
  _OptionDeleteButton.DELETE_BUTTON_ICON_CLASS = "cell-dropdown-option-delete-button-icon";
  _OptionDeleteButton.DELETE_ICON_TEXT = "\xD7";
  var OptionDeleteButton = _OptionDeleteButton;
  var OptionButton = class {
    static changeVisibility(D, w2, O) {
      if (D.isTrusted) {
        const x2 = D.target, U = w2.scrollbarPresence.vertical ? 31 : 16;
        OptionDeleteButton.changeVisibility(x2, U, O), Browser.IS_COLOR_PICKER_SUPPORTED && w2.labelDetails && !w2.labelDetails.colorPickerContainer && OptionColorButton.changeVisibility(x2, U + 18, O);
      }
    }
    // prettier-ignore
    static hideAfterColorPickerContainerClose(D, w2) {
      const { cellDropdown: { labelDetails: O } } = w2;
      if (O != null && O.colorPickerContainer) {
        O.colorPickerContainer.style.display = "none";
        const x2 = O.colorPickerContainer.previousElementSibling;
        x2.style.display = "none", delete O.colorPickerContainer, OptionColorButtonEvents.updateColumnLabelColors(D, w2);
      }
    }
  };
  OptionButton.BUTTON_CONTAINER_CLASS = "cell-dropdown-option-button-container";
  OptionButton.BUTTON_CLASS = "cell-dropdown-option-button";
  var CellDropdownItemEvents = class _CellDropdownItemEvents {
    // prettier-ignore
    static blurItem(D, w2, O) {
      var W;
      const { activeItems: x2, labelDetails: U } = D;
      if (U != null && U.colorPickerContainer)
        return;
      const F = x2[w2];
      F !== void 0 && (w2 === "matchingWithCellText" || w2 === "hovered" && F !== x2.matchingWithCellText) && (F.style.backgroundColor = "", U || (F.style.color = ((W = D.customItemStyle) == null ? void 0 : W.textColor) || ""), delete x2[w2]), O && D.canAddMoreOptions && OptionButton.changeVisibility(O, D);
    }
    // prettier-ignore
    static scrollToItem(D, w2, O, x2, U) {
      if (U.isTrusted)
        return;
      const F = ElementVisibility.isVerticallyVisibleInsideParent(w2, D);
      F.isFullyVisible || (w2.scrollIntoView({ block: "nearest" }), O && F.blockingSides.has(SIDE.BOTTOM) && CellDropdownHorizontalScrollFix.scrollDownFurther(x2));
    }
    static highlightItem(D, w2) {
      const { scrollbarPresence: O, activeItems: x2, labelDetails: U, canAddMoreOptions: F, element: W, itemsDetails: G } = D;
      if (U != null && U.colorPickerContainer)
        return;
      x2.hovered && (x2.hovered.style.backgroundColor = "", U || (x2.hovered.style.color = ""));
      const X = w2.target, K = X.children[0].innerText;
      X.style.backgroundColor = G[K].backgroundColor;
      const q = X.parentElement;
      _CellDropdownItemEvents.scrollToItem(this, X, O.horizontal, q, w2), X === x2.matchingWithCellText ? (U || (X.style.color = "white"), delete x2.hovered) : (U || (X.style.backgroundColor = DropdownItemHighlightUtils.HOVER_BACKGROUND_COLOR), x2.hovered = X), F && OptionButton.changeVisibility(w2, D, W);
    }
    static set(D, w2, O) {
      w2.onmouseenter = _CellDropdownItemEvents.highlightItem.bind(D, O), w2.onmouseleave = _CellDropdownItemEvents.blurItem.bind(this, O, "hovered");
    }
  };
  var _CellDropdownItem = class ae {
    // prettier-ignore
    static updateCellElementIfNotUpdated(D, w2, O, x2, U) {
      D.data[O][x2] !== w2 && CellEvents.updateCell(D, w2, O, x2, { processText: false, element: U });
    }
    // prettier-ignore
    static selectExistingItem(D, w2, O, x2, U) {
      var W;
      const F = CellElement.getText(w2.children[0]);
      ae.updateCellElementIfNotUpdated(D, F, O, x2, U), LabelCellTextElement.isLabelText(U) && (U.style.backgroundColor = (W = D._columnsDetails[x2].cellDropdown.itemsDetails[F]) == null ? void 0 : W.backgroundColor);
    }
    // prettier-ignore
    static addNewItem(D, w2, O, x2) {
      const { cellDropdown: { labelDetails: U } } = O, F = CellElement.getText(w2);
      if (F === EMPTY_STRING)
        return;
      let W = "";
      if (U) {
        const { globalItemColors: { newColors: G, existingColors: X } } = U;
        W = x2 || X[F] || G[G.length - 1] || LabelColorUtils.getLatestPasteleColor(), w2.style.backgroundColor = W, X[F] ?? (X[F] = W), G.pop() || LabelColorUtils.setNewLatestPasteleColor();
      } else
        W = ae.ACTIVE_ITEM_BACKGROUND_COLOR;
      ae.addItem(D, F, W, O), setTimeout(() => FireEvents.onColumnsUpdate(D));
    }
    // prettier-ignore
    static updateCellTextBgColor(D, w2, O, x2) {
      const U = CellElement.getText(w2);
      if (D)
        w2.style.backgroundColor = O.itemsDetails[U].backgroundColor;
      else if (!O.canAddMoreOptions || U === EMPTY_STRING || U === x2)
        w2.style.backgroundColor = "";
      else if (O.labelDetails) {
        const { globalItemColors: { newColors: F, existingColors: W } } = O.labelDetails;
        w2.style.backgroundColor = W[U] || (F == null ? void 0 : F[F.length - 1]) || LabelColorUtils.getLatestPasteleColor();
      }
    }
    static updateItemColor(D, w2) {
      D && (w2.matchingWithCellText = D, D.dispatchEvent(new MouseEvent("mouseenter")));
    }
    static hideHoveredItemHighlight(D) {
      const { hovered: w2, matchingWithCellText: O } = D;
      w2 ? w2.style.backgroundColor = "" : D.hovered = O;
    }
    // prettier-ignore
    static attemptHighlightMatchingItemWithCell(D, w2, O, x2, U) {
      var K;
      const { activeItems: F, itemsDetails: W } = w2, G = CellElement.getText(D), X = U || ((K = W[G]) == null ? void 0 : K.element);
      (!X || F.matchingWithCellText !== X) && (ae.hideHoveredItemHighlight(F), CellDropdownItemEvents.blurItem(w2, "matchingWithCellText")), ae.updateItemColor(X, F), x2 && w2.labelDetails && ae.updateCellTextBgColor(X, D, w2, O);
    }
    // prettier-ignore
    static setItemOnCell(D, w2) {
      const { element: O, rowIndex: x2, columnIndex: U } = D._focusedElements.cell, { cellDropdown: F, settings: { defaultText: W } } = D._columnsDetails[U], G = O.children[0], X = CellElement.getText(w2.children[0]);
      ae.updateCellElementIfNotUpdated(D, X, x2, U, G), ae.attemptHighlightMatchingItemWithCell(G, F, W, true, w2), CaretPosition.setToEndOfText(D, G);
    }
    // prettier-ignore
    static setSiblingItemOnCell(D, w2, O) {
      const { hovered: x2, matchingWithCellText: U } = w2, F = x2 || U, W = F == null ? void 0 : F[O];
      if (W)
        ae.setItemOnCell(D, W);
      else {
        const { columnIndex: G } = D._focusedElements.cell, X = D._columnsDetails[G].cellDropdown.element;
        if (O === "nextSibling") {
          const K = X.children[0];
          K && ae.setItemOnCell(D, K);
        } else {
          const K = X.children[X.children.length - 1];
          K && ae.setItemOnCell(D, K);
        }
      }
    }
    static addItemElement(D, w2, O, x2 = false) {
      const { cellDropdown: U } = O, F = DropdownItem.addPlaneButtonItem(U.element, w2, x2 ? 0 : void 0);
      if (U.customItemStyle && (F.style.color = U.customItemStyle.textColor), U.canAddMoreOptions) {
        const W = OptionDeleteButton.create(D, O);
        if (F.appendChild(W), Browser.IS_COLOR_PICKER_SUPPORTED && U.labelDetails) {
          const G = OptionColorButton.create(D._columnsDetails, O);
          F.appendChild(G);
        }
      }
      return CellDropdownItemEvents.set(D.shadowRoot, F, U), F;
    }
    static addItem(D, w2, O, x2, U = false) {
      x2.cellDropdown.itemsDetails[w2] = {
        backgroundColor: O,
        isCustomBackgroundColor: U,
        element: ae.addItemElement(D, w2, x2)
      };
    }
    static addItems(D, w2, O) {
      O.cellDropdown.element.replaceChildren(), O.cellDropdown.itemsDetails = {}, Object.keys(w2).forEach((x2) => {
        ae.addItem(D, x2, w2[x2].color, O, !!w2[x2].isCustom);
      });
    }
    static postProcessItemToColor(D, w2, O) {
      D && delete w2[O];
    }
    // prettier-ignore
    static processNewItemsToColor(D, w2, O, x2) {
      D.slice(1).reduce((U, F) => {
        const W = F[w2];
        if (W !== EMPTY_STRING && !U[W])
          if (x2) {
            const { globalItemColors: { newColors: G, existingColors: X } } = x2;
            U[W] = { color: X[W] || G.pop() || LabelColorUtils.getLatestPasteleColorAndSetNew() }, X[W] ?? (X[W] = U[W].color);
          } else
            U[W] = { color: ae.ACTIVE_ITEM_BACKGROUND_COLOR };
        return U;
      }, O);
    }
    // prettier-ignore
    static changeUserOptionsToItemToColor(D, w2) {
      return D.reduce((O, x2) => {
        var U;
        if (w2) {
          const { globalItemColors: { newColors: F, existingColors: W } } = w2;
          O[x2.text] = { color: x2.backgroundColor || W[x2.text] || F.pop() || LabelColorUtils.getLatestPasteleColorAndSetNew(), isCustom: true }, W[U = x2.text] ?? (W[U] = O[x2.text].color);
        } else
          O[x2.text] = { color: ae.ACTIVE_ITEM_BACKGROUND_COLOR, isCustom: true };
        return O;
      }, {});
    }
    // prettier-ignore
    static populateItems(D, w2) {
      const { data: O, _columnsDetails: x2 } = D, U = x2[w2], {
        cellDropdown: { labelDetails: F },
        settings: { defaultText: W, isDefaultTextRemovable: G },
        activeType: { cellDropdownProps: X }
      } = U;
      if (!X)
        return;
      let K = {};
      X.options && (K = ae.changeUserOptionsToItemToColor(X.options, F)), X.canAddMoreOptions && ae.processNewItemsToColor(O, w2, K, F), ae.postProcessItemToColor(G, K, W), ae.addItems(D, K, U);
    }
  };
  _CellDropdownItem.ACTIVE_ITEM_BACKGROUND_COLOR = "#4a69d4";
  var CellDropdownItem = _CellDropdownItem;
  var _LabelCellTextElement = class ct {
    static isLabelText(D) {
      return D.classList.contains(ct.TEXT_CLASS);
    }
    static setCellTextAsAnElement(D, w2, O) {
      const x2 = CellTextElement.setCellTextAsAnElement(D, O);
      x2.classList.add(ct.TEXT_CLASS), x2.style.backgroundColor = w2;
    }
    // prettier-ignore
    static finaliseEditedText(D, w2, O, x2 = false) {
      var q;
      const U = D._columnsDetails[O], { cellDropdown: F, activeType: { cellDropdownProps: W }, settings: { defaultText: G, isDefaultTextRemovable: X } } = U, K = (q = F.itemsDetails[CellElement.getText(w2)]) == null ? void 0 : q.backgroundColor;
      CellElement.getText(w2) === EMPTY_STRING || X && CellElement.getText(w2) === G ? w2.style.backgroundColor = "" : x2 && K ? w2.style.backgroundColor = K : W != null && W.canAddMoreOptions && CellDropdownItem.addNewItem(D, w2, U, w2.style.backgroundColor);
    }
  };
  _LabelCellTextElement.TEXT_CLASS = "label-cell-text";
  var LabelCellTextElement = _LabelCellTextElement;
  var CellDropdownEvents = class _CellDropdownEvents {
    // instead of binding click event handlers with the context of current row index to individual item elements every
    // time the dropdown is displayed, click events are handled on the dropdown instead, the reason for this is
    // because it can be expensive to rebind an arbitrary amount of items e.g. 10000+
    // prettier-ignore
    static click(D) {
      const w2 = D.target;
      if (w2.classList.contains(Dropdown.DROPDOWN_CLASS) || w2.classList.contains(OptionButton.BUTTON_CLASS))
        return;
      const { rowIndex: O, columnIndex: x2, element: U } = this._focusedElements.cell, F = w2.classList.contains(DropdownItem.DROPDOWN_ITEM_CLASS) ? w2 : w2.parentElement;
      CellDropdownItem.selectExistingItem(
        this,
        F,
        O,
        x2,
        U.children[0]
      ), CellWithTextEvents.programmaticBlur(this);
    }
    // this is required to record to stop cell blur from closing the dropdown
    // additionally if the user clicks on dropdown scroll or padding, this will record it
    static mouseDown(D, w2) {
      D.cellDropdown = w2;
    }
    static set(D, w2) {
      w2.onmousedown = _CellDropdownEvents.mouseDown.bind(this, D._focusedElements, w2), w2.onclick = _CellDropdownEvents.click.bind(D);
    }
  };
  var _CellDropdown2 = class ce {
    static generateRightPosition() {
      return "4px";
    }
    // prettier-ignore
    static generateBottomPosition(D, w2, O) {
      const x2 = D.offsetParent, U = O.bottomWidth + O.topWidth;
      return `${x2.offsetHeight - U - D.offsetTop - w2.offsetTop + 6}px`;
    }
    // prettier-ignore
    static generateTopPosition(D, w2, O) {
      const x2 = LabelCellTextElement.isLabelText(w2) ? w2.offsetTop + w2.offsetHeight + 2 : D.offsetHeight - 8;
      return `${ElementOffset.processTop(D.offsetTop + x2, O)}px`;
    }
    // prettier-ignore
    static generateLeftPosition(D, w2, O) {
      const x2 = LabelCellTextElement.isLabelText(w2) ? w2.offsetLeft : 1;
      return `${ElementOffset.processLeft(D.offsetLeft + x2, O)}px`;
    }
    // prettier-ignore
    static correctPosition(D, w2, O, x2) {
      const U = ElementVisibility.getDetailsInWindow(D, x2);
      U.isFullyVisible || (U.blockingSides.has(SIDE.RIGHT) && (D.style.left = "", D.style.right = ce.generateRightPosition()), U.blockingSides.has(SIDE.BOTTOM) && (D.style.top = "", D.style.bottom = ce.generateBottomPosition(
        w2,
        O,
        x2
      )));
    }
    // prettier-ignore
    static correctPositionForOverflow(D, w2, O) {
      w2.offsetHeight !== O.scrollHeight && (D.style.top = `${w2.offsetHeight - D.offsetHeight}px`), w2.offsetWidth !== O.scrollWidth && (D.style.left = `${w2.offsetWidth - D.offsetWidth}px`);
    }
    static setPosition(D, w2, O) {
      const x2 = w2.children[0];
      D.style.bottom = "", D.style.right = "", D.style.left = ce.generateLeftPosition(w2, x2, O), D.style.top = ce.generateTopPosition(w2, x2, O);
      const U = D.parentElement.parentElement, F = U.parentElement;
      OverflowUtils.isOverflowElement(F) ? ce.correctPositionForOverflow(D, U, F) : ce.correctPosition(D, w2, x2, O);
    }
    // prettier-ignore
    static updateCellDropdown(D, w2, O, x2, U, F) {
      const W = CellElement.getTextElement(D);
      CellDropdownItem.attemptHighlightMatchingItemWithCell(
        W,
        w2,
        x2,
        U,
        F
      ), U && ce.setPosition(w2.element, W.parentElement, O);
    }
    static focusItemOnDropdownOpen(D, w2, O) {
      CellDropdownItem.attemptHighlightMatchingItemWithCell(D, w2, O, false);
    }
    // prettier-ignore
    static correctWidthForOverflow(D) {
      if (D.clientWidth !== D.scrollWidth) {
        const w2 = D.clientHeight !== D.scrollHeight ? 16 : 0, O = D.scrollWidth + w2;
        D.style.width = `${Math.min(O, ce.MAX_WIDTH)}px`;
      }
      D.children.length > 0 && D.scrollWidth < D.children[0].getBoundingClientRect().width && (D.style.width = `${D.clientWidth + 1}px`);
    }
    static getWidth(D, w2, O) {
      if (O != null && O.width)
        return Number.parseInt(O.width);
      if (!w2.labelDetails)
        return Math.max(D.offsetWidth - 2, ce.MIN_WIDTH);
      const x2 = D.children[0];
      return Math.max(D.offsetWidth - x2.offsetLeft * 2, ce.MIN_WIDTH);
    }
    // prettier-ignore
    static display(D, w2, O) {
      const { cellDropdown: x2, settings: { defaultText: U }, activeType: { cellDropdownProps: F } } = D._columnsDetails[w2], { element: W, itemsDetails: G } = x2;
      if (Object.keys(G).length > 0 && F) {
        CellDropdownEvents.set(D, W), CellDropdownItemEvents.blurItem(x2, "hovered"), CellDropdownItemEvents.blurItem(x2, "matchingWithCellText"), W.style.width = `${ce.getWidth(O, x2, F.dropdownStyle)}px`, Dropdown.display(W), W.scrollLeft = 0, ce.correctWidthForOverflow(W), CellDropdownScrollbar.setProperties(x2), ce.setPosition(W, O, D._tableDimensions.border);
        const X = O.children[0];
        return ce.focusItemOnDropdownOpen(X, x2, U), true;
      }
      return false;
    }
    static setCustomStyle(D, w2) {
      const { paddingTop: O, paddingBottom: x2, marginTop: U, marginLeft: F, border: W, textAlign: G } = w2;
      D.element.style.paddingTop = O || Dropdown.DROPDOWN_VERTICAL_PX, D.element.style.paddingBottom = x2 || Dropdown.DROPDOWN_VERTICAL_PX, D.element.style.marginTop = U || "0px", D.element.style.marginLeft = F || "0px", D.element.style.border = W || "none", D.element.style.textAlign = G || "left";
    }
    static setCustomState(D, w2) {
      D.customDropdownStyle = w2.dropdownStyle, D.customItemStyle = w2.optionStyle, D.canAddMoreOptions = !!w2.canAddMoreOptions;
    }
    // prettier-ignore
    static setUpDropdown(D, w2) {
      const { _columnsDetails: O, _globalItemColors: x2 } = D, { activeType: { cellDropdownProps: U }, cellDropdown: F } = O[w2];
      U && (F.labelDetails = U.isBasicSelect ? void 0 : { globalItemColors: x2 }, ce.setCustomState(F, U), CellDropdownItem.populateItems(D, w2), U.dropdownStyle && ce.setCustomStyle(F, U.dropdownStyle));
    }
    // REF-8 - Created for every column
    static createAndAppend(D) {
      const w2 = Dropdown.createBase();
      return w2.style.maxHeight = ce.MAX_HEIGHT_PX, w2.classList.add(ce.CELL_DROPDOWN_CLASS), D.appendChild(w2), w2;
    }
    static getDefaultObj(D) {
      return {
        itemsDetails: {},
        activeItems: {},
        element: D,
        canAddMoreOptions: true,
        scrollbarPresence: {
          horizontal: false,
          vertical: false
        }
      };
    }
    static createContainerElement() {
      return document.createElement("div");
    }
  };
  _CellDropdown2.CELL_DROPDOWN_CLASS = "cell-dropdown";
  _CellDropdown2.MAX_HEIGHT_PX = "147px";
  _CellDropdown2.MIN_WIDTH = 70;
  _CellDropdown2.MAX_WIDTH = 200;
  var CellDropdown = _CellDropdown2;
  var _ColumnDetails = class Fe {
    // prettier-ignore
    static getHeaderDefaultColor(D, w2, O, x2) {
      var U, F, W, G, X, K;
      return ((F = (U = x2 == null ? void 0 : x2.headerStyles) == null ? void 0 : U.default) == null ? void 0 : F[w2]) || ((W = x2 == null ? void 0 : x2.cellStyle) == null ? void 0 : W[w2]) || ((X = (G = D.headerStyles) == null ? void 0 : G.default) == null ? void 0 : X[w2]) || ((K = D.cellStyle) == null ? void 0 : K[w2]) || O;
    }
    // prettier-ignore
    static getHeaderHoverColor(D, w2, O, x2) {
      var U, F, W, G;
      return ((F = (U = x2 == null ? void 0 : x2.headerStyles) == null ? void 0 : U.hoverColors) == null ? void 0 : F[w2]) || ((G = (W = D.headerStyles) == null ? void 0 : W.hoverColors) == null ? void 0 : G[w2]) || Fe.getHeaderDefaultColor(D, w2, O, x2);
    }
    // settings variable is a variable attached to columnDetails and can be either default or custom
    // prettier-ignore
    static createHeaderStateColors(D, w2, O) {
      return {
        hover: {
          color: Fe.getHeaderHoverColor(D, "color", O.color, w2),
          backgroundColor: Fe.getHeaderHoverColor(
            D,
            "backgroundColor",
            O.backgroundColor,
            w2
          )
        },
        default: {
          color: Fe.getHeaderDefaultColor(D, "color", "", w2),
          backgroundColor: Fe.getHeaderDefaultColor(D, "backgroundColor", "", w2)
        }
      };
    }
    // prettier-ignore
    static createInitial(D, w2, O, x2, U) {
      const F = O || D;
      return {
        elements: [],
        processedStyle: [],
        settings: F,
        headerStateColors: Fe.createHeaderStateColors(D, O, x2),
        bordersOverwrittenBySiblings: {},
        activeType: ColumnTypesUtils.getActiveType(F),
        cellDropdown: CellDropdown.getDefaultObj(w2),
        fireColumnsUpdate: U
      };
    }
    // prettier-ignore
    static updateWithNoSizer(D, w2) {
      return Object.assign(D, { columnDropdownCellOverlay: w2 }), D;
    }
  };
  _ColumnDetails.MINIMAL_COLUMN_WIDTH = 34;
  var ColumnDetails = _ColumnDetails;
  var MaximumColumns = class _MaximumColumns {
    // the motivation behind minimal column length came from the fact that when we have set a table width and all the columns
    // have become too narrow (24px), upon adding any subsequent columns - the set table width would be ignored and the table
    // would expand - as an infinite amount of columns can't just be added to a table width a preset width
    // the actual minimal column length is usually not reached as dividing table width by its columns rarely produces it
    // originally this was set to 28, however the extra padding on the left column causes the table width to overflow
    // the set limit hence it is set to 34 instead
    // REF-24
    // this is a small effort to toggle off the add new column button when columns with set widths breach the table
    static isStaticContentBreachingSetTableWidth(D, w2) {
      if (w2)
        return false;
      const O = D.width || D.maxWidth;
      return O !== void 0 && D.staticWidth > O;
    }
    // prettier-ignore
    static ignoreMinimalColumnWidthCheck(D, w2, O) {
      return D.preserveNarrowColumns || !StaticTable.isStaticTableWidth(w2, D) || O === 0;
    }
    // prettier-ignore
    static canAddMore(D) {
      const { _tableElementRef: w2, _columnsDetails: O, _tableDimensions: x2, maxColumns: U, preserveNarrowColumns: F } = D, W = O.length;
      if (U !== void 0 && U > 0 && U === W || _MaximumColumns.isStaticContentBreachingSetTableWidth(x2, F))
        return false;
      const G = w2;
      return _MaximumColumns.ignoreMinimalColumnWidthCheck(x2, G, W) ? true : (G.offsetWidth - x2.staticWidth) / (W + 1) >= ColumnDetails.MINIMAL_COLUMN_WIDTH;
    }
  };
  var _AddNewColumnEvents = class We {
    static setHeaderCellStyle(D, w2, O) {
      const { default: x2, hover: U } = w2;
      D.style.color = O ? U.color : x2.color, D.style.backgroundColor = O ? U.backgroundColor : x2.backgroundColor;
    }
    static setDataCellStyle(D, w2) {
      setTimeout(() => {
        D.forEach((O) => {
          O.style.backgroundColor = w2;
        });
      });
    }
    // prettier-ignore
    static setDataCellsStyle(D, w2, O) {
      const x2 = D ? O.hover.backgroundColor : O.default.backgroundColor, U = w2.slice(1), F = Math.ceil(U.length / We.NUMBER_OF_HIGHLIGHT_CHUNKS);
      for (let W = 0; W < U.length; W += F) {
        const G = U.slice(W, W + F);
        We.setDataCellStyle(G, x2);
      }
    }
    // prettier-ignore
    static toggleColor(D, w2, O) {
      const { data: x2, header: U } = O, F = w2[0];
      F && We.setHeaderCellStyle(F, U, D), w2.length > 1 && We.setDataCellsStyle(D, w2, x2);
    }
    // prettier-ignore
    static setEvents(D, w2) {
      const { _addColumnCellsElementsRef: O, _frameComponents: { cellColors: x2 } } = D;
      w2.onmouseenter = We.toggleColor.bind(this, true, O, x2), w2.onmouseleave = We.toggleColor.bind(this, false, O, x2), w2.onclick = InsertNewColumn.insertEvent.bind(D);
    }
  };
  _AddNewColumnEvents.NUMBER_OF_HIGHLIGHT_CHUNKS = 3;
  var AddNewColumnEvents = _AddNewColumnEvents;
  var _AddNewColumnElement = class pe {
    // the toggling of the add new column element is not a simple display style change because the following selector:
    // .row > .cell:last-of-type which is responsible for not adding a right-border for the rightmost cell can only
    // detect the last .cell element, so when this button is displayed we want the selector to recognise it and
    // not display a border on the right and not affect the css of the cell before it. When it is not displayed,
    // we want the previous cell to be recognised by the selector. Unfortunately this is not possible as even
    // renaming the class names on this button does not re-trigger selector to identify the previous cell as last.
    // The only way to do this is to remove the cell element when not visible, which is what the code below is doing
    // and re-adding the cell when it is visible. (The cell still remains in the addColumnCellsElementsRef object).
    static setDisplay(D, w2, O, x2) {
      w2 ? O.children[x2].appendChild(D) : D.remove();
    }
    static createCell(D, w2) {
      var x2;
      const O = CellElement.createBaseCell(w2);
      return O.classList.add(
        CellElement.CELL_CLASS,
        GenericElementUtils.NOT_SELECTABLE_CLASS,
        pe.ADD_COLUMN_CELL_CLASS
      ), Object.assign(O.style, D._defaultColumnsSettings.cellStyle, (x2 = D._frameComponents.styles) == null ? void 0 : x2.default), AddNewColumnEvents.setEvents(D, O), O;
    }
    // prettier-ignore
    static createHeaderCell(D) {
      const { _defaultColumnsSettings: { headerStyles: w2 }, _frameComponents: { cellColors: O, inheritHeaderColors: x2 } } = D, U = pe.createCell(D, true);
      return U.style.width = pe.DEFAULT_WIDTH_PX, U.innerText = "+", Object.assign(U.style, x2 ? w2 == null ? void 0 : w2.default : {}, O.header.default), U;
    }
    static createDataCell(D) {
      const w2 = pe.createCell(D, false);
      return Object.assign(w2.style, D._frameComponents.cellColors.data.default), w2;
    }
    static isDisplayed(D) {
      return GenericElementUtils.doesElementExistInDom(D[0]);
    }
    static createAndAppendToRow(D, w2, O) {
      const { _addColumnCellsElementsRef: x2, _columnsDetails: U } = D, F = x2.length === 0 || pe.isDisplayed(x2), W = O === 0 ? pe.createHeaderCell(D) : pe.createDataCell(D);
      x2.splice(O, 0, W);
      const G = U[U.length - 1];
      ColumnSettingsBorderUtils.unsetSubjectBorder(x2, G.elements, "left", O), F && (MaximumColumns.canAddMore(D) ? w2.appendChild(W) : O === 0 && TableElement.changeStaticWidthTotal(D._tableDimensions, -pe.DEFAULT_WIDTH));
    }
    // prettier-ignore
    static toggleEachCell(D, w2, O, x2) {
      O.forEach((U, F) => {
        pe.setDisplay(U, D, w2, F);
      }), D || setTimeout(() => AddNewColumnEvents.toggleColor(false, O, x2));
    }
    static changeTableWidths(D, w2, O) {
      const x2 = w2 ? pe.DEFAULT_WIDTH : -pe.DEFAULT_WIDTH;
      TableElement.changeStaticWidthTotal(D._tableDimensions, x2), StaticTableWidthUtils.changeWidthsBasedOnColumnInsertRemove(D, O);
    }
    // prettier-ignore
    static toggle(D, w2) {
      const {
        _addColumnCellsElementsRef: O,
        _tableBodyElementRef: x2,
        _frameComponents: { displayAddNewColumn: U, cellColors: F }
      } = D;
      if (!U || !x2)
        return;
      const W = MaximumColumns.canAddMore(D);
      W !== pe.isDisplayed(O) && (W ? (pe.toggleEachCell(W, x2, O, F), pe.changeTableWidths(D, W, w2)) : (pe.changeTableWidths(D, W, w2), pe.toggleEachCell(W, x2, O, F)));
    }
  };
  _AddNewColumnElement.ADD_COLUMN_CELL_CLASS = "add-column-cell";
  _AddNewColumnElement.DEFAULT_WIDTH = 25;
  _AddNewColumnElement.DEFAULT_WIDTH_PX = `${_AddNewColumnElement.DEFAULT_WIDTH}px`;
  var AddNewColumnElement = _AddNewColumnElement;
  var ExtractElements = class {
    static textCellsArrFromRow(D) {
      return Array.from(D.children).filter(
        (w2) => (w2.tagName === CellElement.HEADER_TAG || w2.tagName === CellElement.DATA_TAG) && !w2.classList.contains(AddNewColumnElement.ADD_COLUMN_CELL_CLASS) && !w2.classList.contains(IndexColumn.INDEX_CELL_CLASS)
      );
    }
    static textRowsArrFromTBody(D, w2, O = 0) {
      return Array.from(D.children).slice(O, w2.length);
    }
    static getRightColumnSiblingCell(D) {
      var w2;
      return (w2 = D.nextSibling) == null ? void 0 : w2.nextSibling;
    }
  };
  var ColumnSettingsFrameBorderUtils = class _ColumnSettingsFrameBorderUtils {
    // prettier-ignore
    static toggleFrameBorder(D, w2, O, x2) {
      if (D.length > 0) {
        const { subjectBorderStyle: U, siblingBorderStyle: F } = ColumnSettingsBorderUtils.getColumnBorderStyles(O), W = D[0], G = w2[0];
        ColumnSettingsBorderUtils.isBorderDisplayed(G, F) ? ColumnSettingsBorderUtils.unsetSubjectBorder(D, w2, O, 0) : W.style[U] === ColumnSettingsBorderUtils.UNSET_PX && ResetColumnStyles.applyDefaultStyles(D, x2);
      }
    }
    // prettier-ignore
    static updateFrameColumns(D, w2, O, x2) {
      const U = w2 || O;
      if (!U)
        return;
      const {
        _defaultColumnsSettings: F,
        _addColumnCellsElementsRef: W,
        _frameComponents: { displayAddNewColumn: G, displayIndexColumn: X }
      } = D;
      if (!x2 && G && _ColumnSettingsFrameBorderUtils.toggleFrameBorder(
        W,
        U.elements,
        "left",
        F
      ), !O && X) {
        const q = ExtractElements.textRowsArrFromTBody(D._tableBodyElementRef, D.data, 0).map((Q) => Q.children[0]);
        _ColumnSettingsFrameBorderUtils.toggleFrameBorder(q, U.elements, "right", F);
      }
    }
  };
  var _ColumnSettingsBorderUtils = class de {
    // REF-23
    static overwriteSideBorderIfSiblingsHaveSettings(D, w2) {
      const { left: O, right: x2 } = D.bordersOverwrittenBySiblings;
      w2.forEach((U) => {
        O && (U.style.borderLeftWidth = de.UNSET_PX), x2 && (U.style.borderRightWidth = de.UNSET_PX);
      });
    }
    // prettier-ignore
    static getColumnBorderStyles(D) {
      return { subjectBorderStyle: D === "left" ? "borderLeftWidth" : "borderRightWidth", siblingBorderStyle: D === "left" ? "borderRightWidth" : "borderLeftWidth" };
    }
    static isBorderDisplayed(D, w2) {
      return !!(D.style[w2] && D.style[w2] !== de.UNSET_PX);
    }
    // REF-23
    // prettier-ignore
    static unsetSubjectBorder(D, w2, O, x2, U) {
      const { subjectBorderStyle: F, siblingBorderStyle: W } = de.getColumnBorderStyles(O), G = D[x2], X = w2[x2];
      de.isBorderDisplayed(G, F) && de.isBorderDisplayed(X, W) && (U && (U[O] = true), D.forEach((K) => {
        ElementStyle.setStyle(K, F, de.UNSET_PX);
      }));
    }
    // prettier-ignore
    static unsetColumnBorder(D, w2, O) {
      de.unsetSubjectBorder(
        D.elements,
        w2.elements,
        O,
        0,
        D.bordersOverwrittenBySiblings
      );
    }
    // if current column and sibling have custom setting styles
    // REF-23
    // prettier-ignore
    static unsetBorders(D, w2, O) {
      D && (D.settings.stylePrecedence ? (w2 && de.unsetColumnBorder(w2, D, "right"), O && (O.settings.stylePrecedence ? de.unsetColumnBorder(D, O, "right") : O.settings.stylePrecedence || de.unsetColumnBorder(O, D, "left"))) : (O && O.settings.stylePrecedence && de.unsetColumnBorder(D, O, "right"), w2 && w2.settings.stylePrecedence && de.unsetColumnBorder(D, w2, "left")));
    }
    static resetBorderOverwritingState(D) {
      D && (D.bordersOverwrittenBySiblings.left = false, D.bordersOverwrittenBySiblings.right = false);
    }
    // prettier-ignore
    static resetIfBorderOverwritten(D, w2, O, x2) {
      O != null && O.bordersOverwrittenBySiblings[x2] && (O.bordersOverwrittenBySiblings[x2] = false, ColumnSettingsStyleUtils.changeStyleFunc(D, w2, D._columnsDetails[w2].settings));
    }
    // REF-23
    static updateSiblingColumns(D, w2) {
      const { _columnsDetails: O } = D, x2 = O[w2], U = O[w2 - 1], F = O[w2 + 1];
      de.resetIfBorderOverwritten(D, w2 + 1, F, "left"), de.resetIfBorderOverwritten(D, w2 - 1, U, "right"), de.resetBorderOverwritingState(x2), de.unsetBorders(x2, U, F), ColumnSettingsFrameBorderUtils.updateFrameColumns(D, x2, U, F);
    }
  };
  _ColumnSettingsBorderUtils.UNSET_PX = "0px";
  var ColumnSettingsBorderUtils = _ColumnSettingsBorderUtils;
  var _CellElement = class Ee {
    // prettier-ignore
    static setDefaultCellStyle(D, w2, O) {
      Object.assign(D.style, w2, O);
    }
    static createBaseCell(D) {
      const w2 = document.createElement(D ? Ee.HEADER_TAG : Ee.DATA_TAG);
      return D && w2.classList.add(Ee.HEADER_CELL_CLASS), w2.classList.add(Ee.CELL_CLASS), w2;
    }
    // prettier-ignore
    static createDataCell(D, w2, O, x2) {
      const U = Ee.createBaseCell(D);
      return D && x2 && U.classList.add(GenericElementUtils.NOT_SELECTABLE_CLASS), U.setAttribute("role", "textbox"), Ee.setDefaultCellStyle(U, w2, O), U;
    }
    static setCursor(D, w2) {
      D.style.cursor = w2 ? "text" : "default";
    }
    static prepContentEditable(D, w2, O = false) {
      CaretDisplayFix.isIssueBrowser() ? (w2 && CaretDisplayFix.setTabIndex(D), CaretDisplayFix.removeContentEditable(D)) : D.contentEditable = String(w2), O || Ee.setCursor(D, w2);
    }
    // prettier-ignore
    // this is used for cases where element could be the cell element or the text inside a select/label cell
    static getCellElement(D) {
      return D.classList.contains(CellTextElement.CELL_TEXT_DIV_CLASS) || D.classList.contains(DateCellInputElement.DATE_INPUT_CONTAINER_CLASS) ? D.parentElement : D.classList.contains(DateCellInputElement.DATE_INPUT_CLASS) || D.classList.contains(DateCellCalendarIconElement.CALENDAR_ICON_CONTAINER_CLASS) ? D.parentElement.parentElement : D;
    }
    static getTextElement(D) {
      var w2, O;
      return (w2 = D.children[0]) != null && w2.classList.contains(CellTextElement.CELL_TEXT_DIV_CLASS) ? D.children[0] : (O = D.children[1]) != null && O.classList.contains(CellTextElement.CELL_TEXT_DIV_CLASS) ? D.children[1] : CheckboxCellElement.isCheckboxCell(D) ? D.children[0] : D;
    }
    // The reason why .trim() is used is because innerText/textContent property does not just return the cell text, but
    // additionally the new line characters (\n) which represent <br> elements within the cell that make it difficult
    // to compare cell text to other strings or use them for other programmatic purposes.
    // CAUTION-1 - The returned string should not be used to set text on other cells as .trim() removes \n chars for
    // <br> tags which are used to set the pointer position.
    static getText(D) {
      const w2 = CheckboxCellElement.getValue(D);
      return w2 !== void 0 ? w2 : D.innerText.trim();
    }
    // this is used for case where element could be cell element that contains a text div element,
    // hence we need to set the text into the correct container
    // CAUTION-1 - be careful that the text does not come from above method
    static setText(D, w2) {
      if (!CheckboxCellElement.setValue(D, w2)) {
        const O = Ee.getTextElement(D);
        O.innerText = w2;
      }
    }
    // set text is optional as some elements may only need to toggle the BR padding
    // prettier-ignore
    static setNewText(D, w2, O, x2, U, F = true) {
      F && Ee.setText(w2, O), x2 ? setTimeout(() => CaretDisplayFix.toggleCellTextBRPadding(D, w2, U)) : CaretDisplayFix.toggleCellTextBRPadding(D, w2, U);
    }
    // REF-36
    static setColumnWidth(D, w2, O, x2) {
      if (!D._tableElementRef)
        return;
      const U = (O == null ? void 0 : O.widths) || (x2 == null ? void 0 : x2.widths);
      if (U != null && U.staticWidth)
        ColumnSettingsWidthUtils.updateColumnWidth(D, w2, U, true);
      else if (U != null && U.initialWidth) {
        const F = ColumnSettingsWidthUtils.getSettingsWidthNumber(D._tableElementRef, U, false);
        w2.style.width = `${F.number}px`;
      } else
        w2.style.width = `${D._tableDimensions.newColumnWidth}px`;
    }
    // prettier-ignore
    static createCellElement(D, w2, O, x2) {
      var le, re, ut;
      const { _defaultColumnsSettings: { cellStyle: U, headerStyles: F }, _columnsDetails: W } = D, G = W[O], X = (ut = (re = (le = D._defaultColumnsSettings.columnDropdown) == null ? void 0 : le.displaySettings) == null ? void 0 : re.openMethod) == null ? void 0 : ut.cellClick, K = Ee.createDataCell(
        x2,
        U,
        x2 ? F == null ? void 0 : F.default : {},
        X
      ), { settings: q } = G;
      ColumnSettingsStyleUtils.applySettingsStyleOnCell(q, K, x2), ColumnSettingsBorderUtils.overwriteSideBorderIfSiblingsHaveSettings(G, [K]);
      const Q = x2 ? !X && q.isHeaderTextEditable : q.isCellTextEditable;
      return Ee.prepContentEditable(K, !!Q, X), x2 && Ee.setColumnWidth(D, K, q, D._defaultColumnsSettings), Ee.setNewText(D, K, w2, true, false), K;
    }
  };
  _CellElement.CELL_CLASS = "cell";
  _CellElement.HEADER_CELL_CLASS = "header-cell";
  _CellElement.HEADER_TAG = "TH";
  _CellElement.DATA_TAG = "TD";
  var CellElement = _CellElement;
  var _FilterViaWebWorkers = class Me {
    // prettier-ignore
    static processOtherColumnsIfPresent(D, w2, O, x2) {
      FilterInternalUtils.ACTIVE_WORKERS -= 1, O.length > 1 && x2.length > 0 ? Me.execute(D, w2, O.slice(1), x2) : FilterInternalUtils.ACTIVE_WORKERS === 0 && D();
    }
    // cannot use a direct link to a webworker file as parent project may not allow the component to access it
    // const worker = new Worker(new URL('./worker.js', import.meta.url))
    // using a string literal instead, ref:
    // https://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
    static createWorkerBlobURL() {
      const D = new Blob([Me.CODE], { type: "application/javascript" });
      return URL.createObjectURL(D);
    }
    static hideRows(D, w2, O, x2) {
      const { colCells: U } = O[0], { matchingIndexes: F, notMatchingIndexes: W } = x2.data;
      W.forEach((G) => {
        U[G].parentElement.classList.add(FilterInternalUtils.HIDDEN_ROW_CLASS);
      }), Me.processOtherColumnsIfPresent(D, w2, O, F);
    }
    static toggleRows(D, w2, O, x2) {
      const U = [], { colCells: F } = O[0];
      x2.data.forEach((G, X) => {
        const K = F[X].parentElement;
        G ? (K.classList.remove(FilterInternalUtils.HIDDEN_ROW_CLASS), U.push(X)) : K.classList.add(FilterInternalUtils.HIDDEN_ROW_CLASS);
      }), Me.processOtherColumnsIfPresent(D, w2, O, U);
    }
    // prettier-ignore
    static execute(D, w2, O, x2) {
      const U = new Worker(w2);
      FilterInternalUtils.ACTIVE_WORKERS += 1, U.onmessage = x2 ? Me.hideRows.bind(this, D, w2, O) : Me.toggleRows.bind(this, D, w2, O);
      const F = O[0];
      U.postMessage({
        chunk: F.colCells.map((W) => CellElement.getText(W)),
        filterText: F.filterText,
        isCaseSensitive: F.isCaseSensitive,
        indexArray: x2
      });
    }
  };
  _FilterViaWebWorkers.TRAVERSE_CHUNK = `
    const result = chunk.map((text) => (isCaseSensitive ? text : text.toLocaleLowerCase()).includes(filterText));
    self.postMessage(result);
  `;
  _FilterViaWebWorkers.TRAVERSE_MATCHING_INDEXES = `
    const matchingIndexes = [];
    const notMatchingIndexes = [];
    indexArray.forEach((index) => {
      const text = chunk[index];
      const isMatching = (isCaseSensitive ? text : text.toLocaleLowerCase()).includes(filterText);
      if (isMatching) {
        matchingIndexes.push(index);
      } else {
        notMatchingIndexes.push(index);
      }
    });
    self.postMessage({matchingIndexes, notMatchingIndexes});
  `;
  _FilterViaWebWorkers.CODE = `
    self.onmessage = function (event) {
      const {chunk, indexArray, filterText, isCaseSensitive} = event.data;
      if (indexArray) {
        ${_FilterViaWebWorkers.TRAVERSE_MATCHING_INDEXES}
      } else {
        ${_FilterViaWebWorkers.TRAVERSE_CHUNK}
      }
    };
  `;
  var FilterViaWebWorkers = _FilterViaWebWorkers;
  var FilterViaTimeouts = class _FilterViaTimeouts {
    static processOtherColumnsIfPresent(D, w2, O) {
      FilterInternalUtils.ACTIVE_WORKERS -= 1, w2.length > 1 && O.length > 0 ? _FilterViaTimeouts.processOtherColumns(D, w2.slice(1), O) : FilterInternalUtils.ACTIVE_WORKERS === 0 && D();
    }
    static toggleRow(D, w2, O, x2) {
      const U = CellElement.getText(D), W = (w2.isCaseSensitive ? U : U.toLocaleLowerCase()).includes(w2.filterText), G = D.parentElement;
      W ? (G.classList.remove(FilterInternalUtils.HIDDEN_ROW_CLASS), O.push(x2)) : G.classList.add(FilterInternalUtils.HIDDEN_ROW_CLASS);
    }
    static processOtherColumns(D, w2, O) {
      setTimeout(() => {
        FilterInternalUtils.ACTIVE_WORKERS += 1;
        const x2 = [], U = w2[0];
        O.forEach((F) => {
          const W = U.chunk[F];
          _FilterViaTimeouts.toggleRow(W, U, x2, F);
        }), _FilterViaTimeouts.processOtherColumnsIfPresent(D, w2, x2);
      });
    }
    static execute(D, w2) {
      FilterInternalUtils.ACTIVE_WORKERS += 1, setTimeout(() => {
        const O = [], x2 = w2[0];
        x2.chunk.forEach((U, F) => {
          _FilterViaTimeouts.toggleRow(U, x2, O, F);
        }), _FilterViaTimeouts.processOtherColumnsIfPresent(D, w2, O);
      });
    }
  };
  var _FilterInternalUtils = class Ne {
    static finishFiltering(D) {
      D.pagination && (PageButtonContainerElement.repopulateButtons(D), PaginationUtils.displayRowsForDifferentButton(D, 1));
    }
    static getFilterFunc(D) {
      const w2 = Ne.finishFiltering.bind(this, D);
      return window.Worker ? FilterViaWebWorkers.execute.bind(this, w2, FilterViaWebWorkers.createWorkerBlobURL()) : FilterViaTimeouts.execute.bind(this, w2);
    }
    static generateDefaultHeaderName(D, w2) {
      var O, x2, U;
      return w2 && ((O = D[0]) == null ? void 0 : O.find((W) => W === w2)) ? w2 : ((x2 = D[0]) == null ? void 0 : x2[0]) !== void 0 ? String((U = D[0]) == null ? void 0 : U[0]) : "";
    }
    static addConfig(D, w2) {
      var F;
      const { placeholderTemplate: O, defaultColumnHeaderName: x2 } = w2, U = {
        isCaseSensitive: false,
        placeholderTemplate: O,
        defaultColumnHeaderName: x2 || Ne.generateDefaultHeaderName(D.data)
      };
      return (F = D._visiblityInternal).filters ?? (F.filters = []), D._visiblityInternal.filters.push(U), U;
    }
    // colElements are used to identify active column (not using name as columns can have same names)
    static assignElements(D, w2) {
      var U;
      const { data: O, _columnsDetails: x2 } = D;
      if (O.length !== 0)
        if (w2.defaultColumnHeaderName) {
          const F = O[0].findIndex((W) => W === w2.defaultColumnHeaderName);
          w2.elements = x2[F === -1 ? 0 : F].elements, delete w2.defaultColumnHeaderName;
        } else
          w2.elements && !((U = D.shadowRoot) != null && U.contains(w2.elements[0])) && (w2.elements = x2[0].elements);
    }
    // prettier-ignore
    static resetInput(D, w2) {
      const { _visiblityInternal: { filters: O } } = D;
      if (Ne.assignElements(D, w2), !w2.elements || !O)
        return;
      const x2 = CellElement.getText(w2.elements[0]);
      w2.lastRegisteredHeaderName = x2, FilterInputElement.setPlaceholder(w2.inputElement, x2, w2.placeholderTemplate), FilterInputEvents.setEvents(D, w2, O);
    }
    static unsetFilter(D) {
      D.value !== "" && (D.value = "", D.dispatchEvent(new Event("input")));
    }
    static unsetAllFilters(D) {
      var F, W;
      let w2 = false;
      const { data: O, _visiblityInternal: x2, _tableBodyElementRef: U } = D;
      return O[0] && O[0].length !== 0 && U && ((F = x2.filters) == null || F.forEach((G) => {
        G.inputElement.value !== "" && (G.inputElement.value = "", w2 = true);
      }), w2 && ((W = x2.filters) == null || W[0].inputElement.dispatchEvent(new Event("input")))), w2;
    }
    // prettier-ignore
    static resetAllInputs(D) {
      const { data: w2, _visiblityInternal: { filters: O } } = D;
      if (!w2[0] || w2[0].length === 0 || !O)
        return FilterInputEvents.unsetEvents(O);
      O.forEach((x2) => Ne.resetInput(D, x2)), Ne.unsetAllFilters(D);
    }
    static completeReset(D) {
      const w2 = D._visiblityInternal.filters;
      w2 && (Array.isArray(D.filter) ? D.filter.forEach((O, x2) => {
        w2[x2].defaultColumnHeaderName = O.defaultColumnHeaderName;
      }) : typeof D.filter == "object" && (w2[0].defaultColumnHeaderName = D.filter.defaultColumnHeaderName), Ne.resetAllInputs(D));
    }
    static isContainerRequired(D, w2) {
      let O = false;
      if (Array.isArray(D))
        O = !!D.find((x2) => {
          const U = (x2.position || FilterElements.DEFAULT_INPUT_POSITION).indexOf(w2);
          return U !== void 0 && U >= 0;
        });
      else if (typeof D == "object") {
        const x2 = (D.position || FilterElements.DEFAULT_INPUT_POSITION).indexOf(w2);
        O = x2 !== void 0 && x2 >= 0;
      } else if (typeof D == "boolean") {
        const x2 = FilterElements.DEFAULT_INPUT_POSITION.indexOf(w2);
        O = x2 !== void 0 && x2 >= 0;
      }
      return O;
    }
    static extractUnfilteredRows(D, w2) {
      return Array.from(D.children).slice(0, w2).filter((x2) => !x2.classList.contains(Ne.HIDDEN_ROW_CLASS));
    }
    // prettier-ignore
    static wasHeaderChanged(D, w2, O, x2) {
      const U = D[O].elements, F = w2.find((W) => U === W.elements);
      return F && (F.lastRegisteredHeaderName !== CellElement.getText(U[0]) || x2);
    }
  };
  _FilterInternalUtils.ACTIVE_WORKERS = 0;
  _FilterInternalUtils.CHUNK_SIZE = 2;
  _FilterInternalUtils.HIDDEN_ROW_CLASS = "filter-hidden-row";
  var FilterInternalUtils = _FilterInternalUtils;
  var FileImportInputElement = class {
    // always created as the user may want to trigger the importCSV method without the CSV buttons and need this to work
    static create(D) {
      const w2 = document.createElement("input");
      return w2.type = "file", w2.hidden = true, setTimeout(() => {
        var O;
        (O = D._tableElementRef) == null || O.appendChild(w2);
      }), w2;
    }
  };
  var FilesUtils = class {
    static processStyles(D) {
      const w2 = { default: {}, hover: { backgroundColor: "#f0f0f0" }, click: { backgroundColor: "#e4e4e4" } };
      return D && (Object.assign(w2.default, D.default), Object.assign(w2.hover, D.hover), Object.assign(w2.click, D.click)), w2;
    }
    static createDefault(D) {
      return { inputElementRef: FileImportInputElement.create(D) };
    }
  };
  FilesUtils.DEFAULT_BUTTON_POSITION = "bottom-left";
  var _OuterContainerElements = class se {
    // REF-38
    static getColumnContentContainer(D) {
      return D.children[0].children[0];
    }
    static setContainerHeightBasedOnMiddleColumn(D) {
      if (D.getBoundingClientRect().height === 0) {
        const w2 = se.getColumnContentContainer(D.children[1]);
        D.style.height = `${w2.getBoundingClientRect().height}px`;
      }
    }
    static setHeightsWhenOnlyMiddleColumns(D) {
      setTimeout(() => {
        D.top && se.setContainerHeightBasedOnMiddleColumn(D.top), D.bottom && se.setContainerHeightBasedOnMiddleColumn(D.bottom);
      });
    }
    // REF-38
    static appendChildToColumn(D, w2) {
      se.getColumnContentContainer(D).appendChild(w2);
    }
    // REF-38
    static addToContainer(D, w2, O) {
      const x2 = D.indexOf("top") >= 0 ? w2.top : w2.bottom;
      D.indexOf("left") >= 0 ? se.appendChildToColumn(x2.children[0], O) : D.indexOf("center") >= 0 ? se.appendChildToColumn(x2.children[1], O) : se.appendChildToColumn(x2.children[2], O);
    }
    // REF-38
    // need an inner divs in order for the inserted components 'width' properties to work as CONTAINER_CLASS has width: 0px
    static createContainerColumn(D, w2) {
      const O = document.createElement("div");
      O.classList.add(se.COLUMN_CLASS, D);
      const x2 = document.createElement("div");
      x2.classList.add(se.COLUMN_INNER_CLASS);
      const U = document.createElement("div");
      return U.classList.add(se.COLUMN_CONTENT_CLASS), x2.appendChild(U), O.appendChild(x2), O.style.gridColumn = w2, O;
    }
    static createContainerElement() {
      const D = document.createElement("div");
      D.classList.add(se.CONTAINER_CLASS);
      const w2 = se.createContainerColumn(se.LEFT_COLUMN_CLASS, "1");
      D.appendChild(w2);
      const O = se.createContainerColumn(se.CENTER_COLUMN_CLASS, "2");
      D.appendChild(O);
      const x2 = se.createContainerColumn(se.RIGHT_COLUMN_CLASS, "3");
      return D.appendChild(x2), D;
    }
    static addContainer(D, w2, O) {
      const x2 = se.createContainerElement();
      x2.id = w2, O != null && O.style.fontFamily && (x2.style.fontFamily = O.style.fontFamily);
      const U = w2 === se.TOP_CONTAINER_ID ? "beforebegin" : "afterend";
      return D.insertAdjacentElement(U, x2), x2;
    }
    // can be reused for other positional components
    static isRequired(D, w2) {
      return !!Object.keys(D).find((O) => {
        const { position: x2 } = D[O];
        return x2.indexOf(w2) >= 0;
      });
    }
    static isContainerRequired(D, w2) {
      var x2;
      let O = false;
      return D.pagination && (O = se.isRequired(D._pagination.positions, w2)), !O && ((x2 = D.files) != null && x2.buttons) && (O = !!D.files.buttons.find((U) => (U.position || FilesUtils.DEFAULT_BUTTON_POSITION).indexOf(w2) >= 0)), !O && D.filter && (O = FilterInternalUtils.isContainerRequired(D.filter, w2)), O;
    }
    // we create a top and a bottom container only if they are required
    static create(D) {
      var W;
      const w2 = {}, O = se.isContainerRequired(D, "top"), x2 = se.isContainerRequired(D, "bottom"), { _tableElementRef: U } = D, F = ((W = D._overflow) == null ? void 0 : W.overflowContainer) || U;
      if (!F)
        return w2;
      if (O) {
        const G = se.addContainer(F, se.TOP_CONTAINER_ID, U);
        w2.top = G;
      }
      if (x2) {
        const G = se.addContainer(F, se.BOTTOM_CONTAINER_ID, U);
        w2.bottom = G;
      }
      return se.setHeightsWhenOnlyMiddleColumns(w2), w2;
    }
  };
  _OuterContainerElements.ABSOULUTE_FULL_TABLE_CLASS = "absolute-container";
  _OuterContainerElements.CONTAINER_CLASS = "outer-container";
  _OuterContainerElements.TOP_CONTAINER_ID = "outer-top-container";
  _OuterContainerElements.BOTTOM_CONTAINER_ID = "outer-bottom-container";
  _OuterContainerElements.COLUMN_CLASS = "outer-container-column";
  _OuterContainerElements.COLUMN_INNER_CLASS = "outer-container-column-inner";
  _OuterContainerElements.COLUMN_CONTENT_CLASS = "outer-container-column-content";
  _OuterContainerElements.LEFT_COLUMN_CLASS = "outer-container-left-column";
  _OuterContainerElements.CENTER_COLUMN_CLASS = "outer-container-center-column";
  _OuterContainerElements.RIGHT_COLUMN_CLASS = "outer-container-right-column";
  var OuterContainerElements = _OuterContainerElements;
  var _OuterDropdownButtonUtils = class ot {
    static processStatefulStyle(D) {
      D.hover ?? (D.hover = D.default), D.click ?? (D.click = D.hover);
    }
    static processAndApplyDefaultStyle(D, w2) {
      w2 && (ot.processStatefulStyle(w2), Object.assign(D.style, w2.default));
    }
    static createArrow(D, w2) {
      const O = document.createElement("div");
      O.classList.add(ot.ARROW_CONTAINER_CLASS, GenericElementUtils.NOT_SELECTABLE_CLASS), D && O.classList.add(...D);
      const x2 = SVGIconUtils.createSVGElement(ARROW_DOWN_SVG_STRING);
      return x2.classList.add(ot.ARROW_ICON_CLASS), w2 && x2.classList.add(...w2), O.appendChild(x2), O;
    }
  };
  _OuterDropdownButtonUtils.ARROW_CONTAINER_CLASS = "outer-dropdown-button-arrow-container";
  _OuterDropdownButtonUtils.ARROW_ICON_CLASS = "outer-dropdown-button-arrow-icon";
  var OuterDropdownButtonUtils = _OuterDropdownButtonUtils;
  var RowsPerPageSelectButtonEvents = class _RowsPerPageSelectButtonEvents {
    static mouseDown(D, w2) {
      var U, F, W, G, X, K;
      Object.assign(w2.style, (F = (U = D.styles.rowsPerPageSelect) == null ? void 0 : U.button) == null ? void 0 : F.click);
      const O = w2.children[0];
      Object.assign(O.style, (G = (W = D.styles.rowsPerPageSelect) == null ? void 0 : W.buttonText) == null ? void 0 : G.click);
      const x2 = w2.children[1];
      Object.assign(x2.style, (K = (X = D.styles.rowsPerPageSelect) == null ? void 0 : X.buttonArrow) == null ? void 0 : K.click);
    }
    static mouseLeave(D, w2) {
      RowsPerPageSelectButtonElement.applyStylesOnElements(w2, "default", D.rowsPerPageSelect);
    }
    static mouseEnter(D, w2) {
      RowsPerPageSelectButtonElement.applyStylesOnElements(w2, "hover", D.rowsPerPageSelect);
    }
    static setEvents(D, w2) {
      w2.onmouseenter = _RowsPerPageSelectButtonEvents.mouseEnter.bind(this, D._pagination.styles, w2), w2.onmouseleave = _RowsPerPageSelectButtonEvents.mouseLeave.bind(this, D._pagination.styles, w2), w2.onmousedown = _RowsPerPageSelectButtonEvents.mouseDown.bind(this, D._pagination, w2), w2.onmouseup = _RowsPerPageSelectButtonEvents.mouseEnter.bind(this, D._pagination.styles, w2);
    }
  };
  var _RowsPerPageSelectButtonElement = class ze {
    // prettier-ignore
    static applyStylesOnElements(D, w2, O) {
      if (!O)
        return;
      const { button: x2, buttonText: U, buttonArrow: F } = O;
      if (x2 && StatefulCSSEvents.apply(x2, x2[w2], D), U) {
        const W = D.children[0];
        StatefulCSSEvents.apply(U, U[w2], W);
      }
      if (F) {
        const W = D.children[1];
        StatefulCSSEvents.apply(F, F[w2], W);
      }
    }
    static createButtonArrow(D) {
      var O;
      const w2 = OuterDropdownButtonUtils.createArrow();
      return OuterDropdownButtonUtils.processAndApplyDefaultStyle(w2, (O = D.styles.rowsPerPageSelect) == null ? void 0 : O.buttonArrow), w2;
    }
    static updateButtonText(D, w2) {
      const O = D.children[0];
      O.innerText = w2;
    }
    static createButtonText(D) {
      var W;
      const { isAllRowsOptionSelected: w2, rowsPerPageOptionsItemText: O, rowsPerPage: x2, styles: U } = D, F = document.createElement("div");
      return F.id = ze.TEXT_ID, F.classList.add(GenericElementUtils.NOT_SELECTABLE_CLASS), OuterDropdownButtonUtils.processAndApplyDefaultStyle(F, (W = U.rowsPerPageSelect) == null ? void 0 : W.buttonText), F.innerText = w2 ? O[0] : String(x2), F;
    }
    static createOptionsButton(D) {
      var O;
      const w2 = document.createElement("div");
      return w2.id = ze.BUTTON_ID, OuterDropdownButtonUtils.processAndApplyDefaultStyle(w2, (O = D.styles.rowsPerPageSelect) == null ? void 0 : O.button), w2;
    }
    static create(D) {
      const w2 = ze.createOptionsButton(D._pagination);
      return w2.appendChild(ze.createButtonText(D._pagination)), w2.appendChild(ze.createButtonArrow(D._pagination)), setTimeout(() => RowsPerPageSelectButtonEvents.setEvents(D, w2)), w2;
    }
  };
  _RowsPerPageSelectButtonElement.BUTTON_ID = "rows-per-page-select-button";
  _RowsPerPageSelectButtonElement.TEXT_ID = "rows-per-page-select-button-text";
  var RowsPerPageSelectButtonElement = _RowsPerPageSelectButtonElement;
  var RowsPerPageDropdown = class _RowsPerPageDropdown {
    static getLeftPropertyToCenterDropdown(D, w2) {
      return `${D.offsetLeft + D.offsetWidth / 2 - w2 / 2}px`;
    }
    static display(D, w2, O) {
      const { dropdownWidth: x2 } = w2._pagination, { element: U } = O;
      U.style.left = _RowsPerPageDropdown.getLeftPropertyToCenterDropdown(D, x2), OuterDropdownSimpleUtils.display(D, w2, O);
    }
    static setWidth(D, w2) {
      const x2 = w2.rowsPerPageOptionsItemText.reduce((U, F) => isNaN(Number(F)) ? U : Math.max(U, F.length), 1) * 8;
      w2.dropdownWidth = w2.dropdownWidth + x2, D.style.width = `${w2.dropdownWidth}px`;
    }
    static create(D, w2) {
      const O = OuterDropdownSimpleUtils.hide.bind(this, D._activeOverlayElements), x2 = _RowsPerPageDropdown.display.bind(this, w2), U = OuterDropdownElement.create(D, w2, "bottom-center", {}, [], O, x2);
      return RowsPerPageDropdownItem.populate(D, U.element, w2), _RowsPerPageDropdown.setWidth(U.element, D._pagination), U;
    }
  };
  var _RowsPerPageSelectElement = class qe {
    static createText(D) {
      var O;
      const w2 = document.createElement("div");
      return w2.id = qe.TEXT_ID, w2.style.marginRight = "8px", Object.assign(w2.style, (O = D.styles.rowsPerPageSelect) == null ? void 0 : O.prefixText), w2.innerText = D.rowsPerPageSelect.prefixText, w2;
    }
    static createContainer(D) {
      var O;
      const w2 = document.createElement("div");
      return w2.id = qe.ID, w2.classList.add(PaginationElements.PAGINATION_TEXT_COMPONENT_CLASS), w2.style.order = String(D.positions.rowsPerPageSelect.order), Object.assign(w2.style, (O = D.styles.rowsPerPageSelect) == null ? void 0 : O.container), w2;
    }
    // prettier-ignore
    static create(D, w2) {
      const O = qe.createContainer(D._pagination);
      O.appendChild(qe.createText(D._pagination));
      const x2 = RowsPerPageSelectButtonElement.create(D), U = RowsPerPageDropdown.create(D, x2);
      return O.appendChild(x2), O.appendChild(U.element), OuterContainerElements.addToContainer(
        D._pagination.positions.rowsPerPageSelect.position,
        w2,
        O
      ), O;
    }
  };
  _RowsPerPageSelectElement.ID = "pagination-number-of-rows-select";
  _RowsPerPageSelectElement.TEXT_ID = "pagination-number-of-rows-select-text";
  var RowsPerPageSelectElement = _RowsPerPageSelectElement;
  var PaginationElements = class {
    static create(D, w2) {
      D._pagination.buttonContainer = PageButtonContainerElement.create(D), PageButtonContainerElement.addInitialElements(D, w2), D._pagination.rowsPerPageOptionsItemText && RowsPerPageSelectElement.create(D, w2), D._pagination.displayNumberOfVisibleRows && (D._pagination.numberOfVisibleRowsElement = NumberOfVisibleRowsElement.create(D, w2));
    }
  };
  PaginationElements.PAGINATION_TEXT_COMPONENT_CLASS = "pagination-text-component";
  var _NumberOfVisibleRowsElement = class Ze {
    static updateForRelativeRowNumber(D, w2) {
      const { activePageNumber: O, rowsPerPage: x2, numberOfVisibleRowsElement: U } = D, F = O * x2, W = w2 < 1 ? 0 : Math.max(F - x2 + 1, 1), G = Math.min(w2, F);
      U.innerText = `${W}-${G} of ${w2}`;
    }
    static updateForAllRows(D, w2) {
      D.innerText = `${Math.min(w2, 1)}-${w2} of ${w2}`;
    }
    static update(D) {
      var G, X;
      const { _pagination: w2, data: O, dataStartsAtHeader: x2 } = D, { numberOfVisibleRowsElement: U, isAllRowsOptionSelected: F } = w2;
      if (!U)
        return;
      const W = ((X = (G = D._pagination) == null ? void 0 : G.asyncStartData) == null ? void 0 : X.totalDataRows) || Math.max(x2 ? O.length : O.length - 1, 0);
      F ? Ze.updateForAllRows(U, W) : Ze.updateForRelativeRowNumber(D._pagination, W);
    }
    static create(D, w2) {
      const O = document.createElement("div");
      O.id = Ze.ID, O.classList.add(PaginationElements.PAGINATION_TEXT_COMPONENT_CLASS);
      const { styles: x2, positions: U } = D._pagination;
      return O.style.order = String(U.numberOfVisibleRows.order), Object.assign(O.style, x2.numberOfVisibleRows), OuterContainerElements.addToContainer(U.numberOfVisibleRows.position, w2, O), setTimeout(() => Ze.update(D)), O;
    }
  };
  _NumberOfVisibleRowsElement.ID = "pagination-number-of-visible-rows";
  var NumberOfVisibleRowsElement = _NumberOfVisibleRowsElement;
  var PageNumberButtonEvents = class _PageNumberButtonEvents {
    // REF-30
    static markClick(D) {
      D.clickedPageNumberButton = true, setTimeout(() => D.clickedPageNumberButton = false);
    }
    static buttonMouseUp(D, w2) {
      _PageNumberButtonEvents.markClick(this._pagination);
      const O = w2.target, { pageButtons: x2 } = this._pagination.styles;
      this._pagination.activePageNumber === D || PaginationUtils.getAndApplyDataOnButtonClick(this, D), PageButtonStyle.mouseEnter(O, x2, false);
    }
    static setEvents(D, w2, O) {
      O.onmouseup = _PageNumberButtonEvents.buttonMouseUp.bind(D, w2);
    }
  };
  var PageNumberButtonElement = class {
    static create(D, w2) {
      const O = PageButtonElement.create(D._pagination.styles.pageButtons, false);
      return O.innerHTML = String(w2), setTimeout(() => PageNumberButtonEvents.setEvents(D, w2, O)), O;
    }
  };
  var PaginationUpdatePageButtons = class _PaginationUpdatePageButtons {
    static removeLastNumberButton(D, w2) {
      w2[w2.length - 1].remove();
      const O = w2[0], x2 = Number(O.innerText);
      if (x2 > 1) {
        const U = PageNumberButtonElement.create(D, x2 - 1);
        O.insertAdjacentElement("beforebegin", U);
      }
    }
    static updateOnRowRemove(D) {
      const w2 = PaginationUtils.getPageNumberButtons(D._pagination), O = w2[w2.length - 1];
      Number(O.innerText) > PaginationUtils.getLastPossiblePageNumber(D) ? w2.length > 1 && _PaginationUpdatePageButtons.removeLastNumberButton(D, w2) : D.data.length < (D.dataStartsAtHeader ? 1 : 2) && PageButtonElement.setDisabled(D._pagination);
    }
    static addNewNumberButtonAtEndIfNeeded(D, w2) {
      const O = w2[w2.length - 1], x2 = PaginationUtils.getLastPossiblePageNumber(D, true);
      if (Number(O.innerText) < x2) {
        const U = PageNumberButtonElement.create(D, x2);
        O.insertAdjacentElement("afterend", U);
      }
    }
    static updateOnRowInsert(D) {
      const w2 = D.dataStartsAtHeader ? 0 : 1;
      if (D.data.length === w2)
        PageButtonElement.unsetDisabled(D._pagination);
      else {
        const O = PaginationUtils.getPageNumberButtons(D._pagination);
        O.length < D._pagination.maxNumberOfVisiblePageButtons && _PaginationUpdatePageButtons.addNewNumberButtonAtEndIfNeeded(D, O);
      }
    }
    // prettier-ignore
    static shiftLeftwards(D, w2, O) {
      const { activePageNumber: x2 } = D._pagination, U = w2[0], F = Number(U.innerText);
      let W = x2 <= w2.length / 2 ? F - 1 : O - x2, G = F;
      W > w2.length && (W = w2.length, G = w2.length + 1);
      for (let X = W - 1; X >= 0; X -= 1) {
        const K = PageNumberButtonElement.create(D, G - X - 1);
        U.insertAdjacentElement("beforebegin", K);
      }
      w2.slice(w2.length - W).forEach((X) => X.remove());
    }
    // prettier-ignore
    static shiftRightwards(D, w2, O, x2) {
      const { activePageNumber: U } = D._pagination, F = PaginationUtils.getLastPossiblePageNumber(D);
      let W = U > F - w2.length / 2 ? F - O : U - x2, G = O;
      W > w2.length && (W = w2.length, G = U - w2.length);
      const X = w2[w2.length - 1];
      for (let K = W - 1; K >= 0; K -= 1) {
        const q = PageNumberButtonElement.create(D, K + G + 1);
        X.insertAdjacentElement("afterend", q);
      }
      w2.slice(0, W).forEach((K) => K.remove());
    }
    static updateOnNewActive(D) {
      const w2 = PaginationUtils.getPageNumberButtons(D._pagination), { activePageNumber: O, maxNumberOfVisiblePageButtons: x2 } = D._pagination;
      if (w2.length < x2)
        return;
      const U = Number(w2[w2.length - 1].innerText), F = Math.floor(U - w2.length / 2) + 1;
      if (O > F)
        _PaginationUpdatePageButtons.shiftRightwards(D, w2, U, F);
      else {
        const W = Math.ceil(U - w2.length / 2);
        O < W && _PaginationUpdatePageButtons.shiftLeftwards(D, w2, W);
      }
    }
  };
  var _LoadingElement = class he {
    static createSpinner(D) {
      const w2 = document.createElement("span");
      return w2.className = "loading-spinner", Object.assign(w2.style, D), w2;
    }
    static applyTableStyles(D, w2, O) {
      D.forEach((x2) => {
        w2[x2] && (O.style[x2] = w2[x2]);
      });
    }
    static removeTableStyles(D, w2) {
      D.forEach((O) => {
        delete w2.style[O];
      });
    }
    static processCustom(D, w2) {
      return D.style.display === "none" && (D.style.display = "block"), Object.assign(D.style, w2 == null ? void 0 : w2.container), D;
    }
    // prettier-ignore
    static createContainer(D, w2) {
      const O = document.createElement("div");
      return w2 && he.applyTableStyles(
        ["width", "minWidth", "maxHeight", "height", "minHeight", "maxHeight", "border", "borderColor", "borderWidth"],
        w2,
        O
      ), Object.assign(O.style, D == null ? void 0 : D.container), O;
    }
    static createNew(D, w2) {
      const O = he.createContainer(D, w2);
      O.classList.add(he.DEFAULT_LOADING_CONTAINER_CLASS);
      const x2 = he.createSpinner(D == null ? void 0 : D.spinner);
      return O.appendChild(x2), O;
    }
    static processInitial(D) {
      const { loadingStyles: w2, tableStyle: O } = D, x2 = D.children[0];
      return x2 ? he.processCustom(x2, w2) : he.createNew(w2, O);
    }
    static addInitial(D) {
      var w2;
      D._activeOverlayElements.loading = he.processInitial(D), (w2 = D.shadowRoot) == null || w2.appendChild(D._activeOverlayElements.loading);
    }
    static update(D, w2, O) {
      D.classList.contains(he.DEFAULT_LOADING_CONTAINER_CLASS) && w2 && (he.removeTableStyles(
        ["width", "minWidth", "maxHeight", "height", "minHeight", "maxHeight", "border", "borderColor", "borderWidth"],
        D
      ), Object.assign(D.style, O == null ? void 0 : O.container)), O != null && O.loadingBackgroundColor && (D.style.backgroundColor = O == null ? void 0 : O.loadingBackgroundColor);
    }
    static addActive(D) {
      var O;
      const { loading: w2 } = D._activeOverlayElements;
      w2 && (w2.classList.contains(OuterContainerElements.ABSOULUTE_FULL_TABLE_CLASS) || (w2.classList.add(OuterContainerElements.ABSOULUTE_FULL_TABLE_CLASS), he.update(w2, D.tableStyle, D.loadingStyles)), (O = D._tableElementRef) == null || O.appendChild(w2));
    }
  };
  _LoadingElement.DEFAULT_LOADING_CONTAINER_CLASS = "default-loading-container";
  var LoadingElement = _LoadingElement;
  var ErrorElement = class {
    static create() {
      const D = document.createElement("div");
      D.id = "error-container", D.classList.add(OuterContainerElements.ABSOULUTE_FULL_TABLE_CLASS);
      const w2 = document.createElement("div");
      return w2.id = "error-text", w2.innerHTML = "Error retrieving data", D.appendChild(w2), D;
    }
    static display(D) {
      const { error: w2 } = D._activeOverlayElements;
      w2 && D._tableElementRef && D._tableElementRef.appendChild(w2);
    }
    static remove(D) {
      var w2;
      (w2 = D._activeOverlayElements.error) == null || w2.remove();
    }
  };
  var PaginationAsyncUtils = class _PaginationAsyncUtils {
    static displayError(D, w2) {
      ErrorElement.display(w2), console.error(D), console.error("Error fetching page information");
    }
    // prettier-ignore
    static setNewElementText(D, w2, O, x2, U) {
      CellEvents.updateCell(
        D,
        w2,
        U,
        x2,
        { element: O, processText: false, updateCellEvent: false, updateTableEvent: false }
      ), ColumnTypesUtils.updateDataElements(D, U, x2, O);
    }
    static insertData(D, w2, O) {
      const x2 = D.dataStartsAtHeader ? 0 : 1, U = (O - 1) * 10 + x2;
      w2.length > D._pagination.rowsPerPage && (w2 = w2.slice(0, D._pagination.rowsPerPage)), U + w2.length > D.data.length && (w2 = w2.slice(0, w2.length - (U + w2.length - D.data.length))), w2.forEach((F, W) => {
        F.forEach((G, X) => {
          const K = U + W, q = D._columnsDetails[X].elements[K];
          _PaginationAsyncUtils.setNewElementText(D, G, q, X, K);
        });
      }), UpdateIndexColumnWidth.update(D);
    }
    static async getAndApplyNewData(D, w2, O, x2) {
      var W;
      const U = x2 || O;
      D._pagination.asyncGetId = U, ErrorElement.remove(D), LoadingElement.addActive(D), PageButtonElement.setActive(D, O);
      let F = [[]];
      try {
        if (F = await w2.getPageData(O, D._pagination.rowsPerPage), D._pagination.asyncGetId !== U)
          return;
      } catch (G) {
        _PaginationAsyncUtils.displayError(G, D);
      }
      _PaginationAsyncUtils.insertData(D, F, O), (W = D._activeOverlayElements.loading) == null || W.remove(), PaginationUtils.displayRowsForDifferentButton(D, O);
    }
    static isAsyncPagination(D) {
      return typeof D == "object" && D.async;
    }
    static removeLoadingOverlay(D) {
      var w2;
      _PaginationAsyncUtils.isAsyncPagination(D.pagination) && ((w2 = D._activeOverlayElements.loading) == null || w2.remove());
    }
    static preprocessTablePropertiesIfAsync(D) {
      var w2;
      _PaginationAsyncUtils.isAsyncPagination(D.pagination) && (D.displayAddNewRow = false, D.displayAddNewColumn = false, D.rowDropdown.displaySettings.isAvailable = false, D.columnDropdown = { displaySettings: { isAvailable: false } }, D.files ?? (D.files = {}), D.files.buttons = (w2 = D.files.buttons) == null ? void 0 : w2.filter((O) => !O.import), D.files.dragAndDrop = false);
    }
  };
  var _PaginationUtils = class ne {
    static getLastPossiblePageNumber(D, w2 = false) {
      const { _pagination: O, dataStartsAtHeader: x2 } = D;
      if (O.isAllRowsOptionSelected)
        return 1;
      const U = PaginationInternalUtils.getTotalNumberOfRows(D), F = x2 ? U + 1 : U, W = w2 ? F : F - 1;
      return Math.max(Math.ceil(W / O.rowsPerPage), 1);
    }
    static getPageNumberButtons(D) {
      const { buttonContainer: w2, numberOfActionButtons: O } = D, x2 = Array.from(w2.children), U = O / 2;
      return x2.slice(U, x2.length - U);
    }
    static hideRow(D) {
      var w2;
      ((w2 = D.children[0]) == null ? void 0 : w2.tagName) === CellElement.HEADER_TAG ? D.classList.add(ne.HIDDEN_ROW_CLASS) : D.style.display = "none";
    }
    static displayRow(D, w2) {
      D.children[0].tagName === CellElement.HEADER_TAG ? D.classList.remove(ne.HIDDEN_ROW_CLASS) : D.style.display = "", w2.push(D);
    }
    // changes to the page that the row was moved to
    static updateOnRowMove(D, w2) {
      const { activePageNumber: O } = D._pagination;
      PaginationRowIndexes.getMaxVisibleRowIndex(D) <= w2 ? ne.displayRowsForDifferentButton(D, O + 1) : w2 > 0 && D._tableBodyElementRef && w2 < PaginationRowIndexes.getVisibleRowRealIndex(D._tableBodyElementRef, D._pagination, 0) && ne.displayRowsForDifferentButton(D, O - 1);
    }
    // prettier-ignore
    static getSiblingVisibleRow(D, w2) {
      const O = D == null ? void 0 : D[w2];
      if (!(!O || AddNewRowElement.isAddNewRowRow(O)))
        return O.classList.contains(FilterInternalUtils.HIDDEN_ROW_CLASS) ? ne.getSiblingVisibleRow(O, w2) : O;
    }
    static updateRowsOnRemoval(D, w2) {
      const { visibleRows: O, activePageNumber: x2 } = D._pagination;
      if (!(x2 === 1 && w2 === -1))
        if (O.splice(w2, 1), O.length > 0) {
          const U = O[O.length - 1], F = ne.getSiblingVisibleRow(U, "nextSibling");
          F && ne.displayRow(F, O);
        } else
          x2 > 1 && (ne.displayRowsForDifferentButton(D, x2 - 1), D._visiblityInternal.filters && ne.getLastPossiblePageNumber(D) !== x2 - 1 && ne.displayRowsForDifferentButton(D, x2));
    }
    static hideLastVisibleRow(D) {
      const { visibleRows: w2 } = D;
      if (w2.length === 0)
        return;
      const O = w2[w2.length - 1];
      ne.hideRow(O), D.visibleRows.splice(D.visibleRows.length - 1, 1);
    }
    static updateRowsOnNewInsert(D, w2, O) {
      const { rowsPerPage: x2, visibleRows: U, activePageNumber: F, isAllRowsOptionSelected: W } = D._pagination;
      if (PaginationRowIndexes.getMaxVisibleRowIndex(D) > w2 && D._tableBodyElementRef) {
        U.length === x2 && !W && ne.hideLastVisibleRow(D._pagination);
        const G = PaginationRowIndexes.getVisibleRowIndex(D._tableBodyElementRef, D._pagination, w2);
        U.splice(G === -1 ? U.length : G, 0, O);
      } else
        ne.hideRow(O), setTimeout(() => {
          const G = ne.getLastPossiblePageNumber(D), X = F + 1;
          G < X ? ne.setCorrectRowsAsVisible(D, G) : ne.displayRowsForDifferentButton(D, X);
        });
    }
    // for removal - we pass visible row index as when filter is set - we need to get it before the element is removed
    static updateOnRowChange(D, w2, O) {
      const { dataStartsAtHeader: x2, _pagination: U } = D;
      !x2 && w2 === 0 && PaginationInternalUtils.getTotalNumberOfRows(D) === 0 || (PaginationVisibleButtonsUtils.unsetStateAndStyles(U), O ? (PaginationUpdatePageButtons.updateOnRowInsert(D), ne.updateRowsOnNewInsert(D, w2, O)) : (PaginationUpdatePageButtons.updateOnRowRemove(D), ne.updateRowsOnRemoval(D, w2)), PaginationPageActionButtonUtils.toggleActionButtons(D), PaginationVisibleButtonsUtils.setStateAndStyles(D), setTimeout(() => NumberOfVisibleRowsElement.update(D)));
    }
    static initialRowUpdates(D, w2, O) {
      const x2 = D.dataStartsAtHeader ? w2 + 1 : w2;
      x2 > D._pagination.rowsPerPage ? ne.hideRow(O) : x2 > 0 && D._pagination.visibleRows.push(O);
    }
    // REF-32
    static updateAddRowRow(D) {
      if (D._stripedRows && D._tableBodyElementRef && D._addRowCellElementRef) {
        const w2 = D._addRowCellElementRef.parentElement, O = Array.from(D._tableBodyElementRef.children).length - 1, x2 = ne.getLastPossiblePageNumber(D) !== D._pagination.activePageNumber;
        CustomRowProperties.updateRow(D, w2, O, x2, O);
      }
    }
    // prettier-ignore
    static setCorrectRowsAsVisible(D, w2) {
      const { _pagination: { rowsPerPage: O, visibleRows: x2 }, _tableBodyElementRef: U, data: F, _visiblityInternal: W } = D, G = W != null && W.filters ? FilterInternalUtils.extractUnfilteredRows(U, F.length) : ExtractElements.textRowsArrFromTBody(U, F);
      let X = O * (w2 - 1);
      D.dataStartsAtHeader || (X += 1), G.slice(X, X + O).forEach((K) => {
        ne.displayRow(K, x2);
      });
    }
    static hideAllRows(D) {
      D.visibleRows.forEach((w2) => ne.hideRow(w2)), D.visibleRows = [];
    }
    static displayRowsForDifferentButton(D, w2) {
      ne.hideAllRows(D._pagination), ne.setCorrectRowsAsVisible(D, w2), PageButtonElement.setActive(D, w2), NumberOfVisibleRowsElement.update(D), D._frameComponents.displayAddNewRow && ne.updateAddRowRow(D);
    }
    static getFirstVisibleRow(D) {
      return D.find((w2) => !w2.classList.contains(FilterInternalUtils.HIDDEN_ROW_CLASS));
    }
    static async getAndApplyDataOnButtonClick(D, w2, O) {
      D._pagination.async ? PaginationAsyncUtils.getAndApplyNewData(D, D._pagination.async, w2, O) : ne.displayRowsForDifferentButton(D, w2);
    }
  };
  _PaginationUtils.HIDDEN_ROW_CLASS = "hidden-row";
  var PaginationUtils = _PaginationUtils;
  var PaginationPageActionButtonUtils = class _PaginationPageActionButtonUtils {
    static setButtonAsEnabled(D, w2) {
      PageButtonStyle.setDefault(D, w2, true), D.classList.remove(PageButtonElement.DISABLED_PAGINATION_BUTTON_CLASS);
    }
    static setButtonAsDisabled(D, w2) {
      PageButtonStyle.setDisabled(D, w2, true), D.classList.add(PageButtonElement.DISABLED_PAGINATION_BUTTON_CLASS);
    }
    // prettier-ignore
    static toggleRightButtons(D, w2, O) {
      const { activePageNumber: x2, styles: U } = D._pagination, F = PaginationUtils.getLastPossiblePageNumber(D), W = x2 === F ? _PaginationPageActionButtonUtils.setButtonAsDisabled : _PaginationPageActionButtonUtils.setButtonAsEnabled;
      w2.slice(w2.length - O).forEach((X) => W(X, U.pageButtons));
    }
    // prettier-ignore
    static toggleLeftButtons(D, w2, O, x2) {
      const U = w2 === 1 ? _PaginationPageActionButtonUtils.setButtonAsDisabled : _PaginationPageActionButtonUtils.setButtonAsEnabled;
      D.slice(0, O).forEach((W) => U(W, x2.pageButtons));
    }
    static toggleActionButtons(D) {
      const { activePageNumber: w2, styles: O, numberOfActionButtons: x2, buttonContainer: U } = D._pagination, F = Array.from(U.children), W = x2 / 2;
      _PaginationPageActionButtonUtils.toggleLeftButtons(F, w2, W, O), _PaginationPageActionButtonUtils.toggleRightButtons(D, F, W);
    }
  };
  var PageButtonEvents = class _PageButtonEvents {
    static buttonMouseLeave(D, w2, O) {
      const x2 = O.target;
      PageButtonStyle.mouseLeave(x2, D, w2);
    }
    static buttonMouseEnter(D, w2, O) {
      const x2 = O.target;
      PageButtonStyle.mouseEnter(x2, D, w2);
    }
    static buttonMouseDown(D, w2, O) {
      const x2 = O.target;
      PageButtonStyle.mouseDown(x2, D, w2);
    }
    static setEvents(D, w2, O) {
      D.onmousedown = _PageButtonEvents.buttonMouseDown.bind(this, w2, O), D.onmouseenter = _PageButtonEvents.buttonMouseEnter.bind(this, w2, O), D.onmouseleave = _PageButtonEvents.buttonMouseLeave.bind(this, w2, O);
    }
  };
  var _PageButtonElement = class ke {
    static unsetDisabled(D) {
      const w2 = PaginationUtils.getPageNumberButtons(D)[0], { pageButtons: O } = D.styles;
      PageButtonStyle.setActive(w2, O), w2.classList.replace(ke.DISABLED_PAGINATION_BUTTON_CLASS, O.activeButtonClass);
    }
    static setDisabled(D) {
      const { buttonContainer: w2, styles: O, numberOfActionButtons: x2 } = D, U = Array.from(w2.children);
      for (let W = 0; W < x2 / 2; W += 1)
        PageButtonStyle.setDisabled(U[W], O.pageButtons, true), PageButtonStyle.setDisabled(U[U.length - 1 - W], O.pageButtons, true);
      const F = PaginationUtils.getPageNumberButtons(D)[0];
      PageButtonStyle.setDisabled(F, O.pageButtons, false), F.classList.remove(O.pageButtons.activeButtonClass), U.forEach((W) => {
        W.classList.add(ke.DISABLED_PAGINATION_BUTTON_CLASS);
      });
    }
    // prettier-ignore
    static programmaticMouseEnterTrigger(D, w2, O) {
      const x2 = D[O], { pageButtons: U } = w2.styles;
      x2 && !x2.classList.contains(U.activeButtonClass) && (PageButtonStyle.mouseEnter(x2, U, false), w2.programaticallyHoveredPageNumberButton = x2, setTimeout(() => delete w2.programaticallyHoveredPageNumberButton));
    }
    static setNewActive(D, w2) {
      const O = PaginationUtils.getPageNumberButtons(D), x2 = Number(O[O.length - 1].innerText), U = O.length - (x2 - w2) - 1, F = O[U];
      return F.classList.add(D.styles.pageButtons.activeButtonClass), { newActiveButton: F, numberButtons: O };
    }
    static unsetPreviousActive(D, w2) {
      const O = PaginationUtils.getPageNumberButtons(D), x2 = Number(O[O.length - 1].innerText), U = O.length - (x2 - D.activePageNumber) - 1, F = O[U], W = O.length - (x2 - w2) - 1;
      return F ? (F.classList.remove(D.styles.pageButtons.activeButtonClass), { previousActiveButton: F, previousLocationOfNewIndex: W }) : { previousLocationOfNewIndex: W };
    }
    // prettier-ignore
    static setActive(D, w2) {
      const { _pagination: O } = D, { styles: { pageButtons: x2 }, clickedPageNumberButton: U } = O, { previousActiveButton: F, previousLocationOfNewIndex: W } = ke.unsetPreviousActive(
        O,
        w2
      );
      PaginationVisibleButtonsUtils.unsetStateAndStyles(D._pagination), O.activePageNumber = w2, PaginationUpdatePageButtons.updateOnNewActive(D);
      const { newActiveButton: G, numberButtons: X } = ke.setNewActive(O, w2);
      PageButtonStyle.setActive(G, x2, F), PaginationPageActionButtonUtils.toggleActionButtons(D), PaginationVisibleButtonsUtils.setStateAndStyles(D), U && ke.programmaticMouseEnterTrigger(X, O, W);
    }
    static create(D, w2) {
      const O = document.createElement("div");
      return O.classList.add(
        ke.PAGINATION_BUTTON_CLASS,
        PaginationElements.PAGINATION_TEXT_COMPONENT_CLASS,
        GenericElementUtils.NOT_SELECTABLE_CLASS
      ), PageButtonStyle.setDefault(O, D, w2), setTimeout(() => PageButtonEvents.setEvents(O, D, w2)), O;
    }
  };
  _PageButtonElement.PAGINATION_BUTTON_CLASS = "pagination-button";
  _PageButtonElement.DISABLED_PAGINATION_BUTTON_CLASS = "pagination-button-disabled";
  _PageButtonElement.ACTIVE_PAGINATION_BUTTON_CLASS = "pagination-button-active";
  _PageButtonElement.PRECEDENCE_ACTIVE_PAGINATION_BUTTON_CLASS = "pagination-button-active-precedence";
  var PageButtonElement = _PageButtonElement;
  var _PaginationVisibleButtonsUtils = class ie {
    static getRightBorderWidthInStyleOverride(D) {
      return D.borderRightWidth ? Number.parseInt(D.borderRightWidth) : D.borderRight ? Number.parseInt(D.borderRight.split(" ")[0]) : -1;
    }
    // if the last button is active page (no action buttons displayed) and it has precedence, the override right border
    // will not take place and it will either have no right border or active style right border:
    // this is problematic as the border difference will cause the entire container to have a different width
    // which will in turn cause the pagination components to shift when the last button is clicked,
    // to prevent this we add the border style that would have been overriden
    static setBorderPaddingForLastPrecedence(D, w2) {
      const O = ie.getRightBorderWidthInStyleOverride(w2);
      if (isNaN(O) || O === 0)
        return;
      const x2 = Number.parseInt(getComputedStyle(D).borderRightWidth);
      x2 > 0 ? D.style.borderRightWidth = `${x2 + O}px` : D.style.borderRight = `${O}px solid #fafafa01`;
    }
    static setStyle(D, w2, O, x2) {
      if (!x2)
        return;
      const U = new Set(Object.keys(x2)), F = D.classList.contains(PageButtonElement.PRECEDENCE_ACTIVE_PAGINATION_BUTTON_CLASS);
      F && w2.forEach((W) => U.delete(W)), U.forEach((W) => {
        ElementStyle.setStyle(D, W, x2[W]);
      }), O && F && ie.setBorderPaddingForLastPrecedence(D, x2);
    }
    // prettier-ignore
    static overrideOnMouseEvent(D, w2) {
      const { firstVisibleButtonOverride: O, lastVisibleButtonOverride: x2 } = w2;
      D.classList.contains(ie.FIRST_VISIBLE_CLASS) && ie.setStyle(
        D,
        ie.FIRST_PRECEDENCE_VALUES,
        false,
        O
      ), D.classList.contains(ie.LAST_VISIBLE_CLASS) && ie.setStyle(
        D,
        ie.LAST_PRECEDENCE_VALUES,
        true,
        x2
      );
    }
    // prettier-ignore
    static unsetStateAndStyles(D) {
      const {
        styles: { pageButtons: { firstVisibleButtonOverride: w2, lastVisibleButtonOverride: O } },
        visibleEdgeButtons: x2
      } = D;
      x2.length !== 0 && (w2 && ElementStyle.unsetStyle(x2[0], w2), x2[0].classList.remove(ie.FIRST_VISIBLE_CLASS), O && ElementStyle.unsetStyle(x2[1], O), x2[1].classList.remove(ie.LAST_VISIBLE_CLASS), D.visibleEdgeButtons = []);
    }
    // when the button display property is false - clientWidth is 0
    static isButtonVisible(D) {
      return D.clientWidth > 0 && D.style.visibility !== "hidden";
    }
    // prettier-ignore
    static set(D, w2, O) {
      const { styles: { pageButtons: { firstVisibleButtonOverride: x2, lastVisibleButtonOverride: U } } } = O, F = D[w2];
      if (!F)
        return;
      F.classList.contains(ie.FIRST_VISIBLE_CLASS) || (ie.setStyle(
        F,
        ie.FIRST_PRECEDENCE_VALUES,
        false,
        x2
      ), F.classList.add(ie.FIRST_VISIBLE_CLASS));
      const W = D.findLastIndex(ie.isButtonVisible), G = D[W];
      G.classList.contains(ie.LAST_VISIBLE_CLASS) || (ie.setStyle(
        G,
        ie.LAST_PRECEDENCE_VALUES,
        true,
        U
      ), G.classList.add(ie.LAST_VISIBLE_CLASS)), O.visibleEdgeButtons = [F, G];
    }
    static setStateAndStyles(D) {
      const { _pagination: w2, displayAddNewRow: O } = D, x2 = Array.from(w2.buttonContainer.children), U = x2.findIndex(ie.isButtonVisible);
      U === -1 ? setTimeout(() => {
        const F = x2.findIndex(ie.isButtonVisible);
        ie.set(x2, F, w2);
      }) : ie.set(x2, U, w2), O || RowElement.toggleLastRowClass(D);
    }
  };
  _PaginationVisibleButtonsUtils.FIRST_VISIBLE_CLASS = "pagination-first-visible-button";
  _PaginationVisibleButtonsUtils.LAST_VISIBLE_CLASS = "pagination-last-visible-button";
  _PaginationVisibleButtonsUtils.FIRST_PRECEDENCE_VALUES = ["borderLeft", "borderLeftWidth", "borderLeftColor"];
  _PaginationVisibleButtonsUtils.LAST_PRECEDENCE_VALUES = ["borderRight", "borderRightWidth", "borderRightColor"];
  var PaginationVisibleButtonsUtils = _PaginationVisibleButtonsUtils;
  function buildIcon$1(Y) {
    return `<?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: ${Y}">
      <path d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
  var PREVIOUS_PAGE_ICON_SVG_STRING = buildIcon$1("rotate(180deg)");
  var NEXT_PAGE_ICON_SVG_STRING = buildIcon$1("");
  var PreviousPageButtonEvents = class _PreviousPageButtonEvents {
    static buttonMouseUp(D) {
      const { activePageNumber: w2, styles: O } = this._pagination;
      if (w2 === 1)
        return;
      PaginationUtils.getAndApplyDataOnButtonClick(this, w2 - 1);
      const x2 = D.target;
      PageButtonStyle.mouseEnter(x2, O.pageButtons, true);
    }
    static setEvents(D, w2) {
      w2.onmouseup = _PreviousPageButtonEvents.buttonMouseUp.bind(D);
    }
  };
  var PreviousPageButtonElement = class _PreviousPageButtonElement {
    static populate(D, w2) {
      if (w2)
        D.innerHTML = String(w2);
      else {
        const O = SVGIconUtils.createSVGElement(PREVIOUS_PAGE_ICON_SVG_STRING);
        O.classList.add("pagination-prev-next-button"), D.appendChild(O);
      }
    }
    static create(D) {
      const { pageButtons: w2 } = D._pagination.styles, O = PageButtonElement.create(w2, true);
      return _PreviousPageButtonElement.populate(O, w2.actionButtons.previousText), setTimeout(() => PreviousPageButtonEvents.setEvents(D, O)), O;
    }
  };
  function buildIcon(Y) {
    return `<?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: ${Y}">
      <path d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
  var FIRST_PAGE_ICON_SVG_STRING = buildIcon("rotate(180deg)");
  var LAST_PAGE_ICON_SVG_STRING = buildIcon("");
  var FirstPageButtonEvents = class _FirstPageButtonEvents {
    static buttonMouseUp(D) {
      const w2 = D.target;
      PageButtonStyle.mouseEnter(w2, this._pagination.styles.pageButtons, true), this._pagination.activePageNumber !== 1 && PaginationUtils.getAndApplyDataOnButtonClick(this, 1);
    }
    static setEvents(D, w2) {
      w2.onmouseup = _FirstPageButtonEvents.buttonMouseUp.bind(D);
    }
  };
  var FirstPageButtonElement = class _FirstPageButtonElement {
    static populate(D, w2) {
      if (w2)
        D.innerHTML = String(w2);
      else {
        const O = SVGIconUtils.createSVGElement(FIRST_PAGE_ICON_SVG_STRING);
        O.classList.add("pagination-first-last-button"), D.appendChild(O);
      }
    }
    static create(D) {
      const { pageButtons: w2 } = D._pagination.styles, O = PageButtonElement.create(w2, true);
      return _FirstPageButtonElement.populate(O, w2.actionButtons.firstText), setTimeout(() => FirstPageButtonEvents.setEvents(D, O)), O;
    }
  };
  var LastPageButtonEvents = class _LastPageButtonEvents {
    static buttonMouseUp(D) {
      const w2 = D.target, { activePageNumber: O, styles: x2 } = this._pagination;
      PageButtonStyle.mouseEnter(w2, x2.pageButtons, true);
      const U = PaginationUtils.getLastPossiblePageNumber(this);
      U <= O || PaginationUtils.getAndApplyDataOnButtonClick(this, U);
    }
    static setEvents(D, w2) {
      w2.onmouseup = _LastPageButtonEvents.buttonMouseUp.bind(D);
    }
  };
  var LastPageButtonElement = class _LastPageButtonElement {
    static populate(D, w2) {
      if (w2)
        D.innerHTML = String(w2);
      else {
        const O = SVGIconUtils.createSVGElement(LAST_PAGE_ICON_SVG_STRING);
        O.classList.add("pagination-first-last-button"), D.appendChild(O);
      }
    }
    static create(D) {
      const { pageButtons: w2 } = D._pagination.styles, O = PageButtonElement.create(w2, true);
      return _LastPageButtonElement.populate(O, w2.actionButtons.lastText), setTimeout(() => LastPageButtonEvents.setEvents(D, O)), O;
    }
  };
  var NextPageButtonEvents = class _NextPageButtonEvents {
    static buttonMouseUp(D) {
      const { activePageNumber: w2, styles: O } = this._pagination;
      if (PaginationUtils.getLastPossiblePageNumber(this) <= w2)
        return;
      PaginationUtils.getAndApplyDataOnButtonClick(this, w2 + 1);
      const x2 = D.target;
      PageButtonStyle.mouseEnter(x2, O.pageButtons, true);
    }
    static setEvents(D, w2) {
      w2.onmouseup = _NextPageButtonEvents.buttonMouseUp.bind(D);
    }
  };
  var NextPageButtonElement = class _NextPageButtonElement {
    static populate(D, w2) {
      if (w2)
        D.innerHTML = String(w2);
      else {
        const O = SVGIconUtils.createSVGElement(NEXT_PAGE_ICON_SVG_STRING);
        O.classList.add("pagination-prev-next-button"), D.appendChild(O);
      }
    }
    static create(D) {
      const { pageButtons: w2 } = D._pagination.styles, O = PageButtonElement.create(w2, true);
      return _NextPageButtonElement.populate(O, w2.actionButtons.nextText), setTimeout(() => NextPageButtonEvents.setEvents(D, O)), O;
    }
  };
  var PageButtonContainerEvents = class _PageButtonContainerEvents {
    // REF-31
    static containerMouseLeave(D) {
      const { clickedPageNumberButton: w2, programaticallyHoveredPageNumberButton: O, styles: x2 } = D;
      w2 && O && PageButtonStyle.mouseLeave(O, x2.pageButtons, false);
    }
    static setEvents(D, w2) {
      D.onmouseleave = _PageButtonContainerEvents.containerMouseLeave.bind(this, w2);
    }
  };
  var _PageButtonContainerElement = class fe {
    static shouldButtonsBeActive(D) {
      const w2 = D.dataStartsAtHeader ? 1 : 2;
      return D.data.length >= w2;
    }
    static setStyle(D, w2) {
      fe.shouldButtonsBeActive(D) ? PageButtonElement.setActive(D, w2 ?? 1) : PageButtonElement.setDisabled(D._pagination);
    }
    static addNumberButtons(D) {
      const w2 = PaginationUtils.getLastPossiblePageNumber(D), { maxNumberOfVisiblePageButtons: O, buttonContainer: x2 } = D._pagination;
      for (let U = 0; U < Math.min(w2, O); U += 1) {
        const F = PageNumberButtonElement.create(D, U + 1);
        x2.appendChild(F);
      }
    }
    static addButton(D, w2) {
      D.buttonContainer.appendChild(w2), D.numberOfActionButtons += 1;
    }
    static addButtons(D) {
      const { displayPrevNext: w2, displayFirstLast: O } = D._pagination;
      O && fe.addButton(D._pagination, FirstPageButtonElement.create(D)), w2 && fe.addButton(D._pagination, PreviousPageButtonElement.create(D)), fe.addNumberButtons(D), w2 && fe.addButton(D._pagination, NextPageButtonElement.create(D)), O && fe.addButton(D._pagination, LastPageButtonElement.create(D));
    }
    static resetState(D) {
      D.activePageNumber = 1, D.numberOfActionButtons = 0, D.visibleEdgeButtons = [];
    }
    static repopulateButtons(D) {
      fe.resetState(D._pagination), D._pagination.buttonContainer.replaceChildren(), fe.addButtons(D), fe.setStyle(D);
    }
    static addInitialElements(D, w2) {
      fe.repopulateButtons(D), PaginationVisibleButtonsUtils.setStateAndStyles(D);
      const { positions: O, buttonContainer: x2 } = D._pagination;
      OuterContainerElements.addToContainer(O.pageButtons.position, w2, x2);
    }
    static create(D) {
      const w2 = document.createElement("div");
      w2.id = fe.PAGINATION_BUTTON_CONTAINER_ID;
      const { styles: O, positions: x2 } = D._pagination;
      return w2.style.order = String(x2.pageButtons.order), Object.assign(w2.style, O.pageButtons.container), PageButtonContainerEvents.setEvents(w2, D._pagination), w2;
    }
  };
  _PageButtonContainerElement.PAGINATION_BUTTON_CONTAINER_ID = "pagination-button-container";
  var PageButtonContainerElement = _PageButtonContainerElement;
  var InitialDataProcessing = class _InitialDataProcessing {
    static cleanupDataThatDidNotGetAdded(D, w2) {
      var O;
      ((O = D[0]) == null ? void 0 : O.length) - w2.length > 0 && D.forEach((x2) => x2.splice(w2.length)), w2.length === 0 ? D.splice(0, D.length) : D.length > w2[0].elements.length && D.splice(w2[0].elements.length);
    }
    static postProcess(D, w2) {
      setTimeout(() => _InitialDataProcessing.cleanupDataThatDidNotGetAdded(D, w2));
    }
    static fillRow(D, w2) {
      const O = new Array(w2 - D.length).fill(EMPTY_STRING);
      D.splice(D.length, w2 - D.length, ...O);
    }
    static processRowDataByLength(D, w2) {
      w2 === 0 && D.splice(0, D.length), D.forEach((O) => {
        O.length < w2 && _InitialDataProcessing.fillRow(O, w2);
      });
    }
    static getMaxRowLength(D) {
      return D.reduce((w2, O) => Math.max(w2, O.length), 0);
    }
    static removeRowsExceedingLimit(D, w2) {
      w2 !== void 0 && w2 > 0 && D.length > w2 && D.splice(w2, D.length - 1);
    }
    static removeDuplicateHeaders(D, w2) {
      const O = D[0];
      O.reduce((x2, U, F) => (x2.has(U) ? O[F] = w2 || "" : x2.add(U), x2), /* @__PURE__ */ new Set());
    }
    static preProcess(D, w2) {
      const { maxRows: O, allowDuplicateHeaders: x2, _defaultColumnsSettings: U } = D;
      _InitialDataProcessing.removeRowsExceedingLimit(w2, O);
      const F = _InitialDataProcessing.getMaxRowLength(w2);
      _InitialDataProcessing.processRowDataByLength(w2, F), !x2 && w2.length > 0 && _InitialDataProcessing.removeDuplicateHeaders(w2, U.defaultText);
    }
  };
  var PaginationAsyncStartData = class _PaginationAsyncStartData {
    static fillTotalDataRows(D, w2) {
      var F;
      const { totalDataRows: O, data: x2, failed: U } = w2;
      if (D.data.length < O || U) {
        const W = Math.max(((F = D.data[0]) == null ? void 0 : F.length) || 0, InitialDataProcessing.getMaxRowLength(x2)), G = +!D.dataStartsAtHeader, X = new Array(O - D.data.length + G).fill(
          new Array(W).fill(EMPTY_STRING)
        ), K = D.data.length;
        D.data.splice(D.data.length, 0, ...X), X.forEach((q, Q) => {
          const le = InsertNewRow.insertNewRow(D, K + Q, false, q);
          setTimeout(() => {
            UpdateCellsForRows.updateRowCells(D, le, K + Q, CELL_UPDATE_TYPE.UPDATE, false);
          });
        }), PageButtonContainerElement.repopulateButtons(D);
      }
    }
    static populate(D, w2) {
      const { data: O, totalDataRows: x2, failed: U } = w2;
      O.length > 0 && x2 > 0 && (D.data.length > 0 || InitialDataProcessing.getMaxRowLength(O) > 0) && (_PaginationAsyncStartData.fillTotalDataRows(D, w2), U || PaginationAsyncUtils.insertData(D, O, 1));
    }
    static async get(D, w2, O) {
      const { async: x2, rowsPerPage: U } = w2;
      if (!x2)
        return;
      const { rowsPerPage: F } = O, W = typeof U == "number" ? U : F;
      try {
        const [G, X] = await Promise.all([x2.getTotalRows(), x2.getPageData(1, W)]);
        return { totalDataRows: G, data: X };
      } catch (G) {
        return setTimeout(() => PaginationAsyncUtils.displayError(G, D)), { totalDataRows: 0, data: [["", ""]], failed: true };
      }
    }
  };
  var FrameComponentsElements = class {
    // index and add column cells are added on row insertion
    // CAUTION-4
    static addFrameBodyElements(D) {
      var w2, O;
      (O = D._tableBodyElementRef) == null || O.appendChild((w2 = D._addRowCellElementRef) == null ? void 0 : w2.parentElement), ToggleAdditionElements.update(D, true, AddNewRowElement.toggle);
    }
  };
  var _SheetJSInternalUtils = class Dt {
    // REF-17
    static async execFuncWithExtractorModule(D) {
      const w2 = window.XLSX;
      w2 ? D(w2) : console.error(Dt.MODULE_NOT_FOUND_ERROR);
    }
  };
  _SheetJSInternalUtils.MODULE_NOT_FOUND_ERROR = "xlsx module was not found";
  var SheetJSInternalUtils = _SheetJSInternalUtils;
  var UpdateAllTableData = class _UpdateAllTableData {
    static toggleAdditionalElements(D) {
      FilterInternalUtils.completeReset(D), ToggleAdditionElements.update(D, true, AddNewRowElement.toggle), setTimeout(() => {
        D._pagination && D._pagination.activePageNumber !== 1 && PaginationUtils.displayRowsForDifferentButton(D, 1);
      });
    }
    static insertData(D, w2, O) {
      InsertMatrix.insert(D, w2, O, 0, true), O === 0 && RootCellElement.convertFromRootCell(D);
    }
    static changeTableData(D, w2, O, x2) {
      for (let U = D.data.length - 1; U >= O; U -= 1)
        RemoveRow.remove(D, U);
      InitialDataProcessing.preProcess(D, w2), D._isPopulatingTable = true, x2 ? (_UpdateAllTableData.insertData(D, w2, O), _UpdateAllTableData.toggleAdditionalElements(D), D._isPopulatingTable = true) : (setTimeout(() => {
        _UpdateAllTableData.insertData(D, w2, O);
      }), setTimeout(() => {
        _UpdateAllTableData.toggleAdditionalElements(D), D._isPopulatingTable = true;
      }, 6));
    }
    static update(D, w2, O, x2 = false) {
      if (!Array.isArray(w2))
        return;
      let U = false;
      D._visiblityInternal.filters && (U = FilterInternalUtils.unsetAllFilters(D)), !x2 && U ? setTimeout(() => _UpdateAllTableData.changeTableData(D, w2, O, x2), 40) : _UpdateAllTableData.changeTableData(D, w2, O, x2);
    }
  };
  var CSVImport = class _CSVImport {
    static getPaddedArray(D, w2) {
      return D.map((O) => O.concat(Array(w2).fill("")).slice(0, w2));
    }
    static splitRow(D) {
      const w2 = /("[^"]*"|[^,]+)(,|$)/g, O = [];
      return D.replace(w2, (x2, U) => (O.push(U), "")), O;
    }
    static parseDataFromRow(D, w2, O) {
      const x2 = _CSVImport.splitRow(D);
      return x2.length > 0 && (w2.push(x2), x2.length > O && (O = x2.length)), O;
    }
    // TO-DO validation and error handling
    static parseCSV(D) {
      try {
        const w2 = D.split(/\r\n|\n/), O = [];
        let x2 = 0;
        return w2.forEach((U) => {
          x2 = _CSVImport.parseDataFromRow(U, O, x2);
        }), _CSVImport.getPaddedArray(O, x2);
      } catch {
        return console.error("Incorrect format"), null;
      }
    }
    static getStartRowIndex(D, w2) {
      return w2 && typeof w2.tableRowStartIndex == "number" ? w2.tableRowStartIndex < 0 || w2.tableRowStartIndex > D ? D : w2.tableRowStartIndex : 0;
    }
    static processFile(D, w2, O) {
      const x2 = _CSVImport.parseCSV(w2);
      if (x2 && O && typeof O.importRowStartIndex == "number" && x2.splice(0, O.importRowStartIndex), !x2 || x2.length === 0)
        return;
      const U = _CSVImport.getStartRowIndex(D.data.length, O);
      UpdateAllTableData.update(D, x2, U);
    }
    static import(D, w2, O) {
      const x2 = new FileReader();
      x2.readAsText(w2), x2.onload = (U) => {
        var F;
        return _CSVImport.processFile(D, (F = U.target) == null ? void 0 : F.result, O);
      };
    }
  };
  var SheetJSImport = class {
    static import(D, w2, O) {
      const x2 = new FileReader();
      x2.readAsBinaryString(w2), x2.onload = (U) => {
        var W;
        const F = O.read((W = U.target) == null ? void 0 : W.result, { type: "binary" });
        F.SheetNames.forEach((G) => {
          const X = O.utils.sheet_to_csv(F.Sheets[G]);
          CSVImport.processFile(D, X);
        });
      };
    }
  };
  var ACCEPTED_FILE_FORMATS = ["csv", "xls", "xlsx", "ods", "txt"];
  var DEFAULT_FILE_FORMATS = ["csv"];
  var FileImportButtonEvents = class _FileImportButtonEvents {
    static importFile(D, w2, O, x2) {
      O.find((U) => w2.name.endsWith(U)) && (w2.name.endsWith(".csv") ? CSVImport.import(D, w2, x2) : SheetJSInternalUtils.execFuncWithExtractorModule(SheetJSImport.import.bind(this, D, w2)));
    }
    static inputChange(D, w2, O) {
      var F;
      const x2 = O.target, U = (F = x2.files) == null ? void 0 : F[0];
      _FileImportButtonEvents.importFile(D, U, ACCEPTED_FILE_FORMATS, w2), x2.value = "";
    }
    static getAcceptedFormats(D) {
      return D != null && D.formats && D.formats.length > 0 ? D.formats : DEFAULT_FILE_FORMATS;
    }
    static triggerImportPrompt(D, w2) {
      const O = D._files.inputElementRef, x2 = _FileImportButtonEvents.getAcceptedFormats(w2);
      O.accept = x2.map((U) => `.${U}`).join(","), O.onchange = _FileImportButtonEvents.inputChange.bind(this, D, w2 == null ? void 0 : w2.overwriteOptions), O.click();
    }
    static setEvents(D, w2, O) {
      w2.onclick = _FileImportButtonEvents.triggerImportPrompt.bind(this, D, O);
    }
  };
  var DragAndDropEvents = class _DragAndDropEvents {
    static async uploadFile(D, w2, O) {
      var F, W, G;
      const x2 = (W = (F = O.dataTransfer) == null ? void 0 : F.files) == null ? void 0 : W[0], U = typeof ((G = D.files) == null ? void 0 : G.dragAndDrop) == "object" ? D.files.dragAndDrop.overwriteOptions : void 0;
      FileImportButtonEvents.importFile(D, x2, w2, U);
    }
    static toggleOverlayElement(D, w2) {
      D.style.display = w2 ? "block" : "none";
    }
    static getAcceptedFileFormats(D) {
      var O;
      if (typeof (D == null ? void 0 : D.dragAndDrop) == "object" && D.dragAndDrop.formats)
        return D.dragAndDrop.formats;
      const w2 = (O = D == null ? void 0 : D.buttons) == null ? void 0 : O.filter((x2) => x2.import).map((x2) => typeof x2.import == "object" && x2.import.formats ? x2.import.formats : DEFAULT_FILE_FORMATS).flat(1);
      return w2 && w2.length > 0 ? Array.from(new Set(w2)) : DEFAULT_FILE_FORMATS;
    }
    static setEvents(D, w2, O) {
      const x2 = _DragAndDropEvents.getAcceptedFileFormats(D.files);
      w2.ondragenter = (U) => {
        U.preventDefault(), _DragAndDropEvents.toggleOverlayElement(O, true);
      }, O.ondragleave = (U) => {
        U.preventDefault(), _DragAndDropEvents.toggleOverlayElement(O, false);
      }, O.ondragover = (U) => {
        U.preventDefault();
      }, O.ondrop = (U) => {
        U.preventDefault(), _DragAndDropEvents.uploadFile(D, x2, U), _DragAndDropEvents.toggleOverlayElement(O, false);
      };
    }
  };
  var DragAndDropElement = class _DragAndDropElement {
    static createOverlayElement(D) {
      const w2 = document.createElement("div");
      return w2.id = "drag-and-drop-overlay", typeof D.dragAndDrop == "object" && Object.assign(w2.style, D.dragAndDrop.overlayStyle), w2;
    }
    static append(D, w2) {
      const O = _DragAndDropElement.createOverlayElement(D.files);
      DragAndDropEvents.setEvents(D, w2, O), w2.appendChild(O);
    }
    static isEnabled(D) {
      var w2;
      return (D == null ? void 0 : D.dragAndDrop) !== void 0 ? !!D.dragAndDrop : !!((w2 = D == null ? void 0 : D.buttons) != null && w2.find((O) => O.import));
    }
  };
  var _StickyPropsUtils = class vt {
    static process(D) {
      var w2;
      typeof D.stickyHeader == "boolean" ? D._stickyProps.header = D.stickyHeader : (w2 = D.overflow) != null && w2.maxHeight && (D._stickyProps.header = true);
    }
    // REF-37
    // prettier-ignore
    static moveTopBorderToHeaderCells(D) {
      const { _tableElementRef: w2, _tableBodyElementRef: O } = D;
      !w2 || !O || (O.classList.add(vt.NO_OVERFLOW_STICKY_HEADER_BODY_CLASS), w2.style.border && (O.style.borderTop = w2.style.border), w2.style.borderColor && (O.style.borderTopColor = w2.style.borderColor), ElementStyle.moveStyles(
        w2,
        O,
        "borderTop",
        "borderTopColor",
        "borderTopWidth",
        "borderTopStyle"
      ), w2.style.borderTop = "unset");
    }
  };
  _StickyPropsUtils.NO_OVERFLOW_STICKY_HEADER_BODY_CLASS = "no-overflow-sticky-header-body";
  var StickyPropsUtils = _StickyPropsUtils;
  var ColumnSizerSetWidth = class _ColumnSizerSetWidth {
    static getWidthDelta(D, w2) {
      return D < w2.left ? w2.left : D > w2.right ? w2.right : D;
    }
    static getNewColumnWidth(D, w2) {
      const { moveLimits: O, mouseMoveOffset: x2, initialOffset: U } = D, F = _ColumnSizerSetWidth.getWidthDelta(x2, O) - U;
      return Math.max(0, Number.parseFloat(w2.style.width) + F);
    }
    static setColumnWidth(D, w2) {
      const O = _ColumnSizerSetWidth.getNewColumnWidth(D, w2);
      w2.style.width = `${O}px`;
    }
    // when the user moves the sizer to the start/end of a column in an attempt to completely crush the column,
    // the dom will not allow that and will leave enough space for the column to display its text,
    // the problem is that the widths will be set incorrectly and need to be corrected
    // prettier-ignore
    static correctWidths(D, w2, O, x2) {
      if (w2.offsetWidth !== Math.round(Number.parseFloat(w2.style.width))) {
        const U = `${w2.offsetWidth}px`, F = `${x2 - w2.offsetWidth}px`;
        w2.style.width = U, O.style.width = F, D.wasAutoresized = true, setTimeout(() => D.wasAutoresized = false);
      }
    }
    // prettier-ignore
    static setWidths(D, w2, O, x2) {
      const U = _ColumnSizerSetWidth.getNewColumnWidth(D, w2), F = Math.max(0, x2 - U);
      w2.style.width = `${U}px`, O.style.width = `${F}px`;
    }
    // prettier-ignore
    static setColumnsWidths(D, w2, O) {
      const x2 = Number.parseFloat(w2.style.width), U = Number.parseFloat(O.style.width), F = x2 + U;
      _ColumnSizerSetWidth.setWidths(D, w2, O, F), U > x2 ? _ColumnSizerSetWidth.correctWidths(D, w2, O, F) : _ColumnSizerSetWidth.correctWidths(D, O, w2, F);
    }
    // left or right header in respect to the position of the sizer element
    // prettier-ignore
    static set(D, w2, O, x2, U) {
      U && StaticTable.isStaticTableWidth(w2, O) ? _ColumnSizerSetWidth.setColumnsWidths(D, x2, U) : _ColumnSizerSetWidth.setColumnWidth(D, x2), setTimeout(() => D.fireColumnsUpdate());
    }
  };
  var ColumnSizerExtrinsicEvents = class _ColumnSizerExtrinsicEvents {
    static moveMovableElement(D, w2, O) {
      const { columnSizer: x2 } = ColumnSizerGenericUtils.getSizerDetailsViaElementId(D.id, w2);
      x2.movableElement.style.left = `${O}px`;
    }
    // prettier-ignore
    static windowMouseMove(D, w2) {
      const { _activeOverlayElements: { selectedColumnSizer: O }, _columnsDetails: x2 } = D;
      if (O) {
        const { moveLimits: U, element: F } = O;
        O.mouseMoveOffset += w2, O.mouseMoveOffset >= U.left && O.mouseMoveOffset <= U.right && _ColumnSizerExtrinsicEvents.moveMovableElement(F, x2, O.mouseMoveOffset);
      }
    }
    // prettier-ignore
    static setWidth(D, w2, O, x2, U) {
      ColumnSizerElement.unsetTransitionTime(D.element), ColumnSizerSetWidth.set(D, w2, O, x2, U);
    }
    // prettier-ignore
    static mouseUp(D) {
      var K;
      const { _activeOverlayElements: w2, _columnsDetails: O, _tableDimensions: x2, _tableElementRef: U } = D, F = w2.selectedColumnSizer, { columnSizer: W, headerCell: G, sizerNumber: X } = ColumnSizerGenericUtils.getSizerDetailsViaElementId(
        F.element.id,
        O
      );
      _ColumnSizerExtrinsicEvents.setWidth(
        F,
        U,
        x2,
        G,
        ColumnSizerGenericUtils.findNextResizableColumnHeader(O, X)
      ), MovableColumnSizerElement.hide(W.movableElement), UpdateRowElement.updateHeaderRowHeight((K = W.element.parentElement) == null ? void 0 : K.parentElement);
    }
    static setSizerStyleToHoverNoAnimation(D, w2) {
      const { width: O } = D.styles.hover;
      ColumnSizerElement.setHoverStyle(D, O, false, w2), ColumnSizerElement.unsetBackgroundImage(D.element);
    }
    static mouseUpNotOnSizer(D) {
      const { element: w2, styles: O, movableElement: x2 } = D;
      _ColumnSizerExtrinsicEvents.setSizerStyleToHoverNoAnimation(D, x2.style.backgroundColor), setTimeout(() => {
        ColumnSizerElement.setTransitionTime(w2), ColumnSizerElement.unsetElementsToDefault(w2, O.default.width, false), ColumnSizerElement.hideWhenCellNotHovered(D, true);
      }), setTimeout(() => {
        ColumnSizerElement.setBackgroundImage(w2, O.default.backgroundImage), ColumnSizerElement.setBackgroundColor(w2, SEMI_TRANSPARENT_COLOR);
      }, ColumnSizerElement.TRANSITION_TIME_ML);
    }
    // if the user clicks mouse up on the table first - this will not be activated as columnSizer selected will be removed
    // prettier-ignore
    static windowMouseUp(D) {
      const { columnSizer: w2 } = ColumnSizerGenericUtils.getSizerDetailsViaElementId(
        D._activeOverlayElements.selectedColumnSizer.element.id,
        D._columnsDetails
      );
      _ColumnSizerExtrinsicEvents.mouseUp(D), _ColumnSizerExtrinsicEvents.mouseUpNotOnSizer(w2), delete D._activeOverlayElements.selectedColumnSizer;
    }
    static mouseUpOnSizer(D) {
      _ColumnSizerExtrinsicEvents.setSizerStyleToHoverNoAnimation(D), D.isMouseUpOnSizer = true, setTimeout(() => {
        D.isMouseUpOnSizer = false, ColumnSizerElement.setTransitionTime(D.element);
      });
    }
    // this method is used to get what exact element was clicked on as window events just returns the component as the target
    // prettier-ignore
    static tableMouseUp(D, w2) {
      const O = D._activeOverlayElements.selectedColumnSizer, { columnSizer: x2 } = ColumnSizerGenericUtils.getSizerDetailsViaElementId(
        O.element.id,
        D._columnsDetails
      );
      _ColumnSizerExtrinsicEvents.mouseUp(D), MovableColumnSizerElement.isMovableColumnSizer(w2) && !O.wasAutoresized ? _ColumnSizerExtrinsicEvents.mouseUpOnSizer(x2) : _ColumnSizerExtrinsicEvents.mouseUpNotOnSizer(x2), delete D._activeOverlayElements.selectedColumnSizer;
    }
  };
  var TableEvents = class _TableEvents {
    // not using hoveredElements state as the targetElement will be the element clicked, hence need to use
    // activeOverlayElements.datePickerCell to get the cell of the date picker input
    static closeDatePicker(D, w2) {
      D.datePickerCell && (D.datePickerCell !== CellElement.getCellElement(w2) && DateCellInputElement.toggle(D.datePickerCell, false), delete D.datePickerCell);
    }
    // REF-44
    // text blur will not activate when the dropdown has been clicked and will not close if its scrollbar, padding
    // or delete category buttons are clicked. If the user clicks elsewhere on the table, the dropdown is closed
    // programmatically as follows
    // prettier-ignore
    static closeCellDropdown(D, w2) {
      const { _focusedElements: O } = D;
      O.cellDropdown && !Dropdown.isPartOfDropdownElement(w2) && !w2.classList.contains(OptionColorButton.COLOR_BUTTON_CLASS) && O.cell.element !== CellElement.getCellElement(w2) && CellWithTextEvents.programmaticBlur(D);
    }
    static onMouseDown(D) {
      const w2 = D.target;
      UserKeyEventsStateUtils.temporarilyIndicateEvent(this._userKeyEventsState, MOUSE_EVENT.DOWN), _TableEvents.closeCellDropdown(this, w2), _TableEvents.closeDatePicker(this._activeOverlayElements, D.target);
    }
    static onMouseUp(D) {
      this._activeOverlayElements.selectedColumnSizer && ColumnSizerExtrinsicEvents.tableMouseUp(this, D.target);
    }
  };
  var TableElement = class _TableElement {
    static changeStaticWidthTotal(D, w2) {
      D.staticWidth += w2;
    }
    // prettier-ignore
    static setStaticWidthContentTotal(D) {
      const { _frameComponents: { displayAddNewColumn: w2, displayIndexColumn: O }, _tableDimensions: x2 } = D;
      x2.staticWidth = x2.border.leftWidth + x2.border.rightWidth, w2 && (x2.staticWidth += AddNewColumnElement.DEFAULT_WIDTH), O && (x2.staticWidth += IndexColumn.DEFAULT_WIDTH);
    }
    // prettier-ignore
    static addOverlayElements(D, w2, O) {
      var W;
      const x2 = FullTableOverlayElement.create(D);
      O.fullTableOverlay = x2;
      const U = ((W = D._overflow) == null ? void 0 : W.overflowContainer) || w2;
      U.appendChild(x2), DragAndDropElement.isEnabled(D.files) && DragAndDropElement.append(D, U);
      const F = ColumnDropdown.create(D);
      if (w2.appendChild(F), O.columnDropdown = F, D.rowDropdown.displaySettings.isAvailable) {
        const G = RowDropdown.create(D);
        w2.appendChild(G), O.rowDropdown = G;
      }
    }
    static addCells(D) {
      MaximumColumns.canAddMore(D) && (StaticTableWidthUtils.toggleWidthUsingMaxWidth(D, true), D.data.map((w2, O) => InsertNewRow.insert(D, O, false, w2)), D._pagination.asyncStartData && PaginationAsyncStartData.populate(D, D._pagination.asyncStartData), StaticTableWidthUtils.toggleWidthUsingMaxWidth(D, false));
    }
    static postProcessColumns(D) {
      StaticTableWidthUtils.changeWidthsBasedOnColumnInsertRemove(D, true), InitialDataProcessing.postProcess(D.data, D._columnsDetails), setTimeout(() => {
        FireEvents.onColumnsUpdate(D), InsertRemoveColumnSizer.cleanUpCustomColumnSizers(D, D._columnsDetails.length - 1);
      });
    }
    static populateBody(D) {
      var w2;
      (w2 = D._tableBodyElementRef) == null || w2.replaceChildren(), StaticTableWidthUtils.setTableWidth(D), _TableElement.addCells(D), _TableElement.postProcessColumns(D), FrameComponentsElements.addFrameBodyElements(D), D._frameComponents.displayIndexColumn && UpdateIndexColumnWidth.update(D), ToggleAdditionElements.update(D, true, AddNewColumnElement.toggle), CustomRowProperties.update(D);
    }
    static createTableBody(D) {
      const w2 = document.createElement("tbody");
      return D && w2.classList.add("sticky-header-body"), w2;
    }
    static createTableElement(D) {
      var x2;
      const w2 = document.createElement("table");
      w2.classList.add("table-controlled-width");
      const O = StringDimensionUtils.removeAllDimensions(JSON.parse(JSON.stringify(D.tableStyle)));
      return Object.assign(w2.style, O), (x2 = w2.style).fontFamily || (x2.fontFamily = "Inter, sans-serif, Avenir, Helvetica, Arial"), w2.onmousedown = TableEvents.onMouseDown.bind(D), w2.onmouseup = TableEvents.onMouseUp.bind(D), w2;
    }
    // CAUTION-4 - add row cell is created and ref assigned here - then it is added post render in addFrameBodyElements
    static createInfrastructureElements(D) {
      return FrameComponentsColors.setEventColors(D), D._tableElementRef = _TableElement.createTableElement(D), D._tableBodyElementRef = _TableElement.createTableBody(D._stickyProps.header), D._addRowCellElementRef = AddNewRowElement.create(D), D._tableElementRef.appendChild(D._tableBodyElementRef), D._cellDropdownContainer = CellDropdown.createContainerElement(), D._tableElementRef.appendChild(D._cellDropdownContainer), !D.overflow && D._stickyProps.header && StickyPropsUtils.moveTopBorderToHeaderCells(D), D._tableDimensions.border = TableBorderDimensionsUtils.generateUsingElement(D._tableElementRef), D._tableElementRef;
    }
  };
  var _OverflowUtils = class De {
    static isOverflowElement(D) {
      return (D == null ? void 0 : D.id) === De.ID;
    }
    // a simple way to not take the border into consideration when doing table width calculation, however if there are issues
    // feel free to investigate a better way
    static unsetBorderDimensions(D, w2) {
      w2.number -= D.border.leftWidth + D.border.rightWidth, TableElement.changeStaticWidthTotal(D, -D.border.leftWidth), TableElement.changeStaticWidthTotal(D, -D.border.rightWidth), D.border.leftWidth = 0, D.border.rightWidth = 0, D.border.topWidth = 0, D.border.bottomWidth = 0;
    }
    static processNumberDimension(D, w2) {
      De.unsetBorderDimensions(D, w2), w2.number -= De.SCROLLBAR_WIDTH;
    }
    // prettier-ignore
    static moveBorderToOverflowContainer(D, w2) {
      ElementStyle.moveStyles(
        w2,
        D,
        "borderRight",
        "borderLeft",
        "borderTop",
        "borderBottom",
        "borderRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ), w2.style.border = "unset";
    }
    static adjustStyleForScrollbarWidth(D) {
      (Browser.IS_SAFARI || Browser.IS_FIREFOX) && D.maxHeight && !D.maxWidth && (D.overflowContainer.style.paddingRight = `${De.SCROLLBAR_WIDTH}px`);
    }
    static setDimensions(D, { width: w2, height: O }) {
      w2 && (D.style.overflowX = "auto", D.style.maxWidth = `${w2}px`), O && (D.style.overflowY = "auto", D.style.maxHeight = `${O}px`);
    }
    // prettier-ignore
    static getDimensions(D, w2) {
      const O = StringDimensionUtils.generateNumberDimensionFromClientString(
        D.parentElement,
        w2,
        "maxWidth",
        true
      );
      O.number -= D._tableDimensions.border.leftWidth + D._tableDimensions.border.rightWidth, O.isPercentage && (w2.isWidthPercentage = true);
      const x2 = StringDimensionUtils.generateNumberDimensionFromClientString(
        D.parentElement,
        w2,
        "maxHeight",
        false
      );
      return x2.number -= D._tableDimensions.border.topWidth + D._tableDimensions.border.bottomWidth, x2.isPercentage && (w2.isHeightPercentage = true), { width: O.number, height: x2.number };
    }
    static applyDimensions(D) {
      const { _overflow: w2 } = D;
      if (!w2)
        return;
      const O = De.getDimensions(D, w2);
      De.setDimensions(w2.overflowContainer, O), De.adjustStyleForScrollbarWidth(w2);
    }
    static setupContainer(D, w2) {
      const O = document.createElement("div");
      D._overflow = { overflowContainer: O, ...D.overflow }, O.id = De.ID, De.moveBorderToOverflowContainer(O, w2), O.appendChild(w2);
    }
  };
  _OverflowUtils.ID = "overflow-container";
  _OverflowUtils.SCROLLBAR_WIDTH = 15;
  var OverflowUtils = _OverflowUtils;
  var ElementVisibility = class {
    // prettier-ignore
    static getDetailsInWindow(D, w2, O = true) {
      const { topWidth: x2, leftWidth: U } = O ? w2 : { topWidth: 0, leftWidth: 0 }, F = D.getBoundingClientRect(), W = (Browser.IS_CHROMIUM ? F.top - x2 : F.top) + window.scrollY, G = (Browser.IS_CHROMIUM ? F.left - U : F.left) + window.scrollX, X = D.offsetWidth, K = D.offsetHeight, q = document.body, Q = /* @__PURE__ */ new Set();
      W < window.pageYOffset && Q.add(SIDE.TOP);
      const le = q.clientWidth < q.scrollWidth ? OverflowUtils.SCROLLBAR_WIDTH : 0;
      W + K + x2 > window.pageYOffset + window.innerHeight - le && Q.add(SIDE.BOTTOM), G < window.pageXOffset && Q.add(SIDE.LEFT);
      const re = q.clientHeight < q.scrollHeight ? OverflowUtils.SCROLLBAR_WIDTH : 0;
      return G + X + U > window.pageXOffset + window.innerWidth - re && Q.add(SIDE.RIGHT), Q.size > 0 ? { isFullyVisible: false, blockingSides: Q } : { isFullyVisible: true };
    }
    // no real need to take care of multiple blockages for now
    static isVerticallyVisibleInsideParent(D, w2) {
      const O = D.parentElement || w2, x2 = O.scrollTop, U = x2 + O.clientHeight, F = D.offsetTop, W = F + D.clientHeight;
      return F < x2 ? { isFullyVisible: false, blockingSides: /* @__PURE__ */ new Set([SIDE.TOP]) } : W > U ? { isFullyVisible: false, blockingSides: /* @__PURE__ */ new Set([SIDE.BOTTOM]) } : { isFullyVisible: true };
    }
  };
  var OuterDropdownEvents = class _OuterDropdownEvents {
    static windowOnMouseDown(D) {
      D._activeOverlayElements.outerContainerDropdown && D._activeOverlayElements.outerContainerDropdown.hide();
    }
    static focusSiblingItem(D, w2, O) {
      const x2 = w2 == null ? void 0 : w2[O];
      if (x2)
        DropdownItemNavigation.focusSiblingItem(x2, D, true, true);
      else if (O === "nextSibling") {
        const U = D.children[0];
        U && DropdownItemNavigation.focusSiblingItem(U, D, true, true);
      } else {
        const U = D.children[D.children.length - 1];
        U && DropdownItemNavigation.focusSiblingItem(U, D, false, true);
      }
    }
    // prettier-ignore
    static windowOnKeyDownNavigation(D, w2) {
      const O = D.getElementsByClassName(DropdownItem.ACTIVE_ITEM_CLASS)[0];
      w2 === KEYBOARD_KEY.TAB || w2 === KEYBOARD_KEY.ARROW_DOWN ? O ? _OuterDropdownEvents.focusSiblingItem(D, O, "nextSibling") : DropdownItemNavigation.focusSiblingItem(D.children[0], D, true, true) : w2 === KEYBOARD_KEY.ARROW_UP && (O ? _OuterDropdownEvents.focusSiblingItem(D, O, "previousSibling") : DropdownItemNavigation.focusSiblingItem(
        D.children[D.children.length - 1],
        D,
        false,
        true
      ));
    }
    // the reason why we track window key events is because the table is not actually focused when it is displayed,
    // (unlike column dropdown which has an input), hence initially clicking tab does not focus the dropdown and
    // instead we need to focus it programmatically here. Once focused, the actual dropdown events can take over.
    // prettier-ignore
    static windowOnKeyDown(D, w2) {
      const { shadowRoot: O, _activeOverlayElements: { outerContainerDropdown: x2 } } = D;
      if (!x2)
        return;
      w2.preventDefault();
      const { element: U, hide: F } = x2;
      w2.key === KEYBOARD_KEY.ENTER || w2.key === KEYBOARD_KEY.ESCAPE ? F() : O != null && O.activeElement || _OuterDropdownEvents.windowOnKeyDownNavigation(U, w2.key);
    }
    static dropdownOnKeyDown(D, w2) {
      w2.preventDefault(), w2.key === KEYBOARD_KEY.ENTER ? w2.target.dispatchEvent(new MouseEvent("mousedown")) : w2.key === KEYBOARD_KEY.ESCAPE && D.hide(), DropdownEvents.itemKeyNavigation(this.shadowRoot, D.element, w2);
    }
    static set(D, w2) {
      w2.element.onkeydown = _OuterDropdownEvents.dropdownOnKeyDown.bind(D, w2);
    }
  };
  var _OuterDropdownElement = class Ye {
    static hide(D, w2) {
      const O = D.outerContainerDropdown;
      O && (Dropdown.hide(O.element), O.button.classList.contains(ToggleableElement.AUTO_STYLING_CLASS) && ToggleableElement.unsetActive(O.button, w2), delete D.outerContainerDropdown, DropdownItemHighlightUtils.fadeCurrentlyHighlighted(D));
    }
    static display(D, w2) {
      w2.button.classList.contains(ToggleableElement.AUTO_STYLING_CLASS) && ToggleableElement.setActive(w2.button, w2.activeButtonStyle), Dropdown.display(w2.element), D._activeOverlayElements.outerContainerDropdown = w2;
    }
    static displayReactToBottomVisibility(D, w2) {
      w2.element.classList.remove(Ye.DROPUP_CLASS), Ye.display(D, w2);
      const O = ElementVisibility.getDetailsInWindow(w2.element, D._tableDimensions.border, false);
      !O.isFullyVisible && O.blockingSides.has(SIDE.BOTTOM) && w2.element.classList.add(Ye.DROPUP_CLASS);
    }
    static setOrientation(D, w2) {
      w2.endsWith("right") && (D.style.right = "0px");
    }
    static createElement(D) {
      const w2 = Dropdown.createBase();
      return w2.style.width = "", w2.classList.add("outer-container-dropdown"), D && w2.classList.add(...D), w2;
    }
    // prettier-ignore
    static create(D, w2, O, x2, U, F, W) {
      const G = Ye.createElement(U), X = { element: G, hide: F, button: w2, activeButtonStyle: x2 };
      return Ye.setOrientation(G, O), OuterDropdownButtonEvents.set(D, w2, O, X, W), OuterDropdownEvents.set(D, X), X;
    }
  };
  _OuterDropdownElement.DROPUP_CLASS = "active-table-dropup";
  var OuterDropdownElement = _OuterDropdownElement;
  var OuterDropdownSimpleUtils = class _OuterDropdownSimpleUtils {
    static hide(D, w2) {
      var x2;
      OuterDropdownElement.hide(D, {});
      const O = (x2 = D.outerContainerDropdown) == null ? void 0 : x2.element;
      if (O) {
        const U = w2 || Array.from(O.children);
        OuterDropdownItem.unsetHoverColors(U);
      }
    }
    static getDropdownTopPosition(D) {
      return `${D.offsetTop + D.offsetHeight}px`;
    }
    // this is a custom display function used by dropdowns that do not populate items on display (export, rows per page)
    static display(D, w2, O) {
      const { element: x2 } = O;
      x2.style.bottom = "", x2.style.top = _OuterDropdownSimpleUtils.getDropdownTopPosition(D), OuterDropdownElement.displayReactToBottomVisibility(w2, O);
    }
  };
  var RowsPerPageDropdownItemUtil = class _RowsPerPageDropdownItemUtil {
    static updateRowsAndPaginationComponents(D, w2, O) {
      RowsPerPageSelectButtonElement.updateButtonText(w2, O), PageButtonContainerElement.shouldButtonsBeActive(D) && (PageButtonContainerElement.repopulateButtons(D), PaginationUtils.getAndApplyDataOnButtonClick(D, 1, O));
    }
    static getNewRowsPerPage(D, w2) {
      const { _pagination: O, data: x2, dataStartsAtHeader: U } = D;
      return O.isAllRowsOptionSelected ? U ? x2.length : x2.length - 1 : Number(w2);
    }
    static setNewRowsPerPage(D, w2, O) {
      D._pagination.isAllRowsOptionSelected = O.toLocaleLowerCase() === RowsPerPageDropdownItem.ALL_ITEM_TEXT, D._pagination.rowsPerPage = _RowsPerPageDropdownItemUtil.getNewRowsPerPage(D, O), _RowsPerPageDropdownItemUtil.updateRowsAndPaginationComponents(D, w2, O);
    }
  };
  var RowsPerPageDropdownItemEvents = class _RowsPerPageDropdownItemEvents {
    static action(D, w2, O, x2) {
      D.rowsPerPage !== Number(x2) && RowsPerPageDropdownItemUtil.setNewRowsPerPage(O, w2, x2);
    }
    static setEvents(D, w2, O) {
      const x2 = _RowsPerPageDropdownItemEvents.action.bind(this, D._pagination, O), U = OuterDropdownSimpleUtils.hide;
      w2.onmousedown = OuterDropdownItemEvents.itemMouseDownCommon.bind(D, x2, U);
    }
  };
  var _RowsPerPageDropdownItem = class wt {
    // lower case as it will be compared against user set text
    static populate(D, w2, O) {
      D._pagination.rowsPerPageOptionsItemText.forEach((U) => {
        const F = { text: String(U) }, W = DropdownItem.addButtonItem(D, w2, F, wt.ITEM_CLASS);
        RowsPerPageDropdownItemEvents.setEvents(D, W, O);
      });
      const x2 = String(D._pagination.rowsPerPage);
      OuterDropdownItem.setActive(Array.from(w2.children), x2);
    }
  };
  _RowsPerPageDropdownItem.ITEM_CLASS = "number-of-rows-dropdown-item";
  _RowsPerPageDropdownItem.ALL_ITEM_TEXT = "all";
  var RowsPerPageDropdownItem = _RowsPerPageDropdownItem;
  var _PaginationInternalUtils = class oe {
    static getTotalNumberOfRows(D) {
      const { data: w2, _visiblityInternal: O, _tableBodyElementRef: x2 } = D;
      return O != null && O.filters ? FilterInternalUtils.extractUnfilteredRows(x2, w2.length).length : w2.length;
    }
    static insertNewRowsPerPageOption(D, w2) {
      let O = w2.findIndex((x2) => {
        const U = Number.parseInt(x2);
        return isNaN(U) || D < U;
      });
      O === -1 && (O = 0), w2.splice(O, 0, String(D));
    }
    static setFirstOptionAsRowsPerPage(D) {
      const { _pagination: w2, dataStartsAtHeader: O } = D, x2 = w2.rowsPerPageOptionsItemText[0];
      if (x2.toLocaleLowerCase() === RowsPerPageDropdownItem.ALL_ITEM_TEXT) {
        w2.isAllRowsOptionSelected = true;
        const U = oe.getTotalNumberOfRows(D);
        w2.rowsPerPage = O ? U : U - 1;
      } else
        w2.rowsPerPage = Number(x2);
    }
    static processRowsPerPage(D, w2) {
      const { rowsPerPageSelect: O } = w2;
      if (D._pagination.rowsPerPage = Number.parseInt(String(D._pagination.rowsPerPage)), O || O === void 0) {
        const { rowsPerPageOptionsItemText: x2, rowsPerPage: U } = D._pagination;
        if (!x2.find((F) => F === String(U))) {
          const F = Number.parseInt(String(U));
          isNaN(F) ? oe.setFirstOptionAsRowsPerPage(D) : oe.insertNewRowsPerPageOption(F, x2);
        }
      }
    }
    static processOptionsItemText(D) {
      const w2 = Number(D);
      return !isNaN(w2) && w2 < 1 ? "2" : String(D);
    }
    // REF-32
    static changeOptionNumberToEven(D) {
      return D.map((w2) => {
        const O = Number(w2);
        return Number.isNaN(O) ? w2 : O % 2 === 1 ? O + 1 : O;
      });
    }
    // prettier-ignore
    static setRowsPerPageOptionsText(D) {
      const w2 = D.pagination, { rowsPerPageSelect: O } = w2;
      if (O || O === void 0) {
        const x2 = D._pagination.rowsPerPageSelect.options;
        let U = O === void 0 || O === true || !O.options || O.options.length === 0 ? x2 : O.options;
        D.stripedRows && (U = oe.changeOptionNumberToEven(U)), D._pagination.rowsPerPageOptionsItemText = U.map((F) => oe.processOptionsItemText(F));
      }
    }
    static processRowsPerPageOptions(D) {
      const w2 = D.pagination, { rowsPerPageSelect: O } = w2;
      O !== void 0 && typeof O != "boolean" && O.prefixText && (D._pagination.rowsPerPageSelect.prefixText = O.prefixText), oe.setRowsPerPageOptionsText(D), delete w2.rowsPerPageSelect;
    }
    static setDefaultBackgroundColors(D, w2) {
      var F, W, G;
      const { def: O, hover: x2, click: U } = w2;
      (F = D.click).backgroundColor ?? (F.backgroundColor = D.hover.backgroundColor || D.default.backgroundColor || U), (W = D.hover).backgroundColor ?? (W.backgroundColor = D.default.backgroundColor || x2), (G = D.default).backgroundColor ?? (G.backgroundColor = O), ["click", "hover", "default"].forEach((X) => {
        D[X].backgroundColor === void 0 && delete D[X].backgroundColor;
      });
    }
    static setStatefulCSS(D, w2) {
      var O, x2, U;
      D[w2] ?? (D[w2] = {}), (O = D[w2]).click ?? (O.click = JSON.parse(JSON.stringify(D[w2].hover || D[w2].default || {}))), (x2 = D[w2]).hover ?? (x2.hover = JSON.parse(JSON.stringify(D[w2].default || {}))), (U = D[w2]).default ?? (U.default = {});
    }
    // prettier-ignore
    static setRowsPerPageOptionsStyle(D) {
      var O;
      oe.setStatefulCSS(D.rowsPerPageSelect, "button");
      const w2 = { def: "", hover: "#f5f5f5", click: "#f5f5f5" };
      oe.setDefaultBackgroundColors(
        (O = D.rowsPerPageSelect) == null ? void 0 : O.button,
        w2
      );
    }
    // activeButtons reuse buttons style
    static mergeButtonsStyleWithActiveStyle(D) {
      const { buttons: w2, actionButtons: O, activeButton: x2 } = D, U = JSON.parse(JSON.stringify(w2));
      return U.default.backgroundColor = "#e8e8e8", U.hover.backgroundColor = "#d6d6d6", U.click.backgroundColor = "#c8c8c8", x2 && (Object.assign(U.default, x2.default), U.hover = x2.hover, U.click = x2.click), U;
    }
    // actionButtons reuse buttons style
    static mergeButtonsStylesWithActionStyles(D) {
      D.actionButtons ?? (D.actionButtons = {});
      const { buttons: w2, actionButtons: O } = D, x2 = JSON.parse(JSON.stringify(w2));
      return Object.assign(x2.default, O.default), Object.assign(x2.hover, O.hover), Object.assign(x2.click, O.click), x2.previousText = O.previousText, x2.nextText = O.nextText, x2.firstText = O.firstText, x2.lastText = O.lastText, x2;
    }
    // prettier-ignore
    static processPageButtonStyles(D) {
      var G, X, K, q;
      (G = D.styles).pageButtons ?? (G.pageButtons = {});
      const w2 = D.styles.pageButtons, O = { def: "white", hover: "#f5f5f5", click: "#c8c8c8" };
      oe.setStatefulCSS(w2, "buttons"), oe.setDefaultBackgroundColors(D.styles.pageButtons.buttons, O), oe.setStatefulCSS(w2, "actionButtons"), oe.setDefaultBackgroundColors(
        D.styles.pageButtons.actionButtons,
        {}
      );
      const x2 = oe.mergeButtonsStylesWithActionStyles(w2);
      D.styles.pageButtons.actionButtons = x2;
      const U = oe.mergeButtonsStyleWithActiveStyle(w2);
      D.styles.pageButtons.activeButton = U, (X = D.styles.pageButtons).disabledButtons ?? (X.disabledButtons = { backgroundColor: "#f9f9f9", color: "#9d9d9d", stroke: "#9d9d9d" });
      const F = {
        borderLeft: "1px solid #0000004d",
        borderTopLeftRadius: "2px",
        borderBottomLeftRadius: "2px"
      };
      (K = D.styles.pageButtons).firstVisibleButtonOverride ?? (K.firstVisibleButtonOverride = F);
      const W = {
        borderRight: "1px solid #0000004d",
        borderTopRightRadius: "2px",
        borderBottomRightRadius: "2px"
      };
      (q = D.styles.pageButtons).lastVisibleButtonOverride ?? (q.lastVisibleButtonOverride = W), D.styles.pageButtons.activeButtonClass = D.styles.pageButtons.activeButtonPrecedence ? PageButtonElement.PRECEDENCE_ACTIVE_PAGINATION_BUTTON_CLASS : PageButtonElement.ACTIVE_PAGINATION_BUTTON_CLASS;
    }
    static processStyle(D, w2) {
      var O, x2;
      D.styles && Object.assign(w2.styles, D.styles), oe.processPageButtonStyles(w2), D.rowsPerPageSelect !== false && ((O = w2.styles).rowsPerPageSelect ?? (O.rowsPerPageSelect = {}), oe.setRowsPerPageOptionsStyle(w2.styles)), (x2 = w2.styles).numberOfVisibleRows ?? (x2.numberOfVisibleRows = {}), delete D.styles;
    }
    static processPositions(D) {
      Object.keys(D).forEach((w2) => {
        const O = D[w2];
        oe.POSITIONS.has(O.position) || (O.position = oe.DEFAULT_POSITION);
      });
    }
    static processPosition(D, w2) {
      D.positions && Object.assign(w2.positions, D.positions), oe.processPositions(w2.positions), delete D.positions;
    }
    static async process(D) {
      const { _pagination: w2, _activeOverlayElements: O } = D;
      if (!D.pagination)
        return;
      const x2 = typeof D.pagination == "boolean" ? {} : D.pagination;
      x2.async && (LoadingElement.addInitial(D), O.error = ErrorElement.create(), w2.asyncStartData = await PaginationAsyncStartData.get(D, x2, w2)), x2.maxNumberOfVisiblePageButtons !== void 0 && x2.maxNumberOfVisiblePageButtons < 1 && (x2.maxNumberOfVisiblePageButtons = 1), oe.processPosition(x2, w2), oe.processStyle(x2, w2), x2.rowsPerPageSelect !== false && oe.processRowsPerPageOptions(D), Object.assign(w2, x2), x2.displayNumberOfVisibleRows !== false && oe.processRowsPerPage(D, x2);
    }
    static getDefault() {
      return {
        rowsPerPage: 10,
        rowsPerPageSelect: {
          options: [10, 25, 50, "All"],
          prefixText: "Rows per page:"
        },
        maxNumberOfVisiblePageButtons: 8,
        displayPrevNext: true,
        displayFirstLast: true,
        displayNumberOfVisibleRows: true,
        styles: {},
        // this is going to be populated during the call of processInternal method
        visibleEdgeButtons: [],
        numberOfActionButtons: 0,
        dropdownWidth: 24,
        positions: {
          pageButtons: {
            position: oe.DEFAULT_POSITION,
            order: 3
          },
          numberOfVisibleRows: {
            position: oe.DEFAULT_POSITION,
            order: 2
          },
          rowsPerPageSelect: {
            position: oe.DEFAULT_POSITION,
            order: 1
          }
        },
        visibleRows: [],
        activePageNumber: 1,
        isAllRowsOptionSelected: false
      };
    }
  };
  _PaginationInternalUtils.DEFAULT_POSITION = "bottom-right";
  _PaginationInternalUtils.POSITIONS = /* @__PURE__ */ new Set([
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    _PaginationInternalUtils.DEFAULT_POSITION
  ]);
  var PaginationInternalUtils = _PaginationInternalUtils;
  var ActiveOverlayElementsUtils = class {
    static createNew() {
      return {};
    }
  };
  var ProgrammaticStructureUpdate = class _ProgrammaticStructureUpdate {
    static processData(D, w2) {
      if (w2)
        return D > w2.length ? w2.concat(DataUtils.createEmptyStringDataArray(D - w2.length)) : D < w2.length ? w2.slice(0, D) : w2;
    }
    // if -1 - last row, if above last index - last row, otherwise use the given index
    static processIndex(D, w2, O) {
      return D = D > -1 ? D : O, D = D > O ? O : D, !w2 && D === O ? O - 1 : D;
    }
    // prettier-ignore
    static updateColumn(D, w2, O, x2) {
      var U;
      O = _ProgrammaticStructureUpdate.processIndex(O, w2, ((U = D.data[0]) == null ? void 0 : U.length) || 0), D.data.length === 0 ? x2 && UpdateAllTableData.update(D, x2.map((F) => [F]), 0, true) : w2 ? (x2 = _ProgrammaticStructureUpdate.processData(D.data.length || 0, x2), InsertNewColumn.insert(D, O, x2)) : D.data.length > 0 && RemoveColumn.remove(D, O);
    }
    static updatePaginationAsync(D, w2) {
      setTimeout(() => {
        var O;
        if (D._pagination) {
          const x2 = (O = D._pagination) == null ? void 0 : O.activePageNumber;
          w2 !== x2 ? PaginationUtils.displayRowsForDifferentButton(D, w2) : w2 !== 1 && (PaginationUtils.displayRowsForDifferentButton(D, 1), PaginationUtils.displayRowsForDifferentButton(D, w2));
        }
      });
    }
    static updateRow(D, w2, O, x2) {
      var U, F;
      if (O = _ProgrammaticStructureUpdate.processIndex(O, w2, D.data.length), D.data.length === 0)
        x2 && UpdateAllTableData.update(D, [x2], 0, true);
      else if (w2) {
        const W = (U = D._pagination) == null ? void 0 : U.activePageNumber;
        x2 = _ProgrammaticStructureUpdate.processData(((F = D.data[0]) == null ? void 0 : F.length) || 0, x2), InsertNewRow.insert(D, O, true, x2), setTimeout(() => _ProgrammaticStructureUpdate.updatePaginationAsync(D, W));
      } else
        RemoveRow.remove(D, O);
    }
    static update(D, w2) {
      const { structure: O, isInsert: x2, index: U, data: F } = w2;
      typeof x2 != "boolean" || typeof U != "number" || (O === "row" ? _ProgrammaticStructureUpdate.updateRow(D, x2, U, F) : O === "column" && _ProgrammaticStructureUpdate.updateColumn(D, x2, U, F));
    }
  };
  var FrameComponentsInternalUtils = class {
    static set(D) {
      const { frameComponentsStyles: w2, _frameComponents: O } = D;
      O.displayAddNewColumn = D.displayAddNewColumn, O.displayAddNewRow = D.displayAddNewRow, O.displayIndexColumn = D.displayIndexColumn, O.styles = w2.styles, O.inheritHeaderColors = w2.inheritHeaderColors ?? true;
    }
    static getDefault() {
      return {
        displayAddNewColumn: true,
        displayAddNewRow: true,
        displayIndexColumn: true,
        cellColors: FrameComponentsColors.getDefaultCellColors()
      };
    }
  };
  var RowDropdownSettingsUtil = class _RowDropdownSettingsUtil {
    static postprocessOpenMethod(D, w2) {
      var O, x2;
      !w2.displayIndexColumn && ((O = D.displaySettings.openMethod) != null && O.cellClick) && ((x2 = D.displaySettings.openMethod) == null || delete x2.cellClick, D.displaySettings.openMethod.overlayClick = true);
    }
    // prettier-ignore
    static preprocessOpenMethod(D, w2) {
      w2 && (D.displaySettings.openMethod === void 0 || Object.keys(D.displaySettings.openMethod).length === 0) && w2.openMethod && (D.displaySettings.openMethod = JSON.parse(JSON.stringify(w2.openMethod)));
    }
    static process(D) {
      var U;
      const { rowDropdown: w2, _frameComponents: O, _defaultColumnsSettings: x2 } = D;
      w2.isInsertUpAvailable ?? (w2.isInsertUpAvailable = true), w2.isInsertDownAvailable ?? (w2.isInsertDownAvailable = true), w2.isMoveAvailable ?? (w2.isMoveAvailable = true), w2.canEditHeaderRow ?? (w2.canEditHeaderRow = true), w2.isDeleteAvailable ?? (w2.isDeleteAvailable = true), w2.displaySettings ?? (w2.displaySettings = {}), _RowDropdownSettingsUtil.preprocessOpenMethod(w2, (U = x2.columnDropdown) == null ? void 0 : U.displaySettings), DropdownDisplaySettingsUtil.process(w2.displaySettings), _RowDropdownSettingsUtil.postprocessOpenMethod(w2, O);
    }
  };
  var ProgrammaticCellUpdate = class {
    static updateText(D, w2) {
      var W;
      const { newText: O, rowIndex: x2, columnIndex: U } = w2;
      if (!ObjectUtils.areValuesFullyDefined(O, x2, U) || typeof O != "string" && typeof O != "number")
        return;
      const F = (W = D._columnsDetails[U]) == null ? void 0 : W.elements[x2];
      !F || O === CellElement.getText(F) || (CellEvents.updateCell(D, O, x2, U, { element: F, processText: x2 > 0 }), ColumnTypesUtils.updateDataElements(D, x2, U, F), x2 === 0 && (Dropdown.isDisplayed(D._activeOverlayElements.columnDropdown) && ColumnDropdown.processTextAndHide(D), HeaderText.onAttemptChange(D, F, U)));
    }
  };
  var SheetJSExport = class _SheetJSExport {
    static getFileName(D, w2) {
      return w2 ? w2.endsWith(`.${D}`) ? w2 : `${w2}.${D}` : `table_data.${D}`;
    }
    // not csv
    static export(D, w2, O, x2) {
      const U = x2.utils.book_new(), F = x2.utils.aoa_to_sheet(D.data);
      x2.utils.book_append_sheet(U, F, "Sheet");
      const W = _SheetJSExport.getFileName(w2, O);
      x2.writeFile(U, W, { bookType: w2 });
    }
  };
  var CSVExport = class {
    static export(D, w2) {
      const O = "data:text/csv;charset=utf-8," + D.data.map((F) => F.join(",")).join(`
`), x2 = encodeURI(O), U = document.createElement("a");
      U.setAttribute("href", x2), U.setAttribute("download", w2 || "table_data.csv"), document.body.appendChild(U), U.click();
    }
  };
  var FileExportEvents = class _FileExportEvents {
    static export(D, w2) {
      const O = (w2 == null ? void 0 : w2.format) || "csv";
      if (ACCEPTED_FILE_FORMATS.find((x2) => O === x2)) {
        const x2 = w2 == null ? void 0 : w2.fileName;
        O === "csv" ? CSVExport.export(D, x2) : SheetJSInternalUtils.execFuncWithExtractorModule(SheetJSExport.export.bind(this, D, O, x2));
      }
    }
    static setEvents(D, w2, O) {
      var U;
      const x2 = O ? { format: (U = O.formats) == null ? void 0 : U[0], fileName: O.fileName } : void 0;
      w2.onclick = _FileExportEvents.export.bind(this, D, x2);
    }
  };
  var FileExportDropdownItemEvents = class _FileExportDropdownItemEvents {
    static action(D, w2) {
      const O = w2.toLowerCase();
      FileExportEvents.export(D, { format: O });
    }
    static setEvents(D, w2) {
      const O = _FileExportDropdownItemEvents.action, x2 = OuterDropdownSimpleUtils.hide;
      w2.onmousedown = OuterDropdownItemEvents.itemMouseDownCommon.bind(D, O, x2);
    }
  };
  var _FileExportDropdownItem = class bt {
    // prettier-ignore
    static populate(D, w2, O) {
      O.forEach((x2) => {
        const U = { text: x2.toUpperCase() }, F = DropdownItem.addButtonItem(
          D,
          w2,
          U,
          bt.ITEM_CLASS,
          StaticDropdown.ITEM_CLASS
        );
        FileExportDropdownItemEvents.setEvents(D, F);
      });
    }
  };
  _FileExportDropdownItem.ITEM_CLASS = "export-formats-dropdown-item";
  var FileExportDropdownItem = _FileExportDropdownItem;
  var FileExportDropdown = class {
    static create(D, w2, O) {
      const x2 = OuterDropdownSimpleUtils.hide.bind(this, D._activeOverlayElements), U = OuterDropdownSimpleUtils.display.bind(this, w2), F = OuterDropdownElement.create(D, w2, "bottom-right", {}, [], x2, U);
      return F.element.classList.add(StaticDropdown.DROPDOWN_CLASS), FileExportDropdownItem.populate(D, F.element, O), F;
    }
  };
  var _FileExportButtonElement = class Qe {
    static createButtonArrow(D, w2) {
      const O = OuterDropdownButtonUtils.createArrow(
        [Qe.ARROW_CONTAINER_CLASS],
        [Qe.ARROW_ICON_CLASS]
      ), x2 = typeof w2 == "object" && w2.formats && w2.buttonArrowStyles;
      return x2 && (OuterDropdownButtonUtils.processAndApplyDefaultStyle(O, x2), setTimeout(() => StatefulCSSEvents.setEvents(D, x2, void 0, O))), O;
    }
    // if there is more than 1 format - automatically create a dropdown
    static getDropdownFormats(D) {
      if (typeof D == "object" && D.formats) {
        const { formats: w2 } = D, O = w2.filter((x2) => Qe.VALID_FORMATS[x2.toLocaleLowerCase()]);
        if (O.length > 1)
          return O;
      }
    }
    // prettier-ignore
    static applyDropdown(D, w2, O, x2, U) {
      const F = FileExportDropdown.create(D, w2, x2);
      O.appendChild(F.element), w2.appendChild(Qe.createButtonArrow(w2, U));
    }
  };
  _FileExportButtonElement.ARROW_CONTAINER_CLASS = "file-button-arrow-container";
  _FileExportButtonElement.ARROW_ICON_CLASS = "file-button-arrow-container-icon";
  _FileExportButtonElement.VALID_FORMATS = ["csv", "xls", "xlsx", "ods", "txt"].reduce((Y, D) => (Y[D] = true, Y), {});
  var FileExportButtonElement = _FileExportButtonElement;
  var _FileButtonElements = class Xe {
    static setEvents(D, w2, O) {
      w2.import ? FileImportButtonEvents.setEvents(D, O, typeof w2.import == "object" ? w2.import : void 0) : w2.export && FileExportEvents.setEvents(D, O, typeof w2.export == "object" ? w2.export : void 0);
    }
    // the main reason for this is to display a dropdown
    static wrapInRelativeContainer(D) {
      const w2 = document.createElement("div");
      return w2.classList.add(Xe.BUTTON_CONTAINER_CLASS), w2.appendChild(D), w2;
    }
    static createElement(D, w2) {
      const { text: O, order: x2, styles: U } = D, F = document.createElement("div");
      F.classList.add(Xe.BUTTON_CLASS), F.textContent = O || w2, F.style.order = String(x2 || 0);
      const W = FilesUtils.processStyles(U);
      return Object.assign(F.style, W.default), setTimeout(() => StatefulCSSEvents.setEvents(F, W)), F;
    }
    static create(D, w2) {
      var O, x2;
      (x2 = (O = D.files) == null ? void 0 : O.buttons) == null || x2.forEach((U) => {
        if (!U.export && !U.import)
          return;
        const F = Xe.createElement(U, U.import ? "Import" : "Export"), W = Xe.wrapInRelativeContainer(F), G = U.export && FileExportButtonElement.getDropdownFormats(U.export);
        G ? FileExportButtonElement.applyDropdown(D, F, W, G, U.export) : setTimeout(() => Xe.setEvents(D, U, F));
        const X = U.position || FilesUtils.DEFAULT_BUTTON_POSITION;
        OuterContainerElements.addToContainer(X, w2, W);
      });
    }
  };
  _FileButtonElements.BUTTON_CLASS = "file-button";
  _FileButtonElements.BUTTON_CONTAINER_CLASS = "file-button-container";
  var FileButtonElements = _FileButtonElements;
  var OuterTableComponents = class {
    static create(D) {
      const w2 = OuterContainerElements.create(D);
      D.pagination && PaginationElements.create(D, w2), D.files && FileButtonElements.create(D, w2), D.filter && FilterElements.create(D, w2);
    }
  };
  var WebComponentStyleUtils = class _WebComponentStyleUtils {
    static add(D, w2) {
      if (!(!w2 || !D))
        try {
          _WebComponentStyleUtils.addStyleSheet(D, w2);
        } catch {
          _WebComponentStyleUtils.addStyleElement(D, w2);
        }
    }
    static addStyleSheet(D, w2) {
      const O = new CSSStyleSheet();
      O.replaceSync(D), w2.adoptedStyleSheets.push(O);
    }
    static addStyleElement(D, w2) {
      const O = document.createElement("style");
      O.innerHTML = D, w2.appendChild(O);
    }
  };
  var FocusedElementsUtils = class {
    static createEmpty() {
      return { cell: FocusedCellUtils.createEmpty() };
    }
  };
  var t$2 = (Y) => (D, w2) => {
    w2 !== void 0 ? w2.addInitializer(() => {
      customElements.define(Y, D);
    }) : customElements.define(Y, D);
  };
  var t$1 = globalThis;
  var e$2 = t$1.ShadowRoot && (t$1.ShadyCSS === void 0 || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s$2 = Symbol();
  var o$4 = /* @__PURE__ */ new WeakMap();
  var n$3 = class {
    constructor(D, w2, O) {
      if (this._$cssResult$ = true, O !== s$2)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = D, this.t = w2;
    }
    get styleSheet() {
      let D = this.o;
      const w2 = this.t;
      if (e$2 && D === void 0) {
        const O = w2 !== void 0 && w2.length === 1;
        O && (D = o$4.get(w2)), D === void 0 && ((this.o = D = new CSSStyleSheet()).replaceSync(this.cssText), O && o$4.set(w2, D));
      }
      return D;
    }
    toString() {
      return this.cssText;
    }
  };
  var r$4 = (Y) => new n$3(typeof Y == "string" ? Y : Y + "", void 0, s$2);
  var i$3 = (Y, ...D) => {
    const w2 = Y.length === 1 ? Y[0] : D.reduce((O, x2, U) => O + ((F) => {
      if (F._$cssResult$ === true)
        return F.cssText;
      if (typeof F == "number")
        return F;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + F + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(x2) + Y[U + 1], Y[0]);
    return new n$3(w2, Y, s$2);
  };
  var S$1 = (Y, D) => {
    if (e$2)
      Y.adoptedStyleSheets = D.map((w2) => w2 instanceof CSSStyleSheet ? w2 : w2.styleSheet);
    else
      for (const w2 of D) {
        const O = document.createElement("style"), x2 = t$1.litNonce;
        x2 !== void 0 && O.setAttribute("nonce", x2), O.textContent = w2.cssText, Y.appendChild(O);
      }
  };
  var c$2 = e$2 ? (Y) => Y : (Y) => Y instanceof CSSStyleSheet ? ((D) => {
    let w2 = "";
    for (const O of D.cssRules)
      w2 += O.cssText;
    return r$4(w2);
  })(Y) : Y;
  var { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object;
  var a$1 = globalThis;
  var c$1 = a$1.trustedTypes;
  var l$1 = c$1 ? c$1.emptyScript : "";
  var p$1 = a$1.reactiveElementPolyfillSupport;
  var d$1 = (Y, D) => Y;
  var u$1 = { toAttribute(Y, D) {
    switch (D) {
      case Boolean:
        Y = Y ? l$1 : null;
        break;
      case Object:
      case Array:
        Y = Y == null ? Y : JSON.stringify(Y);
    }
    return Y;
  }, fromAttribute(Y, D) {
    let w2 = Y;
    switch (D) {
      case Boolean:
        w2 = Y !== null;
        break;
      case Number:
        w2 = Y === null ? null : Number(Y);
        break;
      case Object:
      case Array:
        try {
          w2 = JSON.parse(Y);
        } catch {
          w2 = null;
        }
    }
    return w2;
  } };
  var f$1 = (Y, D) => !i$2(Y, D);
  var b = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
  Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
  var y = class extends HTMLElement {
    static addInitializer(D) {
      this._$Ei(), (this.l ?? (this.l = [])).push(D);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(D, w2 = b) {
      if (w2.state && (w2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(D) && ((w2 = Object.create(w2)).wrapped = true), this.elementProperties.set(D, w2), !w2.noAccessor) {
        const O = Symbol(), x2 = this.getPropertyDescriptor(D, O, w2);
        x2 !== void 0 && e$1(this.prototype, D, x2);
      }
    }
    static getPropertyDescriptor(D, w2, O) {
      const { get: x2, set: U } = h$1(this.prototype, D) ?? { get() {
        return this[w2];
      }, set(F) {
        this[w2] = F;
      } };
      return { get: x2, set(F) {
        const W = x2 == null ? void 0 : x2.call(this);
        U == null || U.call(this, F), this.requestUpdate(D, W, O);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(D) {
      return this.elementProperties.get(D) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d$1("elementProperties")))
        return;
      const D = n$2(this);
      D.finalize(), D.l !== void 0 && (this.l = [...D.l]), this.elementProperties = new Map(D.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d$1("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
        const w2 = this.properties, O = [...r$3(w2), ...o$3(w2)];
        for (const x2 of O)
          this.createProperty(x2, w2[x2]);
      }
      const D = this[Symbol.metadata];
      if (D !== null) {
        const w2 = litPropertyMetadata.get(D);
        if (w2 !== void 0)
          for (const [O, x2] of w2)
            this.elementProperties.set(O, x2);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [w2, O] of this.elementProperties) {
        const x2 = this._$Eu(w2, O);
        x2 !== void 0 && this._$Eh.set(x2, w2);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(D) {
      const w2 = [];
      if (Array.isArray(D)) {
        const O = new Set(D.flat(1 / 0).reverse());
        for (const x2 of O)
          w2.unshift(c$2(x2));
      } else
        D !== void 0 && w2.push(c$2(D));
      return w2;
    }
    static _$Eu(D, w2) {
      const O = w2.attribute;
      return O === false ? void 0 : typeof O == "string" ? O : typeof D == "string" ? D.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      var D;
      this._$ES = new Promise((w2) => this.enableUpdating = w2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (D = this.constructor.l) == null || D.forEach((w2) => w2(this));
    }
    addController(D) {
      var w2;
      (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(D), this.renderRoot !== void 0 && this.isConnected && ((w2 = D.hostConnected) == null || w2.call(D));
    }
    removeController(D) {
      var w2;
      (w2 = this._$EO) == null || w2.delete(D);
    }
    _$E_() {
      const D = /* @__PURE__ */ new Map(), w2 = this.constructor.elementProperties;
      for (const O of w2.keys())
        this.hasOwnProperty(O) && (D.set(O, this[O]), delete this[O]);
      D.size > 0 && (this._$Ep = D);
    }
    createRenderRoot() {
      const D = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S$1(D, this.constructor.elementStyles), D;
    }
    connectedCallback() {
      var D;
      this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (D = this._$EO) == null || D.forEach((w2) => {
        var O;
        return (O = w2.hostConnected) == null ? void 0 : O.call(w2);
      });
    }
    enableUpdating(D) {
    }
    disconnectedCallback() {
      var D;
      (D = this._$EO) == null || D.forEach((w2) => {
        var O;
        return (O = w2.hostDisconnected) == null ? void 0 : O.call(w2);
      });
    }
    attributeChangedCallback(D, w2, O) {
      this._$AK(D, O);
    }
    _$ET(D, w2) {
      var U;
      const O = this.constructor.elementProperties.get(D), x2 = this.constructor._$Eu(D, O);
      if (x2 !== void 0 && O.reflect === true) {
        const F = (((U = O.converter) == null ? void 0 : U.toAttribute) !== void 0 ? O.converter : u$1).toAttribute(w2, O.type);
        this._$Em = D, F == null ? this.removeAttribute(x2) : this.setAttribute(x2, F), this._$Em = null;
      }
    }
    _$AK(D, w2) {
      var U, F;
      const O = this.constructor, x2 = O._$Eh.get(D);
      if (x2 !== void 0 && this._$Em !== x2) {
        const W = O.getPropertyOptions(x2), G = typeof W.converter == "function" ? { fromAttribute: W.converter } : ((U = W.converter) == null ? void 0 : U.fromAttribute) !== void 0 ? W.converter : u$1;
        this._$Em = x2, this[x2] = G.fromAttribute(w2, W.type) ?? ((F = this._$Ej) == null ? void 0 : F.get(x2)) ?? null, this._$Em = null;
      }
    }
    requestUpdate(D, w2, O) {
      var x2;
      if (D !== void 0) {
        const U = this.constructor, F = this[D];
        if (O ?? (O = U.getPropertyOptions(D)), !((O.hasChanged ?? f$1)(F, w2) || O.useDefault && O.reflect && F === ((x2 = this._$Ej) == null ? void 0 : x2.get(D)) && !this.hasAttribute(U._$Eu(D, O))))
          return;
        this.C(D, w2, O);
      }
      this.isUpdatePending === false && (this._$ES = this._$EP());
    }
    C(D, w2, { useDefault: O, reflect: x2, wrapped: U }, F) {
      O && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(D) && (this._$Ej.set(D, F ?? w2 ?? this[D]), U !== true || F !== void 0) || (this._$AL.has(D) || (this.hasUpdated || O || (w2 = void 0), this._$AL.set(D, w2)), x2 === true && this._$Em !== D && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(D));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (w2) {
        Promise.reject(w2);
      }
      const D = this.scheduleUpdate();
      return D != null && await D, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var O;
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
          for (const [U, F] of this._$Ep)
            this[U] = F;
          this._$Ep = void 0;
        }
        const x2 = this.constructor.elementProperties;
        if (x2.size > 0)
          for (const [U, F] of x2) {
            const { wrapped: W } = F, G = this[U];
            W !== true || this._$AL.has(U) || G === void 0 || this.C(U, void 0, F, G);
          }
      }
      let D = false;
      const w2 = this._$AL;
      try {
        D = this.shouldUpdate(w2), D ? (this.willUpdate(w2), (O = this._$EO) == null || O.forEach((x2) => {
          var U;
          return (U = x2.hostUpdate) == null ? void 0 : U.call(x2);
        }), this.update(w2)) : this._$EM();
      } catch (x2) {
        throw D = false, this._$EM(), x2;
      }
      D && this._$AE(w2);
    }
    willUpdate(D) {
    }
    _$AE(D) {
      var w2;
      (w2 = this._$EO) == null || w2.forEach((O) => {
        var x2;
        return (x2 = O.hostUpdated) == null ? void 0 : x2.call(O);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(D)), this.updated(D);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(D) {
      return true;
    }
    update(D) {
      this._$Eq && (this._$Eq = this._$Eq.forEach((w2) => this._$ET(w2, this[w2]))), this._$EM();
    }
    updated(D) {
    }
    firstUpdated(D) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null || p$1({ ReactiveElement: y }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.0");
  var o$2 = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 };
  var r$2 = (Y = o$2, D, w2) => {
    const { kind: O, metadata: x2 } = w2;
    let U = globalThis.litPropertyMetadata.get(x2);
    if (U === void 0 && globalThis.litPropertyMetadata.set(x2, U = /* @__PURE__ */ new Map()), O === "setter" && ((Y = Object.create(Y)).wrapped = true), U.set(w2.name, Y), O === "accessor") {
      const { name: F } = w2;
      return { set(W) {
        const G = D.get.call(this);
        D.set.call(this, W), this.requestUpdate(F, G, Y);
      }, init(W) {
        return W !== void 0 && this.C(F, void 0, Y, W), W;
      } };
    }
    if (O === "setter") {
      const { name: F } = w2;
      return function(W) {
        const G = this[F];
        D.call(this, W), this.requestUpdate(F, G, Y);
      };
    }
    throw Error("Unsupported decorator location: " + O);
  };
  function n$1(Y) {
    return (D, w2) => typeof w2 == "object" ? r$2(Y, D, w2) : ((O, x2, U) => {
      const F = x2.hasOwnProperty(U);
      return x2.constructor.createProperty(U, O), F ? Object.getOwnPropertyDescriptor(x2, U) : void 0;
    })(Y, D, w2);
  }
  function r$1(Y) {
    return n$1({ ...Y, state: true, attribute: false });
  }
  var WindowEvents = class {
    static onKeyDown(D) {
      var U, F;
      Dropdown.isDisplayed((U = this._activeOverlayElements.outerContainerDropdown) == null ? void 0 : U.element) && OuterDropdownEvents.windowOnKeyDown(this, D), Dropdown.isDisplayed(this._activeOverlayElements.rowDropdown) && RowDropdownEvents.windowOnKeyDown(this, D);
      const { rowIndex: w2, columnIndex: O, element: x2 } = this._focusedElements.cell;
      if (!(w2 === void 0 || O === void 0)) {
        if (w2 === 0 && !Dropdown.isDisplayed(this._activeOverlayElements.columnDropdown)) {
          if (D.key === KEYBOARD_KEY.ESCAPE)
            return HeaderText.onAttemptChange(this, x2, O);
        } else if (Dropdown.isDisplayed(this._activeOverlayElements.columnDropdown) && !((F = this.shadowRoot) != null && F.activeElement))
          return ColumnDropdownEvents.onKeyDown.bind(this)(this._activeOverlayElements.columnDropdown, D);
        w2 > 0 && this._columnsDetails[O].activeType.cellDropdownProps && SelectCellTextBaseEvents.keyDownText(this, w2, O, D);
      }
    }
    static onKeyUp(D) {
      D.key === KEYBOARD_KEY.ESCAPE ? (OptionColorButtonEvents.windowEventClosePicker(this._columnsDetails, this._focusedElements), DateCellInputEvents.escapeKeyInput(this)) : D.key === KEYBOARD_KEY.ENTER && OptionColorButtonEvents.windowEventClosePicker(this._columnsDetails, this._focusedElements);
    }
    // prettier-ignore
    static onMouseDown(D) {
      var U;
      if (OptionColorButtonEvents.windowEventClosePicker(this._columnsDetails, this._focusedElements), Dropdown.isDisplayed((U = this._activeOverlayElements.outerContainerDropdown) == null ? void 0 : U.element) && OuterDropdownEvents.windowOnMouseDown(this), D.target.tagName === ActiveTable._ELEMENT_TAG)
        return;
      const { _activeOverlayElements: { columnDropdown: w2, rowDropdown: O }, _focusedElements: x2 } = this;
      Dropdown.isDisplayed(O) && RowDropdown.hide(this), Dropdown.isDisplayed(w2) ? ColumnDropdown.processTextAndHide(this) : x2.cellDropdown ? CellWithTextEvents.programmaticBlur(this) : this._activeOverlayElements.datePickerCell && (DateCellInputElement.toggle(this._activeOverlayElements.datePickerCell, false), delete this._activeOverlayElements.datePickerCell);
    }
    static onMouseUp() {
      this._activeOverlayElements.selectedColumnSizer && ColumnSizerExtrinsicEvents.windowMouseUp(this), DragColumn.windowMouseUp(this), DragRow.windowMouseUp(this);
    }
    static onMouseMove(D) {
      this._activeOverlayElements.selectedColumnSizer && ColumnSizerExtrinsicEvents.windowMouseMove(this, D.movementX), this._focusedElements.colDragEl && DragColumn.windowDrag(this, this._focusedElements.colDragEl, D), this._focusedElements.rowDragEl && DragRow.windowDrag(this, D);
    }
  };
  var Render = class _Render {
    // CAUTION-4 overwriting @properties causes the whole table to refresh and subsequently - an infinite render loop
    // prettier-ignore
    static refreshTableState(D) {
      var w2;
      (w2 = D._cellDropdownContainer) == null || w2.replaceChildren(), D._columnsDetails.splice(0, D._columnsDetails.length), D._tableDimensions.indexColumnWidth = IndexColumn.DEFAULT_WIDTH, D._addColumnCellsElementsRef.splice(0, D._addColumnCellsElementsRef.length), D._overflow && (D._tableDimensions.border = TableBorderDimensionsUtils.generateUsingElement(D._overflow.overflowContainer));
    }
    static renderTable(D) {
      D._isRendering = true, TableDimensionsUtils.record(D), _Render.refreshTableState(D), D._overflow && OverflowUtils.applyDimensions(D), TableElement.setStaticWidthContentTotal(D), TableDimensionsUtils.setTableDimensions(D), TableElement.populateBody(D), setTimeout(() => D._isRendering = false);
    }
  };
  var WindowResize = class _WindowResize {
    // prettier-ignore
    static resize(D) {
      const { _tableDimensions: w2 } = this;
      (D.width && window.innerWidth !== w2.recordedWindowWidth || D.height && window.innerHeight !== w2.recordedWindowHeight) && Render.renderTable(this);
    }
    static extractPostfix(D) {
      if (typeof D == "string") {
        if (D.includes(VW))
          return VW;
        if (D.includes(VH))
          return VH;
      }
      return "";
    }
    static extractDimensionsToObserve(D) {
      const { tableStyle: w2, _overflow: O } = D, x2 = [w2.width, w2.maxWidth, O == null ? void 0 : O.maxHeight, O == null ? void 0 : O.maxWidth].map(
        (U) => _WindowResize.extractPostfix(U)
      );
      return {
        width: !!x2.find((U) => U === VW),
        height: !!x2.find((U) => U === VH)
      };
    }
    static observeIfRequired(D) {
      const w2 = _WindowResize.extractDimensionsToObserve(D);
      (w2.width || w2.height) && window.addEventListener("resize", _WindowResize.resize.bind(D, w2));
    }
  };
  var WindowElement = class {
    static setEvents(D) {
      window.addEventListener("keydown", WindowEvents.onKeyDown.bind(D)), window.addEventListener("keyup", WindowEvents.onKeyUp.bind(D)), window.addEventListener("mousedown", WindowEvents.onMouseDown.bind(D)), window.addEventListener("mouseup", WindowEvents.onMouseUp.bind(D)), window.addEventListener("mousemove", WindowEvents.onMouseMove.bind(D)), WindowResize.observeIfRequired(D);
    }
  };
  var _GoogleFont = class dt {
    static appendStyleSheetToHead() {
      const D = document.getElementsByTagName("head")[0];
      if (!Array.from(D.getElementsByTagName("link")).some(
        (O) => O.getAttribute("href") === dt.FONT_URL
      )) {
        const O = document.createElement("link");
        O.rel = "stylesheet", O.href = dt.FONT_URL, D.appendChild(O);
      }
    }
  };
  _GoogleFont.FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
  var GoogleFont = _GoogleFont;
  var ParentResize = class _ParentResize {
    static doesOverflowNeedRerender(D, w2) {
      if (!D._overflow)
        return false;
      const { isHeightPercentage: O, isWidthPercentage: x2 } = D._overflow;
      return O && D._tableDimensions.recordedParentHeight !== w2.offsetHeight || x2 && D._tableDimensions.recordedParentWidth !== w2.offsetWidth;
    }
    static shouldRerenderTable(D) {
      if (!D)
        return false;
      const w2 = D.parentElement;
      return w2 ? _ParentResize.doesOverflowNeedRerender(D, w2) ? true : D._tableDimensions.isPercentage && // Resize callback gets triggered on multiple occasions when the parent width has not changed:
      // on startup, after table has been resized, when parent height is changed and when column height is changed
      // This condition prevents the table from re-rendering itself when the above occurs
      D._tableDimensions.recordedParentWidth !== w2.offsetWidth && // If the parent is resized to a width that does not impact the table width, do not bother re-rendering it
      (D._tableDimensions.maxWidth === void 0 || D.offsetWidth > w2.offsetWidth) : false;
    }
    static resizeCallback() {
      const D = this;
      _ParentResize.shouldRerenderTable(D) && (D._tableDimensions.preserveNarrowColumns || (D._tableDimensions.preserveNarrowColumns = true, setTimeout(() => D._tableDimensions.preserveNarrowColumns = false)), Render.renderTable(D));
    }
  };
  var t = globalThis;
  var i$1 = t.trustedTypes;
  var s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (Y) => Y }) : void 0;
  var e = "$lit$";
  var h = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o$1 = "?" + h;
  var n = `<${o$1}>`;
  var r = document;
  var l = () => r.createComment("");
  var c = (Y) => Y === null || typeof Y != "object" && typeof Y != "function";
  var a = Array.isArray;
  var u = (Y) => a(Y) || typeof (Y == null ? void 0 : Y[Symbol.iterator]) == "function";
  var d = `[ 	
\f\r]`;
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var T = Symbol.for("lit-noChange");
  var E = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var C = r.createTreeWalker(r, 129);
  function P(Y, D) {
    if (!a(Y) || !Y.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return s$1 !== void 0 ? s$1.createHTML(D) : D;
  }
  var V = (Y, D) => {
    const w2 = Y.length - 1, O = [];
    let x2, U = D === 2 ? "<svg>" : D === 3 ? "<math>" : "", F = f;
    for (let W = 0; W < w2; W++) {
      const G = Y[W];
      let X, K, q = -1, Q = 0;
      for (; Q < G.length && (F.lastIndex = Q, K = F.exec(G), K !== null); )
        Q = F.lastIndex, F === f ? K[1] === "!--" ? F = v : K[1] !== void 0 ? F = _ : K[2] !== void 0 ? ($.test(K[2]) && (x2 = RegExp("</" + K[2], "g")), F = m) : K[3] !== void 0 && (F = m) : F === m ? K[0] === ">" ? (F = x2 ?? f, q = -1) : K[1] === void 0 ? q = -2 : (q = F.lastIndex - K[2].length, X = K[1], F = K[3] === void 0 ? m : K[3] === '"' ? g : p) : F === g || F === p ? F = m : F === v || F === _ ? F = f : (F = m, x2 = void 0);
      const le = F === m && Y[W + 1].startsWith("/>") ? " " : "";
      U += F === f ? G + n : q >= 0 ? (O.push(X), G.slice(0, q) + e + G.slice(q) + h + le) : G + h + (q === -2 ? W : le);
    }
    return [P(Y, U + (Y[w2] || "<?>") + (D === 2 ? "</svg>" : D === 3 ? "</math>" : "")), O];
  };
  var N = class _N {
    constructor({ strings: D, _$litType$: w2 }, O) {
      let x2;
      this.parts = [];
      let U = 0, F = 0;
      const W = D.length - 1, G = this.parts, [X, K] = V(D, w2);
      if (this.el = _N.createElement(X, O), C.currentNode = this.el.content, w2 === 2 || w2 === 3) {
        const q = this.el.content.firstChild;
        q.replaceWith(...q.childNodes);
      }
      for (; (x2 = C.nextNode()) !== null && G.length < W; ) {
        if (x2.nodeType === 1) {
          if (x2.hasAttributes())
            for (const q of x2.getAttributeNames())
              if (q.endsWith(e)) {
                const Q = K[F++], le = x2.getAttribute(q).split(h), re = /([.?@])?(.*)/.exec(Q);
                G.push({ type: 1, index: U, name: re[2], strings: le, ctor: re[1] === "." ? H : re[1] === "?" ? I : re[1] === "@" ? L : k }), x2.removeAttribute(q);
              } else
                q.startsWith(h) && (G.push({ type: 6, index: U }), x2.removeAttribute(q));
          if ($.test(x2.tagName)) {
            const q = x2.textContent.split(h), Q = q.length - 1;
            if (Q > 0) {
              x2.textContent = i$1 ? i$1.emptyScript : "";
              for (let le = 0; le < Q; le++)
                x2.append(q[le], l()), C.nextNode(), G.push({ type: 2, index: ++U });
              x2.append(q[Q], l());
            }
          }
        } else if (x2.nodeType === 8)
          if (x2.data === o$1)
            G.push({ type: 2, index: U });
          else {
            let q = -1;
            for (; (q = x2.data.indexOf(h, q + 1)) !== -1; )
              G.push({ type: 7, index: U }), q += h.length - 1;
          }
        U++;
      }
    }
    static createElement(D, w2) {
      const O = r.createElement("template");
      return O.innerHTML = D, O;
    }
  };
  function S(Y, D, w2 = Y, O) {
    var F, W;
    if (D === T)
      return D;
    let x2 = O !== void 0 ? (F = w2._$Co) == null ? void 0 : F[O] : w2._$Cl;
    const U = c(D) ? void 0 : D._$litDirective$;
    return (x2 == null ? void 0 : x2.constructor) !== U && ((W = x2 == null ? void 0 : x2._$AO) == null || W.call(x2, false), U === void 0 ? x2 = void 0 : (x2 = new U(Y), x2._$AT(Y, w2, O)), O !== void 0 ? (w2._$Co ?? (w2._$Co = []))[O] = x2 : w2._$Cl = x2), x2 !== void 0 && (D = S(Y, x2._$AS(Y, D.values), x2, O)), D;
  }
  var M = class {
    constructor(D, w2) {
      this._$AV = [], this._$AN = void 0, this._$AD = D, this._$AM = w2;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(D) {
      const { el: { content: w2 }, parts: O } = this._$AD, x2 = ((D == null ? void 0 : D.creationScope) ?? r).importNode(w2, true);
      C.currentNode = x2;
      let U = C.nextNode(), F = 0, W = 0, G = O[0];
      for (; G !== void 0; ) {
        if (F === G.index) {
          let X;
          G.type === 2 ? X = new R(U, U.nextSibling, this, D) : G.type === 1 ? X = new G.ctor(U, G.name, G.strings, this, D) : G.type === 6 && (X = new z(U, this, D)), this._$AV.push(X), G = O[++W];
        }
        F !== (G == null ? void 0 : G.index) && (U = C.nextNode(), F++);
      }
      return C.currentNode = r, x2;
    }
    p(D) {
      let w2 = 0;
      for (const O of this._$AV)
        O !== void 0 && (O.strings !== void 0 ? (O._$AI(D, O, w2), w2 += O.strings.length - 2) : O._$AI(D[w2])), w2++;
    }
  };
  var R = class _R {
    get _$AU() {
      var D;
      return ((D = this._$AM) == null ? void 0 : D._$AU) ?? this._$Cv;
    }
    constructor(D, w2, O, x2) {
      this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = D, this._$AB = w2, this._$AM = O, this.options = x2, this._$Cv = (x2 == null ? void 0 : x2.isConnected) ?? true;
    }
    get parentNode() {
      let D = this._$AA.parentNode;
      const w2 = this._$AM;
      return w2 !== void 0 && (D == null ? void 0 : D.nodeType) === 11 && (D = w2.parentNode), D;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(D, w2 = this) {
      D = S(this, D, w2), c(D) ? D === E || D == null || D === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : D !== this._$AH && D !== T && this._(D) : D._$litType$ !== void 0 ? this.$(D) : D.nodeType !== void 0 ? this.T(D) : u(D) ? this.k(D) : this._(D);
    }
    O(D) {
      return this._$AA.parentNode.insertBefore(D, this._$AB);
    }
    T(D) {
      this._$AH !== D && (this._$AR(), this._$AH = this.O(D));
    }
    _(D) {
      this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = D : this.T(r.createTextNode(D)), this._$AH = D;
    }
    $(D) {
      var U;
      const { values: w2, _$litType$: O } = D, x2 = typeof O == "number" ? this._$AC(D) : (O.el === void 0 && (O.el = N.createElement(P(O.h, O.h[0]), this.options)), O);
      if (((U = this._$AH) == null ? void 0 : U._$AD) === x2)
        this._$AH.p(w2);
      else {
        const F = new M(x2, this), W = F.u(this.options);
        F.p(w2), this.T(W), this._$AH = F;
      }
    }
    _$AC(D) {
      let w2 = A.get(D.strings);
      return w2 === void 0 && A.set(D.strings, w2 = new N(D)), w2;
    }
    k(D) {
      a(this._$AH) || (this._$AH = [], this._$AR());
      const w2 = this._$AH;
      let O, x2 = 0;
      for (const U of D)
        x2 === w2.length ? w2.push(O = new _R(this.O(l()), this.O(l()), this, this.options)) : O = w2[x2], O._$AI(U), x2++;
      x2 < w2.length && (this._$AR(O && O._$AB.nextSibling, x2), w2.length = x2);
    }
    _$AR(D = this._$AA.nextSibling, w2) {
      var O;
      for ((O = this._$AP) == null ? void 0 : O.call(this, false, true, w2); D && D !== this._$AB; ) {
        const x2 = D.nextSibling;
        D.remove(), D = x2;
      }
    }
    setConnected(D) {
      var w2;
      this._$AM === void 0 && (this._$Cv = D, (w2 = this._$AP) == null || w2.call(this, D));
    }
  };
  var k = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(D, w2, O, x2, U) {
      this.type = 1, this._$AH = E, this._$AN = void 0, this.element = D, this.name = w2, this._$AM = x2, this.options = U, O.length > 2 || O[0] !== "" || O[1] !== "" ? (this._$AH = Array(O.length - 1).fill(new String()), this.strings = O) : this._$AH = E;
    }
    _$AI(D, w2 = this, O, x2) {
      const U = this.strings;
      let F = false;
      if (U === void 0)
        D = S(this, D, w2, 0), F = !c(D) || D !== this._$AH && D !== T, F && (this._$AH = D);
      else {
        const W = D;
        let G, X;
        for (D = U[0], G = 0; G < U.length - 1; G++)
          X = S(this, W[O + G], w2, G), X === T && (X = this._$AH[G]), F || (F = !c(X) || X !== this._$AH[G]), X === E ? D = E : D !== E && (D += (X ?? "") + U[G + 1]), this._$AH[G] = X;
      }
      F && !x2 && this.j(D);
    }
    j(D) {
      D === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, D ?? "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(D) {
      this.element[this.name] = D === E ? void 0 : D;
    }
  };
  var I = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(D) {
      this.element.toggleAttribute(this.name, !!D && D !== E);
    }
  };
  var L = class extends k {
    constructor(D, w2, O, x2, U) {
      super(D, w2, O, x2, U), this.type = 5;
    }
    _$AI(D, w2 = this) {
      if ((D = S(this, D, w2, 0) ?? E) === T)
        return;
      const O = this._$AH, x2 = D === E && O !== E || D.capture !== O.capture || D.once !== O.once || D.passive !== O.passive, U = D !== E && (O === E || x2);
      x2 && this.element.removeEventListener(this.name, this, O), U && this.element.addEventListener(this.name, this, D), this._$AH = D;
    }
    handleEvent(D) {
      var w2;
      typeof this._$AH == "function" ? this._$AH.call(((w2 = this.options) == null ? void 0 : w2.host) ?? this.element, D) : this._$AH.handleEvent(D);
    }
  };
  var z = class {
    constructor(D, w2, O) {
      this.element = D, this.type = 6, this._$AN = void 0, this._$AM = w2, this.options = O;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(D) {
      S(this, D);
    }
  };
  var j = t.litHtmlPolyfillSupport;
  j == null || j(N, R), (t.litHtmlVersions ?? (t.litHtmlVersions = [])).push("3.3.0");
  var B = (Y, D, w2) => {
    const O = (w2 == null ? void 0 : w2.renderBefore) ?? D;
    let x2 = O._$litPart$;
    if (x2 === void 0) {
      const U = (w2 == null ? void 0 : w2.renderBefore) ?? null;
      O._$litPart$ = x2 = new R(D.insertBefore(l(), U), U, void 0, w2 ?? {});
    }
    return x2._$AI(Y), x2;
  };
  var s = globalThis;
  var i2 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var w2;
      const D = super.createRenderRoot();
      return (w2 = this.renderOptions).renderBefore ?? (w2.renderBefore = D.firstChild), D;
    }
    update(D) {
      const w2 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(D), this._$Do = B(w2, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var D;
      super.connectedCallback(), (D = this._$Do) == null || D.setConnected(true);
    }
    disconnectedCallback() {
      var D;
      super.disconnectedCallback(), (D = this._$Do) == null || D.setConnected(false);
    }
    render() {
      return T;
    }
  };
  var pt;
  i2._$litElement$ = true, i2.finalized = true, (pt = s.litElementHydrateSupport) == null || pt.call(s, { LitElement: i2 });
  var o2 = s.litElementPolyfillSupport;
  o2 == null || o2({ LitElement: i2 });
  (s.litElementVersions ?? (s.litElementVersions = [])).push("4.2.0");
  var activeTableStyle = i$3`
  /* this is used to shrink the width of the active-table element to the shadow-root width */
  :host {
    /* the following property prevents outside styles from affecting this component */
    all: initial;
    /* the following property is used to control the overall component width */
    display: inline-block;
  }

  table {
    border-spacing: 0px;
    position: relative;
    border: 1px solid #00000028;
    background-color: white;
  }

  /* REF-16 */
  .table-controlled-width {
    table-layout: fixed;
    /* fit-content does not work correctly in firefox when there are not enough columns to fit parent */
    width: min-content;
  }

  tbody {
    border-radius: inherit;
  }

  tbody > .row:first-child > *:first-child {
    border-top-left-radius: inherit;
  }

  /* using last-of-type as the last element is a divider which does not help with corner rounding */
  tbody > .row:first-child > .cell:last-of-type {
    border-top-right-radius: inherit;
  }

  #last-visible-row > *:first-child {
    border-bottom-left-radius: inherit;
  }

  #last-visible-row > .cell:last-of-type {
    border-bottom-right-radius: inherit;
  }

  .row {
    color: rgba(0, 0, 0, 0.87);
    font-size: 13px;
    font-weight: 400;
    /* the following is not supported in Firefox (on rows), hence rowHoverStyles will not have the border */
    border-radius: inherit;
  }

  tbody > .row:first-child {
    position: relative;
  }

  .row > *:first-child {
    border-left: none !important;
  }

  .row > .cell:last-of-type {
    border-right: none !important;
  }

  /* REF-25 */
  #last-visible-row > .cell {
    border-bottom: none !important;
  }

  .cell {
    text-align: left;
    padding: 11px 6px 6px;
    font-size: 14px;
    line-height: 17px;
    height: 42.5px;
    box-sizing: border-box;
    outline: none;
    overflow-wrap: anywhere;
    font-size: inherit;
    font-weight: inherit;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.12);
    vertical-align: top;
    text-align: left;
    border-right: 1px solid #00000021;
    color: #222222;
  }

  .cell-text-div {
    outline: none;
    overflow-wrap: anywhere;
    border-radius: 4px;
    width: fit-content;
    /* need padding for the cursor to show up */
    padding-left: 1px;
  }

  .select-cell-text {
    float: left;
  }

  .arrow-down-icon-container {
    position: relative;
  }

  .arrow-down-icon {
    position: absolute;
    right: 2px;
    top: 5px;
    text-align: center;
    cursor: pointer;
  }

  .label-cell-text {
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .cell-divider {
    position: absolute;
    display: flex;
    justify-content: center;
  }

  .cell-divider > * {
    user-select: none;
    /* safari */
    -webkit-user-select: none;
    position: absolute;
    cursor: col-resize;
    justify-content: center;
    height: inherit;
  }

  /* this class needs to be after .cell to have style precendence */
  /* REF-1 */
  .header-cell {
    border-top: none !important;
    cursor: pointer;
    color: #626262;
    padding-top: 12px;
    padding-bottom: 12px;
    font-weight: 500;
  }

  .header-icon-container {
    float: left;
    pointer-events: none;
    /* the height is set to allow the text to be present below the icon when there is not enough space in the cell */
    height: 15px;
  }

  .header-icon-side-text {
    /* cannot use flex as pressing ENTER creates a new div */
    /* cannot use grid as it does not align in Safari */
    display: table-cell;
  }

  .not-selectable {
    user-select: none;
    /* safari */
    -webkit-user-select: none;
  }

  .column-sizer {
    /* need z-index for the sizer to display over header icon */
    z-index: 1;
    background-size: 20px 5px;
    position: absolute;
  }

  .column-sizer-filler {
    height: inherit;
    position: absolute;
    pointer-events: none;
  }

  .column-sizer-overlay {
    background-color: #ff000001;
    z-index: 1;
  }

  .movable-column-sizer {
    z-index: 1;
  }

  .movable-column-sizer-vertical-line {
    width: 1px;
    pointer-events: none;
  }

  #add-new-row-cell {
    padding-top: 8px;
    padding-left: 17px;
    min-height: 28px;
    line-height: 18px;
    font-size: 12px;
    color: #555555;
    vertical-align: middle;
    cursor: pointer;
  }

  .index-cell {
    text-align: center;
    padding: 11px 4px 0px !important;
  }

  .index-cell-overflow {
    overflow: hidden;
    overflow-wrap: normal;
  }

  #temp-invisible-index-number {
    color: #e2e2e200 !important;
  }

  .add-column-cell {
    cursor: pointer;
    text-align: center;
  }

  .header-cell-clone {
    position: absolute;
    cursor: move;
    top: 0px;
  }

  .header-cell-clone-animation {
    transition: 0.25s ease-out;
  }

  .cell-hidden {
    opacity: 0 !important;
  }

  .row-clone {
    position: absolute;
    display: flex;
    opacity: 0.8s;
  }

  .row-clone > * {
    cursor: move !important;
  }

  .row-drag-target-line {
    height: 4px;
    width: 100%;
    position: absolute;
    background-color: #69b0ff;
    pointer-events: none;
  }

  .root-cell {
    text-align: center;
    padding: 0px !important;
    border: none !important;
    // inheriting border radius as when frame components style background is set (add new row component), table border
    // radius is visibly not inherited
    border-radius: inherit;
  }

  .active-table-dropdown {
    position: absolute;
    box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
    border-radius: 5px;
    background-color: white;
    z-index: 1;
  }

  .active-table-dropup {
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px,
      rgba(15, 15, 15, 0.2) 0px -2px 24px;
    top: unset !important;
    bottom: 100%;
  }

  .cell-dropdown {
    overflow: auto;
    white-space: nowrap;
  }

  .cell-dropdown::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  .cell-dropdown::-webkit-scrollbar-thumb {
    background-color: #aaaaaa;
    border-radius: 5px;
  }

  .cell-dropdown::-webkit-scrollbar-track {
    background-color: #f2f2f2;
  }

  .dropdown-item {
    padding-top: 3px;
    padding-bottom: 3px;
    padding-right: 5px;
    padding-left: 5px;
    color: #4b4b4b;
    position: relative;
    cursor: pointer;
    /* retaining the outline for dropdown input to make it easier to recognise */
    outline: none;
    font-size: 15px;
  }

  .cell-dropdown > .dropdown-item {
    /* the height of cell dropdown items seem to change depending on monitor size which inconsistently triggers overflow,
    this sets it to be consistent but ideally we should not do this and use a different way to allow any font sizes */
    height: 18px;
  }

  .dropdown-item-icon-container {
    display: flex;
    float: left;
    height: 90%;
    align-items: initial;
    padding-top: 2px;
    /* if items are not aligned in center - change align-items to center and revert changes
      in 0805a911cd5c7921aa05b13ffb9387d3d996c133 */
  }

  .dropdown-title-item {
    cursor: default;
    color: #7c7c7c;
    font-weight: 600;
    font-size: 0.75rem;
    margin-top: 2px;
  }

  .dropdown-input-item {
    text-align: center;
  }

  .dropdown-input {
    width: 92%;
    border: 1px solid grey;
    border-radius: 2px;
    color: #2d2d2d;
    font-size: 14px;
    padding: 3px;
    padding-top: 4px;
  }

  .dropdown-item-divider {
    border-bottom: 1px solid #d4d4d4;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .dropdown-highlightable-item:hover {
    background-color: #eaeaea;
  }

  .active-dropdown-item {
    background-color: #4a69d4;
    color: white;
  }

  /* using different class as standard dropdowns use above class in their functionality */
  .active-static-dropdown-item {
    background-color: #4a69d4;
    color: white;
  }

  .active-dropdown-item:focus {
    background-color: #2148d5 !important;
    color: white !important;
  }

  /* Do not want to set default height incase user has set a font or a font-family so
    setting a placeholder text and making it invisible */
  .dropdown-item-empty {
    color: #ffffae00 !important;
  }

  .dropdown-disabled-item {
    pointer-events: none;
    color: #9e9e9e8a;
  }

  .cell-dropdown-option-button-container {
    position: absolute;
    width: 100%;
    height: 0px;
    top: 5px;
    left: -5px;
    display: none;
  }

  .cell-dropdown-option-button {
    height: 13px;
    width: 13px;
    position: sticky;
    z-index: 1;
    border-radius: 12px;
    opacity: 0.3;
    background-color: white;
  }

  .cell-dropdown-option-button:hover {
    opacity: 1;
  }

  .cell-dropdown-option-button:active {
    background-color: #f8f8f8;
  }

  .cell-dropdown-option-button > div {
    font-size: 12px;
    height: 11px;
    pointer-events: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell-dropdown-option-delete-button-icon {
    font-size: 12.5px;
    width: 13px;
  }

  .cell-dropdown-option-color-button-icon {
    width: 12.5px;
  }

  .outer-container-dropdown {
    z-index: 2;
  }

  .color-input {
    width: 0px;
    height: 0px;
    padding: 0px;
    position: absolute;
    outline: none;
    pointer-events: none;
    opacity: 0;
    /* border unset stops color picker panel from appearing in safari */
  }

  .date-input-container {
    position: relative;
    float: right;
    cursor: pointer;
  }

  .date-input {
    top: 17px;
    width: 0px;
    height: 0px;
    border: unset;
    padding: 0px;
    right: 9px;
    position: absolute;
    outline: none;
  }

  .calender-icon-container {
    position: absolute;
    right: 2px;
    top: -4px;
    width: 15px;
    height: 25px;
    text-align: center;
  }

  #full-table-overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  #drag-and-drop-overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    height: calc(100% - 10px);
    width: calc(100% - 10px);
    background-color: #70c6ff4d;
    border: 5px dashed #6dafff;
    display: none;
    z-index: 2;
  }

  .filter-hidden-row {
    display: none;
  }

  .dropdown-cell-overlay {
    cursor: pointer;
    background-color: grey;
  }

  .column-dropdown-cell-overlay {
    transition: height 0.2s;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .row-dropdown-cell-overlay {
    transition: width 0.2s;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  #pagination-button-container {
    right: 0;
    display: flex;
    width: fit-content;
    height: fit-content;
  }

  .pagination-button {
    border: 1px solid #0000004d;
    border-right: unset;
    color: #353535;
    min-width: 31px;
    height: 30.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 15.5px;
    /* REF-40 */
    stroke: black;
  }

  .pagination-prev-next-button {
    width: 14.25px;
    padding-left: 4px;
  }

  .pagination-first-last-button {
    width: 13px;
  }

  .pagination-button > * {
    pointer-events: none;
  }

  .pagination-button-disabled {
    pointer-events: none;
    color: #7c7c7c;
    /* REF-40 */
    stroke: #7c7c7c;
  }

  .pagination-button > svg > path {
    /* REF-40 */
    stroke: inherit;
  }

  #pagination-number-of-visible-rows {
    padding-top: 6px;
    color: #252525;
    min-width: 82px;
    text-align: center;
    font-size: 15.5px;
    padding-top: 7.5px;
  }

  #pagination-number-of-rows-select {
    position: relative;
    color: #1d1d1d;
    min-width: max-content;
  }

  #pagination-number-of-rows-select-text {
    font-size: 15.5px;
    float: left;
    margin-top: 6px;
  }

  #rows-per-page-select-button {
    display: inline-block;
    background-color: white;
    border: 1px solid #0000004d;
    border-radius: 4px;
    height: 24px;
    padding-top: 3px;
    padding-bottom: 0.5px;
    padding-left: 6px;
    padding-right: 1px;
    margin-top: 1px;
    cursor: pointer;
  }

  .outer-dropdown-button-arrow-container {
    pointer-events: none;
    color: #353535;
    font-size: 16px;
    float: right;
    margin: 1px;
    margin-left: -1px;
    width: 19px;
  }

  .outer-dropdown-button-arrow-icon {
    width: 16px;
    transform: scale(0.9, 1);
    filter: brightness(0) saturate(100%) invert(11%) sepia(3%) saturate(99%) hue-rotate(157deg) brightness(97%)
      contrast(98%);
    padding-top: 2px;
    padding-left: 2px;
  }

  #rows-per-page-select-button-text {
    display: inline-block;
    pointer-events: none;
    padding-top: 1px;
  }

  .number-of-rows-dropdown-item {
    padding-right: 12.5px;
    text-align: right;
  }

  .file-button-container {
    position: relative;
  }

  .file-button {
    border: 1px solid #00000038;
    border-radius: 3px;
    color: #464646;
    text-align: center;
    cursor: pointer;
    user-select: none;
    background-color: #f8f8f9;
    font-size: 14.5px;
    align-items: center;
    display: flex;
    height: 29px;
    padding: 0px 10px 1px;
  }

  .file-button-arrow-container {
    margin-right: -5px;
  }

  .file-button-arrow-container-icon {
    width: 17px;
    padding-top: 5px;
  }

  .export-formats-dropdown-item {
    padding: 4px 10px;
    font-size: 14.5px;
  }

  .hidden-row {
    line-height: 0px;
    height: 0px !important;
    user-select: none;
    pointer-events: none;
  }

  .hidden-row > * {
    line-height: 0px;
    height: 0px;
    padding: 0px !important;
    font-size: 0px;
    border-bottom-width: 0px !important;
  }

  .hidden-row > th > * {
    display: none;
  }

  .outer-container {
    display: grid;
    position: relative;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #outer-top-container > div > div > div > * {
    margin-bottom: 13px;
  }

  #outer-bottom-container > div > div > div > * {
    margin-top: 13px;
  }

  /* REF-38 */
  .outer-container-column {
    display: flex;
    width: 0px;
  }

  .outer-container-column-inner {
    display: flex;
  }

  .outer-container-column-content {
    display: flex;
    /* use -webkit-max-content if the below does not work */
    width: max-content;
  }

  .outer-container-left-column .outer-container-column-content > div {
    margin-right: 10px;
  }

  .outer-container-center-column {
    justify-content: center;
    position: absolute;
  }

  .outer-container-center-column .outer-container-column-content > div {
    margin-left: 5px;
    margin-right: 5px;
  }

  .outer-container-right-column {
    justify-content: end;
  }

  .outer-container-right-column .outer-container-column-content > div {
    margin-left: 10px;
  }

  /* right sibling */
  .pagination-button-active-precedence + div {
    border-left-color: #fafafa01 !important;
  }

  .sticky-header-body > *:first-child {
    top: 0;
    position: sticky !important;
  }

  .sticky-header-body > *:first-child > th {
    background-color: white;
  }

  #overflow-container {
    border: 1px solid #00000026;
  }

  /* REF-37 */
  .no-overflow-sticky-header-body {
    border-top: 1px solid #00000026;
  }

  /* REF-37 */
  .no-overflow-sticky-header-body > *:first-child {
    border-top: inherit;
  }

  /* REF-37 */
  .no-overflow-sticky-header-body > *:first-child > th {
    border-top: inherit !important;
  }

  .filter-rows-container {
    position: relative;
  }

  .filter-rows-input {
    width: 150px;
    height: 20px;
    border: 1px solid #0000002b;
    border-radius: 4px;
    color: rgb(45, 45, 45);
    font-family: inherit;
    padding: 5px 6px;
    font-size: 14px;
  }

  .filter-rows-input::placeholder {
    color: var(--active-table-filter-placeholder-color);
  }

  .filter-rows-dropdown-button {
    position: absolute;
    right: 4px;
    top: 51.6%;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
    filter: brightness(0) saturate(100%) invert(49%) sepia(0%) saturate(974%) hue-rotate(66deg) brightness(97%)
      contrast(96%);
    width: 16px;
    height: 16px;
  }

  .filter-rows-dropdown-button + .filter-rows-case-button {
    right: 15px;
  }

  .filter-rows-case-button + .filter-rows-input {
    padding-right: 30px;
    width: 129px;
  }

  .filter-rows-dropdown-button + .filter-rows-input {
    padding-right: 22px;
    width: 137px;
  }

  .filter-rows-dropdown-button + .filter-rows-case-button + .filter-rows-input {
    padding-right: 45px;
    width: 114px;
  }

  .filter-rows-case-button {
    position: absolute;
    right: 0px;
    top: 49%;
    transform: translate(-50%, -50%);
    color: grey;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
  }

  .filter-rows-dropdown {
    min-width: 100% !important;
    width: max-content !important;
  }

  .filter-rows-dropdown > .dropdown-item {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .default-loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 400px;
    border: 1px solid grey;
  }

  .loading-container-absolute {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }

  .absolute-container {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }

  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 5px solid #38a4ff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  #error-container {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #ff000006;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #error-text {
    font-size: 24px;
    color: red;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (Y, D, w2, O) => {
    for (var x2 = O > 1 ? void 0 : O ? __getOwnPropDesc(D, w2) : D, U = Y.length - 1, F; U >= 0; U--)
      (F = Y[U]) && (x2 = (O ? F(D, w2, x2) : F(x2)) || x2);
    return O && x2 && __defProp2(D, w2, x2), x2;
  };
  var ActiveTable = class extends i2 {
    constructor() {
      super(), this.getData = () => JSON.parse(JSON.stringify(this.data)), this.getColumnsDetails = () => ColumnDetailsUtils.getAllColumnsDetails(this._columnsDetails), this.updateCell = (Y) => {
        ProgrammaticCellUpdate.updateText(this, Y);
      }, this.updateStructure = (Y) => {
        ProgrammaticStructureUpdate.update(this, Y);
      }, this.updateData = (Y) => {
        UpdateAllTableData.update(this, Y, 0);
      }, this.importFile = (Y) => FileImportButtonEvents.triggerImportPrompt(this, Y), this.exportFile = (Y) => FileExportEvents.export(this, Y), this.onCellUpdate = () => {
      }, this.onDataUpdate = () => {
      }, this.onColumnsUpdate = () => {
      }, this.onRender = () => {
      }, this.data = [
        // ['Planet', 'Diameter', 'Mass', 'Moons', 'Density'],
        // ['Earth', 12756, 5.97, 1, 5514],
        // ['Mars', 6792, 0.642, 2, 3934],
        // ['Jupiter', 142984, 1898, 79, 1326],
        // ['Saturn', 120536, 568, 82, 687],
        // ['Neptune', 49528, 102, 14, 1638],
      ], this.tableStyle = {}, this.allowDuplicateHeaders = true, this.displayHeaderIcons = true, this.spellCheck = false, this.customColumnsSettings = [], this.dragRows = true, this.dragColumns = true, this.preserveNarrowColumns = true, this.displayAddNewRow = true, this.displayAddNewColumn = true, this.displayIndexColumn = { wrapIndexCellText: false }, this.frameComponentsStyles = {}, this.dataStartsAtHeader = false, this.columnResizerColors = {}, this.rowDropdown = { displaySettings: { isAvailable: true, openMethod: { cellClick: true } } }, this.enterKeyMoveDown = false, this._stickyProps = { header: false }, this._defaultColumnsSettings = {}, this._customColumnsSettings = {}, this._columnsDetails = [], this._addColumnCellsElementsRef = [], this._focusedElements = FocusedElementsUtils.createEmpty(), this._hoveredElements = {}, this._activeOverlayElements = ActiveOverlayElementsUtils.createNew(), this._eventFunctions = ElementEvents.getDefault(), this._userKeyEventsState = UserKeyEventsStateUtils.createNew(), this._tableDimensions = TableDimensionsUtils.getDefault(), this._globalItemColors = LabelColorUtils.generateGlobalItemColors(), this._defaultCellHoverColors = CellHighlightUtils.getDefaultHoverProperties(), this._frameComponents = FrameComponentsInternalUtils.getDefault(), this._rowDropdownCellOverlays = [], this._pagination = PaginationInternalUtils.getDefault(), this._files = FilesUtils.createDefault(this), this._visiblityInternal = {}, this._isRendering = false, this._isPopulatingTable = false, GoogleFont.appendStyleSheetToHead();
    }
    // CAUTION-4
    render() {
      Render.renderTable(this), this.onDataUpdate(this.data), new ResizeObserver(ParentResize.resizeCallback.bind(this)).observe(this.parentElement), FireEvents.onRender(this);
    }
    async update(Y) {
      var w2, O;
      PaginationAsyncUtils.preprocessTablePropertiesIfAsync(this), this._isPopulatingTable = true, StickyPropsUtils.process(this), ColumnSettingsUtils.setUpInternalSettings(this), FrameComponentsInternalUtils.set(this), DefaultColumnTypes.createDropdownItemsForDefaultTypes(), RowDropdownSettingsUtil.process(this), this.pagination && await PaginationInternalUtils.process(this), this.stripedRows && StripedRows.process(this), this.rowHoverStyles && RowHoverEvents.process(this.rowHoverStyles, this._defaultCellHoverColors);
      const D = TableElement.createInfrastructureElements(this);
      this.overflow && OverflowUtils.setupContainer(this, D), TableElement.addOverlayElements(this, D, this._activeOverlayElements), PaginationAsyncUtils.removeLoadingOverlay(this), (O = this.shadowRoot) == null || O.appendChild(((w2 = this._overflow) == null ? void 0 : w2.overflowContainer) || D), OuterTableComponents.create(this), InitialDataProcessing.preProcess(this, this.data), WindowElement.setEvents(this), this.spellcheck = this.spellCheck, this.auxiliaryStyle && this.shadowRoot && WebComponentStyleUtils.add(this.auxiliaryStyle, this.shadowRoot), setTimeout(() => this._isPopulatingTable = false, 1), super.update(Y);
    }
    connectedCallback() {
      Browser.IS_FIREFOX ? setTimeout(() => super.connectedCallback()) : super.connectedCallback();
    }
    // this is used to prevent a bug where the update method is called again (and adds another table) when a new property is
    // added - e.g. an event listener method
    shouldUpdate() {
      return !this._tableElementRef;
    }
  };
  ActiveTable._ELEMENT_TAG = "ACTIVE-TABLE";
  ActiveTable.styles = [activeTableStyle];
  __decorateClass([
    n$1({ attribute: false })
  ], ActiveTable.prototype, "getData", 2);
  __decorateClass([
    n$1({ attribute: false })
  ], ActiveTable.prototype, "getColumnsDetails", 2);
  __decorateClass([
    n$1({ attribute: false })
  ], ActiveTable.prototype, "updateCell", 2);
  __decorateClass([
    n$1({ attribute: false })
  ], ActiveTable.prototype, "updateStructure", 2);
  __decorateClass([
    n$1({ attribute: false })
  ], ActiveTable.prototype, "updateData", 2);
  __decorateClass([
    n$1({ attribute: false })
  ], ActiveTable.prototype, "importFile", 2);
  __decorateClass([
    n$1({ attribute: false })
  ], ActiveTable.prototype, "exportFile", 2);
  __decorateClass([
    n$1({ converter: LITElementTypeConverters.convertToFunction })
  ], ActiveTable.prototype, "onCellUpdate", 2);
  __decorateClass([
    n$1({ converter: LITElementTypeConverters.convertToFunction })
  ], ActiveTable.prototype, "onDataUpdate", 2);
  __decorateClass([
    n$1({ converter: LITElementTypeConverters.convertToFunction })
  ], ActiveTable.prototype, "onColumnsUpdate", 2);
  __decorateClass([
    n$1({ converter: LITElementTypeConverters.convertToFunction })
  ], ActiveTable.prototype, "onRender", 2);
  __decorateClass([
    n$1({ type: Array })
  ], ActiveTable.prototype, "data", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "tableStyle", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "allowDuplicateHeaders", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "displayHeaderIcons", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "spellCheck", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "stickyHeader", 2);
  __decorateClass([
    n$1({ type: Array })
  ], ActiveTable.prototype, "customColumnsSettings", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "rowHoverStyles", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "dragRows", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "dragColumns", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "preserveNarrowColumns", 2);
  __decorateClass([
    n$1({ type: Number })
  ], ActiveTable.prototype, "maxColumns", 2);
  __decorateClass([
    n$1({ type: Number })
  ], ActiveTable.prototype, "maxRows", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "displayAddNewRow", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "displayAddNewColumn", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "displayIndexColumn", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "frameComponentsStyles", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "dataStartsAtHeader", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "columnResizerColors", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "rowDropdown", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "stripedRows", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "overflow", 2);
  __decorateClass([
    n$1({ type: String })
  ], ActiveTable.prototype, "defaultText", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "isDefaultTextRemovable", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "cellStyle", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "rootCell", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "isCellTextEditable", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "headerStyles", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "isHeaderTextEditable", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "headerIconStyle", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "isColumnResizable", 2);
  __decorateClass([
    n$1({ type: Array })
  ], ActiveTable.prototype, "availableDefaultColumnTypes", 2);
  __decorateClass([
    n$1({ type: Array })
  ], ActiveTable.prototype, "customColumnTypes", 2);
  __decorateClass([
    n$1({ type: String })
  ], ActiveTable.prototype, "defaultColumnTypeName", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "columnDropdown", 2);
  __decorateClass([
    n$1({
      type: Boolean,
      converter: LITElementTypeConverters.convertToBoolean
    })
  ], ActiveTable.prototype, "enterKeyMoveDown", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "pagination", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "loadingStyles", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "files", 2);
  __decorateClass([
    n$1({ type: Object })
  ], ActiveTable.prototype, "filter", 2);
  __decorateClass([
    n$1({ type: String })
  ], ActiveTable.prototype, "auxiliaryStyle", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_stickyProps", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_defaultColumnsSettings", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_customColumnsSettings", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_columnsDetails", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_tableElementRef", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_tableBodyElementRef", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_addRowCellElementRef", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_addColumnCellsElementsRef", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_focusedElements", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_hoveredElements", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_activeOverlayElements", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_eventFunctions", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_userKeyEventsState", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_tableDimensions", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_cellDropdownContainer", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_globalItemColors", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_defaultCellHoverColors", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_frameComponents", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_rowDropdownCellOverlays", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_stripedRows", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_overflow", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_pagination", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_files", 2);
  __decorateClass([
    r$1()
  ], ActiveTable.prototype, "_visiblityInternal", 2);
  __decorateClass([
    r$1({
      hasChanged() {
        return false;
      }
    })
  ], ActiveTable.prototype, "_isRendering", 2);
  __decorateClass([
    r$1({
      hasChanged() {
        return false;
      }
    })
  ], ActiveTable.prototype, "_isPopulatingTable", 2);
  ActiveTable = __decorateClass([
    t$2("active-table")
  ], ActiveTable);

  // node_modules/@lit/reactive-element/css-tag.js
  var t2 = globalThis;
  var e2 = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s2 = Symbol();
  var o3 = /* @__PURE__ */ new WeakMap();
  var n2 = class {
    constructor(t7, e11, o15) {
      if (this._$cssResult$ = true, o15 !== s2)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e11;
    }
    get styleSheet() {
      let t7 = this.o;
      const s6 = this.t;
      if (e2 && void 0 === t7) {
        const e11 = void 0 !== s6 && 1 === s6.length;
        e11 && (t7 = o3.get(s6)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e11 && o3.set(s6, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r2 = (t7) => new n2("string" == typeof t7 ? t7 : t7 + "", void 0, s2);
  var i3 = (t7, ...e11) => {
    const o15 = 1 === t7.length ? t7[0] : e11.reduce((e12, s6, o16) => e12 + ((t8) => {
      if (true === t8._$cssResult$)
        return t8.cssText;
      if ("number" == typeof t8)
        return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t7[o16 + 1], t7[0]);
    return new n2(o15, t7, s2);
  };
  var S2 = (s6, o15) => {
    if (e2)
      s6.adoptedStyleSheets = o15.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
    else
      for (const e11 of o15) {
        const o16 = document.createElement("style"), n12 = t2.litNonce;
        void 0 !== n12 && o16.setAttribute("nonce", n12), o16.textContent = e11.cssText, s6.appendChild(o16);
      }
  };
  var c2 = e2 ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e11 = "";
    for (const s6 of t8.cssRules)
      e11 += s6.cssText;
    return r2(e11);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i4, defineProperty: e3, getOwnPropertyDescriptor: h2, getOwnPropertyNames: r3, getOwnPropertySymbols: o4, getPrototypeOf: n3 } = Object;
  var a2 = globalThis;
  var c3 = a2.trustedTypes;
  var l2 = c3 ? c3.emptyScript : "";
  var p2 = a2.reactiveElementPolyfillSupport;
  var d2 = (t7, s6) => t7;
  var u2 = { toAttribute(t7, s6) {
    switch (s6) {
      case Boolean:
        t7 = t7 ? l2 : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, s6) {
    let i10 = t7;
    switch (s6) {
      case Boolean:
        i10 = null !== t7;
        break;
      case Number:
        i10 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          i10 = JSON.parse(t7);
        } catch (t8) {
          i10 = null;
        }
    }
    return i10;
  } };
  var f2 = (t7, s6) => !i4(t7, s6);
  var b2 = { attribute: true, type: String, converter: u2, reflect: false, useDefault: false, hasChanged: f2 };
  Symbol.metadata ??= Symbol("metadata"), a2.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var y2 = class extends HTMLElement {
    static addInitializer(t7) {
      this._$Ei(), (this.l ??= []).push(t7);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t7, s6 = b2) {
      if (s6.state && (s6.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s6 = Object.create(s6)).wrapped = true), this.elementProperties.set(t7, s6), !s6.noAccessor) {
        const i10 = Symbol(), h6 = this.getPropertyDescriptor(t7, i10, s6);
        void 0 !== h6 && e3(this.prototype, t7, h6);
      }
    }
    static getPropertyDescriptor(t7, s6, i10) {
      const { get: e11, set: r10 } = h2(this.prototype, t7) ?? { get() {
        return this[s6];
      }, set(t8) {
        this[s6] = t8;
      } };
      return { get: e11, set(s7) {
        const h6 = e11?.call(this);
        r10?.call(this, s7), this.requestUpdate(t7, h6, i10);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) ?? b2;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d2("elementProperties")))
        return;
      const t7 = n3(this);
      t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d2("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d2("properties"))) {
        const t8 = this.properties, s6 = [...r3(t8), ...o4(t8)];
        for (const i10 of s6)
          this.createProperty(i10, t8[i10]);
      }
      const t7 = this[Symbol.metadata];
      if (null !== t7) {
        const s6 = litPropertyMetadata.get(t7);
        if (void 0 !== s6)
          for (const [t8, i10] of s6)
            this.elementProperties.set(t8, i10);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t8, s6] of this.elementProperties) {
        const i10 = this._$Eu(t8, s6);
        void 0 !== i10 && this._$Eh.set(i10, t8);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s6) {
      const i10 = [];
      if (Array.isArray(s6)) {
        const e11 = new Set(s6.flat(1 / 0).reverse());
        for (const s7 of e11)
          i10.unshift(c2(s7));
      } else
        void 0 !== s6 && i10.push(c2(s6));
      return i10;
    }
    static _$Eu(t7, s6) {
      const i10 = s6.attribute;
      return false === i10 ? void 0 : "string" == typeof i10 ? i10 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
    }
    addController(t7) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
    }
    removeController(t7) {
      this._$EO?.delete(t7);
    }
    _$E_() {
      const t7 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
      for (const i10 of s6.keys())
        this.hasOwnProperty(i10) && (t7.set(i10, this[i10]), delete this[i10]);
      t7.size > 0 && (this._$Ep = t7);
    }
    createRenderRoot() {
      const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S2(t7, this.constructor.elementStyles), t7;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t7) => t7.hostDisconnected?.());
    }
    attributeChangedCallback(t7, s6, i10) {
      this._$AK(t7, i10);
    }
    _$ET(t7, s6) {
      const i10 = this.constructor.elementProperties.get(t7), e11 = this.constructor._$Eu(t7, i10);
      if (void 0 !== e11 && true === i10.reflect) {
        const h6 = (void 0 !== i10.converter?.toAttribute ? i10.converter : u2).toAttribute(s6, i10.type);
        this._$Em = t7, null == h6 ? this.removeAttribute(e11) : this.setAttribute(e11, h6), this._$Em = null;
      }
    }
    _$AK(t7, s6) {
      const i10 = this.constructor, e11 = i10._$Eh.get(t7);
      if (void 0 !== e11 && this._$Em !== e11) {
        const t8 = i10.getPropertyOptions(e11), h6 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u2;
        this._$Em = e11;
        const r10 = h6.fromAttribute(s6, t8.type);
        this[e11] = r10 ?? this._$Ej?.get(e11) ?? r10, this._$Em = null;
      }
    }
    requestUpdate(t7, s6, i10) {
      if (void 0 !== t7) {
        const e11 = this.constructor, h6 = this[t7];
        if (i10 ??= e11.getPropertyOptions(t7), !((i10.hasChanged ?? f2)(h6, s6) || i10.useDefault && i10.reflect && h6 === this._$Ej?.get(t7) && !this.hasAttribute(e11._$Eu(t7, i10))))
          return;
        this.C(t7, s6, i10);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t7, s6, { useDefault: i10, reflect: e11, wrapped: h6 }, r10) {
      i10 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t7) && (this._$Ej.set(t7, r10 ?? s6 ?? this[t7]), true !== h6 || void 0 !== r10) || (this._$AL.has(t7) || (this.hasUpdated || i10 || (s6 = void 0), this._$AL.set(t7, s6)), true === e11 && this._$Em !== t7 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t7));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return null != t7 && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t9, s7] of this._$Ep)
            this[t9] = s7;
          this._$Ep = void 0;
        }
        const t8 = this.constructor.elementProperties;
        if (t8.size > 0)
          for (const [s7, i10] of t8) {
            const { wrapped: t9 } = i10, e11 = this[s7];
            true !== t9 || this._$AL.has(s7) || void 0 === e11 || this.C(s7, void 0, i10, e11);
          }
      }
      let t7 = false;
      const s6 = this._$AL;
      try {
        t7 = this.shouldUpdate(s6), t7 ? (this.willUpdate(s6), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s6)) : this._$EM();
      } catch (s7) {
        throw t7 = false, this._$EM(), s7;
      }
      t7 && this._$AE(s6);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      this._$Eq &&= this._$Eq.forEach((t8) => this._$ET(t8, this[t8])), this._$EM();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  y2.elementStyles = [], y2.shadowRootOptions = { mode: "open" }, y2[d2("elementProperties")] = /* @__PURE__ */ new Map(), y2[d2("finalized")] = /* @__PURE__ */ new Map(), p2?.({ ReactiveElement: y2 }), (a2.reactiveElementVersions ??= []).push("2.1.1");

  // node_modules/lit-html/lit-html.js
  var t3 = globalThis;
  var i5 = t3.trustedTypes;
  var s3 = i5 ? i5.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var e4 = "$lit$";
  var h3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o5 = "?" + h3;
  var n4 = `<${o5}>`;
  var r4 = document;
  var l3 = () => r4.createComment("");
  var c4 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var a3 = Array.isArray;
  var u3 = (t7) => a3(t7) || "function" == typeof t7?.[Symbol.iterator];
  var d3 = "[ 	\n\f\r]";
  var f3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v2 = /-->/g;
  var _2 = />/g;
  var m2 = RegExp(`>|${d3}(?:([^\\s"'>=/]+)(${d3}*=${d3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p3 = /'/g;
  var g2 = /"/g;
  var $2 = /^(?:script|style|textarea|title)$/i;
  var y3 = (t7) => (i10, ...s6) => ({ _$litType$: t7, strings: i10, values: s6 });
  var x = y3(1);
  var b3 = y3(2);
  var w = y3(3);
  var T2 = Symbol.for("lit-noChange");
  var E2 = Symbol.for("lit-nothing");
  var A2 = /* @__PURE__ */ new WeakMap();
  var C2 = r4.createTreeWalker(r4, 129);
  function P2(t7, i10) {
    if (!a3(t7) || !t7.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s3 ? s3.createHTML(i10) : i10;
  }
  var V2 = (t7, i10) => {
    const s6 = t7.length - 1, o15 = [];
    let r10, l6 = 2 === i10 ? "<svg>" : 3 === i10 ? "<math>" : "", c7 = f3;
    for (let i11 = 0; i11 < s6; i11++) {
      const s7 = t7[i11];
      let a5, u6, d4 = -1, y4 = 0;
      for (; y4 < s7.length && (c7.lastIndex = y4, u6 = c7.exec(s7), null !== u6); )
        y4 = c7.lastIndex, c7 === f3 ? "!--" === u6[1] ? c7 = v2 : void 0 !== u6[1] ? c7 = _2 : void 0 !== u6[2] ? ($2.test(u6[2]) && (r10 = RegExp("</" + u6[2], "g")), c7 = m2) : void 0 !== u6[3] && (c7 = m2) : c7 === m2 ? ">" === u6[0] ? (c7 = r10 ?? f3, d4 = -1) : void 0 === u6[1] ? d4 = -2 : (d4 = c7.lastIndex - u6[2].length, a5 = u6[1], c7 = void 0 === u6[3] ? m2 : '"' === u6[3] ? g2 : p3) : c7 === g2 || c7 === p3 ? c7 = m2 : c7 === v2 || c7 === _2 ? c7 = f3 : (c7 = m2, r10 = void 0);
      const x2 = c7 === m2 && t7[i11 + 1].startsWith("/>") ? " " : "";
      l6 += c7 === f3 ? s7 + n4 : d4 >= 0 ? (o15.push(a5), s7.slice(0, d4) + e4 + s7.slice(d4) + h3 + x2) : s7 + h3 + (-2 === d4 ? i11 : x2);
    }
    return [P2(t7, l6 + (t7[s6] || "<?>") + (2 === i10 ? "</svg>" : 3 === i10 ? "</math>" : "")), o15];
  };
  var N2 = class _N {
    constructor({ strings: t7, _$litType$: s6 }, n12) {
      let r10;
      this.parts = [];
      let c7 = 0, a5 = 0;
      const u6 = t7.length - 1, d4 = this.parts, [f6, v3] = V2(t7, s6);
      if (this.el = _N.createElement(f6, n12), C2.currentNode = this.el.content, 2 === s6 || 3 === s6) {
        const t8 = this.el.content.firstChild;
        t8.replaceWith(...t8.childNodes);
      }
      for (; null !== (r10 = C2.nextNode()) && d4.length < u6; ) {
        if (1 === r10.nodeType) {
          if (r10.hasAttributes())
            for (const t8 of r10.getAttributeNames())
              if (t8.endsWith(e4)) {
                const i10 = v3[a5++], s7 = r10.getAttribute(t8).split(h3), e11 = /([.?@])?(.*)/.exec(i10);
                d4.push({ type: 1, index: c7, name: e11[2], strings: s7, ctor: "." === e11[1] ? H2 : "?" === e11[1] ? I2 : "@" === e11[1] ? L2 : k2 }), r10.removeAttribute(t8);
              } else
                t8.startsWith(h3) && (d4.push({ type: 6, index: c7 }), r10.removeAttribute(t8));
          if ($2.test(r10.tagName)) {
            const t8 = r10.textContent.split(h3), s7 = t8.length - 1;
            if (s7 > 0) {
              r10.textContent = i5 ? i5.emptyScript : "";
              for (let i10 = 0; i10 < s7; i10++)
                r10.append(t8[i10], l3()), C2.nextNode(), d4.push({ type: 2, index: ++c7 });
              r10.append(t8[s7], l3());
            }
          }
        } else if (8 === r10.nodeType)
          if (r10.data === o5)
            d4.push({ type: 2, index: c7 });
          else {
            let t8 = -1;
            for (; -1 !== (t8 = r10.data.indexOf(h3, t8 + 1)); )
              d4.push({ type: 7, index: c7 }), t8 += h3.length - 1;
          }
        c7++;
      }
    }
    static createElement(t7, i10) {
      const s6 = r4.createElement("template");
      return s6.innerHTML = t7, s6;
    }
  };
  function S3(t7, i10, s6 = t7, e11) {
    if (i10 === T2)
      return i10;
    let h6 = void 0 !== e11 ? s6._$Co?.[e11] : s6._$Cl;
    const o15 = c4(i10) ? void 0 : i10._$litDirective$;
    return h6?.constructor !== o15 && (h6?._$AO?.(false), void 0 === o15 ? h6 = void 0 : (h6 = new o15(t7), h6._$AT(t7, s6, e11)), void 0 !== e11 ? (s6._$Co ??= [])[e11] = h6 : s6._$Cl = h6), void 0 !== h6 && (i10 = S3(t7, h6._$AS(t7, i10.values), h6, e11)), i10;
  }
  var M2 = class {
    constructor(t7, i10) {
      this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i10;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t7) {
      const { el: { content: i10 }, parts: s6 } = this._$AD, e11 = (t7?.creationScope ?? r4).importNode(i10, true);
      C2.currentNode = e11;
      let h6 = C2.nextNode(), o15 = 0, n12 = 0, l6 = s6[0];
      for (; void 0 !== l6; ) {
        if (o15 === l6.index) {
          let i11;
          2 === l6.type ? i11 = new R2(h6, h6.nextSibling, this, t7) : 1 === l6.type ? i11 = new l6.ctor(h6, l6.name, l6.strings, this, t7) : 6 === l6.type && (i11 = new z2(h6, this, t7)), this._$AV.push(i11), l6 = s6[++n12];
        }
        o15 !== l6?.index && (h6 = C2.nextNode(), o15++);
      }
      return C2.currentNode = r4, e11;
    }
    p(t7) {
      let i10 = 0;
      for (const s6 of this._$AV)
        void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t7, s6, i10), i10 += s6.strings.length - 2) : s6._$AI(t7[i10])), i10++;
    }
  };
  var R2 = class _R {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t7, i10, s6, e11) {
      this.type = 2, this._$AH = E2, this._$AN = void 0, this._$AA = t7, this._$AB = i10, this._$AM = s6, this.options = e11, this._$Cv = e11?.isConnected ?? true;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i10 = this._$AM;
      return void 0 !== i10 && 11 === t7?.nodeType && (t7 = i10.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i10 = this) {
      t7 = S3(this, t7, i10), c4(t7) ? t7 === E2 || null == t7 || "" === t7 ? (this._$AH !== E2 && this._$AR(), this._$AH = E2) : t7 !== this._$AH && t7 !== T2 && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u3(t7) ? this.k(t7) : this._(t7);
    }
    O(t7) {
      return this._$AA.parentNode.insertBefore(t7, this._$AB);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
    }
    _(t7) {
      this._$AH !== E2 && c4(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r4.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      const { values: i10, _$litType$: s6 } = t7, e11 = "number" == typeof s6 ? this._$AC(t7) : (void 0 === s6.el && (s6.el = N2.createElement(P2(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e11)
        this._$AH.p(i10);
      else {
        const t8 = new M2(e11, this), s7 = t8.u(this.options);
        t8.p(i10), this.T(s7), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i10 = A2.get(t7.strings);
      return void 0 === i10 && A2.set(t7.strings, i10 = new N2(t7)), i10;
    }
    k(t7) {
      a3(this._$AH) || (this._$AH = [], this._$AR());
      const i10 = this._$AH;
      let s6, e11 = 0;
      for (const h6 of t7)
        e11 === i10.length ? i10.push(s6 = new _R(this.O(l3()), this.O(l3()), this, this.options)) : s6 = i10[e11], s6._$AI(h6), e11++;
      e11 < i10.length && (this._$AR(s6 && s6._$AB.nextSibling, e11), i10.length = e11);
    }
    _$AR(t7 = this._$AA.nextSibling, i10) {
      for (this._$AP?.(false, true, i10); t7 !== this._$AB; ) {
        const i11 = t7.nextSibling;
        t7.remove(), t7 = i11;
      }
    }
    setConnected(t7) {
      void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
    }
  };
  var k2 = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t7, i10, s6, e11, h6) {
      this.type = 1, this._$AH = E2, this._$AN = void 0, this.element = t7, this.name = i10, this._$AM = e11, this.options = h6, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = E2;
    }
    _$AI(t7, i10 = this, s6, e11) {
      const h6 = this.strings;
      let o15 = false;
      if (void 0 === h6)
        t7 = S3(this, t7, i10, 0), o15 = !c4(t7) || t7 !== this._$AH && t7 !== T2, o15 && (this._$AH = t7);
      else {
        const e12 = t7;
        let n12, r10;
        for (t7 = h6[0], n12 = 0; n12 < h6.length - 1; n12++)
          r10 = S3(this, e12[s6 + n12], i10, n12), r10 === T2 && (r10 = this._$AH[n12]), o15 ||= !c4(r10) || r10 !== this._$AH[n12], r10 === E2 ? t7 = E2 : t7 !== E2 && (t7 += (r10 ?? "") + h6[n12 + 1]), this._$AH[n12] = r10;
      }
      o15 && !e11 && this.j(t7);
    }
    j(t7) {
      t7 === E2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
    }
  };
  var H2 = class extends k2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === E2 ? void 0 : t7;
    }
  };
  var I2 = class extends k2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      this.element.toggleAttribute(this.name, !!t7 && t7 !== E2);
    }
  };
  var L2 = class extends k2 {
    constructor(t7, i10, s6, e11, h6) {
      super(t7, i10, s6, e11, h6), this.type = 5;
    }
    _$AI(t7, i10 = this) {
      if ((t7 = S3(this, t7, i10, 0) ?? E2) === T2)
        return;
      const s6 = this._$AH, e11 = t7 === E2 && s6 !== E2 || t7.capture !== s6.capture || t7.once !== s6.once || t7.passive !== s6.passive, h6 = t7 !== E2 && (s6 === E2 || e11);
      e11 && this.element.removeEventListener(this.name, this, s6), h6 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var z2 = class {
    constructor(t7, i10, s6) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i10, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      S3(this, t7);
    }
  };
  var Z2 = { M: e4, P: h3, A: o5, C: 1, L: V2, R: M2, D: u3, V: S3, I: R2, H: k2, N: I2, U: L2, B: H2, F: z2 };
  var j2 = t3.litHtmlPolyfillSupport;
  j2?.(N2, R2), (t3.litHtmlVersions ??= []).push("3.3.1");
  var B2 = (t7, i10, s6) => {
    const e11 = s6?.renderBefore ?? i10;
    let h6 = e11._$litPart$;
    if (void 0 === h6) {
      const t8 = s6?.renderBefore ?? null;
      e11._$litPart$ = h6 = new R2(i10.insertBefore(l3(), t8), t8, void 0, s6 ?? {});
    }
    return h6._$AI(t7), h6;
  };

  // node_modules/lit-element/lit-element.js
  var s4 = globalThis;
  var i6 = class extends y2 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t7 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t7.firstChild, t7;
    }
    update(t7) {
      const r10 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = B2(r10, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T2;
    }
  };
  i6._$litElement$ = true, i6["finalized"] = true, s4.litElementHydrateSupport?.({ LitElement: i6 });
  var o6 = s4.litElementPolyfillSupport;
  o6?.({ LitElement: i6 });
  (s4.litElementVersions ??= []).push("4.2.1");

  // node_modules/lit-html/is-server.js
  var o7 = false;

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t4 = (t7) => (e11, o15) => {
    void 0 !== o15 ? o15.addInitializer(() => {
      customElements.define(t7, e11);
    }) : customElements.define(t7, e11);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o8 = { attribute: true, type: String, converter: u2, reflect: false, hasChanged: f2 };
  var r5 = (t7 = o8, e11, r10) => {
    const { kind: n12, metadata: i10 } = r10;
    let s6 = globalThis.litPropertyMetadata.get(i10);
    if (void 0 === s6 && globalThis.litPropertyMetadata.set(i10, s6 = /* @__PURE__ */ new Map()), "setter" === n12 && ((t7 = Object.create(t7)).wrapped = true), s6.set(r10.name, t7), "accessor" === n12) {
      const { name: o15 } = r10;
      return { set(r11) {
        const n13 = e11.get.call(this);
        e11.set.call(this, r11), this.requestUpdate(o15, n13, t7);
      }, init(e12) {
        return void 0 !== e12 && this.C(o15, void 0, t7, e12), e12;
      } };
    }
    if ("setter" === n12) {
      const { name: o15 } = r10;
      return function(r11) {
        const n13 = this[o15];
        e11.call(this, r11), this.requestUpdate(o15, n13, t7);
      };
    }
    throw Error("Unsupported decorator location: " + n12);
  };
  function n5(t7) {
    return (e11, o15) => "object" == typeof o15 ? r5(t7, e11, o15) : ((t8, e12, o16) => {
      const r10 = e12.hasOwnProperty(o16);
      return e12.constructor.createProperty(o16, t8), r10 ? Object.getOwnPropertyDescriptor(e12, o16) : void 0;
    })(t7, e11, o15);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r6(r10) {
    return n5({ ...r10, state: true, attribute: false });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var e5 = (e11, t7, c7) => (c7.configurable = true, c7.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e11, t7, c7), c7);

  // node_modules/@lit/reactive-element/decorators/query.js
  function e6(e11, r10) {
    return (n12, s6, i10) => {
      const o15 = (t7) => t7.renderRoot?.querySelector(e11) ?? null;
      if (r10) {
        const { get: e12, set: r11 } = "object" == typeof s6 ? n12 : i10 ?? (() => {
          const t7 = Symbol();
          return { get() {
            return this[t7];
          }, set(e13) {
            this[t7] = e13;
          } };
        })();
        return e5(n12, s6, { get() {
          let t7 = e12.call(this);
          return void 0 === t7 && (t7 = o15(this), (null !== t7 || this.hasUpdated) && r11.call(this, t7)), t7;
        } });
      }
      return e5(n12, s6, { get() {
        return o15(this);
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-all.js
  var e7;
  function r7(r10) {
    return (n12, o15) => e5(n12, o15, { get() {
      return (this.renderRoot ?? (e7 ??= document.createDocumentFragment())).querySelectorAll(r10);
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-async.js
  function r8(r10) {
    return (n12, e11) => e5(n12, e11, { async get() {
      return await this.updateComplete, this.renderRoot?.querySelector(r10) ?? null;
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  function o9(o15) {
    return (e11, n12) => {
      const { slot: r10, selector: s6 } = o15 ?? {}, c7 = "slot" + (r10 ? `[name=${r10}]` : ":not([name])");
      return e5(e11, n12, { get() {
        const t7 = this.renderRoot?.querySelector(c7), e12 = t7?.assignedElements(o15) ?? [];
        return void 0 === s6 ? e12 : e12.filter((t8) => t8.matches(s6));
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
  function n6(n12) {
    return (o15, r10) => {
      const { slot: e11 } = n12 ?? {}, s6 = "slot" + (e11 ? `[name=${e11}]` : ":not([name])");
      return e5(o15, r10, { get() {
        const t7 = this.renderRoot?.querySelector(s6);
        return t7?.assignedNodes(n12) ?? [];
      } });
    };
  }

  // node_modules/lit-html/directive-helpers.js
  var { I: t5 } = Z2;
  var f4 = (o15) => void 0 === o15.strings;
  var u4 = {};
  var m3 = (o15, t7 = u4) => o15._$AH = t7;

  // node_modules/lit-html/directive.js
  var t6 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e8 = (t7) => (...e11) => ({ _$litDirective$: t7, values: e11 });
  var i7 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e11, i10) {
      this._$Ct = t7, this._$AM = e11, this._$Ci = i10;
    }
    _$AS(t7, e11) {
      return this.update(t7, e11);
    }
    update(t7, e11) {
      return this.render(...e11);
    }
  };

  // node_modules/lit-html/async-directive.js
  var s5 = (i10, t7) => {
    const e11 = i10._$AN;
    if (void 0 === e11)
      return false;
    for (const i11 of e11)
      i11._$AO?.(t7, false), s5(i11, t7);
    return true;
  };
  var o10 = (i10) => {
    let t7, e11;
    do {
      if (void 0 === (t7 = i10._$AM))
        break;
      e11 = t7._$AN, e11.delete(i10), i10 = t7;
    } while (0 === e11?.size);
  };
  var r9 = (i10) => {
    for (let t7; t7 = i10._$AM; i10 = t7) {
      let e11 = t7._$AN;
      if (void 0 === e11)
        t7._$AN = e11 = /* @__PURE__ */ new Set();
      else if (e11.has(i10))
        break;
      e11.add(i10), c5(t7);
    }
  };
  function h4(i10) {
    void 0 !== this._$AN ? (o10(this), this._$AM = i10, r9(this)) : this._$AM = i10;
  }
  function n7(i10, t7 = false, e11 = 0) {
    const r10 = this._$AH, h6 = this._$AN;
    if (void 0 !== h6 && 0 !== h6.size)
      if (t7)
        if (Array.isArray(r10))
          for (let i11 = e11; i11 < r10.length; i11++)
            s5(r10[i11], false), o10(r10[i11]);
        else
          null != r10 && (s5(r10, false), o10(r10));
      else
        s5(this, i10);
  }
  var c5 = (i10) => {
    i10.type == t6.CHILD && (i10._$AP ??= n7, i10._$AQ ??= h4);
  };
  var f5 = class extends i7 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i10, t7, e11) {
      super._$AT(i10, t7, e11), r9(this), this.isConnected = i10._$AU;
    }
    _$AO(i10, t7 = true) {
      i10 !== this.isConnected && (this.isConnected = i10, i10 ? this.reconnected?.() : this.disconnected?.()), t7 && (s5(this, i10), o10(this));
    }
    setValue(t7) {
      if (f4(this._$Ct))
        this._$Ct._$AI(t7, this);
      else {
        const i10 = [...this._$Ct._$AH];
        i10[this._$Ci] = t7, this._$Ct._$AI(i10, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // node_modules/lit-html/directives/ref.js
  var e9 = () => new h5();
  var h5 = class {
  };
  var o11 = /* @__PURE__ */ new WeakMap();
  var n8 = e8(class extends f5 {
    render(i10) {
      return E2;
    }
    update(i10, [s6]) {
      const e11 = s6 !== this.G;
      return e11 && void 0 !== this.G && this.rt(void 0), (e11 || this.lt !== this.ct) && (this.G = s6, this.ht = i10.options?.host, this.rt(this.ct = i10.element)), E2;
    }
    rt(t7) {
      if (this.isConnected || (t7 = void 0), "function" == typeof this.G) {
        const i10 = this.ht ?? globalThis;
        let s6 = o11.get(i10);
        void 0 === s6 && (s6 = /* @__PURE__ */ new WeakMap(), o11.set(i10, s6)), void 0 !== s6.get(this.G) && this.G.call(this.ht, void 0), s6.set(this.G, t7), void 0 !== t7 && this.G.call(this.ht, t7);
      } else
        this.G.value = t7;
    }
    get lt() {
      return "function" == typeof this.G ? o11.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
    }
    disconnected() {
      this.lt === this.ct && this.rt(void 0);
    }
    reconnected() {
      this.rt(this.ct);
    }
  });

  // node_modules/lodash-es/_freeGlobal.js
  var freeGlobal = typeof window == "object" && window && window.Object === Object && window;
  var freeGlobal_default = freeGlobal;

  // node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/lodash-es/_getRawTag.js
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value2) {
    var isOwn = hasOwnProperty.call(value2, symToStringTag), tag = value2[symToStringTag];
    try {
      value2[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e11) {
    }
    var result = nativeObjectToString.call(value2);
    if (unmasked) {
      if (isOwn) {
        value2[symToStringTag] = tag;
      } else {
        delete value2[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value2) {
    return nativeObjectToString2.call(value2);
  }
  var objectToString_default = objectToString;

  // node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value2) {
    if (value2 == null) {
      return value2 === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value2) ? getRawTag_default(value2) : objectToString_default(value2);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/lodash-es/isObject.js
  function isObject(value2) {
    var type = typeof value2;
    return value2 != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // node_modules/lodash-es/isFunction.js
  var asyncTag = "[object AsyncFunction]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var proxyTag = "[object Proxy]";
  function isFunction(value2) {
    if (!isObject_default(value2)) {
      return false;
    }
    var tag = baseGetTag_default(value2);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var isFunction_default = isFunction;

  // node_modules/lodash-es/_coreJsData.js
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/lodash-es/_isMasked.js
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/lodash-es/_toSource.js
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e11) {
      }
      try {
        return func + "";
      } catch (e11) {
      }
    }
    return "";
  }
  var toSource_default = toSource;

  // node_modules/lodash-es/_baseIsNative.js
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto2 = Function.prototype;
  var objectProto3 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto3.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value2) {
    if (!isObject_default(value2) || isMasked_default(value2)) {
      return false;
    }
    var pattern = isFunction_default(value2) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource_default(value2));
  }
  var baseIsNative_default = baseIsNative;

  // node_modules/lodash-es/_getValue.js
  function getValue(object2, key) {
    return object2 == null ? void 0 : object2[key];
  }
  var getValue_default = getValue;

  // node_modules/lodash-es/_getNative.js
  function getNative(object2, key) {
    var value2 = getValue_default(object2, key);
    return baseIsNative_default(value2) ? value2 : void 0;
  }
  var getNative_default = getNative;

  // node_modules/lodash-es/_defineProperty.js
  var defineProperty = function() {
    try {
      var func = getNative_default(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e11) {
    }
  }();
  var defineProperty_default = defineProperty;

  // node_modules/lodash-es/_baseAssignValue.js
  function baseAssignValue(object2, key, value2) {
    if (key == "__proto__" && defineProperty_default) {
      defineProperty_default(object2, key, {
        "configurable": true,
        "enumerable": true,
        "value": value2,
        "writable": true
      });
    } else {
      object2[key] = value2;
    }
  }
  var baseAssignValue_default = baseAssignValue;

  // node_modules/lodash-es/eq.js
  function eq(value2, other) {
    return value2 === other || value2 !== value2 && other !== other;
  }
  var eq_default = eq;

  // node_modules/lodash-es/_assignValue.js
  var objectProto4 = Object.prototype;
  var hasOwnProperty3 = objectProto4.hasOwnProperty;
  function assignValue(object2, key, value2) {
    var objValue = object2[key];
    if (!(hasOwnProperty3.call(object2, key) && eq_default(objValue, value2)) || value2 === void 0 && !(key in object2)) {
      baseAssignValue_default(object2, key, value2);
    }
  }
  var assignValue_default = assignValue;

  // node_modules/lodash-es/isArray.js
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value2) {
    return value2 != null && typeof value2 == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/lodash-es/isSymbol.js
  var symbolTag = "[object Symbol]";
  function isSymbol(value2) {
    return typeof value2 == "symbol" || isObjectLike_default(value2) && baseGetTag_default(value2) == symbolTag;
  }
  var isSymbol_default = isSymbol;

  // node_modules/lodash-es/_isKey.js
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
  var reIsPlainProp = /^\w*$/;
  function isKey(value2, object2) {
    if (isArray_default(value2)) {
      return false;
    }
    var type = typeof value2;
    if (type == "number" || type == "symbol" || type == "boolean" || value2 == null || isSymbol_default(value2)) {
      return true;
    }
    return reIsPlainProp.test(value2) || !reIsDeepProp.test(value2) || object2 != null && value2 in Object(object2);
  }
  var isKey_default = isKey;

  // node_modules/lodash-es/_nativeCreate.js
  var nativeCreate = getNative_default(Object, "create");
  var nativeCreate_default = nativeCreate;

  // node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default = hashClear;

  // node_modules/lodash-es/_hashDelete.js
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default = hashDelete;

  // node_modules/lodash-es/_hashGet.js
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto5 = Object.prototype;
  var hasOwnProperty4 = objectProto5.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate_default) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty4.call(data, key) ? data[key] : void 0;
  }
  var hashGet_default = hashGet;

  // node_modules/lodash-es/_hashHas.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty5 = objectProto6.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty5.call(data, key);
  }
  var hashHas_default = hashHas;

  // node_modules/lodash-es/_hashSet.js
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet(key, value2) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate_default && value2 === void 0 ? HASH_UNDEFINED2 : value2;
    return this;
  }
  var hashSet_default = hashSet;

  // node_modules/lodash-es/_Hash.js
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear_default;
  Hash.prototype["delete"] = hashDelete_default;
  Hash.prototype.get = hashGet_default;
  Hash.prototype.has = hashHas_default;
  Hash.prototype.set = hashSet_default;
  var Hash_default = Hash;

  // node_modules/lodash-es/_listCacheClear.js
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default = listCacheClear;

  // node_modules/lodash-es/_assocIndexOf.js
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_default(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var assocIndexOf_default = assocIndexOf;

  // node_modules/lodash-es/_listCacheDelete.js
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  var listCacheDelete_default = listCacheDelete;

  // node_modules/lodash-es/_listCacheGet.js
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default = listCacheGet;

  // node_modules/lodash-es/_listCacheHas.js
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default = listCacheHas;

  // node_modules/lodash-es/_listCacheSet.js
  function listCacheSet(key, value2) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value2]);
    } else {
      data[index][1] = value2;
    }
    return this;
  }
  var listCacheSet_default = listCacheSet;

  // node_modules/lodash-es/_ListCache.js
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear_default;
  ListCache.prototype["delete"] = listCacheDelete_default;
  ListCache.prototype.get = listCacheGet_default;
  ListCache.prototype.has = listCacheHas_default;
  ListCache.prototype.set = listCacheSet_default;
  var ListCache_default = ListCache;

  // node_modules/lodash-es/_Map.js
  var Map2 = getNative_default(root_default, "Map");
  var Map_default = Map2;

  // node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash_default(),
      "map": new (Map_default || ListCache_default)(),
      "string": new Hash_default()
    };
  }
  var mapCacheClear_default = mapCacheClear;

  // node_modules/lodash-es/_isKeyable.js
  function isKeyable(value2) {
    var type = typeof value2;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value2 !== "__proto__" : value2 === null;
  }
  var isKeyable_default = isKeyable;

  // node_modules/lodash-es/_getMapData.js
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var getMapData_default = getMapData;

  // node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default = mapCacheDelete;

  // node_modules/lodash-es/_mapCacheGet.js
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default = mapCacheGet;

  // node_modules/lodash-es/_mapCacheHas.js
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default = mapCacheHas;

  // node_modules/lodash-es/_mapCacheSet.js
  function mapCacheSet(key, value2) {
    var data = getMapData_default(this, key), size = data.size;
    data.set(key, value2);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var mapCacheSet_default = mapCacheSet;

  // node_modules/lodash-es/_MapCache.js
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear_default;
  MapCache.prototype["delete"] = mapCacheDelete_default;
  MapCache.prototype.get = mapCacheGet_default;
  MapCache.prototype.has = mapCacheHas_default;
  MapCache.prototype.set = mapCacheSet_default;
  var MapCache_default = MapCache;

  // node_modules/lodash-es/memoize.js
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache_default)();
    return memoized;
  }
  memoize.Cache = MapCache_default;
  var memoize_default = memoize;

  // node_modules/lodash-es/_memoizeCapped.js
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize_default(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  var memoizeCapped_default = memoizeCapped;

  // node_modules/lodash-es/_stringToPath.js
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped_default(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number2, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match);
    });
    return result;
  });
  var stringToPath_default = stringToPath;

  // node_modules/lodash-es/_arrayMap.js
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var arrayMap_default = arrayMap;

  // node_modules/lodash-es/_baseToString.js
  var INFINITY = 1 / 0;
  var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value2) {
    if (typeof value2 == "string") {
      return value2;
    }
    if (isArray_default(value2)) {
      return arrayMap_default(value2, baseToString) + "";
    }
    if (isSymbol_default(value2)) {
      return symbolToString ? symbolToString.call(value2) : "";
    }
    var result = value2 + "";
    return result == "0" && 1 / value2 == -INFINITY ? "-0" : result;
  }
  var baseToString_default = baseToString;

  // node_modules/lodash-es/toString.js
  function toString(value2) {
    return value2 == null ? "" : baseToString_default(value2);
  }
  var toString_default = toString;

  // node_modules/lodash-es/_castPath.js
  function castPath(value2, object2) {
    if (isArray_default(value2)) {
      return value2;
    }
    return isKey_default(value2, object2) ? [value2] : stringToPath_default(toString_default(value2));
  }
  var castPath_default = castPath;

  // node_modules/lodash-es/_isIndex.js
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value2, length) {
    var type = typeof value2;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value2)) && (value2 > -1 && value2 % 1 == 0 && value2 < length);
  }
  var isIndex_default = isIndex;

  // node_modules/lodash-es/_toKey.js
  var INFINITY2 = 1 / 0;
  function toKey(value2) {
    if (typeof value2 == "string" || isSymbol_default(value2)) {
      return value2;
    }
    var result = value2 + "";
    return result == "0" && 1 / value2 == -INFINITY2 ? "-0" : result;
  }
  var toKey_default = toKey;

  // node_modules/lodash-es/_baseSet.js
  function baseSet(object2, path, value2, customizer) {
    if (!isObject_default(object2)) {
      return object2;
    }
    path = castPath_default(path, object2);
    var index = -1, length = path.length, lastIndex = length - 1, nested = object2;
    while (nested != null && ++index < length) {
      var key = toKey_default(path[index]), newValue = value2;
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return object2;
      }
      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : void 0;
        if (newValue === void 0) {
          newValue = isObject_default(objValue) ? objValue : isIndex_default(path[index + 1]) ? [] : {};
        }
      }
      assignValue_default(nested, key, newValue);
      nested = nested[key];
    }
    return object2;
  }
  var baseSet_default = baseSet;

  // node_modules/lodash-es/set.js
  function set(object2, path, value2) {
    return object2 == null ? object2 : baseSet_default(object2, path, value2);
  }
  var set_default = set;

  // node_modules/@jsfe/form/dist/esm/triage/array.js
  var fieldArray = (schema, dataLevel, path, uiState, uiOptions, handleChange, dig, schemaPath, widgets, required = false, level = 0) => {
    if (!Array.isArray(dataLevel))
      return x``;
    const addItemClick = (_event) => {
      dataLevel ||= [];
      if (!Array.isArray(dataLevel))
        return;
      if (typeof schema.items !== "object" || Array.isArray(schema.items))
        return;
      if (schema.items?.type === "string") {
        dataLevel.push(schema.items?.default || "");
      } else if (schema.items.properties) {
        dataLevel.push(schema.items?.default || {});
      } else if (schema.items?.type === "array") {
        dataLevel.push(schema.items?.default || []);
      }
      handleChange([...path, dataLevel.length - 1], dataLevel[dataLevel.length - 1], schemaPath);
    };
    const items = (itemWrapper) => {
      return dataLevel?.map?.((_item, index) => {
        if (typeof schema.items !== "object" || Array.isArray(schema.items) || !Array.isArray(dataLevel))
          return "";
        const schemaPathAugmented = [...schemaPath];
        schemaPathAugmented.push("items");
        const widget = dig(schema.items, dataLevel[index], [...path, index], uiState, uiOptions?.[index], schemaPathAugmented, required, level + 1);
        const move = (direction) => (_event) => {
          if (!Array.isArray(dataLevel))
            return;
          const hold = dataLevel[index];
          dataLevel[index] = dataLevel[index + direction];
          dataLevel[index + direction] = hold;
          handleChange([...path], dataLevel, schemaPath);
        };
        const controls = {
          wrapper: {
            dragover: (event) => {
              event.preventDefault();
              event.stopPropagation();
              const dataTransfer = event.dataTransfer;
              if (dataTransfer)
                dataTransfer.dropEffect = "move";
            },
            dragenter: (event) => {
              event.stopPropagation();
              event.target.closest("sl-card")?.setAttribute("data-dropzone", "");
            },
            dragleave: (event) => {
              event.stopPropagation();
              event.target.closest("sl-card")?.removeAttribute("data-dropzone");
            },
            drop: (event) => {
              event.stopPropagation();
              const idx = event.dataTransfer?.getData("integer");
              if (!idx)
                return;
              const originIndex = Number.parseInt(idx, 10);
              if (!Array.isArray(dataLevel))
                return;
              const hold = dataLevel[index];
              dataLevel[index] = dataLevel[originIndex];
              dataLevel[originIndex] = hold;
              handleChange([...path], dataLevel, schemaPathAugmented);
              console.log({ originIndex, idx });
              event.target.closest("sl-card")?.removeAttribute("data-dropzone");
            }
          },
          handle: {
            mousedown: (_event) => {
            },
            dragstart: (event) => {
              console.log(event);
              if (!event.dataTransfer)
                return;
              event.dataTransfer.setData("integer", String(index));
            }
          },
          delete: {
            click: (_event) => {
              if (!Array.isArray(dataLevel))
                return;
              dataLevel = dataLevel.filter((_3, i10) => i10 !== index);
              handleChange([...path], dataLevel, schemaPath);
            }
          },
          up: {
            click: move(-1),
            disabled: typeof dataLevel?.[index - 1] === "undefined"
          },
          down: {
            click: move(1),
            disabled: typeof dataLevel?.[index + 1] === "undefined"
          }
        };
        return itemWrapper(index, widget, controls);
      });
    };
    let itemLabel;
    if (typeof schema.items === "object" && !Array.isArray(schema.items) && schema.items.title) {
      itemLabel = schema.items.title;
    }
    const arrayLabel = schema.title ?? uiOptions?.["ui:title"];
    const options = {
      label: arrayLabel,
      items,
      itemLabel,
      controls: {
        add: { click: addItemClick }
      },
      level
    };
    return widgets?.array?.(options);
  };

  // node_modules/@jsfe/form/dist/esm/triage/object.js
  var fieldObject = (schema, data, path, uiState, uiSchema, dig, schemaPath, widgets, level = 0) => {
    const error = "Wrong object field";
    if (typeof schema.properties !== "object")
      return widgets.callout?.({ id: "", message: error }) ?? x`${error}`;
    const children = Object.entries(schema.properties).map(([propName, propValue]) => {
      if (Array.isArray(propValue) || typeof propValue === "boolean")
        return x``;
      const value2 = data?.[propName];
      const subPath = [...path, propName];
      const required = schema.required?.includes(propName);
      const schemaPathAugmented = [...schemaPath];
      schemaPathAugmented.push(propName);
      return dig(propValue, value2, subPath, uiState?.[propName], uiSchema?.[propName], schemaPathAugmented, required, level + 1);
    });
    let label;
    const key = path.at(-1);
    if (schema.title) {
      label = schema.title;
    } else if (typeof key !== "number") {
      label = key;
    }
    if (typeof uiSchema?.["ui:title"] === "string")
      label = uiSchema["ui:title"];
    const options = {
      id: path.join("."),
      label,
      helpText: schema.description,
      children,
      level
    };
    return widgets?.object?.(options) ?? widgets?.callout?.({ id: "", message: error }) ?? x`${error}`;
  };

  // node_modules/@jsfe/form/dist/esm/triage/primitive.js
  var fieldPrimitive = (schema, value2, path, uiOptions, required, handleChange, handleKeydown, schemaPath, widgets) => {
    const id = path.join(".");
    function missing(widgetName) {
      const options = { id, message: `Missing ${widgetName} widget.` };
      return widgets?.callout?.(options) ?? x`<p>${options.message}</p>`;
    }
    let label = "";
    if (schema.title)
      label = schema.title;
    else if (Number.isNaN(Number(path.at(-1)))) {
      label = String(path.at(-1));
    }
    if (uiOptions?.["ui:title"]) {
      label = uiOptions?.["ui:title"];
    }
    const helpText = uiOptions?.["ui:help"] ?? uiOptions?.["ui:description"] ?? schema.description ?? "";
    const placeholder = uiOptions?.["ui:placeholder"] ?? "";
    const disabled = uiOptions?.["ui:disabled"] || false;
    const readonly = uiOptions?.["ui:readonly"] || false;
    let baseValue;
    if (value2 !== void 0) {
      baseValue = value2;
    } else if (typeof schema.default !== "undefined" && (typeof schema.default === "string" || typeof schema.default === "number" || schema.default == null || typeof schema.default === "boolean")) {
      baseValue = schema.default;
      handleChange([...path], schema.default, schemaPath);
    }
    const valueChangedCallback = (newValue) => {
      let finalValue = newValue;
      if (finalValue === "") {
        finalValue = void 0;
      }
      if (schema?.type?.includes("null") && (typeof newValue === "undefined" || newValue === "")) {
        finalValue = null;
      }
      handleChange(path, finalValue, schemaPath);
    };
    const baseOptions = {
      label,
      helpText,
      placeholder,
      valueChangedCallback,
      handleKeydown,
      id,
      required,
      disabled,
      readonly
    };
    if (schema?.enum && (schema.type === "integer" || schema.type === "number" || schema.type === "string")) {
      const options = {
        ...baseOptions,
        value: baseValue ? String(baseValue) : "",
        type: schema.type,
        enum: schema.enum
      };
      if (uiOptions?.["ui:widget"] === "radio") {
        return widgets?.radioGroup?.(options) || missing("radio group");
      }
      if (uiOptions?.["ui:widget"] === "button") {
        return widgets?.buttonGroup?.(options) || missing("button group");
      }
      return widgets?.select?.(options) || missing("select");
    }
    if (schema.type === "string" && uiOptions?.["ui:widget"] === "color") {
      const options = {
        ...baseOptions,
        value: baseValue ? String(baseValue) : ""
      };
      return widgets?.colorPicker?.(options) || missing("color picker");
    }
    if (schema.format === "date" || schema.format === "date-time" || schema.format === "time") {
      let type = schema.format;
      let date2 = baseValue;
      if (date2) {
        if (schema.format === "date") {
        }
        if (schema.format === "time") {
        }
        if (schema.format === "date-time") {
          if (date2 instanceof Date === false) {
            date2 = new Date(date2);
          }
          if (date2 instanceof Date)
            date2 = date2.toISOString().split(".")[0];
        }
      }
      if (schema.format === "date-time") {
        type = "datetime-local";
      }
      const options = {
        ...baseOptions,
        value: date2,
        type
      };
      return widgets?.date?.(options) || missing("date");
    }
    if (schema.type === "string") {
      let inputType = "text";
      if (schema.format === "password" || schema.format === "email") {
        inputType = schema.format;
      }
      if (uiOptions?.["ui:widget"] === "password") {
        inputType = "password";
      }
      if (uiOptions?.["ui:options"]?.inputType === "tel") {
        inputType = "tel";
      }
      const options = {
        ...baseOptions,
        value: baseValue ? String(baseValue) : "",
        inputType,
        minLength: schema.minLength,
        maxLength: schema.maxLength,
        pattern: schema.pattern
      };
      if (uiOptions?.["ui:widget"] === "textarea") {
        return widgets?.textarea?.(options) || missing("textarea");
      }
      if (typeof uiOptions?.["ui:widget"] === "string") {
        const customWidgetName = uiOptions?.["ui:widget"];
        if (customWidgetName !== "password") {
          return widgets?.[customWidgetName]?.(options) || missing("custom");
        }
      }
      return widgets?.text?.(options) || missing("text");
    }
    if (schema.type === "number" || schema.type === "integer") {
      let step = schema.multipleOf;
      if (typeof step === "undefined") {
        if (schema.type?.includes("integer"))
          step = 1;
        if (schema.type?.includes("number"))
          step = "any";
      }
      const options = {
        ...baseOptions,
        value: typeof baseValue !== "undefined" ? Number(baseValue) : void 0,
        min: schema.minimum,
        max: schema.maximum,
        step
      };
      if (uiOptions?.["ui:widget"] === "range") {
        return widgets?.range?.(options) || missing("range");
      }
      if (uiOptions?.["ui:widget"] === "rating") {
        return widgets?.rating?.(options) || missing("rating");
      }
      return widgets?.number?.(options) || missing("number");
    }
    if (schema.type?.includes("boolean")) {
      const options = {
        ...baseOptions,
        value: typeof baseValue !== "undefined" ? Boolean(baseValue) : void 0
      };
      if (uiOptions?.["ui:widget"] === "switch") {
        return widgets?.switch?.(options) || missing("switch");
      }
      if (uiOptions?.["ui:widget"] === "radio") {
        return widgets?.radioGroupBoolean?.(options) || missing("radio group boolean");
      }
      if (uiOptions?.["ui:widget"] === "button") {
        return widgets?.buttonGroupBoolean?.(options) || missing("button group boolean");
      }
      return widgets?.checkbox?.(options) || missing("boolean");
    }
    return missing(`Wrong input for: ${path.join("/")}`);
  };

  // node_modules/@jsfe/form/dist/esm/triage/array-primitive.js
  var fieldArrayPrimitive = (schema, dataLevel, path, uiState, uiOptions, required, handleChange, schemaPath, widgets, level = 0) => {
    const id = path.join(".");
    function missing(widgetName) {
      const options2 = { id, message: `Missing ${widgetName} widget.` };
      return widgets?.callout?.(options2) ?? x`<p>${options2.message}</p>`;
    }
    const helpText = schema.description ?? uiOptions?.["ui:help"] ?? "";
    const items = schema.items;
    if (typeof items !== "object" || Array.isArray(items))
      return;
    const valueChangedCallback = (enumValue) => {
      const schemaPathAugmented = [
        ...schemaPath,
        "items",
        "enum"
      ];
      handleChange(path, enumValue, schemaPathAugmented);
    };
    const disabled = uiOptions?.["ui:disabled"] || false;
    const options = {
      label: schema.title,
      helpText,
      value: dataLevel ?? schema?.default,
      enum: items.enum,
      disabled,
      level,
      id,
      valueChangedCallback
    };
    if (uiOptions?.["ui:widget"] === "select") {
      return widgets?.selectMultiple?.(options) || missing("multi select");
    }
    return widgets?.checkboxGroup?.(options) || missing("array primitive");
  };

  // node_modules/@jsfe/form/dist/esm/json-schema-form.js
  var __decorate = function(decorators, target, key, desc) {
    var c7 = arguments.length, r10 = c7 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r10 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i10 = decorators.length - 1; i10 >= 0; i10--)
        if (d4 = decorators[i10])
          r10 = (c7 < 3 ? d4(r10) : c7 > 3 ? d4(target, key, r10) : d4(target, key)) || r10;
    return c7 > 3 && r10 && Object.defineProperty(target, key, r10), r10;
  };
  var Jsf = class extends i6 {
    constructor() {
      super(...arguments);
      this.schema = {};
      this.data = {};
      this.uiSchema = {};
      this.submitCallback = () => {
      };
      this.dataChangeCallback = () => {
      };
      this.widgets = {};
      this.styleSheets = [];
      this.experimental = {};
      this.submitButton = true;
      this.submitButtonText = "Submit";
      this._uiState = {};
      this.#submit = () => {
        const options = {
          id: "__submit_button",
          label: this.submitButtonLabel
        };
        const error = "Missing submit widget.";
        return this.widgets?.submit?.(options) ?? this.widgets?.callout?.({ message: error }) ?? error;
      };
      this.#formRef = e9();
    }
    _dig(node, dataLevel, path, uiState, uiSchema, schemaPath, required = false, level = 0) {
      let result;
      const currentNode = node;
      if (typeof currentNode.$ref !== "undefined" || typeof currentNode?.items === "object" && "$ref" in currentNode.items) {
        let nodeRef = currentNode.$ref;
        if (typeof currentNode.items === "object" && !Array.isArray(currentNode.items) && currentNode.items?.$ref) {
          nodeRef = currentNode.items.$ref;
        }
        if (nodeRef?.startsWith?.("#/definitions/")) {
          const reff = nodeRef.split("/")?.[2];
          if (currentNode?.properties) {
          } else {
            currentNode.items = {
              ...this.schema.definitions?.[reff]
            };
          }
        }
      }
      if (currentNode.type?.includes("boolean") || currentNode.type?.includes("string") || currentNode.type?.includes("integer") || currentNode.format === "date" || currentNode.format === "date-time" || currentNode.type?.includes("number")) {
        const schemaPathAugmented = [...schemaPath];
        result = fieldPrimitive(currentNode, dataLevel, path, uiSchema, required, this._handleChange.bind(this), this._handleKeydown.bind(this), schemaPathAugmented, this.widgets);
      }
      if (currentNode.properties || currentNode.allOf) {
        if (currentNode.allOf && this.experimental?.allOf !== true) {
          return x`Unsupported feature.`;
        }
        const nodeParsed = node;
        const schemaPathAugmented = [...schemaPath];
        schemaPathAugmented.push("properties");
        result = fieldObject(nodeParsed, dataLevel, path, uiState, uiSchema, this._dig.bind(this), schemaPathAugmented, this.widgets, level);
      }
      if (currentNode.type === "array" && typeof currentNode.items === "object" && !Array.isArray(currentNode.items) && currentNode.items.enum && currentNode.uniqueItems && (currentNode.items.type === "string" || currentNode.items.type === "number" || currentNode.items.type === "integer" || currentNode.items.type === "boolean")) {
        const schemaPathAugmented = [...schemaPath];
        result = fieldArrayPrimitive(currentNode, dataLevel, path, uiState, uiSchema, required, this._handleChange.bind(this), schemaPathAugmented, this.widgets, level);
      }
      if (typeof currentNode.items === "object") {
        if (Array.isArray(currentNode.items)) {
          const newNode = { ...node, properties: {} };
          currentNode.items.forEach((e11, i10) => {
            if (newNode.properties)
              newNode.properties[i10] = e11;
          });
          const schemaPathAugmented = [...schemaPath, "items"];
          result = fieldObject(newNode, dataLevel, path, uiState, uiSchema, this._dig.bind(this), schemaPathAugmented, this.widgets, level);
        } else if ((currentNode.items.type === "string" || currentNode.items.type === "number") && currentNode.items.enum) {
        } else {
          const schemaPathAugmented = [...schemaPath];
          dataLevel ||= [];
          result = fieldArray(node, dataLevel, path, uiState, uiSchema, this._handleChange.bind(this), this._dig.bind(this), schemaPathAugmented, this.widgets, required, level);
        }
      }
      if (result)
        return result;
      const error = `Cannot dig this level: ${path.join("/")} - (${String(currentNode.type)})`;
      return this.widgets?.callout?.({ id: "", message: error }) ?? x`<p>${error}</p>`;
    }
    _setToValue(object2, value2, path) {
      if (object2 && typeof object2 === "object") {
        set_default(object2, path, value2);
      }
    }
    _handleChange(path, value2, schemaPath) {
      if (!(this.data && typeof this.data === "object"))
        return;
      let newData = { ...this.data };
      if (path.length === 0) {
        newData = {};
      } else {
        this._setToValue(newData, value2, path);
      }
      this.data = newData;
      this.dataChangeCallback(newData, path, value2, schemaPath);
    }
    _handleKeydown(event) {
      console.log("cccccccccccccc");
      const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (event.key === "Enter" && !hasModifier) {
        setTimeout(() => {
          if (!event.defaultPrevented && !event.isComposing) {
            console.log({ event });
            const form = this.#formRef.value;
            let valid = true;
            let firstInvalid;
            if (!form.noValidate) {
              const elements = form.querySelectorAll("*");
              for (const element of elements) {
                if (typeof element.reportValidity === "function") {
                  if (!element.reportValidity()) {
                    valid = false;
                    if (!firstInvalid)
                      firstInvalid = element;
                  }
                }
              }
              if (firstInvalid)
                firstInvalid?.reportValidity();
            }
            this.submitCallback(this.data, valid);
          }
        });
      }
    }
    _updateUi(path, value2) {
      if (!(this._uiState && typeof this._uiState === "object"))
        return;
      const newUiState = { ...this._uiState };
      this._setToValue(newUiState, value2, path);
      this._uiState = newUiState;
    }
    #submit;
    #formRef;
    render() {
      return x`
			<style>
				${r2(this.styleSheets.join("\n"))}
			</style>

			<form
				${n8(this.#formRef)}
				part="base"
				@submit=${(event) => {
        console.log("hey");
        event.preventDefault();
        const valid = event.target.reportValidity();
        this.submitCallback(this.data, valid);
      }}
				@invalid=${(_event) => {
      }}
			>
				${this._dig(this.schema, this.data, [], this._uiState, this.uiSchema, [], false)}

				<!--  -->
				${this.submitButton ? this.#submit() : E2}
			</form>
		`;
    }
  };
  __decorate([
    n5({ type: Object })
  ], Jsf.prototype, "schema", void 0);
  __decorate([
    n5({ type: Object })
  ], Jsf.prototype, "data", void 0);
  __decorate([
    n5({ type: Object })
  ], Jsf.prototype, "uiSchema", void 0);
  __decorate([
    n5({ type: Object })
  ], Jsf.prototype, "widgets", void 0);
  __decorate([
    n5({ type: Array })
  ], Jsf.prototype, "styleSheets", void 0);
  __decorate([
    n5({ type: Object })
  ], Jsf.prototype, "experimental", void 0);
  __decorate([
    n5({ type: Boolean })
  ], Jsf.prototype, "submitButton", void 0);
  __decorate([
    n5({ type: String })
  ], Jsf.prototype, "submitButtonText", void 0);
  __decorate([
    r6()
  ], Jsf.prototype, "_uiState", void 0);

  // node_modules/@jsfe/form/dist/esm/json-schema-form.def.js
  customElements.define("json-schema-form", Jsf);

  // node_modules/@jsfe/material/dist/esm/widgets/index.js
  var widgets_exports = {};
  __export(widgets_exports, {
    callout: () => callout,
    checkbox: () => checkbox,
    date: () => date,
    number: () => number,
    object: () => object,
    range: () => range,
    select: () => select,
    submit: () => submit,
    switch: () => switchh,
    text: () => text,
    textarea: () => textarea
  });

  // node_modules/lit-html/directives/class-map.js
  var e10 = e8(class extends i7 {
    constructor(t7) {
      if (super(t7), t7.type !== t6.ATTRIBUTE || "class" !== t7.name || t7.strings?.length > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return " " + Object.keys(t7).filter((s6) => t7[s6]).join(" ") + " ";
    }
    update(s6, [i10]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s6.strings && (this.nt = new Set(s6.strings.join(" ").split(/\s/).filter((t7) => "" !== t7)));
        for (const t7 in i10)
          i10[t7] && !this.nt?.has(t7) && this.st.add(t7);
        return this.render(i10);
      }
      const r10 = s6.element.classList;
      for (const t7 of this.st)
        t7 in i10 || (r10.remove(t7), this.st.delete(t7));
      for (const t7 in i10) {
        const s7 = !!i10[t7];
        s7 === this.st.has(t7) || this.nt?.has(t7) || (s7 ? (r10.add(t7), this.st.add(t7)) : (r10.remove(t7), this.st.delete(t7)));
      }
      return T2;
    }
  });

  // node_modules/@jsfe/material/dist/esm/widgets/callout.js
  var callout = (options) => {
    console.warn(options.message);
    return x`
		<div
			role="alert"
			class=${`callout--${options.type ?? "warning"} theme-material`}
			id=${options.id}
			part="widget-callout"
		>
			<p>${options.message}</p>
		</div>
	`;
  };

  // node_modules/tslib/tslib.es6.mjs
  function __decorate2(decorators, target, key, desc) {
    var c7 = arguments.length, r10 = c7 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r10 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i10 = decorators.length - 1; i10 >= 0; i10--)
        if (d4 = decorators[i10])
          r10 = (c7 < 3 ? d4(r10) : c7 > 3 ? d4(target, key, r10) : d4(target, key)) || r10;
    return c7 > 3 && r10 && Object.defineProperty(target, key, r10), r10;
  }

  // node_modules/@material/web/internal/controller/attachable-controller.js
  var ATTACHABLE_CONTROLLER = Symbol("attachableController");
  var FOR_ATTRIBUTE_OBSERVER;
  if (!o7) {
    FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
      for (const record of records) {
        record.target[ATTACHABLE_CONTROLLER]?.hostConnected();
      }
    });
  }
  var AttachableController = class {
    get htmlFor() {
      return this.host.getAttribute("for");
    }
    set htmlFor(htmlFor) {
      if (htmlFor === null) {
        this.host.removeAttribute("for");
      } else {
        this.host.setAttribute("for", htmlFor);
      }
    }
    get control() {
      if (this.host.hasAttribute("for")) {
        if (!this.htmlFor || !this.host.isConnected) {
          return null;
        }
        return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
      }
      return this.currentControl || this.host.parentElement;
    }
    set control(control) {
      if (control) {
        this.attach(control);
      } else {
        this.detach();
      }
    }
    /**
     * Creates a new controller for an `Attachable` element.
     *
     * @param host The `Attachable` element.
     * @param onControlChange A callback with two parameters for the previous and
     *     next control. An `Attachable` element may perform setup or teardown
     *     logic whenever the control changes.
     */
    constructor(host, onControlChange) {
      this.host = host;
      this.onControlChange = onControlChange;
      this.currentControl = null;
      host.addController(this);
      host[ATTACHABLE_CONTROLLER] = this;
      FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ["for"] });
    }
    attach(control) {
      if (control === this.currentControl) {
        return;
      }
      this.setCurrentControl(control);
      this.host.removeAttribute("for");
    }
    detach() {
      this.setCurrentControl(null);
      this.host.setAttribute("for", "");
    }
    /** @private */
    hostConnected() {
      this.setCurrentControl(this.control);
    }
    /** @private */
    hostDisconnected() {
      this.setCurrentControl(null);
    }
    setCurrentControl(control) {
      this.onControlChange(this.currentControl, control);
      this.currentControl = control;
    }
  };

  // node_modules/@material/web/focus/internal/focus-ring.js
  var EVENTS = ["focusin", "focusout", "pointerdown"];
  var FocusRing = class extends i6 {
    constructor() {
      super(...arguments);
      this.visible = false;
      this.inward = false;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    /** @private */
    handleEvent(event) {
      if (event[HANDLED_BY_FOCUS_RING]) {
        return;
      }
      switch (event.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? false;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = false;
          break;
      }
      event[HANDLED_BY_FOCUS_RING] = true;
    }
    onControlChange(prev, next) {
      if (o7)
        return;
      for (const event of EVENTS) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
    update(changed) {
      if (changed.has("visible")) {
        this.dispatchEvent(new Event("visibility-changed"));
      }
      super.update(changed);
    }
  };
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "visible", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "inward", void 0);
  var HANDLED_BY_FOCUS_RING = Symbol("handledByFocusRing");

  // node_modules/@material/web/focus/internal/focus-ring-styles.js
  var styles = i3`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;

  // node_modules/@material/web/focus/md-focus-ring.js
  var MdFocusRing = class MdFocusRing2 extends FocusRing {
  };
  MdFocusRing.styles = [styles];
  MdFocusRing = __decorate2([
    t4("md-focus-ring")
  ], MdFocusRing);

  // node_modules/@material/web/internal/motion/animation.js
  var EASING = {
    STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
    STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
    STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
    EMPHASIZED: "cubic-bezier(.3,0,0,1)",
    EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
    EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)"
  };
  function createAnimationSignal() {
    let animationAbortController = null;
    return {
      start() {
        animationAbortController?.abort();
        animationAbortController = new AbortController();
        return animationAbortController.signal;
      },
      finish() {
        animationAbortController = null;
      }
    };
  }

  // node_modules/@material/web/ripple/internal/ripple.js
  var PRESS_GROW_MS = 450;
  var MINIMUM_PRESS_MS = 225;
  var INITIAL_ORIGIN_SCALE = 0.2;
  var PADDING = 10;
  var SOFT_EDGE_MINIMUM_SIZE = 75;
  var SOFT_EDGE_CONTAINER_RATIO = 0.35;
  var PRESS_PSEUDO = "::after";
  var ANIMATION_FILL = "forwards";
  var State;
  (function(State2) {
    State2[State2["INACTIVE"] = 0] = "INACTIVE";
    State2[State2["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
    State2[State2["HOLDING"] = 2] = "HOLDING";
    State2[State2["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
  })(State || (State = {}));
  var EVENTS2 = [
    "click",
    "contextmenu",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pointerup"
  ];
  var TOUCH_DELAY_MS = 150;
  var FORCED_COLORS = o7 ? null : window.matchMedia("(forced-colors: active)");
  var Ripple = class extends i6 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.hovered = false;
      this.pressed = false;
      this.rippleSize = "";
      this.rippleScale = "";
      this.initialSize = 0;
      this.state = State.INACTIVE;
      this.checkBoundsAfterContextMenu = false;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    render() {
      const classes = {
        "hovered": this.hovered,
        "pressed": this.pressed
      };
      return x`<div class="surface ${e10(classes)}"></div>`;
    }
    update(changedProps) {
      if (changedProps.has("disabled") && this.disabled) {
        this.hovered = false;
        this.pressed = false;
      }
      super.update(changedProps);
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerenter(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = true;
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerleave(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = false;
      if (this.state !== State.INACTIVE) {
        this.endPressAnimation();
      }
    }
    handlePointerup(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      if (this.state === State.HOLDING) {
        this.state = State.WAITING_FOR_CLICK;
        return;
      }
      if (this.state === State.TOUCH_DELAY) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(this.rippleStartEvent);
        return;
      }
    }
    async handlePointerdown(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.rippleStartEvent = event;
      if (!this.isTouch(event)) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(event);
        return;
      }
      if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
        return;
      }
      this.checkBoundsAfterContextMenu = false;
      this.state = State.TOUCH_DELAY;
      await new Promise((resolve) => {
        setTimeout(resolve, TOUCH_DELAY_MS);
      });
      if (this.state !== State.TOUCH_DELAY) {
        return;
      }
      this.state = State.HOLDING;
      this.startPressAnimation(event);
    }
    handleClick() {
      if (this.disabled) {
        return;
      }
      if (this.state === State.WAITING_FOR_CLICK) {
        this.endPressAnimation();
        return;
      }
      if (this.state === State.INACTIVE) {
        this.startPressAnimation();
        this.endPressAnimation();
      }
    }
    handlePointercancel(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.endPressAnimation();
    }
    handleContextmenu() {
      if (this.disabled) {
        return;
      }
      this.checkBoundsAfterContextMenu = true;
      this.endPressAnimation();
    }
    determineRippleSize() {
      const { height, width } = this.getBoundingClientRect();
      const maxDim = Math.max(height, width);
      const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
      const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
      const maxRadius = hypotenuse + PADDING;
      this.initialSize = initialSize;
      this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
      this.rippleSize = `${initialSize}px`;
    }
    getNormalizedPointerEventCoords(pointerEvent) {
      const { scrollX, scrollY } = window;
      const { left, top } = this.getBoundingClientRect();
      const documentX = scrollX + left;
      const documentY = scrollY + top;
      const { pageX, pageY } = pointerEvent;
      return { x: pageX - documentX, y: pageY - documentY };
    }
    getTranslationCoordinates(positionEvent) {
      const { height, width } = this.getBoundingClientRect();
      const endPoint = {
        x: (width - this.initialSize) / 2,
        y: (height - this.initialSize) / 2
      };
      let startPoint;
      if (positionEvent instanceof PointerEvent) {
        startPoint = this.getNormalizedPointerEventCoords(positionEvent);
      } else {
        startPoint = {
          x: width / 2,
          y: height / 2
        };
      }
      startPoint = {
        x: startPoint.x - this.initialSize / 2,
        y: startPoint.y - this.initialSize / 2
      };
      return { startPoint, endPoint };
    }
    startPressAnimation(positionEvent) {
      if (!this.mdRoot) {
        return;
      }
      this.pressed = true;
      this.growAnimation?.cancel();
      this.determineRippleSize();
      const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
      const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
      this.growAnimation = this.mdRoot.animate({
        top: [0, 0],
        left: [0, 0],
        height: [this.rippleSize, this.rippleSize],
        width: [this.rippleSize, this.rippleSize],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${this.rippleScale})`
        ]
      }, {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        easing: EASING.STANDARD,
        fill: ANIMATION_FILL
      });
    }
    async endPressAnimation() {
      this.rippleStartEvent = void 0;
      this.state = State.INACTIVE;
      const animation = this.growAnimation;
      let pressAnimationPlayState = Infinity;
      if (typeof animation?.currentTime === "number") {
        pressAnimationPlayState = animation.currentTime;
      } else if (animation?.currentTime) {
        pressAnimationPlayState = animation.currentTime.to("ms").value;
      }
      if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
        this.pressed = false;
        return;
      }
      await new Promise((resolve) => {
        setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
      });
      if (this.growAnimation !== animation) {
        return;
      }
      this.pressed = false;
    }
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    shouldReactToEvent(event) {
      if (this.disabled || !event.isPrimary) {
        return false;
      }
      if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== event.pointerId) {
        return false;
      }
      if (event.type === "pointerenter" || event.type === "pointerleave") {
        return !this.isTouch(event);
      }
      const isPrimaryButton = event.buttons === 1;
      return this.isTouch(event) || isPrimaryButton;
    }
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    inBounds({ x: x2, y: y4 }) {
      const { top, left, bottom, right } = this.getBoundingClientRect();
      return x2 >= left && x2 <= right && y4 >= top && y4 <= bottom;
    }
    isTouch({ pointerType }) {
      return pointerType === "touch";
    }
    /** @private */
    async handleEvent(event) {
      if (FORCED_COLORS?.matches) {
        return;
      }
      switch (event.type) {
        case "click":
          this.handleClick();
          break;
        case "contextmenu":
          this.handleContextmenu();
          break;
        case "pointercancel":
          this.handlePointercancel(event);
          break;
        case "pointerdown":
          await this.handlePointerdown(event);
          break;
        case "pointerenter":
          this.handlePointerenter(event);
          break;
        case "pointerleave":
          this.handlePointerleave(event);
          break;
        case "pointerup":
          this.handlePointerup(event);
          break;
        default:
          break;
      }
    }
    onControlChange(prev, next) {
      if (o7)
        return;
      for (const event of EVENTS2) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
  };
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], Ripple.prototype, "disabled", void 0);
  __decorate2([
    r6()
  ], Ripple.prototype, "hovered", void 0);
  __decorate2([
    r6()
  ], Ripple.prototype, "pressed", void 0);
  __decorate2([
    e6(".surface")
  ], Ripple.prototype, "mdRoot", void 0);

  // node_modules/@material/web/ripple/internal/ripple-styles.js
  var styles2 = i3`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;

  // node_modules/@material/web/ripple/ripple.js
  var MdRipple = class MdRipple2 extends Ripple {
  };
  MdRipple.styles = [styles2];
  MdRipple = __decorate2([
    t4("md-ripple")
  ], MdRipple);

  // node_modules/@material/web/internal/aria/aria.js
  var ARIA_PROPERTIES = [
    "role",
    "ariaAtomic",
    "ariaAutoComplete",
    "ariaBusy",
    "ariaChecked",
    "ariaColCount",
    "ariaColIndex",
    "ariaColSpan",
    "ariaCurrent",
    "ariaDisabled",
    "ariaExpanded",
    "ariaHasPopup",
    "ariaHidden",
    "ariaInvalid",
    "ariaKeyShortcuts",
    "ariaLabel",
    "ariaLevel",
    "ariaLive",
    "ariaModal",
    "ariaMultiLine",
    "ariaMultiSelectable",
    "ariaOrientation",
    "ariaPlaceholder",
    "ariaPosInSet",
    "ariaPressed",
    "ariaReadOnly",
    "ariaRequired",
    "ariaRoleDescription",
    "ariaRowCount",
    "ariaRowIndex",
    "ariaRowSpan",
    "ariaSelected",
    "ariaSetSize",
    "ariaSort",
    "ariaValueMax",
    "ariaValueMin",
    "ariaValueNow",
    "ariaValueText"
  ];
  var ARIA_ATTRIBUTES = ARIA_PROPERTIES.map(ariaPropertyToAttribute);
  function ariaPropertyToAttribute(property) {
    return property.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
  }

  // node_modules/@material/web/internal/aria/delegate.js
  function requestUpdateOnAriaChange(ctor) {
    for (const ariaProperty of ARIA_PROPERTIES) {
      ctor.createProperty(ariaProperty, {
        attribute: ariaPropertyToAttribute(ariaProperty),
        reflect: true
      });
    }
    ctor.addInitializer((element) => {
      const controller = {
        hostConnected() {
          element.setAttribute("role", "presentation");
        }
      };
      element.addController(controller);
    });
  }

  // node_modules/@material/web/internal/events/form-label-activation.js
  function dispatchActivationClick(element) {
    const event = new MouseEvent("click", { bubbles: true });
    element.dispatchEvent(event);
    return event;
  }
  function isActivationClick(event) {
    if (event.currentTarget !== event.target) {
      return false;
    }
    if (event.composedPath()[0] !== event.target) {
      return false;
    }
    if (event.target.disabled) {
      return false;
    }
    return !squelchEvent(event);
  }
  function squelchEvent(event) {
    const squelched = isSquelchingEvents;
    if (squelched) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    squelchEventsForMicrotask();
    return squelched;
  }
  var isSquelchingEvents = false;
  async function squelchEventsForMicrotask() {
    isSquelchingEvents = true;
    await null;
    isSquelchingEvents = false;
  }

  // node_modules/@material/web/internal/events/redispatch-event.js
  function redispatchEvent(element, event) {
    if (event.bubbles && (!element.shadowRoot || event.composed)) {
      event.stopPropagation();
    }
    const copy = Reflect.construct(event.constructor, [event.type, event]);
    const dispatched = element.dispatchEvent(copy);
    if (!dispatched) {
      event.preventDefault();
    }
    return dispatched;
  }

  // node_modules/@material/web/labs/behaviors/element-internals.js
  var internals = Symbol("internals");
  var privateInternals = Symbol("privateInternals");
  function mixinElementInternals(base) {
    class WithElementInternalsElement extends base {
      get [internals]() {
        if (!this[privateInternals]) {
          this[privateInternals] = this.attachInternals();
        }
        return this[privateInternals];
      }
    }
    return WithElementInternalsElement;
  }

  // node_modules/@material/web/labs/behaviors/constraint-validation.js
  var createValidator = Symbol("createValidator");
  var getValidityAnchor = Symbol("getValidityAnchor");
  var privateValidator = Symbol("privateValidator");
  var privateSyncValidity = Symbol("privateSyncValidity");
  var privateCustomValidationMessage = Symbol("privateCustomValidationMessage");
  function mixinConstraintValidation(base) {
    var _a2;
    class ConstraintValidationElement extends base {
      constructor() {
        super(...arguments);
        this[_a2] = "";
      }
      get validity() {
        this[privateSyncValidity]();
        return this[internals].validity;
      }
      get validationMessage() {
        this[privateSyncValidity]();
        return this[internals].validationMessage;
      }
      get willValidate() {
        this[privateSyncValidity]();
        return this[internals].willValidate;
      }
      checkValidity() {
        this[privateSyncValidity]();
        return this[internals].checkValidity();
      }
      reportValidity() {
        this[privateSyncValidity]();
        return this[internals].reportValidity();
      }
      setCustomValidity(error) {
        this[privateCustomValidationMessage] = error;
        this[privateSyncValidity]();
      }
      requestUpdate(name, oldValue, options) {
        super.requestUpdate(name, oldValue, options);
        this[privateSyncValidity]();
      }
      firstUpdated(changed) {
        super.firstUpdated(changed);
        this[privateSyncValidity]();
      }
      [(_a2 = privateCustomValidationMessage, privateSyncValidity)]() {
        if (o7) {
          return;
        }
        if (!this[privateValidator]) {
          this[privateValidator] = this[createValidator]();
        }
        const { validity, validationMessage: nonCustomValidationMessage } = this[privateValidator].getValidity();
        const customError = !!this[privateCustomValidationMessage];
        const validationMessage = this[privateCustomValidationMessage] || nonCustomValidationMessage;
        this[internals].setValidity({ ...validity, customError }, validationMessage, this[getValidityAnchor]() ?? void 0);
      }
      [createValidator]() {
        throw new Error("Implement [createValidator]");
      }
      [getValidityAnchor]() {
        throw new Error("Implement [getValidityAnchor]");
      }
    }
    return ConstraintValidationElement;
  }

  // node_modules/@material/web/labs/behaviors/form-associated.js
  var getFormValue = Symbol("getFormValue");
  var getFormState = Symbol("getFormState");
  function mixinFormAssociated(base) {
    class FormAssociatedElement extends base {
      get form() {
        return this[internals].form;
      }
      get labels() {
        return this[internals].labels;
      }
      // Use @property for the `name` and `disabled` properties to add them to the
      // `observedAttributes` array and trigger `attributeChangedCallback()`.
      //
      // We don't use Lit's default getter/setter (`noAccessor: true`) because
      // the attributes need to be updated synchronously to work with synchronous
      // form APIs, and Lit updates attributes async by default.
      get name() {
        return this.getAttribute("name") ?? "";
      }
      set name(name) {
        this.setAttribute("name", name);
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(disabled) {
        this.toggleAttribute("disabled", disabled);
      }
      attributeChangedCallback(name, old, value2) {
        if (name === "name" || name === "disabled") {
          const oldValue = name === "disabled" ? old !== null : old;
          this.requestUpdate(name, oldValue);
          return;
        }
        super.attributeChangedCallback(name, old, value2);
      }
      requestUpdate(name, oldValue, options) {
        super.requestUpdate(name, oldValue, options);
        this[internals].setFormValue(this[getFormValue](), this[getFormState]());
      }
      [getFormValue]() {
        throw new Error("Implement [getFormValue]");
      }
      [getFormState]() {
        return this[getFormValue]();
      }
      formDisabledCallback(disabled) {
        this.disabled = disabled;
      }
    }
    FormAssociatedElement.formAssociated = true;
    __decorate2([
      n5({ noAccessor: true })
    ], FormAssociatedElement.prototype, "name", null);
    __decorate2([
      n5({ type: Boolean, noAccessor: true })
    ], FormAssociatedElement.prototype, "disabled", null);
    return FormAssociatedElement;
  }

  // node_modules/@material/web/labs/behaviors/validators/validator.js
  var Validator = class {
    /**
     * Creates a new validator.
     *
     * @param getCurrentState A callback that returns the current state of
     *     constraint validation-related properties.
     */
    constructor(getCurrentState) {
      this.getCurrentState = getCurrentState;
      this.currentValidity = {
        validity: {},
        validationMessage: ""
      };
    }
    /**
     * Returns the current `ValidityStateFlags` and validation message for the
     * validator.
     *
     * If the constraint validation state has not changed, this will return a
     * cached result. This is important since `getValidity()` can be called
     * frequently in response to synchronous property changes.
     *
     * @return The current validity and validation message.
     */
    getValidity() {
      const state = this.getCurrentState();
      const hasStateChanged = !this.prevState || !this.equals(this.prevState, state);
      if (!hasStateChanged) {
        return this.currentValidity;
      }
      const { validity, validationMessage } = this.computeValidity(state);
      this.prevState = this.copy(state);
      this.currentValidity = {
        validationMessage,
        validity: {
          // Change any `ValidityState` instances into `ValidityStateFlags` since
          // `ValidityState` cannot be easily `{...spread}`.
          badInput: validity.badInput,
          customError: validity.customError,
          patternMismatch: validity.patternMismatch,
          rangeOverflow: validity.rangeOverflow,
          rangeUnderflow: validity.rangeUnderflow,
          stepMismatch: validity.stepMismatch,
          tooLong: validity.tooLong,
          tooShort: validity.tooShort,
          typeMismatch: validity.typeMismatch,
          valueMissing: validity.valueMissing
        }
      };
      return this.currentValidity;
    }
  };

  // node_modules/@material/web/labs/behaviors/validators/checkbox-validator.js
  var CheckboxValidator = class extends Validator {
    computeValidity(state) {
      if (!this.checkboxControl) {
        this.checkboxControl = document.createElement("input");
        this.checkboxControl.type = "checkbox";
      }
      this.checkboxControl.checked = state.checked;
      this.checkboxControl.required = state.required;
      return {
        validity: this.checkboxControl.validity,
        validationMessage: this.checkboxControl.validationMessage
      };
    }
    equals(prev, next) {
      return prev.checked === next.checked && prev.required === next.required;
    }
    copy({ checked, required }) {
      return { checked, required };
    }
  };

  // node_modules/@material/web/checkbox/internal/checkbox.js
  var checkboxBaseClass = mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i6)));
  var Checkbox = class extends checkboxBaseClass {
    constructor() {
      super();
      this.checked = false;
      this.indeterminate = false;
      this.required = false;
      this.value = "on";
      this.prevChecked = false;
      this.prevDisabled = false;
      this.prevIndeterminate = false;
      if (!o7) {
        this.addEventListener("click", (event) => {
          if (!isActivationClick(event) || !this.input) {
            return;
          }
          this.focus();
          dispatchActivationClick(this.input);
        });
      }
    }
    update(changed) {
      if (changed.has("checked") || changed.has("disabled") || changed.has("indeterminate")) {
        this.prevChecked = changed.get("checked") ?? this.checked;
        this.prevDisabled = changed.get("disabled") ?? this.disabled;
        this.prevIndeterminate = changed.get("indeterminate") ?? this.indeterminate;
      }
      super.update(changed);
    }
    render() {
      const prevNone = !this.prevChecked && !this.prevIndeterminate;
      const prevChecked = this.prevChecked && !this.prevIndeterminate;
      const prevIndeterminate = this.prevIndeterminate;
      const isChecked = this.checked && !this.indeterminate;
      const isIndeterminate = this.indeterminate;
      const containerClasses = e10({
        "disabled": this.disabled,
        "selected": isChecked || isIndeterminate,
        "unselected": !isChecked && !isIndeterminate,
        "checked": isChecked,
        "indeterminate": isIndeterminate,
        "prev-unselected": prevNone,
        "prev-checked": prevChecked,
        "prev-indeterminate": prevIndeterminate,
        "prev-disabled": this.prevDisabled
      });
      const { ariaLabel, ariaInvalid } = this;
      return x`
      <div class="container ${containerClasses}">
        <input
          type="checkbox"
          id="input"
          aria-checked=${isIndeterminate ? "mixed" : E2}
          aria-label=${ariaLabel || E2}
          aria-invalid=${ariaInvalid || E2}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring part="focus-ring" for="input"></md-focus-ring>
        <md-ripple for="input" ?disabled=${this.disabled}></md-ripple>
        <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
    `;
    }
    handleInput(event) {
      const target = event.target;
      this.checked = target.checked;
      this.indeterminate = target.indeterminate;
    }
    handleChange(event) {
      redispatchEvent(this, event);
    }
    [getFormValue]() {
      if (!this.checked || this.indeterminate) {
        return null;
      }
      return this.value;
    }
    [getFormState]() {
      return String(this.checked);
    }
    formResetCallback() {
      this.checked = this.hasAttribute("checked");
    }
    formStateRestoreCallback(state) {
      this.checked = state === "true";
    }
    [createValidator]() {
      return new CheckboxValidator(() => this);
    }
    [getValidityAnchor]() {
      return this.input;
    }
  };
  (() => {
    requestUpdateOnAriaChange(Checkbox);
  })();
  Checkbox.shadowRootOptions = {
    ...i6.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate2([
    n5({ type: Boolean })
  ], Checkbox.prototype, "checked", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Checkbox.prototype, "indeterminate", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Checkbox.prototype, "required", void 0);
  __decorate2([
    n5()
  ], Checkbox.prototype, "value", void 0);
  __decorate2([
    r6()
  ], Checkbox.prototype, "prevChecked", void 0);
  __decorate2([
    r6()
  ], Checkbox.prototype, "prevDisabled", void 0);
  __decorate2([
    r6()
  ], Checkbox.prototype, "prevIndeterminate", void 0);
  __decorate2([
    e6("input")
  ], Checkbox.prototype, "input", void 0);

  // node_modules/@material/web/checkbox/internal/checkbox-styles.js
  var styles3 = i3`:host{border-start-start-radius:var(--md-checkbox-container-shape-start-start, var(--md-checkbox-container-shape, 2px));border-start-end-radius:var(--md-checkbox-container-shape-start-end, var(--md-checkbox-container-shape, 2px));border-end-end-radius:var(--md-checkbox-container-shape-end-end, var(--md-checkbox-container-shape, 2px));border-end-start-radius:var(--md-checkbox-container-shape-end-start, var(--md-checkbox-container-shape, 2px));display:inline-flex;height:var(--md-checkbox-container-size, 18px);position:relative;vertical-align:top;width:var(--md-checkbox-container-size, 18px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-checkbox-container-size, 18px))/2)}md-focus-ring{height:44px;inset:unset;width:44px}input{appearance:none;height:48px;margin:0;opacity:0;outline:none;position:absolute;width:48px;z-index:1;cursor:inherit}:host([touch-target=none]) input{height:100%;width:100%}.container{border-radius:inherit;display:flex;height:100%;place-content:center;place-items:center;position:relative;width:100%}.outline,.background,.icon{inset:0;position:absolute}.outline,.background{border-radius:inherit}.outline{border-color:var(--md-checkbox-outline-color, var(--md-sys-color-on-surface-variant, #49454f));border-style:solid;border-width:var(--md-checkbox-outline-width, 2px);box-sizing:border-box}.background{background-color:var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4))}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}:where(.selected) :is(.background,.icon){opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-ripple{border-radius:var(--md-checkbox-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-checkbox-state-layer-size, 40px);inset:unset;width:var(--md-checkbox-state-layer-size, 40px);--md-ripple-hover-color: var(--md-checkbox-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-checkbox-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-checkbox-pressed-state-layer-opacity, 0.12)}.selected md-ripple{--md-ripple-hover-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12)}.icon{fill:var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));height:var(--md-checkbox-icon-size, 18px);width:var(--md-checkbox-icon-size, 18px)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}:where(:hover) .outline{border-color:var(--md-checkbox-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-hover-outline-width, 2px)}:where(:hover) .background{background:var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4))}:where(:hover) .icon{fill:var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:focus-within) .outline{border-color:var(--md-checkbox-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-focus-outline-width, 2px)}:where(:focus-within) .background{background:var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4))}:where(:focus-within) .icon{fill:var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:active) .outline{border-color:var(--md-checkbox-pressed-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-pressed-outline-width, 2px)}:where(:active) .background{background:var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4))}:where(:active) .icon{fill:var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff))}:where(.disabled,.prev-disabled) :is(.background,.icon,.mark){animation-duration:0s;transition-duration:0s}:where(.disabled) .outline{border-color:var(--md-checkbox-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-disabled-outline-width, 2px);opacity:var(--md-checkbox-disabled-container-opacity, 0.38)}:where(.selected.disabled) .outline{visibility:hidden}:where(.selected.disabled) .background{background:var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-checkbox-selected-disabled-container-opacity, 0.38)}:where(.disabled) .icon{fill:var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff))}@media(forced-colors: active){.background{background-color:CanvasText}.selected.disabled .background{background-color:GrayText;opacity:1}.outline{border-color:CanvasText}.disabled .outline{border-color:GrayText;opacity:1}.icon{fill:Canvas}}
`;

  // node_modules/@material/web/checkbox/checkbox.js
  var MdCheckbox = class MdCheckbox2 extends Checkbox {
  };
  MdCheckbox.styles = [styles3];
  MdCheckbox = __decorate2([
    t4("md-checkbox")
  ], MdCheckbox);

  // node_modules/@jsfe/material/dist/esm/widgets/checkbox.js
  var checkbox = (options) => x`
	<label
		for=${options.id}
		class="theme-material widget-switch widget-toggle"
		part="field-checkbox"
	>
		<div>
			<div>${options.label}</div>
			<small>${options.helpText}</small>
		</div>

		<md-checkbox
			.id=${options.id}
			.name=${options.id}
			.required=${options.required}
			.checked=${options.value ?? false}
			@input=${(event) => {
    const { checked: newValue } = event.target;
    options.valueChangedCallback?.(newValue);
  }}
			@keydown=${options.handleKeydown}
		>
			<!-- touch-target="wrapper" -->
		</md-checkbox>
		<!--  -->
	</label>
`;

  // node_modules/@material/web/field/internal/field.js
  var Field = class extends i6 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.error = false;
      this.focused = false;
      this.label = "";
      this.noAsterisk = false;
      this.populated = false;
      this.required = false;
      this.resizable = false;
      this.supportingText = "";
      this.errorText = "";
      this.count = -1;
      this.max = -1;
      this.hasStart = false;
      this.hasEnd = false;
      this.isAnimating = false;
      this.refreshErrorAlert = false;
      this.disableTransitions = false;
    }
    get counterText() {
      const countAsNumber = this.count ?? -1;
      const maxAsNumber = this.max ?? -1;
      if (countAsNumber < 0 || maxAsNumber <= 0) {
        return "";
      }
      return `${countAsNumber} / ${maxAsNumber}`;
    }
    get supportingOrErrorText() {
      return this.error && this.errorText ? this.errorText : this.supportingText;
    }
    /**
     * Re-announces the field's error supporting text to screen readers.
     *
     * Error text announces to screen readers anytime it is visible and changes.
     * Use the method to re-announce the message when the text has not changed,
     * but announcement is still needed (such as for `reportValidity()`).
     */
    reannounceError() {
      this.refreshErrorAlert = true;
    }
    update(props) {
      const isDisabledChanging = props.has("disabled") && props.get("disabled") !== void 0;
      if (isDisabledChanging) {
        this.disableTransitions = true;
      }
      if (this.disabled && this.focused) {
        props.set("focused", true);
        this.focused = false;
      }
      this.animateLabelIfNeeded({
        wasFocused: props.get("focused"),
        wasPopulated: props.get("populated")
      });
      super.update(props);
    }
    render() {
      const floatingLabel = this.renderLabel(
        /*isFloating*/
        true
      );
      const restingLabel = this.renderLabel(
        /*isFloating*/
        false
      );
      const outline = this.renderOutline?.(floatingLabel);
      const classes = {
        "disabled": this.disabled,
        "disable-transitions": this.disableTransitions,
        "error": this.error && !this.disabled,
        "focused": this.focused,
        "with-start": this.hasStart,
        "with-end": this.hasEnd,
        "populated": this.populated,
        "resizable": this.resizable,
        "required": this.required,
        "no-label": !this.label
      };
      return x`
      <div class="field ${e10(classes)}">
        <div class="container-overflow">
          ${this.renderBackground?.()} ${this.renderIndicator?.()} ${outline}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${restingLabel} ${outline ? E2 : floatingLabel}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `;
    }
    updated(changed) {
      if (changed.has("supportingText") || changed.has("errorText") || changed.has("count") || changed.has("max")) {
        this.updateSlottedAriaDescribedBy();
      }
      if (this.refreshErrorAlert) {
        requestAnimationFrame(() => {
          this.refreshErrorAlert = false;
        });
      }
      if (this.disableTransitions) {
        requestAnimationFrame(() => {
          this.disableTransitions = false;
        });
      }
    }
    renderSupportingText() {
      const { supportingOrErrorText, counterText } = this;
      if (!supportingOrErrorText && !counterText) {
        return E2;
      }
      const start = x`<span>${supportingOrErrorText}</span>`;
      const end = counterText ? x`<span class="counter">${counterText}</span>` : E2;
      const shouldErrorAnnounce = this.error && this.errorText && !this.refreshErrorAlert;
      const role = shouldErrorAnnounce ? "alert" : E2;
      return x`
      <div class="supporting-text" role=${role}>${start}${end}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `;
    }
    updateSlottedAriaDescribedBy() {
      for (const element of this.slottedAriaDescribedBy) {
        B2(x`${this.supportingOrErrorText} ${this.counterText}`, element);
        element.setAttribute("hidden", "");
      }
    }
    renderLabel(isFloating) {
      if (!this.label) {
        return E2;
      }
      let visible;
      if (isFloating) {
        visible = this.focused || this.populated || this.isAnimating;
      } else {
        visible = !this.focused && !this.populated && !this.isAnimating;
      }
      const classes = {
        "hidden": !visible,
        "floating": isFloating,
        "resting": !isFloating
      };
      const labelText = `${this.label}${this.required && !this.noAsterisk ? "*" : ""}`;
      return x`
      <span class="label ${e10(classes)}" aria-hidden=${!visible}
        >${labelText}</span
      >
    `;
    }
    animateLabelIfNeeded({ wasFocused, wasPopulated }) {
      if (!this.label) {
        return;
      }
      wasFocused ?? (wasFocused = this.focused);
      wasPopulated ?? (wasPopulated = this.populated);
      const wasFloating = wasFocused || wasPopulated;
      const shouldBeFloating = this.focused || this.populated;
      if (wasFloating === shouldBeFloating) {
        return;
      }
      this.isAnimating = true;
      this.labelAnimation?.cancel();
      this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), { duration: 150, easing: EASING.STANDARD });
      this.labelAnimation?.addEventListener("finish", () => {
        this.isAnimating = false;
      });
    }
    getLabelKeyframes() {
      const { floatingLabelEl, restingLabelEl } = this;
      if (!floatingLabelEl || !restingLabelEl) {
        return [];
      }
      const { x: floatingX, y: floatingY, height: floatingHeight } = floatingLabelEl.getBoundingClientRect();
      const { x: restingX, y: restingY, height: restingHeight } = restingLabelEl.getBoundingClientRect();
      const floatingScrollWidth = floatingLabelEl.scrollWidth;
      const restingScrollWidth = restingLabelEl.scrollWidth;
      const scale = restingScrollWidth / floatingScrollWidth;
      const xDelta = restingX - floatingX;
      const yDelta = restingY - floatingY + Math.round((restingHeight - floatingHeight * scale) / 2);
      const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
      const floatTransform = `translateX(0) translateY(0) scale(1)`;
      const restingClientWidth = restingLabelEl.clientWidth;
      const isRestingClipped = restingScrollWidth > restingClientWidth;
      const width = isRestingClipped ? `${restingClientWidth / scale}px` : "";
      if (this.focused || this.populated) {
        return [
          { transform: restTransform, width },
          { transform: floatTransform, width }
        ];
      }
      return [
        { transform: floatTransform, width },
        { transform: restTransform, width }
      ];
    }
    getSurfacePositionClientRect() {
      return this.containerEl.getBoundingClientRect();
    }
  };
  __decorate2([
    n5({ type: Boolean })
  ], Field.prototype, "disabled", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Field.prototype, "error", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Field.prototype, "focused", void 0);
  __decorate2([
    n5()
  ], Field.prototype, "label", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "no-asterisk" })
  ], Field.prototype, "noAsterisk", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Field.prototype, "populated", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Field.prototype, "required", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Field.prototype, "resizable", void 0);
  __decorate2([
    n5({ attribute: "supporting-text" })
  ], Field.prototype, "supportingText", void 0);
  __decorate2([
    n5({ attribute: "error-text" })
  ], Field.prototype, "errorText", void 0);
  __decorate2([
    n5({ type: Number })
  ], Field.prototype, "count", void 0);
  __decorate2([
    n5({ type: Number })
  ], Field.prototype, "max", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "has-start" })
  ], Field.prototype, "hasStart", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "has-end" })
  ], Field.prototype, "hasEnd", void 0);
  __decorate2([
    o9({ slot: "aria-describedby" })
  ], Field.prototype, "slottedAriaDescribedBy", void 0);
  __decorate2([
    r6()
  ], Field.prototype, "isAnimating", void 0);
  __decorate2([
    r6()
  ], Field.prototype, "refreshErrorAlert", void 0);
  __decorate2([
    r6()
  ], Field.prototype, "disableTransitions", void 0);
  __decorate2([
    e6(".label.floating")
  ], Field.prototype, "floatingLabelEl", void 0);
  __decorate2([
    e6(".label.resting")
  ], Field.prototype, "restingLabelEl", void 0);
  __decorate2([
    e6(".container")
  ], Field.prototype, "containerEl", void 0);

  // node_modules/@material/web/field/internal/outlined-field.js
  var OutlinedField = class extends Field {
    renderOutline(floatingLabel) {
      return x`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${floatingLabel}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `;
    }
  };

  // node_modules/@material/web/field/internal/outlined-styles.js
  var styles4 = i3`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;

  // node_modules/@material/web/field/internal/shared-styles.js
  var styles5 = i3`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start,.with-end .end{min-width:48px}.with-start .start{margin-inline-end:4px}.with-end .end{margin-inline-start:4px}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;

  // node_modules/@material/web/field/outlined-field.js
  var MdOutlinedField = class MdOutlinedField2 extends OutlinedField {
  };
  MdOutlinedField.styles = [styles5, styles4];
  MdOutlinedField = __decorate2([
    t4("md-outlined-field")
  ], MdOutlinedField);

  // node_modules/lit-html/static.js
  var a4 = Symbol.for("");
  var o12 = (t7) => {
    if (t7?.r === a4)
      return t7?._$litStatic$;
  };
  var i8 = (t7, ...r10) => ({ _$litStatic$: r10.reduce((r11, e11, a5) => r11 + ((t8) => {
    if (void 0 !== t8._$litStatic$)
      return t8._$litStatic$;
    throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t8}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
  })(e11) + t7[a5 + 1], t7[0]), r: a4 });
  var l4 = /* @__PURE__ */ new Map();
  var n9 = (t7) => (r10, ...e11) => {
    const a5 = e11.length;
    let s6, i10;
    const n12 = [], u6 = [];
    let c7, $4 = 0, f6 = false;
    for (; $4 < a5; ) {
      for (c7 = r10[$4]; $4 < a5 && void 0 !== (i10 = e11[$4], s6 = o12(i10)); )
        c7 += s6 + r10[++$4], f6 = true;
      $4 !== a5 && u6.push(i10), n12.push(c7), $4++;
    }
    if ($4 === a5 && n12.push(r10[a5]), f6) {
      const t8 = n12.join("$$lit$$");
      void 0 === (r10 = l4.get(t8)) && (n12.raw = n12, l4.set(t8, r10 = n12)), e11 = u6;
    }
    return t7(r10, ...e11);
  };
  var u5 = n9(x);
  var c6 = n9(b3);
  var $3 = n9(w);

  // node_modules/@material/web/textfield/internal/outlined-styles.js
  var styles6 = i3`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space)}
`;

  // node_modules/lit-html/directives/live.js
  var l5 = e8(class extends i7 {
    constructor(r10) {
      if (super(r10), r10.type !== t6.PROPERTY && r10.type !== t6.ATTRIBUTE && r10.type !== t6.BOOLEAN_ATTRIBUTE)
        throw Error("The `live` directive is not allowed on child or event bindings");
      if (!f4(r10))
        throw Error("`live` bindings can only contain a single expression");
    }
    render(r10) {
      return r10;
    }
    update(i10, [t7]) {
      if (t7 === T2 || t7 === E2)
        return t7;
      const o15 = i10.element, l6 = i10.name;
      if (i10.type === t6.PROPERTY) {
        if (t7 === o15[l6])
          return T2;
      } else if (i10.type === t6.BOOLEAN_ATTRIBUTE) {
        if (!!t7 === o15.hasAttribute(l6))
          return T2;
      } else if (i10.type === t6.ATTRIBUTE && o15.getAttribute(l6) === t7 + "")
        return T2;
      return m3(i10), t7;
    }
  });

  // node_modules/lit-html/directives/style-map.js
  var n10 = "important";
  var i9 = " !" + n10;
  var o13 = e8(class extends i7 {
    constructor(t7) {
      if (super(t7), t7.type !== t6.ATTRIBUTE || "style" !== t7.name || t7.strings?.length > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return Object.keys(t7).reduce((e11, r10) => {
        const s6 = t7[r10];
        return null == s6 ? e11 : e11 + `${r10 = r10.includes("-") ? r10 : r10.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s6};`;
      }, "");
    }
    update(e11, [r10]) {
      const { style: s6 } = e11.element;
      if (void 0 === this.ft)
        return this.ft = new Set(Object.keys(r10)), this.render(r10);
      for (const t7 of this.ft)
        null == r10[t7] && (this.ft.delete(t7), t7.includes("-") ? s6.removeProperty(t7) : s6[t7] = null);
      for (const t7 in r10) {
        const e12 = r10[t7];
        if (null != e12) {
          this.ft.add(t7);
          const r11 = "string" == typeof e12 && e12.endsWith(i9);
          t7.includes("-") || r11 ? s6.setProperty(t7, r11 ? e12.slice(0, -11) : e12, r11 ? n10 : "") : s6[t7] = e12;
        }
      }
      return T2;
    }
  });

  // node_modules/@material/web/internal/controller/string-converter.js
  var stringConverter = {
    fromAttribute(value2) {
      return value2 ?? "";
    },
    toAttribute(value2) {
      return value2 || null;
    }
  };

  // node_modules/@material/web/labs/behaviors/on-report-validity.js
  var onReportValidity = Symbol("onReportValidity");
  var privateCleanupFormListeners = Symbol("privateCleanupFormListeners");
  var privateDoNotReportInvalid = Symbol("privateDoNotReportInvalid");
  var privateIsSelfReportingValidity = Symbol("privateIsSelfReportingValidity");
  var privateCallOnReportValidity = Symbol("privateCallOnReportValidity");
  function mixinOnReportValidity(base) {
    var _a2, _b, _c;
    class OnReportValidityElement extends base {
      // Mixins must have a constructor with `...args: any[]`
      // tslint:disable-next-line:no-any
      constructor(...args) {
        super(...args);
        this[_a2] = new AbortController();
        this[_b] = false;
        this[_c] = false;
        if (o7) {
          return;
        }
        this.addEventListener("invalid", (invalidEvent) => {
          if (this[privateDoNotReportInvalid] || !invalidEvent.isTrusted) {
            return;
          }
          this.addEventListener("invalid", () => {
            this[privateCallOnReportValidity](invalidEvent);
          }, { once: true });
        }, {
          // Listen during the capture phase, which will happen before the
          // bubbling phase. That way, we can add a final event listener that
          // will run after other event listeners, and we can check if it was
          // default prevented. This works because invalid does not bubble.
          capture: true
        });
      }
      checkValidity() {
        this[privateDoNotReportInvalid] = true;
        const valid = super.checkValidity();
        this[privateDoNotReportInvalid] = false;
        return valid;
      }
      reportValidity() {
        this[privateIsSelfReportingValidity] = true;
        const valid = super.reportValidity();
        if (valid) {
          this[privateCallOnReportValidity](null);
        }
        this[privateIsSelfReportingValidity] = false;
        return valid;
      }
      [(_a2 = privateCleanupFormListeners, _b = privateDoNotReportInvalid, _c = privateIsSelfReportingValidity, privateCallOnReportValidity)](invalidEvent) {
        const wasCanceled = invalidEvent?.defaultPrevented;
        if (wasCanceled) {
          return;
        }
        this[onReportValidity](invalidEvent);
        const implementationCanceledFocus = !wasCanceled && invalidEvent?.defaultPrevented;
        if (!implementationCanceledFocus) {
          return;
        }
        if (this[privateIsSelfReportingValidity] || isFirstInvalidControlInForm(this[internals].form, this)) {
          this.focus();
        }
      }
      [onReportValidity](invalidEvent) {
        throw new Error("Implement [onReportValidity]");
      }
      formAssociatedCallback(form) {
        if (super.formAssociatedCallback) {
          super.formAssociatedCallback(form);
        }
        this[privateCleanupFormListeners].abort();
        if (!form) {
          return;
        }
        this[privateCleanupFormListeners] = new AbortController();
        addFormReportValidListener(this, form, () => {
          this[privateCallOnReportValidity](null);
        }, this[privateCleanupFormListeners].signal);
      }
    }
    return OnReportValidityElement;
  }
  function addFormReportValidListener(control, form, onControlValid, cleanup) {
    const validateHooks = getFormValidateHooks(form);
    let controlFiredInvalid = false;
    let cleanupInvalidListener;
    let isNextSubmitFromHook = false;
    validateHooks.addEventListener("before", () => {
      isNextSubmitFromHook = true;
      cleanupInvalidListener = new AbortController();
      controlFiredInvalid = false;
      control.addEventListener("invalid", () => {
        controlFiredInvalid = true;
      }, {
        signal: cleanupInvalidListener.signal
      });
    }, { signal: cleanup });
    validateHooks.addEventListener("after", () => {
      isNextSubmitFromHook = false;
      cleanupInvalidListener?.abort();
      if (controlFiredInvalid) {
        return;
      }
      onControlValid();
    }, { signal: cleanup });
    form.addEventListener("submit", () => {
      if (isNextSubmitFromHook) {
        return;
      }
      onControlValid();
    }, {
      signal: cleanup
    });
  }
  var FORM_VALIDATE_HOOKS = /* @__PURE__ */ new WeakMap();
  function getFormValidateHooks(form) {
    if (!FORM_VALIDATE_HOOKS.has(form)) {
      const hooks = new EventTarget();
      FORM_VALIDATE_HOOKS.set(form, hooks);
      for (const methodName of ["reportValidity", "requestSubmit"]) {
        const superMethod = form[methodName];
        form[methodName] = function() {
          hooks.dispatchEvent(new Event("before"));
          const result = Reflect.apply(superMethod, this, arguments);
          hooks.dispatchEvent(new Event("after"));
          return result;
        };
      }
    }
    return FORM_VALIDATE_HOOKS.get(form);
  }
  function isFirstInvalidControlInForm(form, control) {
    if (!form) {
      return true;
    }
    let firstInvalidControl;
    for (const element of form.elements) {
      if (element.matches(":invalid")) {
        firstInvalidControl = element;
        break;
      }
    }
    return firstInvalidControl === control;
  }

  // node_modules/@material/web/labs/behaviors/validators/text-field-validator.js
  var TextFieldValidator = class extends Validator {
    computeValidity({ state, renderedControl }) {
      let inputOrTextArea = renderedControl;
      if (isInputState(state) && !inputOrTextArea) {
        inputOrTextArea = this.inputControl || document.createElement("input");
        this.inputControl = inputOrTextArea;
      } else if (!inputOrTextArea) {
        inputOrTextArea = this.textAreaControl || document.createElement("textarea");
        this.textAreaControl = inputOrTextArea;
      }
      const input = isInputState(state) ? inputOrTextArea : null;
      if (input) {
        input.type = state.type;
      }
      if (inputOrTextArea.value !== state.value) {
        inputOrTextArea.value = state.value;
      }
      inputOrTextArea.required = state.required;
      if (input) {
        const inputState = state;
        if (inputState.pattern) {
          input.pattern = inputState.pattern;
        } else {
          input.removeAttribute("pattern");
        }
        if (inputState.min) {
          input.min = inputState.min;
        } else {
          input.removeAttribute("min");
        }
        if (inputState.max) {
          input.max = inputState.max;
        } else {
          input.removeAttribute("max");
        }
        if (inputState.step) {
          input.step = inputState.step;
        } else {
          input.removeAttribute("step");
        }
      }
      if ((state.minLength ?? -1) > -1) {
        inputOrTextArea.setAttribute("minlength", String(state.minLength));
      } else {
        inputOrTextArea.removeAttribute("minlength");
      }
      if ((state.maxLength ?? -1) > -1) {
        inputOrTextArea.setAttribute("maxlength", String(state.maxLength));
      } else {
        inputOrTextArea.removeAttribute("maxlength");
      }
      return {
        validity: inputOrTextArea.validity,
        validationMessage: inputOrTextArea.validationMessage
      };
    }
    equals({ state: prev }, { state: next }) {
      const inputOrTextAreaEqual = prev.type === next.type && prev.value === next.value && prev.required === next.required && prev.minLength === next.minLength && prev.maxLength === next.maxLength;
      if (!isInputState(prev) || !isInputState(next)) {
        return inputOrTextAreaEqual;
      }
      return inputOrTextAreaEqual && prev.pattern === next.pattern && prev.min === next.min && prev.max === next.max && prev.step === next.step;
    }
    copy({ state }) {
      return {
        state: isInputState(state) ? this.copyInput(state) : this.copyTextArea(state),
        renderedControl: null
      };
    }
    copyInput(state) {
      const { type, pattern, min, max, step } = state;
      return {
        ...this.copySharedState(state),
        type,
        pattern,
        min,
        max,
        step
      };
    }
    copyTextArea(state) {
      return {
        ...this.copySharedState(state),
        type: state.type
      };
    }
    copySharedState({ value: value2, required, minLength, maxLength }) {
      return { value: value2, required, minLength, maxLength };
    }
  };
  function isInputState(state) {
    return state.type !== "textarea";
  }

  // node_modules/@material/web/textfield/internal/text-field.js
  var textFieldBaseClass = mixinOnReportValidity(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i6))));
  var TextField = class extends textFieldBaseClass {
    constructor() {
      super(...arguments);
      this.error = false;
      this.errorText = "";
      this.label = "";
      this.noAsterisk = false;
      this.required = false;
      this.value = "";
      this.prefixText = "";
      this.suffixText = "";
      this.hasLeadingIcon = false;
      this.hasTrailingIcon = false;
      this.supportingText = "";
      this.textDirection = "";
      this.rows = 2;
      this.cols = 20;
      this.inputMode = "";
      this.max = "";
      this.maxLength = -1;
      this.min = "";
      this.minLength = -1;
      this.noSpinner = false;
      this.pattern = "";
      this.placeholder = "";
      this.readOnly = false;
      this.multiple = false;
      this.step = "";
      this.type = "text";
      this.autocomplete = "";
      this.dirty = false;
      this.focused = false;
      this.nativeError = false;
      this.nativeErrorText = "";
    }
    /**
     * Gets or sets the direction in which selection occurred.
     */
    get selectionDirection() {
      return this.getInputOrTextarea().selectionDirection;
    }
    set selectionDirection(value2) {
      this.getInputOrTextarea().selectionDirection = value2;
    }
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    get selectionEnd() {
      return this.getInputOrTextarea().selectionEnd;
    }
    set selectionEnd(value2) {
      this.getInputOrTextarea().selectionEnd = value2;
    }
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    get selectionStart() {
      return this.getInputOrTextarea().selectionStart;
    }
    set selectionStart(value2) {
      this.getInputOrTextarea().selectionStart = value2;
    }
    /**
     * The text field's value as a number.
     */
    get valueAsNumber() {
      const input = this.getInput();
      if (!input) {
        return NaN;
      }
      return input.valueAsNumber;
    }
    set valueAsNumber(value2) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.valueAsNumber = value2;
      this.value = input.value;
    }
    /**
     * The text field's value as a Date.
     */
    get valueAsDate() {
      const input = this.getInput();
      if (!input) {
        return null;
      }
      return input.valueAsDate;
    }
    set valueAsDate(value2) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.valueAsDate = value2;
      this.value = input.value;
    }
    get hasError() {
      return this.error || this.nativeError;
    }
    /**
     * Selects all the text in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
     */
    select() {
      this.getInputOrTextarea().select();
    }
    setRangeText(...args) {
      this.getInputOrTextarea().setRangeText(...args);
      this.value = this.getInputOrTextarea().value;
    }
    /**
     * Sets the start and end positions of a selection in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
     *
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start, end, direction) {
      this.getInputOrTextarea().setSelectionRange(start, end, direction);
    }
    /**
     * Decrements the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
     *
     * @param stepDecrement The number of steps to decrement, defaults to 1.
     */
    stepDown(stepDecrement) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.stepDown(stepDecrement);
      this.value = input.value;
    }
    /**
     * Increments the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
     *
     * @param stepIncrement The number of steps to increment, defaults to 1.
     */
    stepUp(stepIncrement) {
      const input = this.getInput();
      if (!input) {
        return;
      }
      input.stepUp(stepIncrement);
      this.value = input.value;
    }
    /**
     * Reset the text field to its default value.
     */
    reset() {
      this.dirty = false;
      this.value = this.getAttribute("value") ?? "";
      this.nativeError = false;
      this.nativeErrorText = "";
    }
    attributeChangedCallback(attribute, newValue, oldValue) {
      if (attribute === "value" && this.dirty) {
        return;
      }
      super.attributeChangedCallback(attribute, newValue, oldValue);
    }
    render() {
      const classes = {
        "disabled": this.disabled,
        "error": !this.disabled && this.hasError,
        "textarea": this.type === "textarea",
        "no-spinner": this.noSpinner
      };
      return x`
      <span class="text-field ${e10(classes)}">
        ${this.renderField()}
      </span>
    `;
    }
    updated(changedProperties) {
      const value2 = this.getInputOrTextarea().value;
      if (this.value !== value2) {
        this.value = value2;
      }
    }
    renderField() {
      return u5`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type === "textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
    </${this.fieldTag}>`;
    }
    renderLeadingIcon() {
      return x`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
    }
    renderTrailingIcon() {
      return x`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
    }
    renderInputOrTextarea() {
      const style = { "direction": this.textDirection };
      const ariaLabel = this.ariaLabel || this.label || E2;
      const autocomplete = this.autocomplete;
      const hasMaxLength = (this.maxLength ?? -1) > -1;
      const hasMinLength = (this.minLength ?? -1) > -1;
      if (this.type === "textarea") {
        return x`
        <textarea
          class="input"
          style=${o13(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || E2}
          name=${this.name || E2}
          ?disabled=${this.disabled}
          maxlength=${hasMaxLength ? this.maxLength : E2}
          minlength=${hasMinLength ? this.minLength : E2}
          placeholder=${this.placeholder || E2}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${l5(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;
      }
      const prefix = this.renderPrefix();
      const suffix = this.renderSuffix();
      const inputMode = this.inputMode;
      return x`
      <div class="input-wrapper">
        ${prefix}
        <input
          class="input"
          style=${o13(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || E2}
          name=${this.name || E2}
          ?disabled=${this.disabled}
          inputmode=${inputMode || E2}
          max=${this.max || E2}
          maxlength=${hasMaxLength ? this.maxLength : E2}
          min=${this.min || E2}
          minlength=${hasMinLength ? this.minLength : E2}
          pattern=${this.pattern || E2}
          placeholder=${this.placeholder || E2}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step || E2}
          type=${this.type}
          .value=${l5(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${suffix}
      </div>
    `;
    }
    renderPrefix() {
      return this.renderAffix(
        this.prefixText,
        /* isSuffix */
        false
      );
    }
    renderSuffix() {
      return this.renderAffix(
        this.suffixText,
        /* isSuffix */
        true
      );
    }
    renderAffix(text2, isSuffix) {
      if (!text2) {
        return E2;
      }
      const classes = {
        "suffix": isSuffix,
        "prefix": !isSuffix
      };
      return x`<span class="${e10(classes)}">${text2}</span>`;
    }
    getErrorText() {
      return this.error ? this.errorText : this.nativeErrorText;
    }
    handleFocusChange() {
      this.focused = this.inputOrTextarea?.matches(":focus") ?? false;
    }
    handleInput(event) {
      this.dirty = true;
      this.value = event.target.value;
    }
    redispatchEvent(event) {
      redispatchEvent(this, event);
    }
    getInputOrTextarea() {
      if (!this.inputOrTextarea) {
        this.connectedCallback();
        this.scheduleUpdate();
      }
      if (this.isUpdatePending) {
        this.scheduleUpdate();
      }
      return this.inputOrTextarea;
    }
    getInput() {
      if (this.type === "textarea") {
        return null;
      }
      return this.getInputOrTextarea();
    }
    handleIconChange() {
      this.hasLeadingIcon = this.leadingIcons.length > 0;
      this.hasTrailingIcon = this.trailingIcons.length > 0;
    }
    [getFormValue]() {
      return this.value;
    }
    formResetCallback() {
      this.reset();
    }
    formStateRestoreCallback(state) {
      this.value = state;
    }
    focus() {
      this.getInputOrTextarea().focus();
    }
    [createValidator]() {
      return new TextFieldValidator(() => ({
        state: this,
        renderedControl: this.inputOrTextarea
      }));
    }
    [getValidityAnchor]() {
      return this.inputOrTextarea;
    }
    [onReportValidity](invalidEvent) {
      invalidEvent?.preventDefault();
      const prevMessage = this.getErrorText();
      this.nativeError = !!invalidEvent;
      this.nativeErrorText = this.validationMessage;
      if (prevMessage === this.getErrorText()) {
        this.field?.reannounceError();
      }
    }
  };
  (() => {
    requestUpdateOnAriaChange(TextField);
  })();
  TextField.shadowRootOptions = {
    ...i6.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], TextField.prototype, "error", void 0);
  __decorate2([
    n5({ attribute: "error-text" })
  ], TextField.prototype, "errorText", void 0);
  __decorate2([
    n5()
  ], TextField.prototype, "label", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "no-asterisk" })
  ], TextField.prototype, "noAsterisk", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], TextField.prototype, "required", void 0);
  __decorate2([
    n5()
  ], TextField.prototype, "value", void 0);
  __decorate2([
    n5({ attribute: "prefix-text" })
  ], TextField.prototype, "prefixText", void 0);
  __decorate2([
    n5({ attribute: "suffix-text" })
  ], TextField.prototype, "suffixText", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "has-leading-icon" })
  ], TextField.prototype, "hasLeadingIcon", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "has-trailing-icon" })
  ], TextField.prototype, "hasTrailingIcon", void 0);
  __decorate2([
    n5({ attribute: "supporting-text" })
  ], TextField.prototype, "supportingText", void 0);
  __decorate2([
    n5({ attribute: "text-direction" })
  ], TextField.prototype, "textDirection", void 0);
  __decorate2([
    n5({ type: Number })
  ], TextField.prototype, "rows", void 0);
  __decorate2([
    n5({ type: Number })
  ], TextField.prototype, "cols", void 0);
  __decorate2([
    n5({ reflect: true })
  ], TextField.prototype, "inputMode", void 0);
  __decorate2([
    n5()
  ], TextField.prototype, "max", void 0);
  __decorate2([
    n5({ type: Number })
  ], TextField.prototype, "maxLength", void 0);
  __decorate2([
    n5()
  ], TextField.prototype, "min", void 0);
  __decorate2([
    n5({ type: Number })
  ], TextField.prototype, "minLength", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "no-spinner" })
  ], TextField.prototype, "noSpinner", void 0);
  __decorate2([
    n5()
  ], TextField.prototype, "pattern", void 0);
  __decorate2([
    n5({ reflect: true, converter: stringConverter })
  ], TextField.prototype, "placeholder", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], TextField.prototype, "readOnly", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], TextField.prototype, "multiple", void 0);
  __decorate2([
    n5()
  ], TextField.prototype, "step", void 0);
  __decorate2([
    n5({ reflect: true })
  ], TextField.prototype, "type", void 0);
  __decorate2([
    n5({ reflect: true })
  ], TextField.prototype, "autocomplete", void 0);
  __decorate2([
    r6()
  ], TextField.prototype, "dirty", void 0);
  __decorate2([
    r6()
  ], TextField.prototype, "focused", void 0);
  __decorate2([
    r6()
  ], TextField.prototype, "nativeError", void 0);
  __decorate2([
    r6()
  ], TextField.prototype, "nativeErrorText", void 0);
  __decorate2([
    e6(".input")
  ], TextField.prototype, "inputOrTextarea", void 0);
  __decorate2([
    e6(".field")
  ], TextField.prototype, "field", void 0);
  __decorate2([
    o9({ slot: "leading-icon" })
  ], TextField.prototype, "leadingIcons", void 0);
  __decorate2([
    o9({ slot: "trailing-icon" })
  ], TextField.prototype, "trailingIcons", void 0);

  // node_modules/@material/web/textfield/internal/outlined-text-field.js
  var OutlinedTextField = class extends TextField {
    constructor() {
      super(...arguments);
      this.fieldTag = i8`md-outlined-field`;
    }
  };

  // node_modules/@material/web/textfield/internal/shared-styles.js
  var styles7 = i3`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}.icon{color:currentColor;display:flex;fill:currentColor}.icon ::slotted(*){display:flex}[hasstart] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[hasend] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;

  // node_modules/@material/web/textfield/outlined-text-field.js
  var MdOutlinedTextField = class MdOutlinedTextField2 extends OutlinedTextField {
    constructor() {
      super(...arguments);
      this.fieldTag = i8`md-outlined-field`;
    }
  };
  MdOutlinedTextField.styles = [styles7, styles6];
  MdOutlinedTextField = __decorate2([
    t4("md-outlined-text-field")
  ], MdOutlinedTextField);

  // node_modules/@jsfe/material/dist/esm/widgets/date.js
  var date = (options) => x`
	<md-outlined-text-field
		.type=${options.type}
		.supportingText=${options.helpText ?? ""}
		.id=${options.id}
		.label=${options.label ?? ""}
		.name=${options.id}
		.placeholder=${options.placeholder ?? ""}
		.required=${options.required ?? false}
		.value=${options.value ? String(options.value) : ""}
		@input=${(event) => {
    const { valueAsDate: newValue } = event.target;
    if (newValue)
      options.valueChangedCallback?.(newValue);
  }}
		@keydown=${options.handleKeydown}
	>
	</md-outlined-text-field>
	<style>
		md-outlined-text-field {
			width: 100%;
		}
	</style>
`;

  // node_modules/lit-html/directives/if-defined.js
  var o14 = (o15) => o15 ?? E2;

  // node_modules/@jsfe/material/dist/esm/widgets/number.js
  var number = (options) => x`
	<md-outlined-text-field
		.type=${"number"}
		.supportingText=${options.helpText}
		.id=${options.id}
		.label=${options.label}
		step=${o14(options.step)}
		min=${o14(options.min)}
		max=${o14(options.max)}
		.name=${options.id}
		.placeholder=${options.placeholder}
		.required=${options.required}
		value=${o14(options.value)}
		@input=${(event) => {
    const { valueAsNumber: newValue } = event.target;
    options.valueChangedCallback?.(newValue);
  }}
		@keydown=${options.handleKeydown}
	>
	</md-outlined-text-field>
`;

  // node_modules/@material/web/elevation/internal/elevation.js
  var Elevation = class extends i6 {
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    render() {
      return x`<span class="shadow"></span>`;
    }
  };

  // node_modules/@material/web/elevation/internal/elevation-styles.js
  var styles8 = i3`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;

  // node_modules/@material/web/elevation/elevation.js
  var MdElevation = class MdElevation2 extends Elevation {
  };
  MdElevation.styles = [styles8];
  MdElevation = __decorate2([
    t4("md-elevation")
  ], MdElevation);

  // node_modules/@jsfe/material/dist/esm/widgets/object.js
  var object = (options) => {
    return x`
		<fieldset
			id=${options.id}
			class="theme-material widget-object widget-fieldset"
			part="object"
		>
			<md-elevation></md-elevation>
			<!--  -->
			${options.label ? x`<legend>${options.label}</legend>` : E2}
			<!-- -->
			${options.helpText ? x`<p class="widget-object__description">${options.helpText}</p>` : E2}
			<!--  -->
			${options.children}
		</fieldset>
	`;
  };

  // node_modules/@material/web/slider/internal/forced-colors-styles.js
  var styles9 = i3`@media(forced-colors: active){:host{--md-slider-active-track-color: CanvasText;--md-slider-disabled-active-track-color: GrayText;--md-slider-disabled-active-track-opacity: 1;--md-slider-disabled-handle-color: GrayText;--md-slider-disabled-inactive-track-color: GrayText;--md-slider-disabled-inactive-track-opacity: 1;--md-slider-focus-handle-color: CanvasText;--md-slider-handle-color: CanvasText;--md-slider-handle-shadow-color: Canvas;--md-slider-hover-handle-color: CanvasText;--md-slider-hover-state-layer-color: Canvas;--md-slider-hover-state-layer-opacity: 1;--md-slider-inactive-track-color: Canvas;--md-slider-label-container-color: Canvas;--md-slider-label-text-color: CanvasText;--md-slider-pressed-handle-color: CanvasText;--md-slider-pressed-state-layer-color: Canvas;--md-slider-pressed-state-layer-opacity: 1;--md-slider-with-overlap-handle-outline-color: CanvasText}.label,.label::before{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}:host(:not([disabled])) .track::before{border:1px solid var(--_active-track-color)}.tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='CanvasText'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}.tickmarks::after{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/svg%3E")}:host([disabled]) .tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}}
`;

  // node_modules/lit-html/directives/when.js
  function n11(n12, r10, t7) {
    return n12 ? r10(n12) : t7?.(n12);
  }

  // node_modules/@material/web/slider/internal/slider.js
  var sliderBaseClass = mixinFormAssociated(mixinElementInternals(i6));
  var Slider = class extends sliderBaseClass {
    /**
     * The HTML name to use in form submission for a range slider's starting
     * value. Use `name` instead if both the start and end values should use the
     * same name.
     */
    get nameStart() {
      return this.getAttribute("name-start") ?? this.name;
    }
    set nameStart(name) {
      this.setAttribute("name-start", name);
    }
    /**
     * The HTML name to use in form submission for a range slider's ending value.
     * Use `name` instead if both the start and end values should use the same
     * name.
     */
    get nameEnd() {
      return this.getAttribute("name-end") ?? this.nameStart;
    }
    set nameEnd(name) {
      this.setAttribute("name-end", name);
    }
    // Note: start aria-* properties are only applied when range=true, which is
    // why they do not need to handle both cases.
    get renderAriaLabelStart() {
      const { ariaLabel } = this;
      return this.ariaLabelStart || ariaLabel && `${ariaLabel} start` || this.valueLabelStart || String(this.valueStart);
    }
    get renderAriaValueTextStart() {
      return this.ariaValueTextStart || this.valueLabelStart || String(this.valueStart);
    }
    // Note: end aria-* properties are applied for single and range sliders, which
    // is why it needs to handle `this.range` (while start aria-* properties do
    // not).
    get renderAriaLabelEnd() {
      const { ariaLabel } = this;
      if (this.range) {
        return this.ariaLabelEnd || ariaLabel && `${ariaLabel} end` || this.valueLabelEnd || String(this.valueEnd);
      }
      return ariaLabel || this.valueLabel || String(this.value);
    }
    get renderAriaValueTextEnd() {
      if (this.range) {
        return this.ariaValueTextEnd || this.valueLabelEnd || String(this.valueEnd);
      }
      const { ariaValueText } = this;
      return ariaValueText || this.valueLabel || String(this.value);
    }
    constructor() {
      super();
      this.min = 0;
      this.max = 100;
      this.valueLabel = "";
      this.valueLabelStart = "";
      this.valueLabelEnd = "";
      this.ariaLabelStart = "";
      this.ariaValueTextStart = "";
      this.ariaLabelEnd = "";
      this.ariaValueTextEnd = "";
      this.step = 1;
      this.ticks = false;
      this.labeled = false;
      this.range = false;
      this.handleStartHover = false;
      this.handleEndHover = false;
      this.startOnTop = false;
      this.handlesOverlapping = false;
      this.ripplePointerId = 1;
      this.isRedispatchingEvent = false;
      if (!o7) {
        this.addEventListener("click", (event) => {
          if (!isActivationClick(event) || !this.inputEnd) {
            return;
          }
          this.focus();
          dispatchActivationClick(this.inputEnd);
        });
      }
    }
    focus() {
      this.inputEnd?.focus();
    }
    willUpdate(changed) {
      this.renderValueStart = changed.has("valueStart") ? this.valueStart : this.inputStart?.valueAsNumber;
      const endValueChanged = changed.has("valueEnd") && this.range || changed.has("value");
      this.renderValueEnd = endValueChanged ? this.range ? this.valueEnd : this.value : this.inputEnd?.valueAsNumber;
      if (changed.get("handleStartHover") !== void 0) {
        this.toggleRippleHover(this.rippleStart, this.handleStartHover);
      } else if (changed.get("handleEndHover") !== void 0) {
        this.toggleRippleHover(this.rippleEnd, this.handleEndHover);
      }
    }
    updated(changed) {
      if (this.range) {
        this.renderValueStart = this.inputStart.valueAsNumber;
      }
      this.renderValueEnd = this.inputEnd.valueAsNumber;
      if (this.range) {
        const segment = (this.max - this.min) / 3;
        if (this.valueStart === void 0) {
          this.inputStart.valueAsNumber = this.min + segment;
          const v3 = this.inputStart.valueAsNumber;
          this.valueStart = this.renderValueStart = v3;
        }
        if (this.valueEnd === void 0) {
          this.inputEnd.valueAsNumber = this.min + 2 * segment;
          const v3 = this.inputEnd.valueAsNumber;
          this.valueEnd = this.renderValueEnd = v3;
        }
      } else {
        this.value ?? (this.value = this.renderValueEnd);
      }
      if (changed.has("range") || changed.has("renderValueStart") || changed.has("renderValueEnd") || this.isUpdatePending) {
        const startNub = this.handleStart?.querySelector(".handleNub");
        const endNub = this.handleEnd?.querySelector(".handleNub");
        this.handlesOverlapping = isOverlapping(startNub, endNub);
      }
      this.performUpdate();
    }
    render() {
      const step = this.step === 0 ? 1 : this.step;
      const range2 = Math.max(this.max - this.min, step);
      const startFraction = this.range ? ((this.renderValueStart ?? this.min) - this.min) / range2 : 0;
      const endFraction = ((this.renderValueEnd ?? this.min) - this.min) / range2;
      const containerStyles = {
        // for clipping inputs and active track.
        "--_start-fraction": String(startFraction),
        "--_end-fraction": String(endFraction),
        // for generating tick marks
        "--_tick-count": String(range2 / step)
      };
      const containerClasses = { ranged: this.range };
      const labelStart = this.valueLabelStart || String(this.renderValueStart);
      const labelEnd = (this.range ? this.valueLabelEnd : this.valueLabel) || String(this.renderValueEnd);
      const inputStartProps = {
        start: true,
        value: this.renderValueStart,
        ariaLabel: this.renderAriaLabelStart,
        ariaValueText: this.renderAriaValueTextStart,
        ariaMin: this.min,
        ariaMax: this.valueEnd ?? this.max
      };
      const inputEndProps = {
        start: false,
        value: this.renderValueEnd,
        ariaLabel: this.renderAriaLabelEnd,
        ariaValueText: this.renderAriaValueTextEnd,
        ariaMin: this.range ? this.valueStart ?? this.min : this.min,
        ariaMax: this.max
      };
      const handleStartProps = {
        start: true,
        hover: this.handleStartHover,
        label: labelStart
      };
      const handleEndProps = {
        start: false,
        hover: this.handleEndHover,
        label: labelEnd
      };
      const handleContainerClasses = {
        hover: this.handleStartHover || this.handleEndHover
      };
      return x` <div
      class="container ${e10(containerClasses)}"
      style=${o13(containerStyles)}>
      ${n11(this.range, () => this.renderInput(inputStartProps))}
      ${this.renderInput(inputEndProps)} ${this.renderTrack()}
      <div class="handleContainerPadded">
        <div class="handleContainerBlock">
          <div class="handleContainer ${e10(handleContainerClasses)}">
            ${n11(this.range, () => this.renderHandle(handleStartProps))}
            ${this.renderHandle(handleEndProps)}
          </div>
        </div>
      </div>
    </div>`;
    }
    renderTrack() {
      return x`
      <div class="track"></div>
      ${this.ticks ? x`<div class="tickmarks"></div>` : E2}
    `;
    }
    renderLabel(value2) {
      return x`<div class="label" aria-hidden="true">
      <span class="labelContent" part="label">${value2}</span>
    </div>`;
    }
    renderHandle({ start, hover, label }) {
      const onTop = !this.disabled && start === this.startOnTop;
      const isOverlapping2 = !this.disabled && this.handlesOverlapping;
      const name = start ? "start" : "end";
      return x`<div
      class="handle ${e10({
        [name]: true,
        hover,
        onTop,
        isOverlapping: isOverlapping2
      })}">
      <md-focus-ring part="focus-ring" for=${name}></md-focus-ring>
      <md-ripple
        for=${name}
        class=${name}
        ?disabled=${this.disabled}></md-ripple>
      <div class="handleNub">
        <md-elevation part="elevation"></md-elevation>
      </div>
      ${n11(this.labeled, () => this.renderLabel(label))}
    </div>`;
    }
    renderInput({ start, value: value2, ariaLabel, ariaValueText, ariaMin, ariaMax }) {
      const name = start ? `start` : `end`;
      return x`<input
      type="range"
      class="${e10({
        start,
        end: !start
      })}"
      @focus=${this.handleFocus}
      @pointerdown=${this.handleDown}
      @pointerup=${this.handleUp}
      @pointerenter=${this.handleEnter}
      @pointermove=${this.handleMove}
      @pointerleave=${this.handleLeave}
      @keydown=${this.handleKeydown}
      @keyup=${this.handleKeyup}
      @input=${this.handleInput}
      @change=${this.handleChange}
      id=${name}
      .disabled=${this.disabled}
      .min=${String(this.min)}
      aria-valuemin=${ariaMin}
      .max=${String(this.max)}
      aria-valuemax=${ariaMax}
      .step=${String(this.step)}
      .value=${String(value2)}
      .tabIndex=${start ? 1 : 0}
      aria-label=${ariaLabel || E2}
      aria-valuetext=${ariaValueText} />`;
    }
    async toggleRippleHover(ripple, hovering) {
      const rippleEl = await ripple;
      if (!rippleEl) {
        return;
      }
      if (hovering) {
        rippleEl.handlePointerenter(new PointerEvent("pointerenter", {
          isPrimary: true,
          pointerId: this.ripplePointerId
        }));
      } else {
        rippleEl.handlePointerleave(new PointerEvent("pointerleave", {
          isPrimary: true,
          pointerId: this.ripplePointerId
        }));
      }
    }
    handleFocus(event) {
      this.updateOnTop(event.target);
    }
    startAction(event) {
      const target = event.target;
      const fixed = target === this.inputStart ? this.inputEnd : this.inputStart;
      this.action = {
        canFlip: event.type === "pointerdown",
        flipped: false,
        target,
        fixed,
        values: /* @__PURE__ */ new Map([
          [target, target.valueAsNumber],
          [fixed, fixed?.valueAsNumber]
        ])
      };
    }
    finishAction(event) {
      this.action = void 0;
    }
    handleKeydown(event) {
      this.startAction(event);
    }
    handleKeyup(event) {
      this.finishAction(event);
    }
    handleDown(event) {
      this.startAction(event);
      this.ripplePointerId = event.pointerId;
      const isStart = event.target === this.inputStart;
      this.handleStartHover = !this.disabled && isStart && Boolean(this.handleStart);
      this.handleEndHover = !this.disabled && !isStart && Boolean(this.handleEnd);
    }
    async handleUp(event) {
      if (!this.action) {
        return;
      }
      const { target, values, flipped } = this.action;
      await new Promise(requestAnimationFrame);
      if (target !== void 0) {
        target.focus();
        if (flipped && target.valueAsNumber !== values.get(target)) {
          target.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
      this.finishAction(event);
    }
    /**
     * The move handler tracks handle hovering to facilitate proper ripple
     * behavior on the slider handle. This is needed because user interaction with
     * the native input is leveraged to position the handle. Because the separate
     * displayed handle element has pointer events disabled (to allow interaction
     * with the input) and the input's handle is a pseudo-element, neither can be
     * the ripple's interactive element. Therefore the input is the ripple's
     * interactive element and has a `ripple` directive; however the ripple
     * is gated on the handle being hovered. In addition, because the ripple
     * hover state is being specially handled, it must be triggered independent
     * of the directive. This is done based on the hover state when the
     * slider is updated.
     */
    handleMove(event) {
      this.handleStartHover = !this.disabled && inBounds(event, this.handleStart);
      this.handleEndHover = !this.disabled && inBounds(event, this.handleEnd);
    }
    handleEnter(event) {
      this.handleMove(event);
    }
    handleLeave() {
      this.handleStartHover = false;
      this.handleEndHover = false;
    }
    updateOnTop(input) {
      this.startOnTop = input.classList.contains("start");
    }
    needsClamping() {
      if (!this.action) {
        return false;
      }
      const { target, fixed } = this.action;
      const isStart = target === this.inputStart;
      return isStart ? target.valueAsNumber > fixed.valueAsNumber : target.valueAsNumber < fixed.valueAsNumber;
    }
    // if start/end start coincident and the first drag input would e.g. move
    // start > end, avoid clamping and "flip" to use the other input
    // as the action target.
    isActionFlipped() {
      const { action } = this;
      if (!action) {
        return false;
      }
      const { target, fixed, values } = action;
      if (action.canFlip) {
        const coincident = values.get(target) === values.get(fixed);
        if (coincident && this.needsClamping()) {
          action.canFlip = false;
          action.flipped = true;
          action.target = fixed;
          action.fixed = target;
        }
      }
      return action.flipped;
    }
    // when flipped, apply the drag input to the flipped target and reset
    // the actual target.
    flipAction() {
      if (!this.action) {
        return false;
      }
      const { target, fixed, values } = this.action;
      const changed = target.valueAsNumber !== fixed.valueAsNumber;
      target.valueAsNumber = fixed.valueAsNumber;
      fixed.valueAsNumber = values.get(fixed);
      return changed;
    }
    // clamp such that start does not move beyond end and visa versa.
    clampAction() {
      if (!this.needsClamping() || !this.action) {
        return false;
      }
      const { target, fixed } = this.action;
      target.valueAsNumber = fixed.valueAsNumber;
      return true;
    }
    handleInput(event) {
      if (this.isRedispatchingEvent) {
        return;
      }
      let stopPropagation = false;
      let redispatch = false;
      if (this.range) {
        if (this.isActionFlipped()) {
          stopPropagation = true;
          redispatch = this.flipAction();
        }
        if (this.clampAction()) {
          stopPropagation = true;
          redispatch = false;
        }
      }
      const target = event.target;
      this.updateOnTop(target);
      if (this.range) {
        this.valueStart = this.inputStart.valueAsNumber;
        this.valueEnd = this.inputEnd.valueAsNumber;
      } else {
        this.value = this.inputEnd.valueAsNumber;
      }
      if (stopPropagation) {
        event.stopPropagation();
      }
      if (redispatch) {
        this.isRedispatchingEvent = true;
        redispatchEvent(target, event);
        this.isRedispatchingEvent = false;
      }
    }
    handleChange(event) {
      const changeTarget = event.target;
      const { target, values } = this.action ?? {};
      const squelch = target && target.valueAsNumber === values.get(changeTarget);
      if (!squelch) {
        redispatchEvent(this, event);
      }
      this.finishAction(event);
    }
    [getFormValue]() {
      if (this.range) {
        const data = new FormData();
        data.append(this.nameStart, String(this.valueStart));
        data.append(this.nameEnd, String(this.valueEnd));
        return data;
      }
      return String(this.value);
    }
    formResetCallback() {
      if (this.range) {
        const valueStart = this.getAttribute("value-start");
        this.valueStart = valueStart !== null ? Number(valueStart) : void 0;
        const valueEnd = this.getAttribute("value-end");
        this.valueEnd = valueEnd !== null ? Number(valueEnd) : void 0;
        return;
      }
      const value2 = this.getAttribute("value");
      this.value = value2 !== null ? Number(value2) : void 0;
    }
    formStateRestoreCallback(state) {
      if (Array.isArray(state)) {
        const [[, valueStart], [, valueEnd]] = state;
        this.valueStart = Number(valueStart);
        this.valueEnd = Number(valueEnd);
        this.range = true;
        return;
      }
      this.value = Number(state);
      this.range = false;
    }
  };
  (() => {
    requestUpdateOnAriaChange(Slider);
  })();
  Slider.shadowRootOptions = {
    ...i6.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate2([
    n5({ type: Number })
  ], Slider.prototype, "min", void 0);
  __decorate2([
    n5({ type: Number })
  ], Slider.prototype, "max", void 0);
  __decorate2([
    n5({ type: Number })
  ], Slider.prototype, "value", void 0);
  __decorate2([
    n5({ type: Number, attribute: "value-start" })
  ], Slider.prototype, "valueStart", void 0);
  __decorate2([
    n5({ type: Number, attribute: "value-end" })
  ], Slider.prototype, "valueEnd", void 0);
  __decorate2([
    n5({ attribute: "value-label" })
  ], Slider.prototype, "valueLabel", void 0);
  __decorate2([
    n5({ attribute: "value-label-start" })
  ], Slider.prototype, "valueLabelStart", void 0);
  __decorate2([
    n5({ attribute: "value-label-end" })
  ], Slider.prototype, "valueLabelEnd", void 0);
  __decorate2([
    n5({ attribute: "aria-label-start" })
  ], Slider.prototype, "ariaLabelStart", void 0);
  __decorate2([
    n5({ attribute: "aria-valuetext-start" })
  ], Slider.prototype, "ariaValueTextStart", void 0);
  __decorate2([
    n5({ attribute: "aria-label-end" })
  ], Slider.prototype, "ariaLabelEnd", void 0);
  __decorate2([
    n5({ attribute: "aria-valuetext-end" })
  ], Slider.prototype, "ariaValueTextEnd", void 0);
  __decorate2([
    n5({ type: Number })
  ], Slider.prototype, "step", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Slider.prototype, "ticks", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Slider.prototype, "labeled", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Slider.prototype, "range", void 0);
  __decorate2([
    e6("input.start")
  ], Slider.prototype, "inputStart", void 0);
  __decorate2([
    e6(".handle.start")
  ], Slider.prototype, "handleStart", void 0);
  __decorate2([
    r8("md-ripple.start")
  ], Slider.prototype, "rippleStart", void 0);
  __decorate2([
    e6("input.end")
  ], Slider.prototype, "inputEnd", void 0);
  __decorate2([
    e6(".handle.end")
  ], Slider.prototype, "handleEnd", void 0);
  __decorate2([
    r8("md-ripple.end")
  ], Slider.prototype, "rippleEnd", void 0);
  __decorate2([
    r6()
  ], Slider.prototype, "handleStartHover", void 0);
  __decorate2([
    r6()
  ], Slider.prototype, "handleEndHover", void 0);
  __decorate2([
    r6()
  ], Slider.prototype, "startOnTop", void 0);
  __decorate2([
    r6()
  ], Slider.prototype, "handlesOverlapping", void 0);
  __decorate2([
    r6()
  ], Slider.prototype, "renderValueStart", void 0);
  __decorate2([
    r6()
  ], Slider.prototype, "renderValueEnd", void 0);
  function inBounds({ x: x2, y: y4 }, element) {
    if (!element) {
      return false;
    }
    const { top, left, bottom, right } = element.getBoundingClientRect();
    return x2 >= left && x2 <= right && y4 >= top && y4 <= bottom;
  }
  function isOverlapping(elA, elB) {
    if (!(elA && elB)) {
      return false;
    }
    const a5 = elA.getBoundingClientRect();
    const b4 = elB.getBoundingClientRect();
    return !(a5.top > b4.bottom || a5.right < b4.left || a5.bottom < b4.top || a5.left > b4.right);
  }

  // node_modules/@material/web/slider/internal/slider-styles.js
  var styles10 = i3`:host{--_active-track-color: var(--md-slider-active-track-color, var(--md-sys-color-primary, #6750a4));--_active-track-height: var(--md-slider-active-track-height, 4px);--_active-track-shape: var(--md-slider-active-track-shape, var(--md-sys-shape-corner-full, 9999px));--_disabled-active-track-color: var(--md-slider-disabled-active-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-track-opacity: var(--md-slider-disabled-active-track-opacity, 0.38);--_disabled-handle-color: var(--md-slider-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-handle-elevation: var(--md-slider-disabled-handle-elevation, 0);--_disabled-inactive-track-color: var(--md-slider-disabled-inactive-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-inactive-track-opacity: var(--md-slider-disabled-inactive-track-opacity, 0.12);--_focus-handle-color: var(--md-slider-focus-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-color: var(--md-slider-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-elevation: var(--md-slider-handle-elevation, 1);--_handle-height: var(--md-slider-handle-height, 20px);--_handle-shadow-color: var(--md-slider-handle-shadow-color, var(--md-sys-color-shadow, #000));--_handle-shape: var(--md-slider-handle-shape, var(--md-sys-shape-corner-full, 9999px));--_handle-width: var(--md-slider-handle-width, 20px);--_hover-handle-color: var(--md-slider-hover-handle-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-slider-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-slider-hover-state-layer-opacity, 0.08);--_inactive-track-color: var(--md-slider-inactive-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_inactive-track-height: var(--md-slider-inactive-track-height, 4px);--_inactive-track-shape: var(--md-slider-inactive-track-shape, var(--md-sys-shape-corner-full, 9999px));--_label-container-color: var(--md-slider-label-container-color, var(--md-sys-color-primary, #6750a4));--_label-container-height: var(--md-slider-label-container-height, 28px);--_pressed-handle-color: var(--md-slider-pressed-handle-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-slider-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-slider-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-slider-state-layer-size, 40px);--_with-overlap-handle-outline-color: var(--md-slider-with-overlap-handle-outline-color, var(--md-sys-color-on-primary, #fff));--_with-overlap-handle-outline-width: var(--md-slider-with-overlap-handle-outline-width, 1px);--_with-tick-marks-active-container-color: var(--md-slider-with-tick-marks-active-container-color, var(--md-sys-color-on-primary, #fff));--_with-tick-marks-container-size: var(--md-slider-with-tick-marks-container-size, 2px);--_with-tick-marks-disabled-container-color: var(--md-slider-with-tick-marks-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_with-tick-marks-inactive-container-color: var(--md-slider-with-tick-marks-inactive-container-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-slider-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-slider-label-text-font, var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-slider-label-text-line-height, var(--md-sys-typescale-label-medium-line-height, 1rem));--_label-text-size: var(--md-slider-label-text-size, var(--md-sys-typescale-label-medium-size, 0.75rem));--_label-text-weight: var(--md-slider-label-text-weight, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)));--_start-fraction: 0;--_end-fraction: 0;--_tick-count: 0;display:inline-flex;vertical-align:middle;min-inline-size:200px;--md-elevation-level: var(--_handle-elevation);--md-elevation-shadow-color: var(--_handle-shadow-color)}md-focus-ring{height:48px;inset:unset;width:48px}md-elevation{transition-duration:250ms}@media(prefers-reduced-motion){.label{transition-duration:0}}:host([disabled]){opacity:var(--_disabled-active-track-opacity);--md-elevation-level: var(--_disabled-handle-elevation)}.container{flex:1;display:flex;align-items:center;position:relative;block-size:var(--_state-layer-size);pointer-events:none;touch-action:none}.track,.tickmarks{position:absolute;inset:0;display:flex;align-items:center}.track::before,.tickmarks::before,.track::after,.tickmarks::after{position:absolute;content:"";inset-inline-start:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));inset-inline-end:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));background-size:calc((100% - var(--_with-tick-marks-container-size)*2)/var(--_tick-count)) 100%}.track::before,.tickmarks::before{block-size:var(--_inactive-track-height);border-radius:var(--_inactive-track-shape)}.track::before{background:var(--_inactive-track-color)}.tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-inactive-container-color) 0, var(--_with-tick-marks-inactive-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}:host([disabled]) .track::before{opacity:calc(1/var(--_disabled-active-track-opacity)*var(--_disabled-inactive-track-opacity));background:var(--_disabled-inactive-track-color)}.track::after,.tickmarks::after{block-size:var(--_active-track-height);border-radius:var(--_active-track-shape);clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))) 0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)))}.track::after{background:var(--_active-track-color)}.tickmarks::after{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-active-container-color) 0, var(--_with-tick-marks-active-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.track:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}.tickmarks:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}:host([disabled]) .track::after{background:var(--_disabled-active-track-color)}:host([disabled]) .tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-disabled-container-color) 0, var(--_with-tick-marks-disabled-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.handleContainerPadded{position:relative;block-size:100%;inline-size:100%;padding-inline:calc(var(--_state-layer-size)/2)}.handleContainerBlock{position:relative;block-size:100%;inline-size:100%}.handleContainer{position:absolute;inset-block-start:0;inset-block-end:0;inset-inline-start:calc(100%*var(--_start-fraction));inline-size:calc(100%*(var(--_end-fraction) - var(--_start-fraction)))}.handle{position:absolute;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);border-radius:var(--_handle-shape);display:flex;place-content:center;place-items:center}.handleNub{position:absolute;height:var(--_handle-height);width:var(--_handle-width);border-radius:var(--_handle-shape);background:var(--_handle-color)}:host([disabled]) .handleNub{background:var(--_disabled-handle-color)}input.end:focus~.handleContainerPadded .handle.end>.handleNub,input.start:focus~.handleContainerPadded .handle.start>.handleNub{background:var(--_focus-handle-color)}.container>.handleContainerPadded .handle.hover>.handleNub{background:var(--_hover-handle-color)}:host(:not([disabled])) input.end:active~.handleContainerPadded .handle.end>.handleNub,:host(:not([disabled])) input.start:active~.handleContainerPadded .handle.start>.handleNub{background:var(--_pressed-handle-color)}.onTop.isOverlapping .label,.onTop.isOverlapping .label::before{outline:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.onTop.isOverlapping .handleNub{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.handle.start{inset-inline-start:calc(0px - var(--_state-layer-size)/2)}.handle.end{inset-inline-end:calc(0px - var(--_state-layer-size)/2)}.label{position:absolute;box-sizing:border-box;display:flex;padding:4px;place-content:center;place-items:center;border-radius:var(--md-sys-shape-corner-full, 9999px);color:var(--_label-text-color);font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);inset-block-end:100%;min-inline-size:var(--_label-container-height);min-block-size:var(--_label-container-height);background:var(--_label-container-color);transition:transform 100ms cubic-bezier(0.2, 0, 0, 1);transform-origin:center bottom;transform:scale(0)}:host(:focus-within) .label,.handleContainer.hover .label,:where(:has(input:active)) .label{transform:scale(1)}.label::before,.label::after{position:absolute;display:block;content:"";background:inherit}.label::before{inline-size:calc(var(--_label-container-height)/2);block-size:calc(var(--_label-container-height)/2);bottom:calc(var(--_label-container-height)/-10);transform:rotate(45deg)}.label::after{inset:0px;border-radius:inherit}.labelContent{z-index:1}input[type=range]{opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;box-sizing:border-box;height:100%;width:100%;margin:0;background:rgba(0,0,0,0);cursor:pointer;pointer-events:auto;appearance:none}input[type=range]:focus{outline:none}::-webkit-slider-runnable-track{-webkit-appearance:none}::-moz-range-track{appearance:none}::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;block-size:var(--_handle-height);inline-size:var(--_handle-width);opacity:0;z-index:2}input.end::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_end-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.end:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}input.start::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_start-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.start:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}::-moz-range-thumb{appearance:none;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);transform:scaleX(0);opacity:0;z-index:2}.ranged input.start{clip-path:inset(0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))) 0 0)}.ranged input.start:dir(rtl){clip-path:inset(0 0 0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))))}.ranged input.end{clip-path:inset(0 0 0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)))}.ranged input.end:dir(rtl){clip-path:inset(0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)) 0 0)}.onTop{z-index:1}.handle{--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-ripple{border-radius:50%;height:var(--_state-layer-size);width:var(--_state-layer-size)}
`;

  // node_modules/@material/web/slider/slider.js
  var MdSlider = class MdSlider2 extends Slider {
  };
  MdSlider.styles = [styles10, styles9];
  MdSlider = __decorate2([
    t4("md-slider")
  ], MdSlider);

  // node_modules/@jsfe/material/dist/esm/widgets/range.js
  var range = (options) => x`
	<label class="theme-material widget-range">
		<!--  -->
		${options.label} ${options.step}
		<md-slider
			labeled
			.value=${options.value}
			step=${o14(options.step)}
			min=${o14(options.min)}
			max=${o14(options.max)}
			@input=${(event) => {
    const newValue = event.target.value;
    console.log(newValue);
    options.valueChangedCallback?.(newValue);
  }}
		></md-slider>

		${options.helpText ? x` <div>${options.helpText}</div> ` : E2}
	</label>
`;

  // node_modules/@material/web/list/internal/list-navigation-helpers.js
  function activateFirstItem(items, isActivatable = isItemNotDisabled) {
    const firstItem = getFirstActivatableItem(items, isActivatable);
    if (firstItem) {
      firstItem.tabIndex = 0;
      firstItem.focus();
    }
    return firstItem;
  }
  function activateLastItem(items, isActivatable = isItemNotDisabled) {
    const lastItem = getLastActivatableItem(items, isActivatable);
    if (lastItem) {
      lastItem.tabIndex = 0;
      lastItem.focus();
    }
    return lastItem;
  }
  function getActiveItem(items, isActivatable = isItemNotDisabled) {
    for (let i10 = 0; i10 < items.length; i10++) {
      const item = items[i10];
      if (item.tabIndex === 0 && isActivatable(item)) {
        return {
          item,
          index: i10
        };
      }
    }
    return null;
  }
  function getFirstActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (const item of items) {
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getLastActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (let i10 = items.length - 1; i10 >= 0; i10--) {
      const item = items[i10];
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getNextItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
    for (let i10 = 1; i10 < items.length; i10++) {
      const nextIndex = (i10 + index) % items.length;
      if (nextIndex < index && !wrap) {
        return null;
      }
      const item = items[nextIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function getPrevItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
    for (let i10 = 1; i10 < items.length; i10++) {
      const prevIndex = (index - i10 + items.length) % items.length;
      if (prevIndex > index && !wrap) {
        return null;
      }
      const item = items[prevIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function activateNextItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
    if (activeItemRecord) {
      const next = getNextItem(items, activeItemRecord.index, isActivatable, wrap);
      if (next) {
        next.tabIndex = 0;
        next.focus();
      }
      return next;
    } else {
      return activateFirstItem(items, isActivatable);
    }
  }
  function activatePreviousItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
    if (activeItemRecord) {
      const prev = getPrevItem(items, activeItemRecord.index, isActivatable, wrap);
      if (prev) {
        prev.tabIndex = 0;
        prev.focus();
      }
      return prev;
    } else {
      return activateLastItem(items, isActivatable);
    }
  }
  function isItemNotDisabled(item) {
    return !item.disabled;
  }

  // node_modules/@material/web/list/internal/list-controller.js
  var NavigableKeys = {
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowRight: "ArrowRight",
    Home: "Home",
    End: "End"
  };
  var ListController = class {
    constructor(config) {
      this.handleKeydown = (event) => {
        const key = event.key;
        if (event.defaultPrevented || !this.isNavigableKey(key)) {
          return;
        }
        const items = this.items;
        if (!items.length) {
          return;
        }
        const activeItemRecord = getActiveItem(items, this.isActivatable);
        event.preventDefault();
        const isRtl2 = this.isRtl();
        const inlinePrevious = isRtl2 ? NavigableKeys.ArrowRight : NavigableKeys.ArrowLeft;
        const inlineNext = isRtl2 ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
        let nextActiveItem = null;
        switch (key) {
          case NavigableKeys.ArrowDown:
          case inlineNext:
            nextActiveItem = activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
            break;
          case NavigableKeys.ArrowUp:
          case inlinePrevious:
            nextActiveItem = activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
            break;
          case NavigableKeys.Home:
            nextActiveItem = activateFirstItem(items, this.isActivatable);
            break;
          case NavigableKeys.End:
            nextActiveItem = activateLastItem(items, this.isActivatable);
            break;
          default:
            break;
        }
        if (nextActiveItem && activeItemRecord && activeItemRecord.item !== nextActiveItem) {
          activeItemRecord.item.tabIndex = -1;
        }
      };
      this.onDeactivateItems = () => {
        const items = this.items;
        for (const item of items) {
          this.deactivateItem(item);
        }
      };
      this.onRequestActivation = (event) => {
        this.onDeactivateItems();
        const target = event.target;
        this.activateItem(target);
        target.focus();
      };
      this.onSlotchange = () => {
        const items = this.items;
        let encounteredActivated = false;
        for (const item of items) {
          const isActivated = !item.disabled && item.tabIndex > -1;
          if (isActivated && !encounteredActivated) {
            encounteredActivated = true;
            item.tabIndex = 0;
            continue;
          }
          item.tabIndex = -1;
        }
        if (encounteredActivated) {
          return;
        }
        const firstActivatableItem = getFirstActivatableItem(items, this.isActivatable);
        if (!firstActivatableItem) {
          return;
        }
        firstActivatableItem.tabIndex = 0;
      };
      const { isItem, getPossibleItems, isRtl, deactivateItem, activateItem, isNavigableKey, isActivatable, wrapNavigation } = config;
      this.isItem = isItem;
      this.getPossibleItems = getPossibleItems;
      this.isRtl = isRtl;
      this.deactivateItem = deactivateItem;
      this.activateItem = activateItem;
      this.isNavigableKey = isNavigableKey;
      this.isActivatable = isActivatable;
      this.wrapNavigation = wrapNavigation ?? (() => true);
    }
    /**
     * The items being managed by the list. Additionally, attempts to see if the
     * object has a sub-item in the `.item` property.
     */
    get items() {
      const maybeItems = this.getPossibleItems();
      const items = [];
      for (const itemOrParent of maybeItems) {
        const isItem = this.isItem(itemOrParent);
        if (isItem) {
          items.push(itemOrParent);
          continue;
        }
        const subItem = itemOrParent.item;
        if (subItem && this.isItem(subItem)) {
          items.push(subItem);
        }
      }
      return items;
    }
    /**
     * Activates the next item in the list. If at the end of the list, the first
     * item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activateNextItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
    }
    /**
     * Activates the previous item in the list. If at the start of the list, the
     * last item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activatePreviousItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
    }
  };

  // node_modules/@material/web/menu/internal/controllers/shared.js
  function createCloseMenuEvent(initiator, reason) {
    return new CustomEvent("close-menu", {
      bubbles: true,
      composed: true,
      detail: { initiator, reason, itemPath: [initiator] }
    });
  }
  var createDefaultCloseMenuEvent = createCloseMenuEvent;
  var SelectionKey = {
    SPACE: "Space",
    ENTER: "Enter"
  };
  var CloseReason = {
    CLICK_SELECTION: "click-selection",
    KEYDOWN: "keydown"
  };
  var KeydownCloseKey = {
    ESCAPE: "Escape",
    SPACE: SelectionKey.SPACE,
    ENTER: SelectionKey.ENTER
  };
  function isClosableKey(code) {
    return Object.values(KeydownCloseKey).some((value2) => value2 === code);
  }
  function isSelectableKey(code) {
    return Object.values(SelectionKey).some((value2) => value2 === code);
  }
  function isElementInSubtree(target, container) {
    const focusEv = new Event("md-contains", { bubbles: true, composed: true });
    let composedPath = [];
    const listener = (ev) => {
      composedPath = ev.composedPath();
    };
    container.addEventListener("md-contains", listener);
    target.dispatchEvent(focusEv);
    container.removeEventListener("md-contains", listener);
    const isContained = composedPath.length > 0;
    return isContained;
  }
  var FocusState = {
    NONE: "none",
    LIST_ROOT: "list-root",
    FIRST_ITEM: "first-item",
    LAST_ITEM: "last-item"
  };

  // node_modules/@material/web/menu/internal/controllers/surfacePositionController.js
  var Corner = {
    END_START: "end-start",
    END_END: "end-end",
    START_START: "start-start",
    START_END: "start-end"
  };
  var SurfacePositionController = class {
    /**
     * @param host The host to connect the controller to.
     * @param getProperties A function that returns the properties for the
     * controller.
     */
    constructor(host, getProperties) {
      this.host = host;
      this.getProperties = getProperties;
      this.surfaceStylesInternal = {
        "display": "none"
      };
      this.lastValues = {
        isOpen: false
      };
      this.host.addController(this);
    }
    /**
     * The StyleInfo map to apply to the surface via Lit's stylemap
     */
    get surfaceStyles() {
      return this.surfaceStylesInternal;
    }
    /**
     * Calculates the surface's new position required so that the surface's
     * `surfaceCorner` aligns to the anchor's `anchorCorner` while keeping the
     * surface inside the window viewport. This positioning also respects RTL by
     * checking `getComputedStyle()` on the surface element.
     */
    async position() {
      const { surfaceEl, anchorEl, anchorCorner: anchorCornerRaw, surfaceCorner: surfaceCornerRaw, positioning, xOffset, yOffset, repositionStrategy } = this.getProperties();
      const anchorCorner = anchorCornerRaw.toLowerCase().trim();
      const surfaceCorner = surfaceCornerRaw.toLowerCase().trim();
      if (!surfaceEl || !anchorEl) {
        return;
      }
      const windowInnerWidth = window.innerWidth;
      const windowInnerHeight = window.innerHeight;
      const div = document.createElement("div");
      div.style.opacity = "0";
      div.style.position = "fixed";
      div.style.display = "block";
      div.style.inset = "0";
      document.body.appendChild(div);
      const scrollbarTestRect = div.getBoundingClientRect();
      div.remove();
      const blockScrollbarHeight = window.innerHeight - scrollbarTestRect.bottom;
      const inlineScrollbarWidth = window.innerWidth - scrollbarTestRect.right;
      this.surfaceStylesInternal = {
        "display": "block",
        "opacity": "0"
      };
      this.host.requestUpdate();
      await this.host.updateComplete;
      if (surfaceEl.popover && surfaceEl.isConnected) {
        surfaceEl.showPopover();
      }
      const surfaceRect = surfaceEl.getSurfacePositionClientRect ? surfaceEl.getSurfacePositionClientRect() : surfaceEl.getBoundingClientRect();
      const anchorRect = anchorEl.getSurfacePositionClientRect ? anchorEl.getSurfacePositionClientRect() : anchorEl.getBoundingClientRect();
      const [surfaceBlock, surfaceInline] = surfaceCorner.split("-");
      const [anchorBlock, anchorInline] = anchorCorner.split("-");
      const isLTR = getComputedStyle(surfaceEl).direction === "ltr";
      let { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty } = this.calculateBlock({
        surfaceRect,
        anchorRect,
        anchorBlock,
        surfaceBlock,
        yOffset,
        positioning,
        windowInnerHeight,
        blockScrollbarHeight
      });
      if (blockOutOfBoundsCorrection) {
        const flippedSurfaceBlock = surfaceBlock === "start" ? "end" : "start";
        const flippedAnchorBlock = anchorBlock === "start" ? "end" : "start";
        const flippedBlock = this.calculateBlock({
          surfaceRect,
          anchorRect,
          anchorBlock: flippedAnchorBlock,
          surfaceBlock: flippedSurfaceBlock,
          yOffset,
          positioning,
          windowInnerHeight,
          blockScrollbarHeight
        });
        if (blockOutOfBoundsCorrection > flippedBlock.blockOutOfBoundsCorrection) {
          blockInset = flippedBlock.blockInset;
          blockOutOfBoundsCorrection = flippedBlock.blockOutOfBoundsCorrection;
          surfaceBlockProperty = flippedBlock.surfaceBlockProperty;
        }
      }
      let { inlineInset, inlineOutOfBoundsCorrection, surfaceInlineProperty } = this.calculateInline({
        surfaceRect,
        anchorRect,
        anchorInline,
        surfaceInline,
        xOffset,
        positioning,
        isLTR,
        windowInnerWidth,
        inlineScrollbarWidth
      });
      if (inlineOutOfBoundsCorrection) {
        const flippedSurfaceInline = surfaceInline === "start" ? "end" : "start";
        const flippedAnchorInline = anchorInline === "start" ? "end" : "start";
        const flippedInline = this.calculateInline({
          surfaceRect,
          anchorRect,
          anchorInline: flippedAnchorInline,
          surfaceInline: flippedSurfaceInline,
          xOffset,
          positioning,
          isLTR,
          windowInnerWidth,
          inlineScrollbarWidth
        });
        if (Math.abs(inlineOutOfBoundsCorrection) > Math.abs(flippedInline.inlineOutOfBoundsCorrection)) {
          inlineInset = flippedInline.inlineInset;
          inlineOutOfBoundsCorrection = flippedInline.inlineOutOfBoundsCorrection;
          surfaceInlineProperty = flippedInline.surfaceInlineProperty;
        }
      }
      if (repositionStrategy === "move") {
        blockInset = blockInset - blockOutOfBoundsCorrection;
        inlineInset = inlineInset - inlineOutOfBoundsCorrection;
      }
      this.surfaceStylesInternal = {
        "display": "block",
        "opacity": "1",
        [surfaceBlockProperty]: `${blockInset}px`,
        [surfaceInlineProperty]: `${inlineInset}px`
      };
      if (repositionStrategy === "resize") {
        if (blockOutOfBoundsCorrection) {
          this.surfaceStylesInternal["height"] = `${surfaceRect.height - blockOutOfBoundsCorrection}px`;
        }
        if (inlineOutOfBoundsCorrection) {
          this.surfaceStylesInternal["width"] = `${surfaceRect.width - inlineOutOfBoundsCorrection}px`;
        }
      }
      this.host.requestUpdate();
    }
    /**
     * Calculates the css property, the inset, and the out of bounds correction
     * for the surface in the block direction.
     */
    calculateBlock(config) {
      const { surfaceRect, anchorRect, anchorBlock, surfaceBlock, yOffset, positioning, windowInnerHeight, blockScrollbarHeight } = config;
      const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
      const relativeToDocument = positioning === "document" ? 1 : 0;
      const isSurfaceBlockStart = surfaceBlock === "start" ? 1 : 0;
      const isSurfaceBlockEnd = surfaceBlock === "end" ? 1 : 0;
      const isOneBlockEnd = anchorBlock !== surfaceBlock ? 1 : 0;
      const blockAnchorOffset = isOneBlockEnd * anchorRect.height + yOffset;
      const blockTopLayerOffset = isSurfaceBlockStart * anchorRect.top + isSurfaceBlockEnd * (windowInnerHeight - anchorRect.bottom - blockScrollbarHeight);
      const blockDocumentOffset = isSurfaceBlockStart * window.scrollY - isSurfaceBlockEnd * window.scrollY;
      const blockOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerHeight - blockTopLayerOffset - blockAnchorOffset - surfaceRect.height));
      const blockInset = relativeToWindow * blockTopLayerOffset + relativeToDocument * blockDocumentOffset + blockAnchorOffset;
      const surfaceBlockProperty = surfaceBlock === "start" ? "inset-block-start" : "inset-block-end";
      return { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty };
    }
    /**
     * Calculates the css property, the inset, and the out of bounds correction
     * for the surface in the inline direction.
     */
    calculateInline(config) {
      const { isLTR: isLTRBool, surfaceInline, anchorInline, anchorRect, surfaceRect, xOffset, positioning, windowInnerWidth, inlineScrollbarWidth } = config;
      const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
      const relativeToDocument = positioning === "document" ? 1 : 0;
      const isLTR = isLTRBool ? 1 : 0;
      const isRTL = isLTRBool ? 0 : 1;
      const isSurfaceInlineStart = surfaceInline === "start" ? 1 : 0;
      const isSurfaceInlineEnd = surfaceInline === "end" ? 1 : 0;
      const isOneInlineEnd = anchorInline !== surfaceInline ? 1 : 0;
      const inlineAnchorOffset = isOneInlineEnd * anchorRect.width + xOffset;
      const inlineTopLayerOffsetLTR = isSurfaceInlineStart * anchorRect.left + isSurfaceInlineEnd * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth);
      const inlineTopLayerOffsetRTL = isSurfaceInlineStart * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth) + isSurfaceInlineEnd * anchorRect.left;
      const inlineTopLayerOffset = isLTR * inlineTopLayerOffsetLTR + isRTL * inlineTopLayerOffsetRTL;
      const inlineDocumentOffsetLTR = isSurfaceInlineStart * window.scrollX - isSurfaceInlineEnd * window.scrollX;
      const inlineDocumentOffsetRTL = isSurfaceInlineEnd * window.scrollX - isSurfaceInlineStart * window.scrollX;
      const inlineDocumentOffset = isLTR * inlineDocumentOffsetLTR + isRTL * inlineDocumentOffsetRTL;
      const inlineOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerWidth - inlineTopLayerOffset - inlineAnchorOffset - surfaceRect.width));
      const inlineInset = relativeToWindow * inlineTopLayerOffset + inlineAnchorOffset + relativeToDocument * inlineDocumentOffset;
      let surfaceInlineProperty = surfaceInline === "start" ? "inset-inline-start" : "inset-inline-end";
      if (positioning === "document" || positioning === "fixed") {
        if (surfaceInline === "start" && isLTRBool || surfaceInline === "end" && !isLTRBool) {
          surfaceInlineProperty = "left";
        } else {
          surfaceInlineProperty = "right";
        }
      }
      return {
        inlineInset,
        inlineOutOfBoundsCorrection,
        surfaceInlineProperty
      };
    }
    hostUpdate() {
      this.onUpdate();
    }
    hostUpdated() {
      this.onUpdate();
    }
    /**
     * Checks whether the properties passed into the controller have changed since
     * the last positioning. If so, it will reposition if the surface is open or
     * close it if the surface should close.
     */
    async onUpdate() {
      const props = this.getProperties();
      let hasChanged = false;
      for (const [key, value2] of Object.entries(props)) {
        hasChanged = hasChanged || value2 !== this.lastValues[key];
        if (hasChanged)
          break;
      }
      const openChanged = this.lastValues.isOpen !== props.isOpen;
      const hasAnchor = !!props.anchorEl;
      const hasSurface = !!props.surfaceEl;
      if (hasChanged && hasAnchor && hasSurface) {
        this.lastValues.isOpen = props.isOpen;
        if (props.isOpen) {
          this.lastValues = props;
          await this.position();
          props.onOpen();
        } else if (openChanged) {
          await props.beforeClose();
          this.close();
          props.onClose();
        }
      }
    }
    /**
     * Hides the surface.
     */
    close() {
      this.surfaceStylesInternal = {
        "display": "none"
      };
      this.host.requestUpdate();
      const surfaceEl = this.getProperties().surfaceEl;
      if (surfaceEl?.popover && surfaceEl?.isConnected) {
        surfaceEl.hidePopover();
      }
    }
  };

  // node_modules/@material/web/menu/internal/controllers/typeaheadController.js
  var TYPEAHEAD_RECORD = {
    INDEX: 0,
    ITEM: 1,
    TEXT: 2
  };
  var TypeaheadController = class {
    /**
     * @param getProperties A function that returns the options of the typeahead
     * controller:
     *
     * {
     *   getItems: A function that returns an array of menu items to be searched.
     *   typeaheadBufferTime: The maximum time between each keystroke to keep the
     *       current type buffer alive.
     * }
     */
    constructor(getProperties) {
      this.getProperties = getProperties;
      this.typeaheadRecords = [];
      this.typaheadBuffer = "";
      this.cancelTypeaheadTimeout = 0;
      this.isTypingAhead = false;
      this.lastActiveRecord = null;
      this.onKeydown = (event) => {
        if (this.isTypingAhead) {
          this.typeahead(event);
        } else {
          this.beginTypeahead(event);
        }
      };
      this.endTypeahead = () => {
        this.isTypingAhead = false;
        this.typaheadBuffer = "";
        this.typeaheadRecords = [];
      };
    }
    get items() {
      return this.getProperties().getItems();
    }
    get active() {
      return this.getProperties().active;
    }
    /**
     * Sets up typingahead
     */
    beginTypeahead(event) {
      if (!this.active) {
        return;
      }
      if (event.code === "Space" || event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
        return;
      }
      this.isTypingAhead = true;
      this.typeaheadRecords = this.items.map((el, index) => [
        index,
        el,
        el.typeaheadText.trim().toLowerCase()
      ]);
      this.lastActiveRecord = this.typeaheadRecords.find((record) => record[TYPEAHEAD_RECORD.ITEM].tabIndex === 0) ?? null;
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      this.typeahead(event);
    }
    /**
     * Performs the typeahead. Based on the normalized items and the current text
     * buffer, finds the _next_ item with matching text and activates it.
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: 'o'
     * user types: l
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Orange
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange (active), Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     */
    typeahead(event) {
      if (event.defaultPrevented)
        return;
      clearTimeout(this.cancelTypeaheadTimeout);
      if (event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
        this.endTypeahead();
        if (this.lastActiveRecord) {
          this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
        }
        return;
      }
      if (event.code === "Space") {
        event.preventDefault();
      }
      this.cancelTypeaheadTimeout = setTimeout(this.endTypeahead, this.getProperties().typeaheadBufferTime);
      this.typaheadBuffer += event.key.toLowerCase();
      const lastActiveIndex = this.lastActiveRecord ? this.lastActiveRecord[TYPEAHEAD_RECORD.INDEX] : -1;
      const numRecords = this.typeaheadRecords.length;
      const rebaseIndexOnActive = (record) => {
        return (record[TYPEAHEAD_RECORD.INDEX] + numRecords - lastActiveIndex) % numRecords;
      };
      const matchingRecords = this.typeaheadRecords.filter((record) => !record[TYPEAHEAD_RECORD.ITEM].disabled && record[TYPEAHEAD_RECORD.TEXT].startsWith(this.typaheadBuffer)).sort((a5, b4) => rebaseIndexOnActive(a5) - rebaseIndexOnActive(b4));
      if (matchingRecords.length === 0) {
        clearTimeout(this.cancelTypeaheadTimeout);
        if (this.lastActiveRecord) {
          this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
        }
        this.endTypeahead();
        return;
      }
      const isNewQuery = this.typaheadBuffer.length === 1;
      let nextRecord;
      if (this.lastActiveRecord === matchingRecords[0] && isNewQuery) {
        nextRecord = matchingRecords[1] ?? matchingRecords[0];
      } else {
        nextRecord = matchingRecords[0];
      }
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      this.lastActiveRecord = nextRecord;
      nextRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = 0;
      nextRecord[TYPEAHEAD_RECORD.ITEM].focus();
      return;
    }
  };

  // node_modules/@material/web/menu/internal/menu.js
  var DEFAULT_TYPEAHEAD_BUFFER_TIME = 200;
  var submenuNavKeys = /* @__PURE__ */ new Set([
    NavigableKeys.ArrowDown,
    NavigableKeys.ArrowUp,
    NavigableKeys.Home,
    NavigableKeys.End
  ]);
  var menuNavKeys = /* @__PURE__ */ new Set([
    NavigableKeys.ArrowLeft,
    NavigableKeys.ArrowRight,
    ...submenuNavKeys
  ]);
  function getFocusedElement(activeDoc = document) {
    let activeEl = activeDoc.activeElement;
    while (activeEl && activeEl?.shadowRoot?.activeElement) {
      activeEl = activeEl.shadowRoot.activeElement;
    }
    return activeEl;
  }
  var Menu = class extends i6 {
    /**
     * Whether the menu is animating upwards or downwards when opening. This is
     * helpful for calculating some animation calculations.
     */
    get openDirection() {
      const menuCornerBlock = this.menuCorner.split("-")[0];
      return menuCornerBlock === "start" ? "DOWN" : "UP";
    }
    /**
     * The element which the menu should align to. If `anchor` is set to a
     * non-empty idref string, then `anchorEl` will resolve to the element with
     * the given id in the same root node. Otherwise, `null`.
     */
    get anchorElement() {
      if (this.anchor) {
        return this.getRootNode().querySelector(`#${this.anchor}`);
      }
      return this.currentAnchorElement;
    }
    set anchorElement(element) {
      this.currentAnchorElement = element;
      this.requestUpdate("anchorElement");
    }
    constructor() {
      super();
      this.anchor = "";
      this.positioning = "absolute";
      this.quick = false;
      this.hasOverflow = false;
      this.open = false;
      this.xOffset = 0;
      this.yOffset = 0;
      this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME;
      this.anchorCorner = Corner.END_START;
      this.menuCorner = Corner.START_START;
      this.stayOpenOnOutsideClick = false;
      this.stayOpenOnFocusout = false;
      this.skipRestoreFocus = false;
      this.defaultFocus = FocusState.FIRST_ITEM;
      this.noNavigationWrap = false;
      this.typeaheadActive = true;
      this.isSubmenu = false;
      this.pointerPath = [];
      this.isRepositioning = false;
      this.openCloseAnimationSignal = createAnimationSignal();
      this.listController = new ListController({
        isItem: (maybeItem) => {
          return maybeItem.hasAttribute("md-menu-item");
        },
        getPossibleItems: () => this.slotItems,
        isRtl: () => getComputedStyle(this).direction === "rtl",
        deactivateItem: (item) => {
          item.selected = false;
          item.tabIndex = -1;
        },
        activateItem: (item) => {
          item.selected = true;
          item.tabIndex = 0;
        },
        isNavigableKey: (key) => {
          if (!this.isSubmenu) {
            return menuNavKeys.has(key);
          }
          const isRtl = getComputedStyle(this).direction === "rtl";
          const arrowOpen = isRtl ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
          if (key === arrowOpen) {
            return true;
          }
          return submenuNavKeys.has(key);
        },
        wrapNavigation: () => !this.noNavigationWrap
      });
      this.lastFocusedElement = null;
      this.typeaheadController = new TypeaheadController(() => {
        return {
          getItems: () => this.items,
          typeaheadBufferTime: this.typeaheadDelay,
          active: this.typeaheadActive
        };
      });
      this.currentAnchorElement = null;
      this.internals = // Cast needed for closure
      this.attachInternals();
      this.menuPositionController = new SurfacePositionController(this, () => {
        return {
          anchorCorner: this.anchorCorner,
          surfaceCorner: this.menuCorner,
          surfaceEl: this.surfaceEl,
          anchorEl: this.anchorElement,
          positioning: this.positioning === "popover" ? "document" : this.positioning,
          isOpen: this.open,
          xOffset: this.xOffset,
          yOffset: this.yOffset,
          onOpen: this.onOpened,
          beforeClose: this.beforeClose,
          onClose: this.onClosed,
          // We can't resize components that have overflow like menus with
          // submenus because the overflow-y will show menu items / content
          // outside the bounds of the menu. Popover API fixes this because each
          // submenu is hoisted to the top-layer and are not considered overflow
          // content.
          repositionStrategy: this.hasOverflow && this.positioning !== "popover" ? "move" : "resize"
        };
      });
      this.onWindowResize = () => {
        if (this.isRepositioning || this.positioning !== "document" && this.positioning !== "fixed" && this.positioning !== "popover") {
          return;
        }
        this.isRepositioning = true;
        this.reposition();
        this.isRepositioning = false;
      };
      this.handleFocusout = async (event) => {
        const anchorEl = this.anchorElement;
        if (this.stayOpenOnFocusout || !this.open || this.pointerPath.includes(anchorEl)) {
          return;
        }
        if (event.relatedTarget) {
          if (isElementInSubtree(event.relatedTarget, this) || this.pointerPath.length !== 0 && isElementInSubtree(event.relatedTarget, anchorEl)) {
            return;
          }
        } else if (this.pointerPath.includes(this)) {
          return;
        }
        const oldRestoreFocus = this.skipRestoreFocus;
        this.skipRestoreFocus = true;
        this.close();
        await this.updateComplete;
        this.skipRestoreFocus = oldRestoreFocus;
      };
      this.onOpened = async () => {
        this.lastFocusedElement = getFocusedElement();
        const items = this.items;
        const activeItemRecord = getActiveItem(items);
        if (activeItemRecord && this.defaultFocus !== FocusState.NONE) {
          activeItemRecord.item.tabIndex = -1;
        }
        let animationAborted = !this.quick;
        if (this.quick) {
          this.dispatchEvent(new Event("opening"));
        } else {
          animationAborted = !!await this.animateOpen();
        }
        switch (this.defaultFocus) {
          case FocusState.FIRST_ITEM:
            const first = getFirstActivatableItem(items);
            if (first) {
              first.tabIndex = 0;
              first.focus();
              await first.updateComplete;
            }
            break;
          case FocusState.LAST_ITEM:
            const last = getLastActivatableItem(items);
            if (last) {
              last.tabIndex = 0;
              last.focus();
              await last.updateComplete;
            }
            break;
          case FocusState.LIST_ROOT:
            this.focus();
            break;
          default:
          case FocusState.NONE:
            break;
        }
        if (!animationAborted) {
          this.dispatchEvent(new Event("opened"));
        }
      };
      this.beforeClose = async () => {
        this.open = false;
        if (!this.skipRestoreFocus) {
          this.lastFocusedElement?.focus?.();
        }
        if (!this.quick) {
          await this.animateClose();
        }
      };
      this.onClosed = () => {
        if (this.quick) {
          this.dispatchEvent(new Event("closing"));
          this.dispatchEvent(new Event("closed"));
        }
      };
      this.onWindowPointerdown = (event) => {
        this.pointerPath = event.composedPath();
      };
      this.onDocumentClick = (event) => {
        if (!this.open) {
          return;
        }
        const path = event.composedPath();
        if (!this.stayOpenOnOutsideClick && !path.includes(this) && !path.includes(this.anchorElement)) {
          this.open = false;
        }
      };
      if (!o7) {
        this.internals.role = "menu";
        this.addEventListener("keydown", this.handleKeydown);
        this.addEventListener("keydown", this.captureKeydown, { capture: true });
        this.addEventListener("focusout", this.handleFocusout);
      }
    }
    /**
     * The menu items associated with this menu. The items must be `MenuItem`s and
     * have both the `md-menu-item` and `md-list-item` attributes.
     */
    get items() {
      return this.listController.items;
    }
    willUpdate(changed) {
      if (!changed.has("open")) {
        return;
      }
      if (this.open) {
        this.removeAttribute("aria-hidden");
        return;
      }
      this.setAttribute("aria-hidden", "true");
    }
    update(changed) {
      if (changed.has("open")) {
        if (this.open) {
          this.setUpGlobalEventListeners();
        } else {
          this.cleanUpGlobalEventListeners();
        }
      }
      if (changed.has("positioning") && this.positioning === "popover" && // type required for Google JS conformance
      !this.showPopover) {
        this.positioning = "fixed";
      }
      super.update(changed);
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.open) {
        this.setUpGlobalEventListeners();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.cleanUpGlobalEventListeners();
    }
    getBoundingClientRect() {
      if (!this.surfaceEl) {
        return super.getBoundingClientRect();
      }
      return this.surfaceEl.getBoundingClientRect();
    }
    getClientRects() {
      if (!this.surfaceEl) {
        return super.getClientRects();
      }
      return this.surfaceEl.getClientRects();
    }
    render() {
      return this.renderSurface();
    }
    /**
     * Renders the positionable surface element and its contents.
     */
    renderSurface() {
      return x`
      <div
        class="menu ${e10(this.getSurfaceClasses())}"
        style=${o13(this.menuPositionController.surfaceStyles)}
        popover=${this.positioning === "popover" ? "manual" : E2}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `;
    }
    /**
     * Renders the menu items' slot
     */
    renderMenuItems() {
      return x`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`;
    }
    /**
     * Renders the elevation component.
     */
    renderElevation() {
      return x`<md-elevation part="elevation"></md-elevation>`;
    }
    getSurfaceClasses() {
      return {
        open: this.open,
        fixed: this.positioning === "fixed",
        "has-overflow": this.hasOverflow
      };
    }
    captureKeydown(event) {
      if (event.target === this && !event.defaultPrevented && isClosableKey(event.code)) {
        event.preventDefault();
        this.close();
      }
      this.typeaheadController.onKeydown(event);
    }
    /**
     * Performs the opening animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     *
     * @return A promise that resolve to `true` if the animation was aborted,
     *     `false` if it was not aborted.
     */
    async animateOpen() {
      const surfaceEl = this.surfaceEl;
      const slotEl = this.slotEl;
      if (!surfaceEl || !slotEl)
        return true;
      const openDirection = this.openDirection;
      this.dispatchEvent(new Event("opening"));
      surfaceEl.classList.toggle("animating", true);
      const signal = this.openCloseAnimationSignal.start();
      const height = surfaceEl.offsetHeight;
      const openingUpwards = openDirection === "UP";
      const children = this.items;
      const FULL_DURATION = 500;
      const SURFACE_OPACITY_DURATION = 50;
      const ITEM_OPACITY_DURATION = 250;
      const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / children.length;
      const surfaceHeightAnimation = surfaceEl.animate([{ height: "0px" }, { height: `${height}px` }], {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED
      });
      const upPositionCorrectionAnimation = slotEl.animate([
        { transform: openingUpwards ? `translateY(-${height}px)` : "" },
        { transform: "" }
      ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED });
      const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 0 }, { opacity: 1 }], SURFACE_OPACITY_DURATION);
      const childrenAnimations = [];
      for (let i10 = 0; i10 < children.length; i10++) {
        const directionalIndex = openingUpwards ? children.length - 1 - i10 : i10;
        const child = children[directionalIndex];
        const animation = child.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: ITEM_OPACITY_DURATION,
          delay: DELAY_BETWEEN_ITEMS * i10
        });
        child.classList.toggle("md-menu-hidden", true);
        animation.addEventListener("finish", () => {
          child.classList.toggle("md-menu-hidden", false);
        });
        childrenAnimations.push([child, animation]);
      }
      let resolveAnimation = (value2) => {
      };
      const animationFinished = new Promise((resolve) => {
        resolveAnimation = resolve;
      });
      signal.addEventListener("abort", () => {
        surfaceHeightAnimation.cancel();
        upPositionCorrectionAnimation.cancel();
        surfaceOpacityAnimation.cancel();
        childrenAnimations.forEach(([child, animation]) => {
          child.classList.toggle("md-menu-hidden", false);
          animation.cancel();
        });
        resolveAnimation(true);
      });
      surfaceHeightAnimation.addEventListener("finish", () => {
        surfaceEl.classList.toggle("animating", false);
        this.openCloseAnimationSignal.finish();
        resolveAnimation(false);
      });
      return await animationFinished;
    }
    /**
     * Performs the closing animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     */
    animateClose() {
      let resolve;
      const animationEnded = new Promise((res) => {
        resolve = res;
      });
      const surfaceEl = this.surfaceEl;
      const slotEl = this.slotEl;
      if (!surfaceEl || !slotEl) {
        resolve(false);
        return animationEnded;
      }
      const openDirection = this.openDirection;
      const closingDownwards = openDirection === "UP";
      this.dispatchEvent(new Event("closing"));
      surfaceEl.classList.toggle("animating", true);
      const signal = this.openCloseAnimationSignal.start();
      const height = surfaceEl.offsetHeight;
      const children = this.items;
      const FULL_DURATION = 150;
      const SURFACE_OPACITY_DURATION = 50;
      const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION;
      const ITEM_OPACITY_DURATION = 50;
      const ITEM_OPACITY_INITIAL_DELAY = 50;
      const END_HEIGHT_PERCENTAGE = 0.35;
      const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / children.length;
      const surfaceHeightAnimation = surfaceEl.animate([
        { height: `${height}px` },
        { height: `${height * END_HEIGHT_PERCENTAGE}px` }
      ], {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED_ACCELERATE
      });
      const downPositionCorrectionAnimation = slotEl.animate([
        { transform: "" },
        {
          transform: closingDownwards ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)` : ""
        }
      ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE });
      const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SURFACE_OPACITY_DURATION, delay: SURFACE_OPACITY_DELAY });
      const childrenAnimations = [];
      for (let i10 = 0; i10 < children.length; i10++) {
        const directionalIndex = closingDownwards ? i10 : children.length - 1 - i10;
        const child = children[directionalIndex];
        const animation = child.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: ITEM_OPACITY_DURATION,
          delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i10
        });
        animation.addEventListener("finish", () => {
          child.classList.toggle("md-menu-hidden", true);
        });
        childrenAnimations.push([child, animation]);
      }
      signal.addEventListener("abort", () => {
        surfaceHeightAnimation.cancel();
        downPositionCorrectionAnimation.cancel();
        surfaceOpacityAnimation.cancel();
        childrenAnimations.forEach(([child, animation]) => {
          animation.cancel();
          child.classList.toggle("md-menu-hidden", false);
        });
        resolve(false);
      });
      surfaceHeightAnimation.addEventListener("finish", () => {
        surfaceEl.classList.toggle("animating", false);
        childrenAnimations.forEach(([child]) => {
          child.classList.toggle("md-menu-hidden", false);
        });
        this.openCloseAnimationSignal.finish();
        this.dispatchEvent(new Event("closed"));
        resolve(true);
      });
      return animationEnded;
    }
    handleKeydown(event) {
      this.pointerPath = [];
      this.listController.handleKeydown(event);
    }
    setUpGlobalEventListeners() {
      document.addEventListener("click", this.onDocumentClick, { capture: true });
      window.addEventListener("pointerdown", this.onWindowPointerdown);
      document.addEventListener("resize", this.onWindowResize, { passive: true });
      window.addEventListener("resize", this.onWindowResize, { passive: true });
    }
    cleanUpGlobalEventListeners() {
      document.removeEventListener("click", this.onDocumentClick, {
        capture: true
      });
      window.removeEventListener("pointerdown", this.onWindowPointerdown);
      document.removeEventListener("resize", this.onWindowResize);
      window.removeEventListener("resize", this.onWindowResize);
    }
    onCloseMenu() {
      this.close();
    }
    onDeactivateItems(event) {
      event.stopPropagation();
      this.listController.onDeactivateItems();
    }
    onRequestActivation(event) {
      event.stopPropagation();
      this.listController.onRequestActivation(event);
    }
    handleDeactivateTypeahead(event) {
      event.stopPropagation();
      this.typeaheadActive = false;
    }
    handleActivateTypeahead(event) {
      event.stopPropagation();
      this.typeaheadActive = true;
    }
    handleStayOpenOnFocusout(event) {
      event.stopPropagation();
      this.stayOpenOnFocusout = true;
    }
    handleCloseOnFocusout(event) {
      event.stopPropagation();
      this.stayOpenOnFocusout = false;
    }
    close() {
      this.open = false;
      const maybeSubmenu = this.slotItems;
      maybeSubmenu.forEach((item) => {
        item.close?.();
      });
    }
    show() {
      this.open = true;
    }
    /**
     * Activates the next item in the menu. If at the end of the menu, the first
     * item will be activated.
     *
     * @return The activated menu item or `null` if there are no items.
     */
    activateNextItem() {
      return this.listController.activateNextItem() ?? null;
    }
    /**
     * Activates the previous item in the menu. If at the start of the menu, the
     * last item will be activated.
     *
     * @return The activated menu item or `null` if there are no items.
     */
    activatePreviousItem() {
      return this.listController.activatePreviousItem() ?? null;
    }
    /**
     * Repositions the menu if it is open.
     *
     * Useful for the case where document or window-positioned menus have their
     * anchors moved while open.
     */
    reposition() {
      if (this.open) {
        this.menuPositionController.position();
      }
    }
  };
  __decorate2([
    e6(".menu")
  ], Menu.prototype, "surfaceEl", void 0);
  __decorate2([
    e6("slot")
  ], Menu.prototype, "slotEl", void 0);
  __decorate2([
    n5()
  ], Menu.prototype, "anchor", void 0);
  __decorate2([
    n5()
  ], Menu.prototype, "positioning", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Menu.prototype, "quick", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "has-overflow" })
  ], Menu.prototype, "hasOverflow", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], Menu.prototype, "open", void 0);
  __decorate2([
    n5({ type: Number, attribute: "x-offset" })
  ], Menu.prototype, "xOffset", void 0);
  __decorate2([
    n5({ type: Number, attribute: "y-offset" })
  ], Menu.prototype, "yOffset", void 0);
  __decorate2([
    n5({ type: Number, attribute: "typeahead-delay" })
  ], Menu.prototype, "typeaheadDelay", void 0);
  __decorate2([
    n5({ attribute: "anchor-corner" })
  ], Menu.prototype, "anchorCorner", void 0);
  __decorate2([
    n5({ attribute: "menu-corner" })
  ], Menu.prototype, "menuCorner", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "stay-open-on-outside-click" })
  ], Menu.prototype, "stayOpenOnOutsideClick", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "stay-open-on-focusout" })
  ], Menu.prototype, "stayOpenOnFocusout", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "skip-restore-focus" })
  ], Menu.prototype, "skipRestoreFocus", void 0);
  __decorate2([
    n5({ attribute: "default-focus" })
  ], Menu.prototype, "defaultFocus", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "no-navigation-wrap" })
  ], Menu.prototype, "noNavigationWrap", void 0);
  __decorate2([
    o9({ flatten: true })
  ], Menu.prototype, "slotItems", void 0);
  __decorate2([
    r6()
  ], Menu.prototype, "typeaheadActive", void 0);

  // node_modules/@material/web/menu/internal/menu-styles.js
  var styles11 = i3`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit;scrollbar-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit;scrollbar-width:inherit}.item-padding{padding-block:8px}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}
`;

  // node_modules/@material/web/menu/menu.js
  var MdMenu = class MdMenu2 extends Menu {
  };
  MdMenu.styles = [styles11];
  MdMenu = __decorate2([
    t4("md-menu")
  ], MdMenu);

  // node_modules/@material/web/labs/behaviors/validators/select-validator.js
  var SelectValidator = class extends Validator {
    computeValidity(state) {
      if (!this.selectControl) {
        this.selectControl = document.createElement("select");
      }
      B2(x`<option value=${state.value}></option>`, this.selectControl);
      this.selectControl.value = state.value;
      this.selectControl.required = state.required;
      return {
        validity: this.selectControl.validity,
        validationMessage: this.selectControl.validationMessage
      };
    }
    equals(prev, next) {
      return prev.value === next.value && prev.required === next.required;
    }
    copy({ value: value2, required }) {
      return { value: value2, required };
    }
  };

  // node_modules/@material/web/select/internal/shared.js
  function getSelectedItems(items) {
    const selectedItemRecords = [];
    for (let i10 = 0; i10 < items.length; i10++) {
      const item = items[i10];
      if (item.selected) {
        selectedItemRecords.push([item, i10]);
      }
    }
    return selectedItemRecords;
  }

  // node_modules/@material/web/select/internal/select.js
  var _a;
  var VALUE = Symbol("value");
  var selectBaseClass = mixinOnReportValidity(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i6))));
  var Select = class extends selectBaseClass {
    /**
     * The value of the currently selected option.
     *
     * Note: For SSR, set `[selected]` on the requested option and `displayText`
     * rather than setting `value` setting `value` will incur a DOM query.
     */
    get value() {
      return this[VALUE];
    }
    set value(value2) {
      if (o7)
        return;
      this.lastUserSetValue = value2;
      this.select(value2);
    }
    get options() {
      return this.menu?.items ?? [];
    }
    /**
     * The index of the currently selected option.
     *
     * Note: For SSR, set `[selected]` on the requested option and `displayText`
     * rather than setting `selectedIndex` setting `selectedIndex` will incur a
     * DOM query.
     */
    get selectedIndex() {
      const [_option, index] = (this.getSelectedOptions() ?? [])[0] ?? [];
      return index ?? -1;
    }
    set selectedIndex(index) {
      this.lastUserSetSelectedIndex = index;
      this.selectIndex(index);
    }
    /**
     * Returns an array of selected options.
     *
     * NOTE: md-select only supports single selection.
     */
    get selectedOptions() {
      return (this.getSelectedOptions() ?? []).map(([option]) => option);
    }
    get hasError() {
      return this.error || this.nativeError;
    }
    constructor() {
      super();
      this.quick = false;
      this.required = false;
      this.errorText = "";
      this.label = "";
      this.noAsterisk = false;
      this.supportingText = "";
      this.error = false;
      this.menuPositioning = "popover";
      this.clampMenuWidth = false;
      this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME;
      this.hasLeadingIcon = false;
      this.displayText = "";
      this.menuAlign = "start";
      this[_a] = "";
      this.lastUserSetValue = null;
      this.lastUserSetSelectedIndex = null;
      this.lastSelectedOption = null;
      this.lastSelectedOptionRecords = [];
      this.nativeError = false;
      this.nativeErrorText = "";
      this.focused = false;
      this.open = false;
      this.defaultFocus = FocusState.NONE;
      this.prevOpen = this.open;
      this.selectWidth = 0;
      if (o7) {
        return;
      }
      this.addEventListener("focus", this.handleFocus.bind(this));
      this.addEventListener("blur", this.handleBlur.bind(this));
    }
    /**
     * Selects an option given the value of the option, and updates MdSelect's
     * value.
     */
    select(value2) {
      const optionToSelect = this.options.find((option) => option.value === value2);
      if (optionToSelect) {
        this.selectItem(optionToSelect);
      }
    }
    /**
     * Selects an option given the index of the option, and updates MdSelect's
     * value.
     */
    selectIndex(index) {
      const optionToSelect = this.options[index];
      if (optionToSelect) {
        this.selectItem(optionToSelect);
      }
    }
    /**
     * Reset the select to its default value.
     */
    reset() {
      for (const option of this.options) {
        option.selected = option.hasAttribute("selected");
      }
      this.updateValueAndDisplayText();
      this.nativeError = false;
      this.nativeErrorText = "";
    }
    [(_a = VALUE, onReportValidity)](invalidEvent) {
      invalidEvent?.preventDefault();
      const prevMessage = this.getErrorText();
      this.nativeError = !!invalidEvent;
      this.nativeErrorText = this.validationMessage;
      if (prevMessage === this.getErrorText()) {
        this.field?.reannounceError();
      }
    }
    update(changed) {
      if (!this.hasUpdated) {
        this.initUserSelection();
      }
      if (this.prevOpen !== this.open && this.open) {
        const selectRect = this.getBoundingClientRect();
        this.selectWidth = selectRect.width;
      }
      this.prevOpen = this.open;
      super.update(changed);
    }
    render() {
      return x`
      <span
        class="select ${e10(this.getRenderClasses())}"
        @focusout=${this.handleFocusout}>
        ${this.renderField()} ${this.renderMenu()}
      </span>
    `;
    }
    async firstUpdated(changed) {
      await this.menu?.updateComplete;
      if (!this.lastSelectedOptionRecords.length) {
        this.initUserSelection();
      }
      if (!this.lastSelectedOptionRecords.length && !o7 && !this.options.length) {
        setTimeout(() => {
          this.updateValueAndDisplayText();
        });
      }
      super.firstUpdated(changed);
    }
    getRenderClasses() {
      return {
        "disabled": this.disabled,
        "error": this.error,
        "open": this.open
      };
    }
    renderField() {
      return u5`
      <${this.fieldTag}
          aria-haspopup="listbox"
          role="combobox"
          part="field"
          id="field"
          tabindex=${this.disabled ? "-1" : "0"}
          aria-label=${this.ariaLabel || E2}
          aria-describedby="description"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="listbox"
          class="field"
          label=${this.label}
          ?no-asterisk=${this.noAsterisk}
          .focused=${this.focused || this.open}
          .populated=${!!this.displayText}
          .disabled=${this.disabled}
          .required=${this.required}
          .error=${this.hasError}
          ?has-start=${this.hasLeadingIcon}
          has-end
          supporting-text=${this.supportingText}
          error-text=${this.getErrorText()}
          @keydown=${this.handleKeydown}
          @click=${this.handleClick}>
         ${this.renderFieldContent()}
         <div id="description" slot="aria-describedby"></div>
      </${this.fieldTag}>`;
    }
    renderFieldContent() {
      return [
        this.renderLeadingIcon(),
        this.renderLabel(),
        this.renderTrailingIcon()
      ];
    }
    renderLeadingIcon() {
      return x`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
    }
    renderTrailingIcon() {
      return x`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}>
          <svg height="5" viewBox="7 10 10 5" focusable="false">
            <polygon
              class="down"
              stroke="none"
              fill-rule="evenodd"
              points="7 10 12 15 17 10"></polygon>
            <polygon
              class="up"
              stroke="none"
              fill-rule="evenodd"
              points="7 15 12 10 17 15"></polygon>
          </svg>
        </slot>
      </span>
    `;
    }
    renderLabel() {
      return x`<div id="label">${this.displayText || x`&nbsp;`}</div>`;
    }
    renderMenu() {
      const ariaLabel = this.label || this.ariaLabel;
      return x`<div class="menu-wrapper">
      <md-menu
        id="listbox"
        .defaultFocus=${this.defaultFocus}
        role="listbox"
        tabindex="-1"
        aria-label=${ariaLabel || E2}
        stay-open-on-focusout
        part="menu"
        exportparts="focus-ring: menu-focus-ring"
        anchor="field"
        style=${o13({
        "--__menu-min-width": `${this.selectWidth}px`,
        "--__menu-max-width": this.clampMenuWidth ? `${this.selectWidth}px` : void 0
      })}
        no-navigation-wrap
        .open=${this.open}
        .quick=${this.quick}
        .positioning=${this.menuPositioning}
        .typeaheadDelay=${this.typeaheadDelay}
        .anchorCorner=${this.menuAlign === "start" ? "end-start" : "end-end"}
        .menuCorner=${this.menuAlign === "start" ? "start-start" : "start-end"}
        @opening=${this.handleOpening}
        @opened=${this.redispatchEvent}
        @closing=${this.redispatchEvent}
        @closed=${this.handleClosed}
        @close-menu=${this.handleCloseMenu}
        @request-selection=${this.handleRequestSelection}
        @request-deselection=${this.handleRequestDeselection}>
        ${this.renderMenuContent()}
      </md-menu>
    </div>`;
    }
    renderMenuContent() {
      return x`<slot></slot>`;
    }
    /**
     * Handles opening the select on keydown and typahead selection when the menu
     * is closed.
     */
    handleKeydown(event) {
      if (this.open || this.disabled || !this.menu) {
        return;
      }
      const typeaheadController = this.menu.typeaheadController;
      const isOpenKey = event.code === "Space" || event.code === "ArrowDown" || event.code === "ArrowUp" || event.code === "End" || event.code === "Home" || event.code === "Enter";
      if (!typeaheadController.isTypingAhead && isOpenKey) {
        event.preventDefault();
        this.open = true;
        switch (event.code) {
          case "Space":
          case "ArrowDown":
          case "Enter":
            this.defaultFocus = FocusState.NONE;
            break;
          case "End":
            this.defaultFocus = FocusState.LAST_ITEM;
            break;
          case "ArrowUp":
          case "Home":
            this.defaultFocus = FocusState.FIRST_ITEM;
            break;
          default:
            break;
        }
        return;
      }
      const isPrintableKey = event.key.length === 1;
      if (isPrintableKey) {
        typeaheadController.onKeydown(event);
        event.preventDefault();
        const { lastActiveRecord } = typeaheadController;
        if (!lastActiveRecord) {
          return;
        }
        this.labelEl?.setAttribute?.("aria-live", "polite");
        const hasChanged = this.selectItem(lastActiveRecord[TYPEAHEAD_RECORD.ITEM]);
        if (hasChanged) {
          this.dispatchInteractionEvents();
        }
      }
    }
    handleClick() {
      this.open = !this.open;
    }
    handleFocus() {
      this.focused = true;
    }
    handleBlur() {
      this.focused = false;
    }
    /**
     * Handles closing the menu when the focus leaves the select's subtree.
     */
    handleFocusout(event) {
      if (event.relatedTarget && isElementInSubtree(event.relatedTarget, this)) {
        return;
      }
      this.open = false;
    }
    /**
     * Gets a list of all selected select options as a list item record array.
     *
     * @return An array of selected list option records.
     */
    getSelectedOptions() {
      if (!this.menu) {
        this.lastSelectedOptionRecords = [];
        return null;
      }
      const items = this.menu.items;
      this.lastSelectedOptionRecords = getSelectedItems(items);
      return this.lastSelectedOptionRecords;
    }
    async getUpdateComplete() {
      await this.menu?.updateComplete;
      return super.getUpdateComplete();
    }
    /**
     * Gets the selected options from the DOM, and updates the value and display
     * text to the first selected option's value and headline respectively.
     *
     * @return Whether or not the selected option has changed since last update.
     */
    updateValueAndDisplayText() {
      const selectedOptions = this.getSelectedOptions() ?? [];
      let hasSelectedOptionChanged = false;
      if (selectedOptions.length) {
        const [firstSelectedOption] = selectedOptions[0];
        hasSelectedOptionChanged = this.lastSelectedOption !== firstSelectedOption;
        this.lastSelectedOption = firstSelectedOption;
        this[VALUE] = firstSelectedOption.value;
        this.displayText = firstSelectedOption.displayText;
      } else {
        hasSelectedOptionChanged = this.lastSelectedOption !== null;
        this.lastSelectedOption = null;
        this[VALUE] = "";
        this.displayText = "";
      }
      return hasSelectedOptionChanged;
    }
    /**
     * Focuses and activates the last selected item upon opening, and resets other
     * active items.
     */
    async handleOpening(e11) {
      this.labelEl?.removeAttribute?.("aria-live");
      this.redispatchEvent(e11);
      if (this.defaultFocus !== FocusState.NONE) {
        return;
      }
      const items = this.menu.items;
      const activeItem = getActiveItem(items)?.item;
      let [selectedItem] = this.lastSelectedOptionRecords[0] ?? [null];
      if (activeItem && activeItem !== selectedItem) {
        activeItem.tabIndex = -1;
      }
      selectedItem = selectedItem ?? items[0];
      if (selectedItem) {
        selectedItem.tabIndex = 0;
        selectedItem.focus();
      }
    }
    redispatchEvent(e11) {
      redispatchEvent(this, e11);
    }
    handleClosed(e11) {
      this.open = false;
      this.redispatchEvent(e11);
    }
    /**
     * Determines the reason for closing, and updates the UI accordingly.
     */
    handleCloseMenu(event) {
      const reason = event.detail.reason;
      const item = event.detail.itemPath[0];
      this.open = false;
      let hasChanged = false;
      if (reason.kind === "click-selection") {
        hasChanged = this.selectItem(item);
      } else if (reason.kind === "keydown" && isSelectableKey(reason.key)) {
        hasChanged = this.selectItem(item);
      } else {
        item.tabIndex = -1;
        item.blur();
      }
      if (hasChanged) {
        this.dispatchInteractionEvents();
      }
    }
    /**
     * Selects a given option, deselects other options, and updates the UI.
     *
     * @return Whether the last selected option has changed.
     */
    selectItem(item) {
      const selectedOptions = this.getSelectedOptions() ?? [];
      selectedOptions.forEach(([option]) => {
        if (item !== option) {
          option.selected = false;
        }
      });
      item.selected = true;
      return this.updateValueAndDisplayText();
    }
    /**
     * Handles updating selection when an option element requests selection via
     * property / attribute change.
     */
    handleRequestSelection(event) {
      const requestingOptionEl = event.target;
      if (this.lastSelectedOptionRecords.some(([option]) => option === requestingOptionEl)) {
        return;
      }
      this.selectItem(requestingOptionEl);
    }
    /**
     * Handles updating selection when an option element requests deselection via
     * property / attribute change.
     */
    handleRequestDeselection(event) {
      const requestingOptionEl = event.target;
      if (!this.lastSelectedOptionRecords.some(([option]) => option === requestingOptionEl)) {
        return;
      }
      this.updateValueAndDisplayText();
    }
    /**
     * Attempts to initialize the selected option from user-settable values like
     * SSR, setting `value`, or `selectedIndex` at startup.
     */
    initUserSelection() {
      if (this.lastUserSetValue && !this.lastSelectedOptionRecords.length) {
        this.select(this.lastUserSetValue);
      } else if (this.lastUserSetSelectedIndex !== null && !this.lastSelectedOptionRecords.length) {
        this.selectIndex(this.lastUserSetSelectedIndex);
      } else {
        this.updateValueAndDisplayText();
      }
    }
    handleIconChange() {
      this.hasLeadingIcon = this.leadingIcons.length > 0;
    }
    /**
     * Dispatches the `input` and `change` events.
     */
    dispatchInteractionEvents() {
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    getErrorText() {
      return this.error ? this.errorText : this.nativeErrorText;
    }
    [getFormValue]() {
      return this.value;
    }
    formResetCallback() {
      this.reset();
    }
    formStateRestoreCallback(state) {
      this.value = state;
    }
    click() {
      this.field?.click();
    }
    [createValidator]() {
      return new SelectValidator(() => this);
    }
    [getValidityAnchor]() {
      return this.field;
    }
  };
  (() => {
    requestUpdateOnAriaChange(Select);
  })();
  Select.shadowRootOptions = {
    ...i6.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate2([
    n5({ type: Boolean })
  ], Select.prototype, "quick", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Select.prototype, "required", void 0);
  __decorate2([
    n5({ type: String, attribute: "error-text" })
  ], Select.prototype, "errorText", void 0);
  __decorate2([
    n5()
  ], Select.prototype, "label", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "no-asterisk" })
  ], Select.prototype, "noAsterisk", void 0);
  __decorate2([
    n5({ type: String, attribute: "supporting-text" })
  ], Select.prototype, "supportingText", void 0);
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], Select.prototype, "error", void 0);
  __decorate2([
    n5({ attribute: "menu-positioning" })
  ], Select.prototype, "menuPositioning", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "clamp-menu-width" })
  ], Select.prototype, "clampMenuWidth", void 0);
  __decorate2([
    n5({ type: Number, attribute: "typeahead-delay" })
  ], Select.prototype, "typeaheadDelay", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "has-leading-icon" })
  ], Select.prototype, "hasLeadingIcon", void 0);
  __decorate2([
    n5({ attribute: "display-text" })
  ], Select.prototype, "displayText", void 0);
  __decorate2([
    n5({ attribute: "menu-align" })
  ], Select.prototype, "menuAlign", void 0);
  __decorate2([
    n5()
  ], Select.prototype, "value", null);
  __decorate2([
    n5({ type: Number, attribute: "selected-index" })
  ], Select.prototype, "selectedIndex", null);
  __decorate2([
    r6()
  ], Select.prototype, "nativeError", void 0);
  __decorate2([
    r6()
  ], Select.prototype, "nativeErrorText", void 0);
  __decorate2([
    r6()
  ], Select.prototype, "focused", void 0);
  __decorate2([
    r6()
  ], Select.prototype, "open", void 0);
  __decorate2([
    r6()
  ], Select.prototype, "defaultFocus", void 0);
  __decorate2([
    e6(".field")
  ], Select.prototype, "field", void 0);
  __decorate2([
    e6("md-menu")
  ], Select.prototype, "menu", void 0);
  __decorate2([
    e6("#label")
  ], Select.prototype, "labelEl", void 0);
  __decorate2([
    o9({ slot: "leading-icon", flatten: true })
  ], Select.prototype, "leadingIcons", void 0);

  // node_modules/@material/web/select/internal/outlined-select.js
  var OutlinedSelect = class extends Select {
    constructor() {
      super(...arguments);
      this.fieldTag = i8`md-outlined-field`;
    }
  };

  // node_modules/@material/web/select/internal/outlined-select-styles.js
  var styles12 = i3`:host{--_text-field-disabled-input-text-color: var(--md-outlined-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-outlined-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-outlined-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-outlined-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-outlined-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-outlined-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-outline-color: var(--md-outlined-select-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-outline-opacity: var(--md-outlined-select-text-field-disabled-outline-opacity, 0.12);--_text-field-disabled-outline-width: var(--md-outlined-select-text-field-disabled-outline-width, 1px);--_text-field-disabled-supporting-text-color: var(--md-outlined-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-outlined-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-outlined-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-outlined-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-focus-input-text-color: var(--md-outlined-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-outlined-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-outlined-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-outline-color: var(--md-outlined-select-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-supporting-text-color: var(--md-outlined-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-outlined-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-input-text-color: var(--md-outlined-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-outlined-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-outlined-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-outline-color: var(--md-outlined-select-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-supporting-text-color: var(--md-outlined-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-outlined-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-outlined-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-outlined-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-outlined-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-outline-color: var(--md-outlined-select-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-supporting-text-color: var(--md-outlined-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-outlined-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-input-text-color: var(--md-outlined-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-outlined-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-outlined-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-outline-color: var(--md-outlined-select-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-outline-width: var(--md-outlined-select-text-field-focus-outline-width, 3px);--_text-field-focus-supporting-text-color: var(--md-outlined-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-outlined-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-input-text-color: var(--md-outlined-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-outlined-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-outlined-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-outline-color: var(--md-outlined-select-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-outline-width: var(--md-outlined-select-text-field-hover-outline-width, 1px);--_text-field-hover-supporting-text-color: var(--md-outlined-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-outlined-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-outlined-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-outlined-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-outlined-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-outlined-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-outlined-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-outlined-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-outlined-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-outlined-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-outlined-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-outlined-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-outlined-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-outlined-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-outlined-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-outlined-select-text-field-leading-icon-size, 24px);--_text-field-outline-color: var(--md-outlined-select-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_text-field-outline-width: var(--md-outlined-select-text-field-outline-width, 1px);--_text-field-supporting-text-color: var(--md-outlined-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-outlined-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-outlined-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-outlined-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-outlined-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-outlined-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-outlined-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-outlined-select-text-field-container-shape-start-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-outlined-select-text-field-container-shape-start-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-outlined-select-text-field-container-shape-end-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-start: var(--md-outlined-select-text-field-container-shape-end-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--md-outlined-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-outlined-field-content-color: var(--_text-field-input-text-color);--md-outlined-field-content-font: var(--_text-field-input-text-font);--md-outlined-field-content-line-height: var(--_text-field-input-text-line-height);--md-outlined-field-content-size: var(--_text-field-input-text-size);--md-outlined-field-content-weight: var(--_text-field-input-text-weight);--md-outlined-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_text-field-disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_text-field-disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_text-field-disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_text-field-error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_text-field-error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_text-field-error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_text-field-error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_text-field-focus-outline-color);--md-outlined-field-focus-outline-width: var(--_text-field-focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_text-field-hover-outline-color);--md-outlined-field-hover-outline-width: var(--_text-field-hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_text-field-label-text-color);--md-outlined-field-label-text-font: var(--_text-field-label-text-font);--md-outlined-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-outlined-field-label-text-size: var(--_text-field-label-text-size);--md-outlined-field-label-text-weight: var(--_text-field-label-text-weight);--md-outlined-field-leading-content-color: var(--_text-field-leading-icon-color);--md-outlined-field-outline-color: var(--_text-field-outline-color);--md-outlined-field-outline-width: var(--_text-field-outline-width);--md-outlined-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-outlined-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-outlined-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`;

  // node_modules/@material/web/select/internal/shared-styles.js
  var styles13 = i3`:host{color:unset;min-width:210px;display:flex}.field{cursor:default;outline:none}.select{position:relative;flex-direction:column}.icon.trailing svg,.icon ::slotted(*){fill:currentColor}.icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}.icon slot{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.icon.trailing :is(.up,.down){opacity:0;transition:opacity 75ms linear 75ms}.select:not(.open) .down,.select.open .up{opacity:1}.field,.select,md-menu{min-width:inherit;width:inherit;max-width:inherit;display:flex}md-menu{min-width:var(--__menu-min-width);max-width:var(--__menu-max-width, inherit)}.menu-wrapper{width:0px;height:0px;max-width:inherit}md-menu ::slotted(:not[disabled]){cursor:pointer}.field,.select{width:100%}:host{display:inline-flex}:host([disabled]){pointer-events:none}
`;

  // node_modules/@material/web/select/outlined-select.js
  var MdOutlinedSelect = class MdOutlinedSelect2 extends OutlinedSelect {
  };
  MdOutlinedSelect.styles = [styles13, styles12];
  MdOutlinedSelect = __decorate2([
    t4("md-outlined-select")
  ], MdOutlinedSelect);

  // node_modules/@material/web/menu/internal/menuitem/menu-item-styles.js
  var styles14 = i3`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}
`;

  // node_modules/@material/web/labs/item/internal/item.js
  var Item = class extends i6 {
    constructor() {
      super(...arguments);
      this.multiline = false;
    }
    render() {
      return x`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
    }
    handleTextSlotChange() {
      let isMultiline = false;
      let slotsWithContent = 0;
      for (const slot of this.textSlots) {
        if (slotHasContent(slot)) {
          slotsWithContent += 1;
        }
        if (slotsWithContent > 1) {
          isMultiline = true;
          break;
        }
      }
      this.multiline = isMultiline;
    }
  };
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], Item.prototype, "multiline", void 0);
  __decorate2([
    r7(".text slot")
  ], Item.prototype, "textSlots", void 0);
  function slotHasContent(slot) {
    for (const node of slot.assignedNodes({ flatten: true })) {
      const isElement = node.nodeType === Node.ELEMENT_NODE;
      const isTextWithContent = node.nodeType === Node.TEXT_NODE && node.textContent?.match(/\S/);
      if (isElement || isTextWithContent) {
        return true;
      }
    }
    return false;
  }

  // node_modules/@material/web/labs/item/internal/item-styles.js
  var styles15 = i3`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;

  // node_modules/@material/web/labs/item/item.js
  var MdItem = class MdItem2 extends Item {
  };
  MdItem.styles = [styles15];
  MdItem = __decorate2([
    t4("md-item")
  ], MdItem);

  // node_modules/@material/web/menu/internal/controllers/menuItemController.js
  var MenuItemController = class {
    /**
     * @param host The MenuItem in which to attach this controller to.
     * @param config The object that configures this controller's behavior.
     */
    constructor(host, config) {
      this.host = host;
      this.internalTypeaheadText = null;
      this.onClick = () => {
        if (this.host.keepOpen)
          return;
        this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
          kind: CloseReason.CLICK_SELECTION
        }));
      };
      this.onKeydown = (event) => {
        if (this.host.href && event.code === "Enter") {
          const interactiveElement = this.getInteractiveElement();
          if (interactiveElement instanceof HTMLAnchorElement) {
            interactiveElement.click();
          }
        }
        if (event.defaultPrevented)
          return;
        const keyCode = event.code;
        if (this.host.keepOpen && keyCode !== "Escape")
          return;
        if (isClosableKey(keyCode)) {
          event.preventDefault();
          this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
            kind: CloseReason.KEYDOWN,
            key: keyCode
          }));
        }
      };
      this.getHeadlineElements = config.getHeadlineElements;
      this.getSupportingTextElements = config.getSupportingTextElements;
      this.getDefaultElements = config.getDefaultElements;
      this.getInteractiveElement = config.getInteractiveElement;
      this.host.addController(this);
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot, and if there are
     * no slotted elements into headline, then it checks the _default_ slot, and
     * then the `"supporting-text"` slot if nothing is in _default_.
     */
    get typeaheadText() {
      if (this.internalTypeaheadText !== null) {
        return this.internalTypeaheadText;
      }
      const headlineElements = this.getHeadlineElements();
      const textParts = [];
      headlineElements.forEach((headlineElement) => {
        if (headlineElement.textContent && headlineElement.textContent.trim()) {
          textParts.push(headlineElement.textContent.trim());
        }
      });
      if (textParts.length === 0) {
        this.getDefaultElements().forEach((defaultElement) => {
          if (defaultElement.textContent && defaultElement.textContent.trim()) {
            textParts.push(defaultElement.textContent.trim());
          }
        });
      }
      if (textParts.length === 0) {
        this.getSupportingTextElements().forEach((supportingTextElement) => {
          if (supportingTextElement.textContent && supportingTextElement.textContent.trim()) {
            textParts.push(supportingTextElement.textContent.trim());
          }
        });
      }
      return textParts.join(" ");
    }
    /**
     * The recommended tag name to render as the list item.
     */
    get tagName() {
      const type = this.host.type;
      switch (type) {
        case "link":
          return "a";
        case "button":
          return "button";
        default:
        case "menuitem":
        case "option":
          return "li";
      }
    }
    /**
     * The recommended role of the menu item.
     */
    get role() {
      return this.host.type === "option" ? "option" : "menuitem";
    }
    hostConnected() {
      this.host.toggleAttribute("md-menu-item", true);
    }
    hostUpdate() {
      if (this.host.href) {
        this.host.type = "link";
      }
    }
    /**
     * Use to set the typeaheadText when it changes.
     */
    setTypeaheadText(text2) {
      this.internalTypeaheadText = text2;
    }
  };

  // node_modules/@material/web/select/internal/selectoption/selectOptionController.js
  function createRequestSelectionEvent() {
    return new Event("request-selection", {
      bubbles: true,
      composed: true
    });
  }
  function createRequestDeselectionEvent() {
    return new Event("request-deselection", {
      bubbles: true,
      composed: true
    });
  }
  var SelectOptionController = class {
    /**
     * The recommended role of the select option.
     */
    get role() {
      return this.menuItemController.role;
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot, and if there are
     * no slotted elements into headline, then it checks the _default_ slot, and
     * then the `"supporting-text"` slot if nothing is in _default_.
     */
    get typeaheadText() {
      return this.menuItemController.typeaheadText;
    }
    setTypeaheadText(text2) {
      this.menuItemController.setTypeaheadText(text2);
    }
    /**
     * The text that is displayed in the select field when selected. If not set,
     * defaults to the textContent of the item slotted into the `"headline"` slot,
     * and if there are no slotted elements into headline, then it checks the
     * _default_ slot, and then the `"supporting-text"` slot if nothing is in
     * _default_.
     */
    get displayText() {
      if (this.internalDisplayText !== null) {
        return this.internalDisplayText;
      }
      return this.menuItemController.typeaheadText;
    }
    setDisplayText(text2) {
      this.internalDisplayText = text2;
    }
    /**
     * @param host The SelectOption in which to attach this controller to.
     * @param config The object that configures this controller's behavior.
     */
    constructor(host, config) {
      this.host = host;
      this.internalDisplayText = null;
      this.lastSelected = this.host.selected;
      this.firstUpdate = true;
      this.onClick = () => {
        this.menuItemController.onClick();
      };
      this.onKeydown = (e11) => {
        this.menuItemController.onKeydown(e11);
      };
      this.menuItemController = new MenuItemController(host, config);
      host.addController(this);
    }
    hostUpdate() {
      if (this.lastSelected !== this.host.selected) {
        this.host.ariaSelected = this.host.selected ? "true" : "false";
      }
    }
    hostUpdated() {
      if (this.lastSelected !== this.host.selected && !this.firstUpdate) {
        if (this.host.selected) {
          this.host.dispatchEvent(createRequestSelectionEvent());
        } else {
          this.host.dispatchEvent(createRequestDeselectionEvent());
        }
      }
      this.lastSelected = this.host.selected;
      this.firstUpdate = false;
    }
  };

  // node_modules/@material/web/select/internal/selectoption/select-option.js
  var SelectOptionEl = class extends i6 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.isMenuItem = true;
      this.selected = false;
      this.value = "";
      this.type = "option";
      this.selectOptionController = new SelectOptionController(this, {
        getHeadlineElements: () => {
          return this.headlineElements;
        },
        getSupportingTextElements: () => {
          return this.supportingTextElements;
        },
        getDefaultElements: () => {
          return this.defaultElements;
        },
        getInteractiveElement: () => this.listItemRoot
      });
    }
    /**
     * The text that is selectable via typeahead. If not set, defaults to the
     * innerText of the item slotted into the `"headline"` slot.
     */
    get typeaheadText() {
      return this.selectOptionController.typeaheadText;
    }
    set typeaheadText(text2) {
      this.selectOptionController.setTypeaheadText(text2);
    }
    /**
     * The text that is displayed in the select field when selected. If not set,
     * defaults to the textContent of the item slotted into the `"headline"` slot.
     */
    get displayText() {
      return this.selectOptionController.displayText;
    }
    set displayText(text2) {
      this.selectOptionController.setDisplayText(text2);
    }
    render() {
      return this.renderListItem(x`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
    }
    /**
     * Renders the root list item.
     *
     * @param content the child content of the list item.
     */
    renderListItem(content) {
      return x`
      <li
        id="item"
        tabindex=${this.disabled ? -1 : 0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel || E2}
        aria-selected=${this.ariaSelected || E2}
        aria-checked=${this.ariaChecked || E2}
        aria-expanded=${this.ariaExpanded || E2}
        aria-haspopup=${this.ariaHasPopup || E2}
        class="list-item ${e10(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
        >${content}</li
      >
    `;
    }
    /**
     * Handles rendering of the ripple element.
     */
    renderRipple() {
      return x` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`;
    }
    /**
     * Handles rendering of the focus ring.
     */
    renderFocusRing() {
      return x` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
    }
    /**
     * Classes applied to the list item root.
     */
    getRenderClasses() {
      return {
        "disabled": this.disabled,
        "selected": this.selected
      };
    }
    /**
     * Handles rendering the headline and supporting text.
     */
    renderBody() {
      return x`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
    }
    focus() {
      this.listItemRoot?.focus();
    }
  };
  (() => {
    requestUpdateOnAriaChange(SelectOptionEl);
  })();
  SelectOptionEl.shadowRootOptions = {
    ...i6.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], SelectOptionEl.prototype, "disabled", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "md-menu-item", reflect: true })
  ], SelectOptionEl.prototype, "isMenuItem", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], SelectOptionEl.prototype, "selected", void 0);
  __decorate2([
    n5()
  ], SelectOptionEl.prototype, "value", void 0);
  __decorate2([
    e6(".list-item")
  ], SelectOptionEl.prototype, "listItemRoot", void 0);
  __decorate2([
    o9({ slot: "headline" })
  ], SelectOptionEl.prototype, "headlineElements", void 0);
  __decorate2([
    o9({ slot: "supporting-text" })
  ], SelectOptionEl.prototype, "supportingTextElements", void 0);
  __decorate2([
    n6({ slot: "" })
  ], SelectOptionEl.prototype, "defaultElements", void 0);
  __decorate2([
    n5({ attribute: "typeahead-text" })
  ], SelectOptionEl.prototype, "typeaheadText", null);
  __decorate2([
    n5({ attribute: "display-text" })
  ], SelectOptionEl.prototype, "displayText", null);

  // node_modules/@material/web/select/select-option.js
  var MdSelectOption = class MdSelectOption2 extends SelectOptionEl {
  };
  MdSelectOption.styles = [styles14];
  MdSelectOption = __decorate2([
    t4("md-select-option")
  ], MdSelectOption);

  // node_modules/@jsfe/material/dist/esm/widgets/select.js
  var select = (options) => x`
	<md-outlined-select
		?required=${options.required}
		.label=${options.label ?? ""}
		part="field-select"
		@input=${(event) => {
    let newValue = event.target.value;
    if (Array.isArray(newValue))
      return;
    if (options.type === "number" || options.type === "integer") {
      newValue = Number(newValue);
    }
    options.valueChangedCallback?.(newValue);
  }}
		class="material"
		>${options.enum?.map((enumValue, i10) => x`<md-select-option .value=${String(enumValue)}>
					${enumValue}
				</md-select-option>`)}</md-outlined-select
	>
`;

  // node_modules/@material/web/internal/controller/form-submitter.js
  function setupFormSubmitter(ctor) {
    if (o7) {
      return;
    }
    ctor.addInitializer((instance) => {
      const submitter = instance;
      submitter.addEventListener("click", async (event) => {
        const { type, [internals]: elementInternals } = submitter;
        const { form } = elementInternals;
        if (!form || type === "button") {
          return;
        }
        await new Promise((resolve) => {
          setTimeout(resolve);
        });
        if (event.defaultPrevented) {
          return;
        }
        if (type === "reset") {
          form.reset();
          return;
        }
        form.addEventListener("submit", (submitEvent) => {
          Object.defineProperty(submitEvent, "submitter", {
            configurable: true,
            enumerable: true,
            get: () => submitter
          });
        }, { capture: true, once: true });
        elementInternals.setFormValue(submitter.value);
        form.requestSubmit();
      });
    });
  }

  // node_modules/@material/web/button/internal/button.js
  var buttonBaseClass = mixinElementInternals(i6);
  var Button = class extends buttonBaseClass {
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(name) {
      this.setAttribute("name", name);
    }
    /**
     * The associated form element with which this element's value will submit.
     */
    get form() {
      return this[internals].form;
    }
    constructor() {
      super();
      this.disabled = false;
      this.href = "";
      this.target = "";
      this.trailingIcon = false;
      this.hasIcon = false;
      this.type = "submit";
      this.value = "";
      this.handleActivationClick = (event) => {
        if (!isActivationClick(event) || !this.buttonElement) {
          return;
        }
        this.focus();
        dispatchActivationClick(this.buttonElement);
      };
      if (!o7) {
        this.addEventListener("click", this.handleActivationClick);
      }
    }
    focus() {
      this.buttonElement?.focus();
    }
    blur() {
      this.buttonElement?.blur();
    }
    render() {
      const isDisabled = this.disabled && !this.href;
      const buttonOrLink = this.href ? this.renderLink() : this.renderButton();
      const buttonId = this.href ? "link" : "button";
      return x`
      ${this.renderElevationOrOutline?.()}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${buttonId}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${buttonId}
        ?disabled="${isDisabled}"></md-ripple>
      ${buttonOrLink}
    `;
    }
    renderButton() {
      const { ariaLabel, ariaHasPopup, ariaExpanded } = this;
      return x`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-label="${ariaLabel || E2}"
      aria-haspopup="${ariaHasPopup || E2}"
      aria-expanded="${ariaExpanded || E2}">
      ${this.renderContent()}
    </button>`;
    }
    renderLink() {
      const { ariaLabel, ariaHasPopup, ariaExpanded } = this;
      return x`<a
      id="link"
      class="button"
      aria-label="${ariaLabel || E2}"
      aria-haspopup="${ariaHasPopup || E2}"
      aria-expanded="${ariaExpanded || E2}"
      href=${this.href}
      target=${this.target || E2}
      >${this.renderContent()}
    </a>`;
    }
    renderContent() {
      const icon = x`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;
      return x`
      <span class="touch"></span>
      ${this.trailingIcon ? E2 : icon}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon ? icon : E2}
    `;
    }
    handleSlotChange() {
      this.hasIcon = this.assignedIcons.length > 0;
    }
  };
  (() => {
    requestUpdateOnAriaChange(Button);
    setupFormSubmitter(Button);
  })();
  Button.formAssociated = true;
  Button.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true
  };
  __decorate2([
    n5({ type: Boolean, reflect: true })
  ], Button.prototype, "disabled", void 0);
  __decorate2([
    n5()
  ], Button.prototype, "href", void 0);
  __decorate2([
    n5()
  ], Button.prototype, "target", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "trailing-icon", reflect: true })
  ], Button.prototype, "trailingIcon", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "has-icon", reflect: true })
  ], Button.prototype, "hasIcon", void 0);
  __decorate2([
    n5()
  ], Button.prototype, "type", void 0);
  __decorate2([
    n5({ reflect: true })
  ], Button.prototype, "value", void 0);
  __decorate2([
    e6(".button")
  ], Button.prototype, "buttonElement", void 0);
  __decorate2([
    o9({ slot: "icon", flatten: true })
  ], Button.prototype, "assignedIcons", void 0);

  // node_modules/@material/web/button/internal/filled-button.js
  var FilledButton = class extends Button {
    renderElevationOrOutline() {
      return x`<md-elevation part="elevation"></md-elevation>`;
    }
  };

  // node_modules/@material/web/button/internal/filled-styles.js
  var styles16 = i3`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;

  // node_modules/@material/web/button/internal/shared-elevation-styles.js
  var styles17 = i3`md-elevation{transition-duration:280ms}:host([disabled]) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host([disabled]) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;

  // node_modules/@material/web/button/internal/shared-styles.js
  var styles18 = i3`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host([disabled]){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background-color:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host([disabled]) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host([disabled]) .background{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host([disabled]){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([disabled]) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;

  // node_modules/@material/web/button/filled-button.js
  var MdFilledButton = class MdFilledButton2 extends FilledButton {
  };
  MdFilledButton.styles = [
    styles18,
    styles17,
    styles16
  ];
  MdFilledButton = __decorate2([
    t4("md-filled-button")
  ], MdFilledButton);

  // node_modules/@jsfe/material/dist/esm/widgets/submit.js
  var submit = (options) => x`
	<!--  -->
	<div id=${options.id} class="theme-material widget-submit">
		<md-filled-button type="submit"
			>${options.label ?? "Submit"}</md-filled-button
		>
	</div>
`;

  // node_modules/@material/web/internal/events/dispatch-hooks.js
  var dispatchHooks = Symbol("dispatchHooks");
  function afterDispatch(event, callback) {
    const hooks = event[dispatchHooks];
    if (!hooks) {
      throw new Error(`'${event.type}' event needs setupDispatchHooks().`);
    }
    hooks.addEventListener("after", callback);
  }
  var ELEMENT_DISPATCH_HOOK_TYPES = /* @__PURE__ */ new WeakMap();
  function setupDispatchHooks(element, ...eventTypes) {
    let typesAlreadySetUp = ELEMENT_DISPATCH_HOOK_TYPES.get(element);
    if (!typesAlreadySetUp) {
      typesAlreadySetUp = /* @__PURE__ */ new Set();
      ELEMENT_DISPATCH_HOOK_TYPES.set(element, typesAlreadySetUp);
    }
    for (const eventType of eventTypes) {
      if (typesAlreadySetUp.has(eventType)) {
        continue;
      }
      let isRedispatching = false;
      element.addEventListener(eventType, (event) => {
        if (isRedispatching) {
          return;
        }
        event.stopImmediatePropagation();
        const eventCopy = Reflect.construct(event.constructor, [
          event.type,
          event
        ]);
        const hooks = new EventTarget();
        eventCopy[dispatchHooks] = hooks;
        isRedispatching = true;
        const dispatched = element.dispatchEvent(eventCopy);
        isRedispatching = false;
        if (!dispatched) {
          event.preventDefault();
        }
        hooks.dispatchEvent(new Event("after"));
      }, {
        // Ensure this listener runs before other listeners.
        // `setupDispatchHooks()` should be called in constructors to also
        // ensure they run before any other externally-added capture listeners.
        capture: true
      });
      typesAlreadySetUp.add(eventType);
    }
  }

  // node_modules/@material/web/switch/internal/switch.js
  var switchBaseClass = mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(i6)));
  var Switch = class extends switchBaseClass {
    constructor() {
      super();
      this.selected = false;
      this.icons = false;
      this.showOnlySelectedIcon = false;
      this.required = false;
      this.value = "on";
      if (o7) {
        return;
      }
      this.addEventListener("click", (event) => {
        if (!isActivationClick(event) || !this.input) {
          return;
        }
        this.focus();
        dispatchActivationClick(this.input);
      });
      setupDispatchHooks(this, "keydown");
      this.addEventListener("keydown", (event) => {
        afterDispatch(event, () => {
          const ignoreEvent = event.defaultPrevented || event.key !== "Enter";
          if (ignoreEvent || this.disabled || !this.input) {
            return;
          }
          this.input.click();
        });
      });
    }
    render() {
      return x`
      <div class="switch ${e10(this.getRenderClasses())}">
        <input
          id="switch"
          class="touch"
          type="checkbox"
          role="switch"
          aria-label=${this.ariaLabel || E2}
          ?checked=${this.selected}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <md-focus-ring part="focus-ring" for="switch"></md-focus-ring>
        <span class="track"> ${this.renderHandle()} </span>
      </div>
    `;
    }
    getRenderClasses() {
      return {
        "selected": this.selected,
        "unselected": !this.selected,
        "disabled": this.disabled
      };
    }
    renderHandle() {
      const classes = {
        "with-icon": this.showOnlySelectedIcon ? this.selected : this.icons
      };
      return x`
      ${this.renderTouchTarget()}
      <span class="handle-container">
        <md-ripple for="switch" ?disabled="${this.disabled}"></md-ripple>
        <span class="handle ${e10(classes)}">
          ${this.shouldShowIcons() ? this.renderIcons() : x``}
        </span>
      </span>
    `;
    }
    renderIcons() {
      return x`
      <div class="icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon ? x`` : this.renderOffIcon()}
      </div>
    `;
    }
    /**
     * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acheck%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
     */
    renderOnIcon() {
      return x`
      <slot class="icon icon--on" name="on-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
        </svg>
      </slot>
    `;
    }
    /**
     * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aclose%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
     */
    renderOffIcon() {
      return x`
      <slot class="icon icon--off" name="off-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
        </svg>
      </slot>
    `;
    }
    renderTouchTarget() {
      return x`<span class="touch"></span>`;
    }
    shouldShowIcons() {
      return this.icons || this.showOnlySelectedIcon;
    }
    handleInput(event) {
      const target = event.target;
      this.selected = target.checked;
    }
    handleChange(event) {
      redispatchEvent(this, event);
    }
    [getFormValue]() {
      return this.selected ? this.value : null;
    }
    [getFormState]() {
      return String(this.selected);
    }
    formResetCallback() {
      this.selected = this.hasAttribute("selected");
    }
    formStateRestoreCallback(state) {
      this.selected = state === "true";
    }
    [createValidator]() {
      return new CheckboxValidator(() => ({
        checked: this.selected,
        required: this.required
      }));
    }
    [getValidityAnchor]() {
      return this.input;
    }
  };
  (() => {
    requestUpdateOnAriaChange(Switch);
  })();
  Switch.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true
  };
  __decorate2([
    n5({ type: Boolean })
  ], Switch.prototype, "selected", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Switch.prototype, "icons", void 0);
  __decorate2([
    n5({ type: Boolean, attribute: "show-only-selected-icon" })
  ], Switch.prototype, "showOnlySelectedIcon", void 0);
  __decorate2([
    n5({ type: Boolean })
  ], Switch.prototype, "required", void 0);
  __decorate2([
    n5()
  ], Switch.prototype, "value", void 0);
  __decorate2([
    e6("input")
  ], Switch.prototype, "input", void 0);

  // node_modules/@material/web/switch/internal/switch-styles.js
  var styles19 = i3`@layer styles, hcm;@layer styles{:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-switch-track-height, 32px))/2) 0px}md-focus-ring{--md-focus-ring-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}.switch{align-items:center;display:inline-flex;flex-shrink:0;position:relative;width:var(--md-switch-track-width, 52px);height:var(--md-switch-track-height, 32px);border-start-start-radius:var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}input{appearance:none;height:48px;outline:none;margin:0;position:absolute;width:100%;z-index:1;cursor:inherit}:host([touch-target=none]) input{display:none}}@layer styles{.track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center}.track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms}.disabled .track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.disabled .track::before,.disabled .track::after{transition:none;opacity:var(--md-switch-disabled-track-opacity, 0.12)}.disabled .track::before{background-clip:content-box}.selected .track::before{background-color:var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4))}.selected:hover .track::before{background-color:var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4))}.selected:focus-within .track::before{background-color:var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4))}.selected:active .track::before{background-color:var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4))}.selected.disabled .track{background-clip:border-box}.selected.disabled .track::before{background-color:var(--md-switch-disabled-selected-track-color, var(--md-sys-color-on-surface, #1d1b20))}.unselected .track::before{background-color:var(--md-switch-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-track-outline-color, var(--md-sys-color-outline, #79747e));border-style:solid;border-width:var(--md-switch-track-outline-width, 2px)}.unselected:hover .track::before{background-color:var(--md-switch-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-hover-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:focus-visible .track::before{background-color:var(--md-switch-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-focus-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:active .track::before{background-color:var(--md-switch-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-pressed-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected.disabled .track::before{background-color:var(--md-switch-disabled-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-disabled-track-outline-color, var(--md-sys-color-on-surface, #1d1b20))}}@layer hcm{@media(forced-colors: active){.selected .track::before{background:ButtonText;border-color:ButtonText}.disabled .track::before{border-color:GrayText;opacity:1}.disabled.selected .track::before{background:GrayText}}}@layer styles{.handle-container{display:flex;place-content:center;place-items:center;position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selected .handle-container{margin-inline-start:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.unselected .handle-container{margin-inline-end:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.disabled .handle-container{transition:none}.handle{border-start-start-radius:var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));height:var(--md-switch-handle-height, 16px);width:var(--md-switch-handle-width, 16px);transform-origin:center;transition-property:height,width;transition-duration:250ms,250ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1);z-index:0}.handle::before{content:"";display:flex;inset:0;position:absolute;border-radius:inherit;box-sizing:border-box;transition:background-color 67ms linear}.disabled .handle,.disabled .handle::before{transition:none}.selected .handle{height:var(--md-switch-selected-handle-height, 24px);width:var(--md-switch-selected-handle-width, 24px)}.handle.with-icon{height:var(--md-switch-with-icon-handle-height, 24px);width:var(--md-switch-with-icon-handle-width, 24px)}.selected:not(.disabled):active .handle,.unselected:not(.disabled):active .handle{height:var(--md-switch-pressed-handle-height, 28px);width:var(--md-switch-pressed-handle-width, 28px);transition-timing-function:linear;transition-duration:100ms}.selected .handle::before{background-color:var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff))}.selected:hover .handle::before{background-color:var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:focus-within .handle::before{background-color:var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:active .handle::before{background-color:var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected.disabled .handle::before{background-color:var(--md-switch-disabled-selected-handle-color, var(--md-sys-color-surface, #fef7ff));opacity:var(--md-switch-disabled-selected-handle-opacity, 1)}.unselected .handle::before{background-color:var(--md-switch-handle-color, var(--md-sys-color-outline, #79747e))}.unselected:hover .handle::before{background-color:var(--md-switch-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:focus-within .handle::before{background-color:var(--md-switch-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:active .handle::before{background-color:var(--md-switch-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected.disabled .handle::before{background-color:var(--md-switch-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-handle-opacity, 0.38)}md-ripple{border-radius:var(--md-switch-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-switch-state-layer-size, 40px);inset:unset;width:var(--md-switch-state-layer-size, 40px)}.selected md-ripple{--md-ripple-hover-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12)}.unselected md-ripple{--md-ripple-hover-color: var(--md-switch-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-color: var(--md-switch-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-switch-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-pressed-state-layer-opacity, 0.12)}}@layer hcm{@media(forced-colors: active){.unselected .handle::before{background:ButtonText}.disabled .handle::before{opacity:1}.disabled.unselected .handle::before{background:GrayText}}}@layer styles{.icons{position:relative;height:100%;width:100%}.icon{position:absolute;inset:0;margin:auto;display:flex;align-items:center;justify-content:center;fill:currentColor;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.disabled .icon{transition:none}.selected .icon--on,.unselected .icon--off{opacity:1}.unselected .handle:not(.with-icon) .icon--on{transform:rotate(-45deg)}.icon--off{width:var(--md-switch-icon-size, 16px);height:var(--md-switch-icon-size, 16px);color:var(--md-switch-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:hover .icon--off{color:var(--md-switch-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:focus-within .icon--off{color:var(--md-switch-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:active .icon--off{color:var(--md-switch-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected.disabled .icon--off{color:var(--md-switch-disabled-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));opacity:var(--md-switch-disabled-icon-opacity, 0.38)}.icon--on{width:var(--md-switch-selected-icon-size, 16px);height:var(--md-switch-selected-icon-size, 16px);color:var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:hover .icon--on{color:var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:focus-within .icon--on{color:var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:active .icon--on{color:var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected.disabled .icon--on{color:var(--md-switch-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon--off{fill:Canvas}.icon--on{fill:ButtonText}.disabled.unselected .icon--off,.disabled.selected .icon--on{opacity:1}.disabled .icon--on{fill:GrayText}}}
`;

  // node_modules/@material/web/switch/switch.js
  var MdSwitch = class MdSwitch2 extends Switch {
  };
  MdSwitch.styles = [styles19];
  MdSwitch = __decorate2([
    t4("md-switch")
  ], MdSwitch);

  // node_modules/@jsfe/material/dist/esm/widgets/switch.js
  var switchh = (options) => x`
	<label
		for=${options.id}
		class="theme-material widget-switch widget-toggle"
		part="widget-switch widget-toggle"
	>
		<div>
			<div>${options.label}</div>
			<small>${options.helpText}</small>
		</div>

		<md-switch
			.id=${options.id}
			.name=${options.id}
			.required=${options.required ?? false}
			.selected=${options.value ?? false}
			@input=${(event) => {
    const { selected } = event.target;
    console.log({ selected });
    options.valueChangedCallback?.(!selected);
  }}
			@keydown=${options.handleKeydown}
		>
		</md-switch>
		<!--  -->
	</label>
`;

  // node_modules/@jsfe/material/dist/esm/widgets/text.js
  var text = (options) => x`
	<md-outlined-text-field
		.type=${options.inputType}
		.supportingText=${options.helpText}
		.id=${options.id}
		.label=${options.label}
		maxLength=${o14(options.maxLength)}
		minLength=${o14(options.minLength)}
		.name=${options.id}
		pattern=${o14(options.pattern)}
		.placeholder=${options.placeholder}
		.required=${options.required}
		.value=${options.value ?? ""}
		@input=${(event) => {
    const { value: newValue } = event.target;
    options.valueChangedCallback?.(newValue);
  }}
		@keydown=${options.handleKeydown}
	>
	</md-outlined-text-field>
`;

  // node_modules/@jsfe/material/dist/esm/widgets/textarea.js
  var textarea = (options) => x`
	<md-outlined-text-field
		.type=${"textarea"}
		.supportingText=${options.helpText}
		.id=${options.id}
		.label=${options.label}
		maxLength=${o14(options.maxLength)}
		minLength=${o14(options.minLength)}
		.name=${options.id}
		pattern=${o14(options.pattern)}
		.placeholder=${options.placeholder}
		.required=${options.required}
		value=${o14(options.value)}
		@input=${(event) => {
    const { value: newValue } = event.target;
    options.valueChangedCallback?.(newValue);
  }}
		rows=${4}
	>
	</md-outlined-text-field>
`;

  // node_modules/@jsfe/material/dist/esm/styles.js
  var styles20 = i3`:host {
  --md-ref-typeface-brand: "Roboto";
  --md-ref-typeface-plain: system-ui;
}

.theme-material {
  font-family: Roboto, system-ui;
}

.theme-material.widget-fieldset {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5em 0;
  padding: 2em 1em;
  margin: 0;
  font-weight: 300;
  border: none;
  border-radius: 1rem;
  transition-timing-function: ease-in-out;
  transition-duration: 250ms;
  --md-sys-color-shadow: var(--md-sys-color-inverse-on-surface);
  --md-elevation-level: 0;
}
.theme-material.widget-fieldset legend {
  width: 100%;
  font-size: 1.5em;
  border-bottom: 1px solid var(--md-sys-color-inverse-on-surface);
}
.theme-material.widget-fieldset .widget-object__description {
  margin: 0 0 1rem 0;
  opacity: 0.75;
}
.theme-material.widget-fieldset:hover {
  --md-elevation-level: 4;
}

.theme-material.widget-toggle {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem;
  user-select: none;
}
.theme-material.widget-toggle small {
  color: var(--md-sys-color-on-surface-variant);
}
.theme-material.widget-toggle + .theme-material.widget-toggle {
  border-top: 1px solid var(--md-sys-color-inverse-on-surface);
  margin-top: -0.5rem;
  padding-top: 1.5rem;
}

.theme-material.widget-array {
  --md-sys-color-shadow: var(--md-sys-color-inverse-on-surface);
  --md-elevation-level: 0;
}
.theme-material.widget-array:hover {
  --md-elevation-level: 4;
}
.theme-material.widget-array .widget-array__card {
  width: 100%;
  transition: box-shadow var(--sl-transition-medium);
}
.theme-material.widget-array .widget-array__card:hover {
  box-shadow: var(--sl-shadow-medium);
}
.theme-material.widget-array .widget-array__card[data-dropzone] {
  border-radius: var(--sl-border-radius-medium);
  outline: 1px solid var(--sl-color-primary-500);
}
.theme-material.widget-array .widget-array__card[data-dropzone] * {
  pointer-events: none;
}
.theme-material.widget-array sl-card::part(body) {
  padding: var(--sl-spacing-medium) var(--sl-spacing-small);
}
.theme-material.widget-array .widget-array__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8em;
  user-select: none;
}
.theme-material.widget-array .widget-array__header sl-tag::part(base) {
  background: var(--sl-color-neutral-100);
}
.theme-material.widget-array .widget-array__handle {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  padding-left: var(--sl-spacing-2x-small);
  margin: 0 var(--sl-spacing-medium) 0 0;
  font-size: 1.25em;
  color: var(--sl-color-neutral-500);
  cursor: move;
  transition: opacity, var(--sl-transition-fast);
}
.theme-material.widget-array .widget-array__handle:hover {
  color: var(--sl-color-neutral-600);
  background: var(--sl-color-neutral-100);
  border-radius: var(--sl-border-radius-x-large);
  transition: var(--sl-transition-medium);
}
.theme-material.widget-array .widget-array__handle:active {
  user-select: none;
}
.theme-material.widget-array .widget-array__handle .widget-array__handle-grip {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}
.theme-material.widget-array .widget-array__add-zone {
  display: flex;
  padding: var(--sl-spacing-2x-large) var(--sl-spacing-2x-large);
  border: 2px dashed var(--sl-color-gray-100);
  border-radius: var(--sl-border-radius-large);
  box-shadow: var(--sl-shadow-large) inset;
}
.theme-material.widget-array .widget-array__add-zone > sl-button {
  width: 100%;
}

/* Callouts */
.theme-material[part=widget-callout] {
  position: relative;
  padding: 1rem 1.5rem 1rem 2rem;
  margin: 1rem 0;
  color: var(--md-sys-color-error);
  border: solid 1px var(--md-sys-color-error);
  border-color: var(--md-sys-color-error-container);
  border-left: solid 3px var(--md-sys-color-error);
  border-radius: 0.25rem;
}
.theme-material[part=widget-callout] > :first-child {
  margin-top: 0;
}
.theme-material[part=widget-callout] > :last-child {
  margin-bottom: 0;
}
.theme-material[part=widget-callout]::before {
  position: absolute;
  top: calc(50% - 0.8rem);
  left: calc(-0.8rem - 2px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  clip-path: circle(50% at 50% 50%);
  color: var(--md-sys-color-on-error);
  content: "";
}
.theme-material[part=widget-callout].callout--warning::before {
  content: "!";
  background-color: var(--md-sys-color-error);
}

.theme-material.widget-range {
  display: flex;
  display: inline-flex;
  flex-direction: column;
  gap: 0;
  /* place-items: center; */
  gap: 8px;
  place-items: flex-start;
  width: 100%;
  font-family: Roboto, system-ui;
  color: var(--md-sys-color-on-background, #000);
}

md-slider {
  width: 100%;
  /* --md-slider-focus-handle-color: red; */
  --md-slider-active-track-color: var(--md-sys-color-primary);
  --md-slider-inactive-track-color: var(--md-sys-on-surface);
}

.theme-material.widget-submit {
  display: flex;
  justify-content: center;
  margin: var(--sl-spacing-2x-large) 0;
  font-size: 4em;
}
`;

  // node_modules/@jsfe/material/dist/esm/form.js
  var JsfMaterial = class extends Jsf {
    constructor() {
      super(...arguments);
      this.widgets = widgets_exports;
      this.styleSheets = [styles20];
    }
  };

  // node_modules/@jsfe/material/dist/esm/form.def.js
  customElements.define("jsf-material", JsfMaterial);

  // src/stops.js
  async function initStops(container) {
    container.innerHTML = `
    <h2>Stops</h2>
    <div id="stops-table">
    </div>
    <div id="stops-form">
    </div>
  `;
    const formSchema = {
      title: "",
      description: "Add bus new stop",
      properties: {
        Location: {
          type: "string"
        }
      }
    };
    const formEl = document.createElement("jsf-material");
    formEl.schema = formSchema;
    formEl.submitCallback = async (newData, valid) => {
      console.info({ newData, valid });
      try {
        await createStop(newData.Location);
        i.success({ title: "Success", description: "Stop created successfully", duration: 1e4 });
        await renderTable();
      } catch (err) {
        i.error({ title: "Error", description: err.message, duration: 1e4 });
      }
    };
    formEl.data = {
      Location: "Stop location"
    };
    document.getElementById("stops-form").appendChild(formEl);
    async function renderTable() {
      const stops = await getStops();
      const table = document.createElement("active-table");
      table.isCellTextEditable = false;
      table.displayAddNewColumn = false;
      table.displayAddNewRow = false;
      table.columnDropdown = { "displaySettings": { "isAvailable": false } };
      table.rowDropdown = {
        displaySettings: { "isAvailable": true },
        isInsertUpAvailable: false,
        isInsertDownAvailable: false,
        isMoveAvailable: false,
        isDeleteAvailable: true,
        canEditHeaderRow: false
      };
      table.frameComponentsStyles = { "style": { "hoverColors": { "backgroundColor": "white" } } };
      table.headerStyles = { "hoverColors": { "backgroundColor": "white" } };
      table.tableStyle = { "borderRadius": "2px", "width": "100%" };
      table.data = [
        ["ID", "Location"],
        ...stops.map((s6) => [String(s6.id), s6.location])
      ];
      let lastIDs = [];
      table.onDataUpdate = async (dataUpdate) => {
        console.log(dataUpdate);
        let IDs = [];
        dataUpdate.forEach((x2) => IDs.push(x2[0]));
        lastIDs.forEach(async (x2) => {
          if (!IDs.includes(x2)) {
            try {
              await removeStop(x2);
              i.success({ title: "Success", description: "Stop removed successfully", duration: 1e4 });
            } catch (err) {
              i.error({ title: "Error", description: err.message, duration: 1e4 });
            }
          }
        });
        lastIDs = [];
        dataUpdate.forEach((x2) => lastIDs.push(x2[0]));
      };
      const tableContainer = document.getElementById("stops-table");
      tableContainer.innerHTML = "";
      tableContainer.appendChild(table);
    }
    await renderTable();
  }

  // node_modules/@moaqzdev/toast/dist/index.mjs
  var TOAST_EVENT = "@moaqzdev/toast";
  var Toaster = class _Toaster extends HTMLElement {
    constructor() {
      super(), this.attachShadow({ mode: "open" });
    }
    async createToast({ title: o15, type: r10, description: c7, onConfirm: v3, onCancel: f6, confirmText: b4 = "\u2705", cancelText: h6 = "\u274C", duration: d4 = 3e3 }) {
      const a5 = this.shadowRoot.querySelector("#toast-tmpl").content.cloneNode(true), t7 = { container: a5.querySelector("[data-toast]"), title: a5.querySelector("[data-title]"), description: a5.querySelector("[data-description]"), actions: a5.querySelector("[data-actions]"), confirmBtn: a5.querySelector("button[data-action-type='confirm']"), cancelBtn: a5.querySelector("button[data-action-type='cancel']"), closeBtn: a5.querySelector("[data-close-button]") };
      t7.title.textContent = o15 || "", t7.container.setAttribute("data-type", r10), c7 == null ? t7.description?.remove() : t7.description.textContent = c7;
      const n12 = () => this.removeToast(t7.container);
      if (r10 === "confirm" ? (t7.confirmBtn.textContent = b4, t7.confirmBtn.addEventListener("click", () => {
        v3?.(), n12();
      }, { once: true }), t7.cancelBtn.textContent = h6, t7.cancelBtn.addEventListener("click", () => {
        f6?.(), n12();
      }, { once: true })) : t7.actions?.remove(), this.hasAttribute("dismissable") ? t7.closeBtn.addEventListener("click", n12, { once: true }) : t7.closeBtn?.remove(), this.shadowRoot.querySelector("[data-toaster]").appendChild(a5), d4 !== "none") {
        const l6 = Math.max(Number.parseInt(d4, 10) || 0, 3e3), i10 = new AbortController(), g3 = Date.now();
        let e11 = null, p4 = 0;
        const u6 = () => {
          i10.abort(), n12();
        };
        let m4 = setTimeout(u6, l6);
        const y4 = () => {
          e11 == null && (clearTimeout(m4), e11 = Date.now());
        }, _3 = () => {
          e11 != null && (p4 = e11 - g3, e11 = null, m4 = setTimeout(u6, Math.max(l6 - p4, 0)));
        };
        ["focusin", "pointerenter", "mouseenter"].forEach((s6) => {
          t7.container.addEventListener(s6, y4, { signal: i10.signal });
        }), ["focusout", "pointerleave", "mouseleave"].forEach((s6) => {
          t7.container.addEventListener(s6, _3, { signal: i10.signal });
        });
      }
    }
    removeToast(o15) {
      o15.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease", fill: "forwards" }).finished.then(() => o15.remove());
    }
    handleEvent(o15) {
      if (o15 instanceof CustomEvent && o15.type === TOAST_EVENT) {
        const r10 = o15.detail;
        this.createToast(r10);
      }
    }
    connectedCallback() {
      this.render(), document.addEventListener(TOAST_EVENT, this);
    }
    disconnectedCallback() {
      document.removeEventListener(TOAST_EVENT, this);
    }
    render() {
      this.shadowRoot.innerHTML = `
    <style>${_Toaster.STYLES}</style>

    <template id="toast-tmpl">
      <li data-toast tabindex="0">
        <button data-close-button aria-label="Close">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
        <p data-title></p>
        <p data-description></p>
        <div data-actions>
          <button type="button" data-action-type="confirm"></button>
          <button type="button" data-action-type="cancel"></button>
        </div>
      </li>
    </template>

    <ol data-toaster tabindex="-1"></ol>`;
    }
    static STYLES = `
  * {
    box-sizing: border-box;
  }

  :host {
    --_travel-distance: var(--toast-travel-distance, 5vh);

    --_toast-background: var(--toast-background, #FCFCFC);
    --_toast-border: var(--toast-border, #00000026);
    --_toast-title: var(--toast-title, #000000DF);
    --_toast-description: var(--toast-description, #0000009B);

    --_toast-success: var(--toast-success, #00924BA4);
    --_toast-error: var(--toast-error, #D2000571);
    --_toast-warning: var(--toast-warning, #E35F00AA);
    --_toast-info: var(--toast-info, #0084E6A1);
    --_toast-confirm: var(--toast-confirm, #6600C06C);

    --_toast-actions-direction: var(--toast-actions-direction, row);
    --_toast-actions-justify: var(--toast-actions-justify, flex-end);
    --_toast-actions-gap: var(--toast-actions-gap, 0.25rem);

    --_toast-actions-confirm-text-color: var(--toast-actions-confirm-text-color, white);
    --_toast-actions-confirm-background-color: var(--toast-actions-confirm-background-color, #00713FDE);
    --_toast-actions-cancel-text-color: var(--toast-actions-cancel-text-color, white);
    --_toast-actions-cancel-background-color: var(--toast-actions-cancel-background-color, #C40006D3);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --_toast-background: var(--toast-background, #111111);
      --_toast-border: var(--toast-border,  #FFFFFF2C);
      --_toast-title: var(--toast-title, #FFFFFFED);
      --_toast-description: var(--toast-description, #FFFFFFAF);
  
      --_toast-success: var(--toast-success, #54FFAD73);
      --_toast-error: var(--toast-error, #FF5D61B0);
      --_toast-warning: var(--toast-warning, #FE84389D);
      --_toast-info: var(--toast-info, #3094FEB9);
      --_toast-confirm: var(--toast-confirm, #C47EFFA4);

      --_toast-actions-confirm-text-color: var(--toast-actions-confirm-text-color, white);
      --_toast-actions-confirm-background-color: var(--toast-actions-confirm-background-color, #54FFAD73);
      --_toast-actions-cancel-text-color: var(--toast-actions-cancel-text-color, white);
      --_toast-actions-cancel-background-color: var(--toast-actions-cancel-background-color, #FF5D61B0);
    }
  }

  @keyframes slide-in {
    from { 
      transform: translateY(var(--_travel-distance)) 
    }
  }

  @keyframes fade-in {
    from { opacity: 0 }
    to { opacity: 1 }
  }

  [data-toaster] {
    --container-width: 20rem;

    position: fixed;
    z-index: 999;
    width: var(--container-width);
    height: 100dvh;
    max-height: 100dvh;
    overflow: hidden;
    top: 0;
    right: 0;
    pointer-events: none;
    margin: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  :host([position="bottom-right"]) [data-toaster] {
    top: 0;
    right: 0;
  }
  
  :host([position="bottom-left"]) [data-toaster] {
    top: 0;
    left: 0;
  }

  :host([position="bottom-center"]) [data-toaster] {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  :host([position="top-right"]) [data-toaster] {
    top: 0;
    right: 0;
    flex-direction: column;
  }
  
  :host([position="top-left"]) [data-toaster] {
    top: 0;
    left: 0;
    flex-direction: column;
  }

  :host([position="top-center"]) [data-toaster] {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: column;
  }

  [data-toast] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: relative;

    pointer-events: none;
    user-select: none;

    list-style: none;
    background-color: var(--_toast-background);
    padding: 1rem;
    border: 1px solid var(--_toast-border);
    border-radius: 0.25rem;
    pointer-events: all;

    will-change: transform;
    animation: fade-in .3s ease, slide-in .3s ease;

    @media (prefers-reduced-motion: reduce){
      --_travel-distance: 0;
    }
  
    &[data-type="success"] {
      border-top: 4px solid var(--_toast-success);
    }
  
    &[data-type="error"] {
      border-top: 4px solid var(--_toast-error);
    }
  
    &[data-type="info"] {
      border-top: 4px solid var(--_toast-info)
    }

    &[data-type="warning"] {
      border-top: 4px solid var(--_toast-warning)
    }

    &[data-type="confirm"] {
      border-top: 4px solid var(--_toast-confirm);
    }
  }

  [data-close-button] {
    --size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--size);
    height: var(--size);
    position: absolute;
    top: 0;
    left: 0;
    color: var(--_toast-title);
    background-color: var(--_toast-background);
    border-radius: 50%;
    border: 1px solid var(--_toast-border);
    padding: 0.125rem;
    translate: -35% -35%;
    cursor: pointer;
  }

  [data-actions] {
    display: flex;
    flex-direction: var(--_toast-actions-direction);
    justify-content: var(--_toast-actions-justify);
    gap: var(--_toast-actions-gap);
    margin-top: 0.5rem;
  }

  button[data-action-type="confirm"],
  button[data-action-type="cancel"] {
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition-property: opacity;
    transition-duration: 200ms;

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
      
  button[data-action-type="confirm"] {
    color: var(--_toast-actions-confirm-text-color);
    font-weight: 600;
    background-color: var(--_toast-actions-confirm-background-color);
  }

  button[data-action-type="cancel"] {
    color: var(--_toast-actions-cancel-text-color);
    font-weight: 600;
    background-color:var(--_toast-actions-cancel-background-color);
  }
  
  [data-title], [data-description] {
    margin: 0;
    all: initial; 
    font-family: inherit;
    line-height: 1.5;
  }

  [data-title] {
    font-size: 1rem;
    font-weight: 600;
    color: var(--_toast-title);
  }

  [data-description] {
    font-size: 0.875rem;
    color: var(--_toast-description);
    text-wrap: pretty;
  }`;
  };
  customElements.define("moaqz-toaster", Toaster);

  // src/index.js
  var contentEl = document.querySelector(".content");
  var links = document.querySelectorAll(".sidebar a");
  function setActive(link) {
    links.forEach((l6) => l6.classList.remove("active"));
    link.classList.add("active");
  }
  function loadPage(hash) {
    switch (hash) {
      case "#stops":
        initStops(contentEl);
        break;
      case "#home":
      default:
        contentEl.innerHTML = "<h2>Welcome to Fleet Manager</h2>";
        break;
    }
  }
  function initialLoad(defaultHash) {
    const initialHash = window.location.hash || defaultHash;
    const activeLink = [...links].find((l6) => l6.getAttribute("href") === initialHash) || links[0];
    setActive(activeLink);
    loadPage(initialHash);
  }
  links.forEach((link) => {
    link.addEventListener("click", (e11) => {
      e11.preventDefault();
      const hash = link.getAttribute("href");
      setActive(link);
      loadPage(hash);
      window.location.hash = hash;
    });
  });
  var toastEl = document.createElement("moaqz-toaster");
  toastEl.setAttribute("dismissable", "");
  document.querySelector("body").appendChild(toastEl);
  initialLoad("#home");
})();
/*! Bundled license information:

active-table/dist/activeTable.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/controller/attachable-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/md-focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/motion/animation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/aria/aria.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/aria/delegate.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/form-label-activation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/redispatch-event.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/element-internals.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/constraint-validation.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/form-associated.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/checkbox-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/internal/checkbox.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/internal/checkbox-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/checkbox.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/outlined-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/textfield/internal/outlined-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/controller/string-converter.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/on-report-validity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/text-field-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/outlined-text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/outlined-text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/elevation/internal/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/forced-colors-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/slider/internal/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/slider-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-navigation-helpers.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/surfacePositionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/typeaheadController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/menu.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/select-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/outlined-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/outlined-select-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/outlined-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menuitem/menu-item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/menuItemController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/selectOptionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/form-submitter.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/button.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/filled-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/filled-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/shared-elevation-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/filled-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/dispatch-hooks.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/internal/switch.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/internal/switch-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/switch.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=bundle.js.map
