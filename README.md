# xml-converter

A simple interconverter between xml and json for nodejs.

## API

### xml2json

```typescript
function xml2json(xmlStr: string): xmlObject | null;
```

### json2xml

```typescript
function json2xml(xmlObj: xmlObject): string;
```