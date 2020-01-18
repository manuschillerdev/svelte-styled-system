const assert = require("assert");
import { themeGet, styled } from ".";

const theme = {
  color: {
    primary: "dodgerblue"
  },
  scale: ["0", "0.5rem", "1rem"]
};

function check(path, value) {
  const out = themeGet(theme, path);
  assert.strictEqual(
    out,
    value,
    `themeGet(obj, "${path}") should be ${value}, got ${out}`
  );
  console.log(` ✓ themeGet(theme, "${path}) resolved to "${value}""`);
}

// themeGet
// object notation
check("color.primary", "dodgerblue");
// array notation
check("scale.0", "0");
check("scale.1", "0.5rem");
check("scale.2", "1rem");
// return raw value as fallback
check("center", "center");
check(undefined, "");
check(null, "");

// styled
// todo: add better tests that really test the css output!
class HTMLNode {
  constructor() {
    this.class = "";
    this.classList = {
      add: cn => {
        this.class += `${cn}`;
      },
      remove: cn => {
        this.class = this.class.replace(cn, "");
      }
    };
  }
}

const props = { color: "color.primary" };
const node = new HTMLNode();
const result = styled(node, [props, theme]);
assert(node.class.includes("go"));
let previousClassName = node.class;

// update with different props leads to new classname
result.update([{ color: "color.secondary" }, theme]);
assert(node.class.includes("go"));
assert(!node.class.includes(previousClassName));

// update with the same props leads to an identical
// classname name because update was skipped completely
previousClassName = node.class;
result.update([{ color: "color.secondary" }, theme]);
assert(node.class.includes("go"));
assert(node.class === previousClassName);
