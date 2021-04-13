/**
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist').Node} Node
 *
 * @callback Visitor
 * @param {Node} node
 * @param {number} index
 * @param {Parent} parent
 * @returns {void}
 *
 * @callback Visit
 * @param {Parent} node
 * @returns {void}
 */

/**
 * Wrap `visitor` to be called for each child in the nodes later given to
 * `visit`.
 *
 * @param {Visitor} visitor
 * @returns {Visit}
 */
export function visitChildren(visitor) {
  return visit

  /**
   * Visit `parent`, calling `visitor` for each child.
   *
   * @param {Parent} parent
   * @returns {void}
   */
  function visit(parent) {
    var index = -1
    var children = parent && parent.children

    if (!children) {
      throw new Error('Missing children in `parent` for `visit`')
    }

    while (++index in children) {
      visitor(children[index], index, parent)
    }
  }
}
