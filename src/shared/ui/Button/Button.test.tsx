import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('classNames', () => {
	test('with only first params', () => {
		render(<Button>TEST</Button>)
		expect(screen)
	})
})
