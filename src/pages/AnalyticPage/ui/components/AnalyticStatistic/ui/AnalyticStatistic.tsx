import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticStatistic.module.scss'

interface AnalyticStatisticProps {
	className?: string
}

export const AnalyticStatistic = ({ className }: AnalyticStatisticProps) => {
	return (
		<div className={classNames(cls.AnalyticStatistic, {}, [className])}>
			Статистика аналитики
		</div>
	)
}
