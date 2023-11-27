import React from 'react'
import { StoryFn } from '@storybook/react'
import { Theme } from 'shared/lib/theme/ThemeContext'

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => {
	return (
		<div className={`app ${theme}`}>
			<StoryComponent />
		</div>
	)
}
