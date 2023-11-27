import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/lib/theme/ThemeContext'
import StatisticPage from './StatisticPage'

const meta = {
	title: 'pages/StatisticPage',
	component: StatisticPage,
	parameters: {
		layout: 'centered',
		viewMode: 'canvas',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof StatisticPage>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
	args: {},
}

export const Dark: Story = {
	args: {},
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
