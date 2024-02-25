import React from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Cell,
} from 'recharts'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ChartAnalytic.module.scss'

interface ChartAnalyticProps {
	className?: string
}

const data = [
	{ name: 'Пн', uv: 0 },
	{ name: 'Вт', uv: 0 },
	{ name: 'Ср', uv: 0 },
	{ name: 'Чт', uv: 0 },
	{ name: 'Пт', uv: 0 },
	{ name: 'Сб', uv: 0 },
	{ name: 'Вс', uv: 0 },
]

export const ChartAnalytic = ({ className }: ChartAnalyticProps) => {
	return (
		<div className={classNames(cls.ChartAnalytic, {}, [className])}>
			{' '}
			<ResponsiveContainer width="100%" height={471}>
				<BarChart width={150} height={40} data={data}>
					<CartesianGrid strokeDasharray="44 0" vertical={false} />
					<XAxis
						dataKey="name"
						tickLine={false}
						axisLine={false}
						// onClick={(e: IAxisClickEvent) => {
						// 	handleXAxisTickClick(e.index)
						// }}
						tick={{ fontSize: 24 }}
						tickSize={20}
						height={50}
					/>

					<Bar dataKey="uv" fill="#EA8A79">
						{data.map((entry, index) => {
							if (entry.uv === 0)
								return (
									<Cell
										cursor="pointer"
										height={-10}
										fill={'#C4C4C4'}
										key={`cell-${index}`}
									/>
								)
							// if (index === activeIndex) {
							// 	coloredSelectTick('#DC3E22')
							// }
							return (
								<Cell
									cursor="pointer"
									// fill={
									// 	index === activeIndex
									// 		? '#DC3E22'
									// 		: '#EA8A79'
									// }
									key={`cell-${index}`}
								/>
							)
						})}
					</Bar>
					<YAxis
						tickCount={6}
						orientation="right"
						interval={1}
						tickLine={false}
						axisLine={false}
						// tickFormatter={(v) =>
						// 	convertMinutesTomatoToString(
						// 		convertSecondToMinutes(v)
						// 	)
						// }
						height={70}
						tickSize={20}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}
