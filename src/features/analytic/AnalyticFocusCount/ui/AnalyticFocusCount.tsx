import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticFocusCount.module.scss'
import FocusIconSVGInitial from 'shared/assets/icons/focus-initial.svg'

interface AnalyticFocusCountProps {
	className?: string
}

export const AnalyticFocusCount = ({ className }: AnalyticFocusCountProps) => {
	return (
		<div className={classNames(cls.AnalyticFocusCount, {}, [className])}>
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
				<h2>Фокус</h2>
				<span style={{ fontWeight: '400', fontSize: '64px' }}>0%</span>
			</div>
			<div style={{ display: 'flex' }}>
				<FocusIconSVGInitial />
			</div>
		</div>
	)
}
