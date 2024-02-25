import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticHeader.module.scss'
import { Select } from 'shared/ui/Select/Select'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { chartActions } from 'features/chart/model/slice/chartAnalitic'
import { Activity } from 'features/chart/types/chart'

interface AnalyticHeaderProps {
	className?: string
}

const options = [
	{ value: 'Эта неделя', content: 'Эта неделя' },
	{ value: 'Прошедшая неделя', content: 'Прошедшая неделя' },
	{ value: '2 недели назад', content: '2 недели назад' },
]

export const AnalyticHeader = ({ className }: AnalyticHeaderProps) => {
	const dispatch = useAppDispatch()

	const onChangeActivity = useCallback(
		(activity: string) => {
			dispatch(chartActions.setActivity(activity as Activity))
		},
		[dispatch]
	)

	return (
		<div className={classNames(cls.AnalyticHeader, {}, [className])}>
			<h2>Ваша активность</h2>
			<Select options={options} onChange={onChangeActivity} />
		</div>
	)
}
