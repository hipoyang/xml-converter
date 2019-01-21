"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require('xml-parser');
let depth = 0;
// inline delimiter
const INLINE_DELIMITER = '    ';
// delimiter between the lines
const LINE_DELIMITER = '\n';
function xml2json(xmlStr) {
    if (!xmlStr) {
        return null;
    }
    return parser(xmlStr);
}
exports.xml2json = xml2json;
function json2xml(xmlObj) {
    let xmlLineArr = [];
    const { declaration, root } = xmlObj;
    xmlLineArr.push(buildXmlDeclaration(declaration));
    xmlLineArr.push(buildXmlTree(root));
    return xmlLineArr.join('\n');
}
exports.json2xml = json2xml;
const attribute = (attr) => {
    let pairs = [];
    if (attr && Object.keys(attr).length) {
        pairs = Object.keys(attr).reduce((p, key) => {
            p.push(` ${key}="${attr[key]}"`);
            return p;
        }, []);
    }
    return pairs.join('');
};
const buildXmlTree = (node) => {
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
const buildXmlDeclaration = (declaration) => {
    const declarationArr = ['<?xml'];
    declarationArr.push(attribute(declaration.attributes));
    declarationArr.push('?>');
    return declarationArr.join(' ');
};
//# sourceMappingURL=index.js.map