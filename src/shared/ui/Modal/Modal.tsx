import React, {
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { Portal } from 'shared/ui/Portal/Portal'

interface ModalProps {
	className?: string
	children?: ReactNode
	isOpen?: boolean
	onClose?: () => void
}

export const Modal = ({ children, className, isOpen, onClose }: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false)
	const timeRef = useRef<ReturnType<typeof setTimeout>>()

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timeRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, 300)
		}
	}, [onClose])

	/**
	 * На каждый рендер или перерендер компонента, функция будет создаваться заново,
	 * После рендера у каждой функции будет новая ссылка
	 * Чтобы на каждый рендер не создавать функции, есть хук, который запоминает значение этой функции
	 * И если при новом вызове значение, переданное в массив зависимостей, не изменилось, то возвращается предыдущая ссылка на эту же функцию.
	 */

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler()
			}
		},
		[closeHandler]
	)

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}
		return () => {
			clearTimeout(timeRef.current)
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])

	const mods: Record<string, boolean | undefined> = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	}

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className])}>
				<div className={cls.overlay} onClick={closeHandler}>
					<div className={cls.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	)
}
