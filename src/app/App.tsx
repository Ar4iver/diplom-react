import React, { useState } from 'react'
import { useTheme } from 'shared/lib/theme/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { Modal } from 'shared/ui/Modal/Modal'
import { Navbar } from 'widgets/NavBar'

const App = () => {
	const { theme } = useTheme()

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={classNames('app', {}, [theme])}>
			<Navbar />
			<button onClick={() => setIsOpen(true)}>toogle modal</button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
				excepturi facilis ipsum sed et libero. Hic dolores quidem soluta
				vel repellendus nesciunt? Magni possimus a blanditiis voluptatem
				dolor at id. Lorem ipsum dolor sit amet, consectetur adipisicing
				elit. Ducimus labore ullam laborum commodi rerum saepe totam,
				minus dolore nesciunt quia esse architecto qui amet, cumque
				quas, autem soluta officia perspiciatis. Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Sunt voluptatem quae qui
				magnam et, excepturi illum ab neque quas. Voluptas hic quidem
				ipsam magnam vitae atque modi earum quis cum.Lorem ipsum dolor
				sit amet, consectetur adipisicing elit. Ducimus labore ullam
				laborum commodi rerum saepe totam, minus dolore nesciunt quia
				esse architecto qui amet, cumque quas, autem soluta officia
				perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Sunt voluptatem quae qui magnam et, excepturi illum ab
				neque quas. Voluptas hic quidem ipsam magnam vitae atque modi
				earum quis cum.
			</Modal>
			<ThemeSwitcher />
			<AppRouter />
		</div>
	)
}

export default App
