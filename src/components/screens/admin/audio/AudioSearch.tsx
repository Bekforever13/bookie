import React from 'react'
import { BsSearch } from 'react-icons/bs'
import styles from './Audio.module.scss'

type AudioSearchProps = {
	id: string
	setId: (id: string) => void
}

const AudioSearch: React.FC<AudioSearchProps> = ({ id, setId }) => {
	return (
		<div className={styles.wrapper}>
			<label className={styles.input}>
				<input
					value={id}
					onChange={e => setId(e.target.value)}
					type='text'
					placeholder='Введите ID аудио'
				/>
				<BsSearch />
			</label>
		</div>
	)
}

export default AudioSearch
