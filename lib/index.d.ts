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
        attributes: IAttribute;
    };
    root: INode;
}
export declare function xml2json(xmlStr: string): xmlObject | null;
export declare function json2xml(xmlObj: xmlObject): string;
