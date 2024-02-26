import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticStatistic.module.scss'
import {
	AnalyticFocusCount,
	AnalyticPauseCount,
	AnalyticStopCount,
} from 'features/analytic'

interface AnalyticStatisticProps {
	className?: string
}

export const AnalyticStatistic = ({ className }: AnalyticStatisticProps) => {
	return (
		<div className={classNames(cls.AnalyticStatistic, {}, [className])}>
			<AnalyticFocusCount />
			<AnalyticPauseCount />
			<AnalyticStopCount />
		</div>
	)
}
