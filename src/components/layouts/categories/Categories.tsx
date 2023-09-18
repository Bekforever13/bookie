import { Link } from 'react-router-dom'
import styles from './Categories.module.scss'
import search from 'src/assets/images/search.svg'
import { Dropdown, Input, Space } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const Categories: React.FC = () => {
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Link className={styles.selectItem} to='/'>
					Dástanlar
				</Link>
			),
		},
		{
			key: '2',
			label: (
				<Link className={styles.selectItem} to='/'>
					Ertekler
				</Link>
			),
		},
		{
			key: '3',
			label: (
				<Link className={styles.selectItem} to='/'>
					Xalıq qosıqları
				</Link>
			),
		},
	]
	return (
		<div className={styles.categories}>
			<Link to='/'>Jáhán ádebiyatı</Link>
			<Link to='/'>Qaraqalpaq ádebiyatı</Link>
			<Link to='/'>Ózbek ádebiyatı</Link>
			<Link to='/'>Qısqa audiolar</Link>
			<Dropdown menu={{ items }}>
				<a onClick={e => e.preventDefault()}>
					<Space>
						Qaraqalpaq folklorı
						<DownOutlined />
					</Space>
				</a>
			</Dropdown>
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
