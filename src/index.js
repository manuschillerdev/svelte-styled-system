import { css } from "goober";
import dlv from "dlv";
import { shortHandAttributes } from "./constants";

export const themeGet = (theme, pathOrValue) =>
  pathOrValue ? dlv(theme, pathOrValue, pathOrValue) : "";

const attributesEq = (a = {}, b = {}) => {
  for (let key in a) if (!(key in b) || a[key] !== b[key]) return false;
  for (let key in b) if (!(key in a)) return false;
  return true;
};

const styled = (node, props) => {
  let prevAttributes = {};
  let prevClassName;

  const update = ([attributes, theme]) => {
    if (attributesEq(attributes, prevAttributes)) return;
    prevAttributes = attributes;

    let cssText = "";
    const mediaQueries = [];

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
    for (let i = 0; i < breakpoints.length; i++)
      if (mediaQueries[i])
        cssText += `\n@media (min-width: ${breakpoints[i]}) {${mediaQueries[i]}}`;

    // append the current styles to the document
    // and apply the resulting class to our node
    const cn = css(cssText);
    node.classList.add(cn);

    // remove styles from previous props
    if (prevClassName) node.classList.remove(prevClassName);
    prevClassName = cn;
  };

  update(props);

  return { update };
};

export { styled, css };
