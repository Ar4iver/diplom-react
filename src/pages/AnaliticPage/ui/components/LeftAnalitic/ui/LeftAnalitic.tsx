import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LeftAnalitic.module.scss'

interface LeftAnaliticProps {
	className?: string
}

export const LeftAnalitic = ({ className }: LeftAnaliticProps) => {
	return (
		<div className={classNames(cls.LeftAnalitic, {}, [className])}>
			Аналитика слева
		</div>
	)
}
