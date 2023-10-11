import styles from './UiInput.module.scss'
import { StyledInput } from './StyledInput'

interface IProps {
	value: string
	setValue: (el: string) => void
	type: string
	icon: React.ReactNode
	placeholder: string
}

const UiInput: React.FC<IProps> = ({
	value,
	setValue,
	type,
	icon,
	placeholder,
}) => {
	return (
		<label className={styles.Input}>
			<StyledInput
				value={value}
				type={type}
				onChange={e => setValue(e.target.value)}
				placeholder={placeholder}
			/>
			{icon}
		</label>
	)
}
export { UiInput }
