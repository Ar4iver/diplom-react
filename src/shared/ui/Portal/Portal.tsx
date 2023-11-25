import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

/**
 *
 * children - Это какой либо компонент, который мы будем "телепортировать" в контейнер
 * element - Это соответственно тот самый контейнер, в который нужно поместить компонент
 * По умолчанию, телепортировать children будем в body
 */

interface PortalProps {
	children?: ReactNode
	element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
	const { children, element = document.body } = props

	return createPortal(children, element)
}
