import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticPage.module.scss'
import { AnalyticHeader } from './components/AnalyticHeader'
import { LeftAnalytic } from './components/LeftAnalytic'
import { ChartAnalytic } from './components/ChartAnalytic'
import { AnalyticStatistic } from './components/AnalyticStatistic'
interface AnalyticPageProps {
	className?: string
}

const AnaliticPage = ({ className }: AnalyticPageProps) => {
	return (
		<div className={classNames(cls.AnaliticPage, {}, [className])}>
			<div className={classNames(cls.wrapperChart, {}, [className])}>
				<AnalyticHeader />
				<div className={cls.analiticChart}>
					<LeftAnalytic />
					<div className={cls.mainChart}>
						<ChartAnalytic />
					</div>
				</div>
				<AnalyticStatistic />
			</div>
		</div>
	)
}

export default AnaliticPage
