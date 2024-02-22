import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnaliticStatistic.module.scss'

interface AnaliticStatisticProps {
	className?: string
}

export const AnaliticStatistic = ({ className }: AnaliticStatisticProps) => {
	return (
		<div className={classNames(cls.AnaliticStatistic, {}, [className])}>
			Статистика аналитики
		</div>
	)
}
