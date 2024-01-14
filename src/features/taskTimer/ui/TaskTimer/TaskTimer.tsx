import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTimer.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { taskActions } from 'entities/Task'
import { formatTime } from 'shared/lib/helpers/formatTime'

interface TaskTimerProps {
    className?: string
}

export const TaskTimer = (props: TaskTimerProps) => {

    const { className, } = props

    const dispatch = useAppDispatch()
    const tasks = useSelector((state: StateSchema) => state.tasks)
    const activeTask = useSelector((state: StateSchema) => state.tasks.activeTask);
    const activeTaskTime = useSelector((state: StateSchema) => state.tasks.activeTask?.taskTime);
    const activeTaskCountPomidor = useSelector((state: StateSchema) => state.tasks.activeTask?.countPomidor);

    const [startTimerApp, setStartTimerApp] = useState(false)
    const [isTimeRun, setIsTimeRun] = useState(false)

    const [indexTask, setIndexTask] = useState(0)
    const [countSession, setCountSession] = useState(1)

    const [timebreakLong, setTimeBreakLong] = useState(10)
    const [timebreakShort, setTimeBreakShort] = useState(5)
    const [isBreak, setIsBreak] = useState(false)

    const [formattedTime, setFormattedTime] = useState('00:00');
    const [isTimerType, setiIsTimerType] = useState('')


    const startTimer = () => {
        setStartTimerApp(true)
        setIsTimeRun(true)
    }


    //Выполнить то, если isBreak изменился.
    useEffect(() => {
        if (startTimerApp) {
            if (indexTask < tasks.tasks.length) {
                dispatch(taskActions.setActiveTask(tasks.tasks[indexTask].id))
                if (!isBreak) {
                    if (activeTask) {
                        const mainIntervalId = setInterval(() => {
                            dispatch((dispatch, getState) => {
                                const { activeTask } = getState().tasks
                                console.log(activeTask!.taskTime)
                                console.log(activeTask!.countPomidor)
                                if (activeTask) {
                                    if (activeTask.taskTime > 0) {
                                        dispatch(taskActions.tickTimerTask())
                                    } else {
                                        if (activeTask.taskTime === 0 && activeTask.countPomidor === 1) {
                                            console.log('старт следующей задачи')
                                            clearInterval(mainIntervalId);
                                            setIndexTask(indexTask + 1)
                                        } else if (activeTask.taskTime === 0 && activeTask.countPomidor != 1) {
                                            console.log('старт следующей помидорки дял задачи')
                                            dispatch(taskActions.tickPomidorTask(activeTask.id))
                                            clearInterval(mainIntervalId);
                                        }
                                        setIsTimeRun(false)
                                        setIsBreak(true);
                                        setCountSession(prevCount => prevCount + 1);
                                        startTimer()
                                    }
                                }
                            })
                        }, 1000)
                    }
                } else {
                    const isbreakId = setInterval(() => {
                        setIsTimeRun(false)
                        if (countSession === 4) {
                            console.log('начался длинный перерыв')
                            setTimeBreakLong(prev => {
                                if (prev === 0) {
                                    clearInterval(isbreakId)
                                    setTimeBreakLong(10)
                                    setiIsTimerType('long')
                                    setIsTimeRun(true)
                                    setIsBreak(false)
                                }
                                return prev - 1
                            })
                        } else {
                            console.log('начался короткий перерыв')
                            setTimeBreakShort(prev => {
                                if (prev === 0) {
                                    clearInterval(isbreakId)
                                    setTimeBreakShort(5)
                                    setiIsTimerType('short')
                                    setIsTimeRun(true)
                                    setIsBreak(false)
                                }
                                return prev - 1
                            })

                        }
                    }, 1000)
                }
            } else {
                console.log('Всё')
                setIsTimeRun(false)
                setStartTimerApp(false)
            }
        }
    }, [isBreak, startTimerApp])


    ///Что будет после первого запуска приложения
    useEffect(() => {
        if (tasks.tasks.length != 0 && !activeTask) {
            console.log('вставка активной задачи c useEffect')
            dispatch(taskActions.setActiveTask(tasks.tasks[0].id))
        }
    }, [])


    ///Установка времени
    useEffect(() => {
        if (isBreak) {
            console.log(isTimerType)
            const timerType = isTimerType === 'long' ? timebreakLong : timebreakShort;
            setFormattedTime(formatTime(timerType, 'timer'));
        }
    }, [isBreak, isTimeRun, isTimerType])


    return (
        <div className={classNames(cls.TaskTimer, {}, [className])}>
            {/* ///???????????????????????????? */}
            <div className={classNames(cls.timerHeader, { [cls.timerHeaderActiver]: isTimeRun, [cls.isBreak]: isBreak })}>
                <div>{activeTask?.taskSummary}</div>
                <div>Помидор {activeTask?.countPomidor}</div>
            </div>
            <div className={cls.timerBlock}>
                <span className={cls.timerContent}>
                    <span className={classNames(cls.timer, {})}>
                        {isTimeRun ? formatTime(activeTask!.taskTime, 'timer') : formattedTime}
                    </span>
                    <span className={cls.iconBtnActionAddTime}>
                        <AddTimeBigAction />
                    </span>
                </span>
            </div>
            <div className={cls.taskTimer}>
                Задача (порядковый номер в списке) - (название задачи)
            </div>
            <div className={cls.btnTimerAction}>
                <>
                    <Button
                        className={classNames(cls.timerButtonStart, {})}
                        onClick={() => startTimer()}
                    >
                        Старт
                    </Button>
                    <Button
                        className={classNames(
                            cls.timerButtonStopUnactive,
                            {}
                        )}
                    // onClick={stopTimer}
                    >
                        Стоп
                    </Button>
                </>
            </div>
        </div>
    )
}