import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoList.module.scss'

interface TodoListProps {
  className?: string
}

export const TodoList = ({ className }: TodoListProps) => {
  return (
    <div className={classNames(cls.TodoList, {}, [className])}></div>
  )
}