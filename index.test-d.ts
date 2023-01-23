import {expectError, expectType} from 'tsd'
import type {Parent, Literal} from 'unist'
import {visitChildren} from './index.js'

/* eslint-disable @typescript-eslint/consistent-type-definitions */

interface Root extends Parent {
  type: 'root'
  children: Flow[]
}

type Flow = Blockquote | Heading | Paragraph

interface Blockquote extends Parent {
  type: 'blockquote'
  children: Flow[]
}

interface Heading extends Parent {
  type: 'heading'
  depth: number
  children: Phrasing[]
}

interface Paragraph extends Parent {
  type: 'paragraph'
  children: Phrasing[]
}

type Phrasing = Text | Emphasis

interface Emphasis extends Parent {
  type: 'emphasis'
  children: Phrasing[]
}

interface Text extends Literal {
  type: 'text'
  value: string
}

/* Missing params. */
expectError(visitChildren())

visitChildren((node, _, parent: Emphasis) => {
  expectType<Phrasing>(node)
})

visitChildren((node, _, parent: Root) => {
  expectType<Flow>(node)
})

/* eslint-enable @typescript-eslint/consistent-type-definitions */