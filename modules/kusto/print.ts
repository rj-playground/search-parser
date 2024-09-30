import 'npm:bridge.net'
import 'npm:@kusto/language-service-next';

import K = Kusto.Language

const syntaxNames: string[] = [];
for(const n in K.Syntax.SyntaxKind) {
    if(typeof K.Syntax.SyntaxKind[n] === 'number') syntaxNames.push(n);
}

export function printKustoTree(root: K.Syntax.SyntaxNode) {
    let spacing = ""
    const parent: (K.Syntax.SyntaxNode | null)[] = [null] 
    K.Syntax.SyntaxElement.WalkNodes(root, (node) => {
        if(node.Parent != parent[parent.length - 1]) {
            if(node.Parent == null || node.Parent?.Parent === parent[parent.length - 1]) { // stepped into child
                parent.push(node.Parent)
                spacing += "  "
            } else {
                do {
                    parent.pop()
                    spacing = spacing.substring(0, spacing.length-2)
                }  while(parent.length != 1 && node.Parent != parent[parent.length-1]); 
            }
        }
        console.log(spacing, syntaxNames[node.Kind], node.ChildCount, node.NameInParent, ":",  node.toString())
    })
}
