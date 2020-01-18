import { css } from "goober";
import dlv from "dlv";

// 1:1 reexport goober's css to save lines when importing css and styled
// => import {css, styled} from 'svelte-styled-system'
export { css };

export const themeGet = (theme, pathOrValue) =>
  pathOrValue ? dlv(theme, pathOrValue, pathOrValue || "") : "";

const attributesEq = (oldAttrs = {}, newAttrs = {}) => {
  for (let key in oldAttrs) {
    if (!(key in newAttrs) || oldAttrs[key] !== newAttrs[key]) {
      return false;
    }
  }
  for (let key in newAttrs) {
    if (!(key in oldAttrs)) {
      return false;
    }
  }
  return true;
};

const m = "margin";
const p = "padding";
const t = "top";
const r = "right";
const b = "bottom";
const l = "left";

export const shortHandAttributes = new Map([
  ["m", [m]],
  ["mt", [`${m}-${t}`]],
  ["mr", [`${m}-${r}`]],
  ["mb", [`${m}-${b}`]],
  ["ml", [`${m}-${l}`]],
  ["mx", [`${m}-${l}`, `${m}-${r}`]],
  ["my", [`${m}-${t}`, `${m}-${b}`]],
  ["p", [p]],
  ["pt", [`${p}-${t}`]],
  ["pr", [`${p}-${r}`]],
  ["pb", [`${p}-${b}`]],
  ["pl", [`${p}-${l}`]],
  ["px", [`${p}-${l}`, `${p}-${r}`]],
  ["py", [`${p}-${t}`, `${p}-${b}`]],
  ["bg", ["background-color"]],
  ["size", ["width", "height"]]
]);

export function styled(node, props) {
  let prevAttributes = {};
  let prevClassName;

  function update([attributes, theme]) {
    if (attributesEq(attributes, prevAttributes)) return;

    let cssText = "";
    let mediaQueries = [];

    for (let [name, value] of Object.entries(attributes)) {
      name = shortHandAttributes.get(name) || [name];
      for (let cssProp of name) {
        // unresponsive definitions
        if (!Array.isArray(value)) {
          cssText += `${cssProp}:${themeGet(theme, value)};`;
          continue;
        }

        // responsive definitions
        cssText += `${cssProp}:${themeGet(theme, value[0])};`;
        if (value.length > 1) {
          for (let i = 0; i < value.length; i++) {
            if (!mediaQueries[i]) mediaQueries[i] = "";
            mediaQueries[i] += `${cssProp}:${themeGet(theme, value[i])};`;
          }
        }
      }
    }

    // add media queries per breakpoint
    const { breakpoints = [] } = theme;
    for (let i = 0; i < breakpoints.length; i++) {
      if (mediaQueries[i]) {
        cssText += `\n@media (min-width: ${breakpoints[i]}) {${mediaQueries[i]}}`;
      }
    }

    // remove styles from previous props
    if (prevClassName) node.classList.remove(prevClassName);

    // append the current styles to the document
    // and apply the resulting class to our node
    const cn = css(cssText);
    prevClassName = cn;
    node.classList.add(cn);
  }

  update(props);

  return { update };
}

export default styled;
