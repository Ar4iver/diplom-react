import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticStopCount.module.scss'
import StopCountSVGInitial from 'shared/assets/icons/stop-initial.svg'

interface AnalyticStopCountProps {
	className?: string
}

export const AnalyticStopCount = ({ className }: AnalyticStopCountProps) => {
	return (
		<div className={classNames(cls.AnalyticStopCount, {}, [className])}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '30px',
					padding: '20px',
					fontSize: '15px',
					fontWeight: '400',
				}}
			>
				<h2>Остановки</h2>
				<span style={{ fontWeight: '400', fontSize: '64px' }}>0</span>
			</div>
			<div style={{ display: 'flex' }}>
				<StopCountSVGInitial />
			</div>
		</div>
	)
}
