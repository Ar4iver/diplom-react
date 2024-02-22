import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ChartAnalitic.module.scss'

interface ChartAnaliticProps {
	className?: string
}

export const ChartAnalitic = ({ className }: ChartAnaliticProps) => {
	return (
		<div className={classNames(cls.ChartAnalitic, {}, [className])}>
			Графики аналитики
		</div>
	)
}
