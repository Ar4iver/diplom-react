import type { Meta, StoryObj } from '@storybook/react'
import { Button, ThemeButton } from './Button'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/lib/theme/ThemeContext'

const meta = {
	title: 'shared/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		viewMode: 'canvas',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.PRIMARY,
	},
}

export const Clear: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.CLEAR,
	},
}

export const Outlined: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.OUTLINE,
	},
}

export const OutlinedDark: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.OUTLINE,
	},
}

OutlinedDark.decorators = [ThemeDecorator(Theme.DARK)]
