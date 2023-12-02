import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'
import { Button } from '../Button/Button'
import ButtonActionDropdown from 'shared/assets/icons/btn-action-dpd-todo.svg'

const meta = {
	title: 'shared/Dropdown',
	component: Dropdown,
	parameters: {
		docs: {
			canvas: { sourceState: 'shown' },
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
	args: {
		trigger: (
			<Button>
				<ButtonActionDropdown />
			</Button>
		),
		items: [
			{
				content: 'Увеличить',
			},
			{
				content: 'Уменьшить',
			},
			{
				content: 'Редактировать',
			},
			{
				content: 'Удалить',
			},
		],
	},
}
