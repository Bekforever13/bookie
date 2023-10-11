import { Link } from 'react-router-dom'
import styles from './Categories.module.scss'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { TIdNameSlug } from 'src/types/Types'
import { CategoriesSearch } from './CategoriesSearch'

const Categories: React.FC = () => {
	const { data } = useQuery<TIdNameSlug[]>({
		queryKey: ['categories'],
		queryFn: getCategories,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})
	async function getCategories() {
		const res = await $host.get('/category')
		return res.data.data
	}

	return (
		<div className={styles.categories}>
			{data?.map(item => (
				<Link key={item.slug} to={`/category/${item.slug}`}>
					{item.name}
				</Link>
			))}
			<CategoriesSearch />
		</div>
	)
}
export { Categories }
