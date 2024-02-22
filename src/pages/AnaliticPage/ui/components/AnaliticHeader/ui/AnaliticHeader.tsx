import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnaliticHeader.module.scss'

interface AnaliticHeaderProps {
  className?: string
}

export const AnaliticHeader = ({ className }: AnaliticHeaderProps) => {
  return (
    <div className={classNames(cls.AnaliticHeader, {}, [className])}></div>
  )
}