
export default function({ types: t }){
  //避免重复引入
  let hasImport = false
  let rootPath = undefined
  return {
    name: 'provider-transform-plugin',
    visitor: {
      Program(path) {
        rootPath = path
      },
      CallExpression(path, { opts }) {
        const { specific: specificKey, lib } = opts;
        if(hasImport) return;
        const { node } = path;
        if(node.callee && node.callee.object && t.isIdentifier(node.callee.object)) {
          const specific = node.callee.object.name
          if(specific === specificKey){
            hasImport = true
            const identifier = t.identifier(specificKey)
            const importDefaultSpecifier = t.importDefaultSpecifier(identifier)
            const importDeclaration = t.importDeclaration(
              [importDefaultSpecifier],
              t.stringLiteral(lib)
            )
            rootPath.get('body')[0].insertBefore(importDeclaration);
          }
        }
      }
    }
  }
}