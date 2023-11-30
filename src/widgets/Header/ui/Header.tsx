import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import PomodoroLogo from 'shared/assets/icons/pomodoro_icon.svg'
import StatisticIcon from 'shared/assets/icons/statistic_icon.svg'
import cls from './Header.module.scss'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { Container } from 'shared/ui/Container/ui/Container'

interface HeaderProps {
	className?: string
}

export enum ThemeHeaderLink {
	LIGHT = 'light',
	DARK = 'dark',
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<header className={classNames(cls.Header, {}, [className])}>
			<Container>
				<div className={classNames(cls.header__wrapper)}>
					<AppLink to={RoutePath.main}>
						<div className={classNames(cls.logo)}>
							<PomodoroLogo />
						</div>
					</AppLink>
					<div className={classNames(cls.links)}>
						<span>
							<ThemeSwitcher />
						</span>
						<AppLink
							to={RoutePath.statistic}
							className={classNames(cls.link)}
						>
							<span>
								<StatisticIcon />
							</span>
							<span>Статистика</span>
						</AppLink>
					</div>
				</div>
			</Container>
		</header>
	)
}
