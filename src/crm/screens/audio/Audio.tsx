import React from 'react'
import styles from './Audio.module.scss'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'

const Audio: React.FC = () => {
	// const { data } = useQuery<any[]>({
	// 	queryKey: ['book_info'],
	// 	queryFn: getBooks,
	// })
	// async function getBooks() {
	// 	const res = await $host.get('/categories')
	// 	return res.data.data
	// }
	// const columns = [
	// 	{
	// 		title: 'Title',
	// 		dataIndex: 'title',
	// 		key: 'title',
	// 	},
	// 	{
	// 		title: 'Is free',
	// 		dataIndex: 'is_free',
	// 		key: 'is_free',
	// 	},
	// 	{
	// 		title: 'Slug',
	// 		dataIndex: 'slug',
	// 		key: 'slug',
	// 	},
	// 	{
	// 		title: 'Audio URL',
	// 		dataIndex: 'audio_url',
	// 		key: 'audio_url',
	// 	},
	// ]
	return <div className={styles.audio}>Audio</div>
}

export { Audio }
