import React, { useRef, useState } from 'react'
import { useAutosizeTextArea } from 'src/hooks/useAutosizeTextarea'
import styles from './BookInfo.module.scss'
import avatar from 'src/assets/images/avatar.svg'
import { Rate } from 'antd'
import { StyledButton } from 'src/components/ui/button/StyledButtons'

const Report = () => {
	const [value, setValue] = useState('')
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	useAutosizeTextArea(textAreaRef.current, value)

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = event.target?.value
		setValue(val)
	}
	return (
		<div className={styles.report}>
			<div className={styles.head}>
				<h2>Pikir qaldırıw</h2>
				<Rate defaultValue={4} />
			</div>
			<div className={styles.text}>
				<img src={avatar} alt='user avatar' />
				<textarea
					placeholder={"Pikir qaldırin'..."}
					onChange={handleChange}
					ref={textAreaRef}
					rows={1}
					value={value}
				/>
				<StyledButton bg='var(--brand-color-1)' color='#fff'>
					Sholıw
				</StyledButton>
			</div>
		</div>
	)
}

export { Report }
