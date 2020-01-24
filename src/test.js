const test = require("ava");
import { themeGet, createCssText, styled } from "./index";
import { shortHandAttributes } from "./constants";

const theme = {
  color: {
    primary: "dodgerblue"
  },
  scale: ["0", "0.5rem", "1rem"]
};

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

// named aliases for array values
theme.scale.s = theme.scale[0];

test("themeGet: should resolve paths to theme values via themeGet", t => {
  t.is(themeGet(theme, "color.primary"), theme.color.primary); // object path
  t.is(themeGet(theme, "scale.0"), theme.scale[0]); // array notation
  t.is(themeGet(theme, "scale.s"), theme.scale[0]); // alias
  t.is(
    themeGet(theme, "return.unknown.path.unchanged"),
    "return.unknown.path.unchanged"
  ); // return others unchanged
});

test("createCssText: should resolve pseudo selectors via _", t => {
  t.is(
    createCssText({ _hover: { color: "red" } }, theme),
    "&:hover { color:red; }"
  );
  t.is(
    createCssText({ _hover: { color: "red" } }, theme),
    "&:hover { color:red; }"
  );
  t.is(
    createCssText({ _after: { color: "red" } }, theme),
    "&:after { color:red; }"
  );
  t.is(
    createCssText({ _before: { color: "red" } }, theme),
    "&:before { color:red; }"
  );
});

test("createCssText: should resolve shorthand properties to regular css properties", t => {
  for (const [key, value] of shortHandAttributes.entries()) {
    const expectedOutput = value.map(property => `${property}:value;`).join("");
    t.is(createCssText({ [key]: "value" }, theme), expectedOutput);
  }
});

test("styled: should create classNames and update the node with it", t => {
  const props = { color: "color.primary" };
  const node = new HTMLNode();
  const result = styled(node, [props, theme]);
  t.is(node.class.includes("go"), true);

  let previousClassName = node.class;
  // update with different props leads to new classname
  result.update([{ color: "color.secondary" }, theme]);
  t.is(node.class.includes("go"), true);
  t.is(node.class.includes(previousClassName), false);
});
