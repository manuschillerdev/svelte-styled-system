import { css } from "goober";
import dlv from "dlv";
import { shortHandAttributes } from "./constants";

const themeGet = (theme, pathOrValue) =>
  pathOrValue ? dlv(theme, pathOrValue, pathOrValue) : pathOrValue;

// just a really basic shallow compare on $$props
// probably missing edge cases
const attributesEq = (a = {}, b = {}) => {
  for (let key in a) if (!(key in b) || a[key] !== b[key]) return false;
  for (let key in b) if (!(key in a)) return false;
  return true;
};

const createCssText = (attributes, theme, pseudoElementSelector) => {
  let cssText = "";
  const mediaQueries = [];

  for (let [name, value] of Object.entries(attributes)) {
    name = shortHandAttributes.get(name.toLowerCase()) || [name];

    for (let cssProp of name) {
      if (cssProp.startsWith("_")) {
        cssProp = cssProp.replace("_", "&:");
        cssText += `${cssProp} { ${createCssText(value, theme, cssProp)} }`;
        continue;
      }

      // unresponsive definitions
      if (!Array.isArray(value)) {
        cssText += `${cssProp}:${themeGet(theme, value)};`;
        continue;
      }

      // responsive definitions
      cssText += `${cssProp}:${themeGet(theme, value[0])};`;
      if (value.length > 1) {
        for (let i = 0; i < value.length; i++) {
          if (!mediaQueries[i]) {
            // if a pseudoElementSelector like &:after is present
            // we need to wrap the content in it
            mediaQueries[i] = pseudoElementSelector
              ? `${pseudoElementSelector} { `
              : "";
          }

          mediaQueries[i] += `${cssProp}:${themeGet(theme, value[i])};`;
          if (pseudoElementSelector) mediaQueries[i] += "}";
        }
      }
    }
  }

  // add media queries per breakpoint
  const { breakpoints = [] } = theme;
  for (let i = 0; i < breakpoints.length; i++)
    if (mediaQueries[i])
      cssText += `\n@media (min-width: ${breakpoints[i]}) {${mediaQueries[i]}}`;
  return cssText;
};

const styled = (node, props) => {
  let prevAttributes = {};
  let prevClassName;

  const update = ([attributes, theme]) => {
    // equal props will always produce equal css text / classes
    if (attributesEq(attributes, prevAttributes)) return;
    prevAttributes = attributes;

    // appends the current styles to the document head
    // see goober documentation for details
    const cn = css(createCssText(attributes, theme));
    node.classList.add(cn);

    if (prevClassName) node.classList.remove(prevClassName);
    prevClassName = cn;
  };

  update(props);

  return { update };
};

export { css, createCssText, themeGet, styled, attributesEq };
