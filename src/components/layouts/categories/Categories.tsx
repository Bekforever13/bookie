import { Link } from 'react-router-dom'
import styles from './Categories.module.scss'
import search from 'src/assets/images/search.svg'
import { Input } from 'antd'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { TCategory } from 'src/assets/types/Types'

const Categories: React.FC = () => {
	const { data } = useQuery<TCategory[]>({
		queryKey: ['categories'],
		queryFn: getCategories,
		staleTime: Infinity,
		cacheTime: Infinity,
	})
	async function getCategories() {
		const res = await $host.get('/categories')
		return res.data.data
	}

	return (
		<div className={styles.categories}>
			{data?.map(item => (
				<Link key={item.id} to={`/category/${item.id}`}>
					{item.name}
				</Link>
			))}
			<div>
				<Input
					className={styles.search}
					prefix={<img src={search} alt='search' />}
					placeholder='Kitaptı izleń'
				/>
			</div>
		</div>
	)
}
export { Categories }
