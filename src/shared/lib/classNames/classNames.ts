/**
 * 1) cls - главный класс,
 * 2) mods - обьект с модами, где ключ это название класса, а значение boolean флаг,
 * 3) additional - массив дополнительных классов
 */

/**
 *  Пример: classnames('remove-btn', (hovered: true, selectable: true, red: false), ['pdg'])
 *  Получим: 'remove-btn hovered selectable padding pdg'
 */

/*
 * Record - это специальный тип из TypeScript,
 * который обозначает что в качестве ключа, в данном кейсе, будет использоваться string,
 * а в качестве значения boolean или string
 */

export type Mods = Record<string, boolean | string | undefined>

export function classNames(
	cls: string,
	mods: Mods = {},
	additional: Array<string | undefined> = []
): string {
	return [
		cls,
		...additional.filter(Boolean),
		...Object.entries(mods)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, value]) => Boolean(value))
			.map(([className]) => className),
	].join(' ')
}
