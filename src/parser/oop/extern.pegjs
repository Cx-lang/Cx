ExternStatement
  = ExternToken statement:ExternElement EOS? {
      return append({ type: "extern", statement: statement });
    }

ExternElement
  = OOPVariableExternStatement
  / OOPGetterExternStatement
  / OOPSetterExternStatement
  / OperatorOverloadExtern
  / FunctionExternStatement
  / EnumExternStatement
  / StructExternStatement
  / ClassExternStatement

ExternStructStatement
  = ExternToken statement:StructExternElement EOS? {
      return append({ type: "extern", statement: statement });
    }
