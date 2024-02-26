import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticPauseCount.module.scss'
import PauseCountSVGInitial from 'shared/assets/icons/pause-initial.svg'

interface AnalyticPauseCountProps {
	className?: string
}

export const AnalyticPauseCount = ({ className }: AnalyticPauseCountProps) => {
	return (
		<div className={classNames(cls.AnalyticPauseCount, {}, [className])}>
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
				<h2>Время на паузе</h2>
				<span style={{ fontWeight: '400', fontSize: '64px' }}>0М</span>
			</div>
			<div style={{ display: 'flex' }}>
				<PauseCountSVGInitial />
			</div>
		</div>
	)
}
