import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LeftAnalytic.module.scss'
import { AnalyticTomatoCounter, AnalyticWeekAndTime } from 'features/analytic'

interface LeftAnalyticProps {
	className?: string
}

export const LeftAnalytic = ({ className }: LeftAnalyticProps) => {
	return (
		<div className={classNames(cls.LeftAnalytic, {}, [className])}>
			<AnalyticWeekAndTime />
			<AnalyticTomatoCounter />
		</div>
	)
}
