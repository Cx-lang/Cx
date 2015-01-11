status:
	git status -s

build: parser browser

pegjs:
	node scripts/build-parser.js --no-peg-build

parser:
	node scripts/build-parser.js

dist: browser

browser:
	node scripts/package-dist.js

examples:
	node scripts/build-examples.js

clean:
	rm -rf examples/ast
	rm -rf examples/cpp
	rm -rf examples/js
  rm -rf dist
	rm -f lib/parser.js
	rm -f src/parser.pegjs

.PHONY:  status build pegjs parser dist browser examples clean
.SILENT: status build pegjs parser dist browser examples clean
