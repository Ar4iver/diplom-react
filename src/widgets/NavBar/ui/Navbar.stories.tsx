import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/lib/theme/ThemeContext'
import { Navbar } from './Navbar'

const meta = {
	title: 'widgets/Navbar',
	component: Navbar,
	parameters: {
		layout: 'centered',
		docs: {
			canvas: { sourceState: 'shown' },
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
	args: {},
}

export const Dark: Story = {
	args: {},
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
