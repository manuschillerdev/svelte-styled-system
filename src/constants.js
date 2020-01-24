// string assignments for improved minification

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
  [`${row}${gap}`, [`${grid}-${row}-${gap}`]],
  [`${row}-${gap}`, [`${grid}-${row}-${gap}`]],
  [`${column}`, [`${grid}-${col}`]],
  [`${col}${gap}`, [`${grid}-${column}-${gap}`]],
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
  [`${template}${column}s`, [`${grid}-${template}-${column}s`]],
  [`${template}-${column}s`, [`${grid}-${template}-${column}s`]],
  [`${template}${area}s`, [`${grid}-${area}-${area}s`]],
  [`${template}-${area}s`, [`${grid}-${area}-${area}s`]]
]);
