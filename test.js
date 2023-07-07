/**
 * @typedef {import('mdast').Emphasis} Emphasis
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 * @typedef {import('mdast').Text} Text
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {visitChildren} from 'unist-util-visit-children'

function noop() {}

test('visitChildren', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('unist-util-visit-children')).sort(),
      ['visitChildren']
    )
  })

  await t.test('should throw without arguments', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      visitChildren(noop)()
    }, /Missing children in `parent`/)
  })

  await t.test('should throw without parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      visitChildren(noop)({})
    }, /Missing children in `parent`/)
  })
  await t.test('should call `fn` for each child in `parent`', function () {
    /** @type {Array<Text>} */
    const children = [
      {type: 'text', value: '0'},
      {type: 'text', value: '1'},
      {type: 'text', value: '2'},
      {type: 'text', value: '3'}
    ]
    /** @type {Emphasis} */
    const context = {type: 'emphasis', children}
    let n = -1

    visitChildren(
      /**
       * @param {PhrasingContent} child
       * @param {Emphasis} parent
       */
      function (child, index, parent) {
        n++
        assert.equal(child, children[n])
        assert.equal(index, n)
        assert.equal(parent, context)
      }
    )(context)
  })

  await t.test('should work when new children are added', function () {
    /** @type {Array<Text>} */
    const children = [
      {type: 'text', value: '0'},
      {type: 'text', value: '1'},
      {type: 'text', value: '2'},
      {type: 'text', value: '3'},
      {type: 'text', value: '4'},
      {type: 'text', value: '5'},
      {type: 'text', value: '6'}
    ]
    /** @type {Emphasis} */
    const parent = {
      type: 'emphasis',
      children: [
        {type: 'text', value: '0'},
        {type: 'text', value: '1'},
        {type: 'text', value: '2'},
        {type: 'text', value: '3'}
      ]
    }
    let n = -1

    visitChildren(
      /**
       * @param {PhrasingContent} child
       * @param {Emphasis} parent
       */
      function (child, index, parent) {
        n++

        if (index < 3) {
          parent.children.push({
            type: 'text',
            value: String(parent.children.length)
          })
        }

        assert.deepEqual(child, children[n])
        assert.deepEqual(index, n)
      }
    )(parent)
  })
})
