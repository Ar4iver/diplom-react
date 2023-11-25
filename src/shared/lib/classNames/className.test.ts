import { classNames } from 'shared/lib/classNames/classNames'

describe('classNames', () => {
	test('with only first params', () => {
		expect(classNames('someClass')).toBe('someClass')
	})

	test('with additional class', () => {
		const exprected = 'someClass class1 class2'
		expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(
			exprected
		)
	})

	test('with mods', () => {
		const exprected = 'someClass class1 class2 hovered scrollable'
		expect(
			classNames('someClass', { hovered: true, scrollable: true }, [
				'class1',
				'class2',
			])
		).toBe(exprected)
	})

	test('with mods, if one mod is false', () => {
		const exprected = 'someClass class1 class2 hovered scrollable'
		expect(
			classNames(
				'someClass',
				{ hovered: true, scrollable: true, focus: false },
				['class1', 'class2']
			)
		).toBe(exprected)
	})

	test('with mods undefined', () => {
		const exprected = 'someClass class1 class2 hovered'
		expect(
			classNames('someClass', { hovered: true, scrollable: undefined }, [
				'class1',
				'class2',
			])
		).toBe(exprected)
	})
})
