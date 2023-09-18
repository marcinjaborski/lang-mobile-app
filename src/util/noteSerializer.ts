type TextElement = {
  text: string;
};

type BlockElement = {
  children: (TextElement | BlockElement)[];
};

const nodeToString = (node: TextElement | BlockElement): string | string[] => {
  if ("text" in node) {
    return node.text;
  }
  return node.children.map(nodeToString).join("");
};

export const serialize = (content: string): string => {
  try {
    return JSON.parse(content).map(nodeToString).join("\n");
  } catch (e) {
    return "";
  }
};
