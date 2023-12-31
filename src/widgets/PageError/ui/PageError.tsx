import React from 'react'
import cls from './PageError.module.scss'
import { Button } from 'shared/ui/Button/Button'
import { classNames } from 'shared/lib/classNames/classNames'

interface PageErrorProps {
	className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
	const handleReload = () => {
		location.reload()
	}

	return (
		<div className={classNames(cls.PageError, {}, [className])}>
			<p>Произошла непредвиденная ошибка</p>
			<Button onClick={handleReload}>Обновить страницу</Button>
		</div>
	)
}
