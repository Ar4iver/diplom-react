import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnaliticPage.module.scss'
import { AnaliticHeader } from './components/AnaliticHeader'
import { LeftAnalitic } from './components/LeftAnalitic'
import { ChartAnalitic } from './components/ChartAnalitic'
import { AnaliticStatistic } from './components/AnaliticStatistic'
interface AnaliticPageProps {
	className?: string
}

const AnaliticPage = ({ className }: AnaliticPageProps) => {
	return (
		<div className={classNames(cls.AnaliticPage, {}, [className])}>
			<section>
				<div>
					<AnaliticHeader />
					<div>
						<LeftAnalitic />
						<div>
							<ChartAnalitic />
						</div>
					</div>
					<AnaliticStatistic />
				</div>
			</section>
		</div>
	)
}

export default AnaliticPage
