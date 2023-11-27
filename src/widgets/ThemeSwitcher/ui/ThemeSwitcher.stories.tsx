import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/lib/theme/ThemeContext'
import { ThemeSwitcher } from './ThemeSwitcher'

const meta = {
	title: 'widgets/ThemeSwitcher',
	component: ThemeSwitcher,
	parameters: {
		layout: 'centered',
		viewMode: 'canvas',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
	args: {},
}

export const Dark: Story = {
	args: {},
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
