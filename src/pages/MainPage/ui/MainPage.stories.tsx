import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/lib/theme/ThemeContext'
import MainPage from './MainPage'

const meta = {
	title: 'pages/MainPage',
	component: MainPage,
	parameters: {
		layout: 'centered',
		viewMode: 'canvas',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof MainPage>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
	args: {},
}

export const Dark: Story = {
	args: {},
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
