import React, { useRef, useState } from 'react'
import { useAutosizeTextArea } from 'src/hooks/useAutosizeTextarea'
import styles from './BookInfo.module.scss'
import avatar from 'src/assets/images/avatar.svg'
import { Rate } from 'antd'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
// import { $host } from 'src/config/axios'
// import { useQuery } from 'react-query'
// import { IBookInfo } from 'src/assets/types/Types'
// import { useParams } from 'react-router-dom'

type TData = {
	book_id: number
	text: string
	rating: number
}
const Report: React.FC = () => {
	// const { slug } = useParams()
	const [data, setData] = useState<TData>()
	const [value, setValue] = useState('')
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	// const { data: BookData } = useQuery<IBookInfo>({
	// 	queryKey: ['book_info'],
	// 	queryFn: getBookInfo,
	// })

	// async function getBookInfo() {
	// 	const res = await $host.get(`/all-books/${slug}`)
	// 	return res.data.data
	// }

	useAutosizeTextArea(textAreaRef.current, value)

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = event.target?.value
		setValue(val)
		setData(prev => prev && { ...prev, text: val })
		console.log(data)
	}

	// const handleClickReport = () => {
	// 	$host.post('/reviews', data).then(res => console.log(res))
	// }
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
					value={data?.text}
				/>
				<StyledButton
					// onClick={handleClickReport}
					backgroundcolor='var(--brand-color-1)'
					color='#fff'
				>
					Sholıw
				</StyledButton>
			</div>
		</div>
	)
}

export { Report }
