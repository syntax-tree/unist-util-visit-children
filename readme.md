# unist-util-visit-children [![Build Status][build-badge]][build-page] [![Coverage Status][coverage-badge]][coverage-page]

[Unist][] direct child visitor.

## Installation

[npm][]:

```bash
npm install unist-util-visit-children
```

## Usage

```javascript
var remark = require('remark');
var visitChildren = require('unist-util-visit-children');

var visit = visitChildren(console.log);

remark().use(plugin).process('Some _emphasis_, **importance**, and `code`.');

function plugin() {
  return transformer;
  function transformer(tree) {
    visit(tree.children[0]);
  }
}
```

Yields:

```js
{ type: 'text', value: 'Some ' }
{ type: 'emphasis',
  children: [ { type: 'text', value: 'emphasis' } ] }
{ type: 'text', value: ', ' }
{ type: 'strong',
  children: [ { type: 'text', value: 'importance' } ] }
{ type: 'text', value: ', and ' }
{ type: 'inlineCode', value: 'code' }
{ type: 'text', value: '.' }
```

## API

### `visit = visitChildren(visitor)`

Wrap [`visitor`][visitor] to be invoked for each child in the node given to
[`visit`][visit].

#### `function visitor(child, index, parent)`

Invoked if [`visit`][visit] is called on a parent node for each `child`
in `parent`.

#### `function visit(parent)`

Invoke the bound [`visitor`][visitor] for each child in `parent`
([`Node`][node]).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/unist-util-visit-children.svg

[build-page]: https://travis-ci.org/wooorm/unist-util-visit-children

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/unist-util-visit-children.svg

[coverage-page]: https://codecov.io/github/wooorm/unist-util-visit-children?branch=master

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[unist]: https://github.com/wooorm/unist

[node]: https://github.com/wooorm/unist#node

[visit]: #function-visitparent

[visitor]: #function-visitorchild-index-parent
