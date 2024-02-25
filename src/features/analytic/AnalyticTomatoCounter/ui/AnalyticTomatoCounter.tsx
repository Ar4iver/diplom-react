import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AnalyticTomatoCounter.module.scss'
import PomidorSVGEmpty from 'shared/assets/icons/tomato-empty.svg'

interface AnalyticTomatoCounterProps {
	className?: string
}

export const AnalyticTomatoCounter = ({
	className,
}: AnalyticTomatoCounterProps) => {
	return (
		<div className={classNames(cls.AnaliticTomatoCounter, {}, [className])}>
			<div className={cls.pomidor}>
				<PomidorSVGEmpty />
			</div>
		</div>
	)
}

// <div className={`${style.wrapper} ${isLight ? '' : style.wrapper_dark}`}>
//       <div className={style.tomatoCount}>
//         {completedTomatoCount !== 0 && <AnalyticTomatoCounter count={completedTomatoCount}/>}
//         {completedTomatoCount === 0 && <TomatoEmptySvg/>}
//       </div>
//       {completedTomatoCount !== 0 &&
//         <div className={style.tomatoCountRow}>
//           <TextBold color={isLight ? 'white' : 'black'} text={`${completedTomatoCount} помидора`}/>
//         </div>
//       }
//     </div>
