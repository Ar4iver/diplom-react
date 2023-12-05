import React, { ChangeEvent, InputHTMLAttributes, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'

/**
 * Omit - Тип из TypeScript, который позволяет забрать из типа все пропсы,
 * но исключить те, которые нам не нужны.
 *
 * В нашем случае мы забираем все пропсы из InputHTMLAttributes<HTMLInputElement>,
 * и исключаем из него value и onChange.
 *
 */

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>

export enum ThemeInput {
	PRIMARY = 'primary',
}

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string
	type?: string
	placeholder?: string
	theme?: ThemeInput
	onChange?: (value: string) => void
}

// eslint-disable-next-line react/display-name
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		type = 'text',
		placeholder,
		onChange,
		theme = ThemeInput.PRIMARY,
		...otherProps
	} = props

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	return (
		<input
			className={classNames(cls.Input, {}, [className, cls[theme]])}
			type={type}
			value={value}
			onChange={onChangeHandler}
			placeholder={placeholder}
			{...otherProps}
		/>
	)
})
