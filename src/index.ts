const parser = require('xml-parser');

export interface IAttribute {
    [propName: string]: string;
}

export interface INode {
    name: string;
    attributes: IAttribute;
    children: INode[];
    content?: string;
}

export interface xmlObject {
    declaration: {
        attributes: IAttribute
    };
    root: INode;
}


let depth = 0;
// inline delimiter
const INLINE_DELIMITER = '    ';
// delimiter between the lines
const LINE_DELIMITER = '\n';

export function xml2json(xmlStr: string) : xmlObject | null {
    if (!xmlStr) {
        return null;
    }

    return parser(xmlStr);
}

export function json2xml(xmlObj: xmlObject) : string {
    let xmlLineArr = [];
    const { declaration, root } = xmlObj;
    xmlLineArr.push(buildXmlDeclaration(declaration));
    xmlLineArr.push(buildXmlTree(root));

    return xmlLineArr.join('\n');
}

const attribute = (attr: IAttribute) : string => {
    let pairs: string[] = [];
    if (attr && Object.keys(attr).length) {
      pairs = Object.keys(attr).reduce((p, key) => {
        p.push(` ${key}="${attr[key]}"`);
        return p;
      }, [] as string[]);
    }
    return pairs.join('');
};

const buildXmlTree = (node: INode) : string => {
  const { name, attributes, children, content } = node;
  const nodeArr = [`<${name}`];
  const delimiter = content ? '' : LINE_DELIMITER;
  nodeArr.push(`${attribute(attributes)}>${delimiter}`);

  if (children && Object.keys(children).length) {
    depth++;
    const cNode = children.map(c => `${INLINE_DELIMITER.repeat(depth)}${buildXmlTree(c)}`);
    nodeArr.push(cNode.join('\n'));
    depth--;
  }
  if (content) {
    nodeArr.push(content);
  }
  nodeArr.push(`${content ? '' : '\n' + INLINE_DELIMITER.repeat(depth)}</${name}>`);
  return nodeArr.join('');
};

const buildXmlDeclaration = (declaration: {attributes: IAttribute}) : string => {
    const declarationArr = ['<?xml'];
    declarationArr.push(attribute(declaration.attributes));
    declarationArr.push('?>');

    return declarationArr.join(' ');
};