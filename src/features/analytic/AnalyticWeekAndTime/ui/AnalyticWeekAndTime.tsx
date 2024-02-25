import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticWeekAndTime.module.scss'

interface AnalyticWeekAndTimeProps {
	className?: string
}

export const AnalyticWeekAndTime = ({
	className,
}: AnalyticWeekAndTimeProps) => {
	return (
		<div className={classNames(cls.AnalyticWeekAndTime, {}, [className])}>
			<h2>Понедельник</h2>
			<span>Вы работали над задачами в течение 51 минуты</span>
		</div>
	)
}
