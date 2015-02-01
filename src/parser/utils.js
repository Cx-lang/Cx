function getLocation ( position ) {
  var details = peg$computePosDetails(position) || { line: 1, column: 1 };
  return { offset: position, line: details.line, column: details.column };
}

function append ( ast ) {
  ast.pos = {
    filename: options.filename,
    start: getLocation(peg$reportedPos),
    end: getLocation(peg$currPos),
    range: [peg$reportedPos, peg$currPos]
  };
  return ast;
}

function extractOptional ( optional, index ) {
  return optional ? optional[index] : null;
}

function extractList ( list, index ) {
  var result = [], i, length = list.length;
  for ( i = 0; i < length; ++i ) {
    result[i] = list[i][index];
  }
  return result;
}

function buildList ( first, rest, index ) {
  return [first].concat(typeof index === 'number' ? extractOptional(rest, index) : rest);
}

function buildTree ( first, rest, builder ) {
  var result = first, i, length = rest.length;
  for ( i = 0; i < length; ++i ) {
    result = builder(result, rest[i]);
  }
  return result;
}

function toCharCode ( character ) {
    var codeHex = character.charCodeAt(0).toString().toUpperCase();
    while ( codeHex.length < 4 ) {
        codeHex = "0" + codeHex;
    }
    return codeHex;
}

function buildModifiers ( first, rest, index ) {
  return buildTree([first], rest, function(modifiers, modifier){
    return modifiers.indexOf(modifier[index]) === -1 ? modifiers.concat(modifier[index]) : modifiers;
  });
}
