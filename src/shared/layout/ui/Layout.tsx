import React, { ReactElement } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Layout.module.scss'
import { Container } from 'shared/ui/Container/ui/Container'

interface LayoutProps {
	className?: string
	header: ReactElement
	content: ReactElement
}

export const Layout = (props: LayoutProps) => {
	const { header, content, className } = props

	return (
		<div className={classNames(cls.Layout, {}, [className])}>
			<div>{header}</div>
			<Container>
				<div>{content}</div>
			</Container>
		</div>
	)
}
