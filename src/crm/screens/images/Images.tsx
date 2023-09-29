import React from 'react'
import styles from './Images.module.scss'

const Images: React.FC = () => {
	// const { data } = useQuery<any[]>({
	// 	queryKey: ['book_info'],
	// 	queryFn: getBooks,
	// })
	// async function getBooks() {
	// 	const res = await $host.get('/authors')
	// 	return res.data.data
	// }
	// data && <CustomTable columns={columns} dataSource={data} />
	return <div className={styles.images}>Images</div>
}

export { Images }
