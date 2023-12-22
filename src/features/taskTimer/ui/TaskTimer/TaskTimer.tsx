import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTimer.module.scss'

interface TaskTimerProps {
  className?: string
}

export const TaskTimer = ({ className }: TaskTimerProps) => {
  return (
    <div className={classNames(cls.TaskTimer, {}, [className])}></div>
  )
}