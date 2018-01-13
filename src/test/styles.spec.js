import test from 'ava'
import { Styled, cssClasses } from '../styles'

test('cssClasses should return an object mapping given classes to true', t => {
  t.deepEqual(cssClasses('foo', 'bar', 'baz'), {
    foo: true,
    bar: true,
    baz: true
  }, 'Class object does not contain all keys')
})

test('Styles should return an object mapping given class names to the real class inside a css module', t => {
  const styles = Styled({'foo': 'foo_xyz_1', 'bar': 'bar_abc_1'})
  const classes = styles('foo', 'bar')
  t.deepEqual(classes, {'foo_xyz_1': true, 'bar_abc_1': true}, 'Class object does not have all class names')
})
