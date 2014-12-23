NewExpression
  = MemberExpression
  / NewToken __ callee:NewExpression {
      return append({ type: "new", callee: callee, arguments: [] });
    }

CallExpression
  = first:(
      callee:MemberExpression __ args:CallArguments {
        return append({ type: "call", callee: callee, arguments: args });
      }
    )
    rest:(
        __ args:CallArguments {
          return append({ type: "call", arguments: args });
        }
      / __ "[" __ property:Expression __ "]" {
          return append({ type: "member", property: property, computed: true });
        }
      / __ "." __ property:IdentifierName {
          return append({ type: "member", property: property, computed: false });
        }
    )* {
      return buildTree(first, rest, function(result, element){
        element.object = result;
        return element;
      });
    }

CallArguments
  = template_args:TemplateCallArguments? __ "(" __ args:(CallArgumentList __)? ")" {
      return  { template: template_args || [], call: extractOptional(args, 0) || [] };
    }

TemplateCallArguments
  = "<" __ args:(IdentifierPath __)* ">" {
      return extractOptional(args, 0) || [];
    }

CallArgumentList
  = first:AssignmentExpression rest:(__ "," __ AssignmentExpression)* {
      return buildList(first, rest, 3);
    }
