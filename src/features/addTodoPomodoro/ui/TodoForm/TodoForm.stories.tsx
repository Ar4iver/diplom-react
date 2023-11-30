import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { TodoForm } from './TodoForm'
import { Theme } from 'shared/lib/theme/ThemeContext'

const meta = {
	title: 'features/TodoForm',
	component: TodoForm,
	parameters: {
		docs: {
			canvas: { sourceState: 'shown' },
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TodoForm>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
	args: {},
}

Light.decorators = [ThemeDecorator(Theme.LIGHT)]
