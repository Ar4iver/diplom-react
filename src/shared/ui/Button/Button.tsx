import React, { ButtonHTMLAttributes } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
	CLEAR = 'clear',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	theme?: ThemeButton
}

export const Button = ({
	children,
	className,
	theme = ThemeButton.CLEAR,
	...otherProps
}: ButtonProps) => {
	return (
		<button
			className={classNames(cls.Button, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	)
}
