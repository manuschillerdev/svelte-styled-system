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
const w = "width";
const h = "height";
const d = "display";
const min = "min";
const max = "max";
const brd = "border";
const bx = "box";
const shd = "shadow";
const grid = "grid";
const ap = "ap";
const gap = `g${ap}`;
const Gap = `G${ap}`;
const row = "row";
const col = "col";
const color = `${col}or`;
const column = `${col}umn`;
const flex = "flex";
const wrap = "wrap";
const dir = "dir";
const direction = `${dir}ection`;
const template = "template";
const align = "align";
const justify = "justify";
const content = "content";
const items = "items";
const area = "area";
const auto = "auto";
const flow = "flow";
const bg = "bg";
const background = "background";
const image = "image";
const size = "size";
const pos = "pos";
const position = "position";
const repeat = "repeat";
const attachment = "attachment";

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
  [bg, [`${background}-${color}`]],
  [`${bg}${image}`, [`${background}-${image}`]],
  [`${bg}-${image}`, [`${background}-${image}`]],
  [`${bg}${size}`, [`${background}-${size}`]],
  [`${bg}-${size}`, [`${background}-${size}`]],
  [`${bg}${pos}`, [`${background}-${position}`]],
  [`${bg}-${pos}`, [`${background}-${position}`]],
  [`${bg}${repeat}`, [`${background}-${repeat}`]],
  [`${bg}-${repeat}`, [`${background}-${repeat}`]],
  [`${bg}-${attachment}`, [`${background}-${attachment}`]],
  [`${bg}${attachment}`, [`${background}-${attachment}`]],
  ["w", [w]],
  ["h", [h]],
  [size, [w, h]],
  ["d", [d]],
  [`${min}w`, [`${min}-${w}`]],
  [`${min}-w`, [`${min}-${w}`]],
  [`${max}w`, [`${max}-${w}`]],
  [`${max}-w`, [`${max}-${w}`]],
  [`${min}h`, [`${min}-${h}`]],
  [`${min}-h`, [`${min}-${h}`]],
  [`${max}h`, [`${max}-${h}`]],
  [`${max}-h`, [`${max}-${h}`]],
  ["bx", [`${brd}-${l}`, `${brd}-${r}`]],
  ["by", [`${brd}-${t}`, `${brd}-${b}`]],
  [shd, [`${bx}-${shd}`]],
  [align, [`${align}-${items}`]],
  [justify, [`${justify}-${content}`]],
  [wrap, [`${flex}-${wrap}`]],
  [`${flex}${dir}`, [`${flex}-${direction}`]],
  [direction, [`${flex}-${direction}`]],
  [gap, [`${grid}-${gap}`]],
  [`${row}`, [`${grid}-${row}`]],
  [`${row}${Gap}`, [`${grid}-${row}-${gap}`]],
  [`${row}-${gap}`, [`${grid}-${row}-${gap}`]],
  [`${column}`, [`${grid}-${col}`]],
  [`${col}${Gap}`, [`${grid}-${column}-${gap}`]],
  [`${col}-${gap}`, [`${grid}-${column}-${gap}`]],
  [`${area}`, [`${grid}-${area}`]],
  [`${auto}${flow}`, [`${grid}-${auto}-${flow}`]],
  [`${auto}-${flow}`, [`${grid}-${auto}-${flow}`]],
  [`${auto}${row}s`, [`${grid}-${auto}-${row}s`]],
  [`${auto}-${row}s`, [`${grid}-${auto}-${row}s`]],
  [`${auto}${column}s`, [`${grid}-${auto}-${column}s`]],
  [`${auto}-${column}s`, [`${grid}-${auto}-${column}s`]],
  [`${template}${row}s`, [`${grid}-${template}-${row}s`]],
  [`${template}-${row}s`, [`${grid}-${template}-${row}s`]],
  [`${template}${column}s`, [`${grid}-${template}-${col}s`]],
  [`${template}-${column}s`, [`${grid}-${template}-${col}s`]],
  [`${template}${area}s`, [`${grid}-${area}-${area}s`]],
  [`${template}-${area}s`, [`${grid}-${area}-${area}s`]]
]);

export function styled(node, props) {
  let prevAttributes = {};
  let prevClassName;

  function update([attributes, theme]) {
    if (attributesEq(attributes, prevAttributes)) return;
    prevAttributes = attributes;

    let cssText = "";
    let mediaQueries = [];

    for (let [name, value] of Object.entries(attributes)) {
      name = shortHandAttributes.get(name.toLowerCase()) || [name];
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
