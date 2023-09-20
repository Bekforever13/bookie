import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = props => (
	<ContentLoader
		speed={1}
		width={300}
		height={460}
		viewBox='0 0 300 460'
		backgroundColor='#f2eded'
		foregroundColor='#dedede'
		{...props}
	>
		<rect x='0' y='0' rx='10' ry='10' width='300' height='300' />
		<rect x='0' y='320' rx='10' ry='10' width='130' height='30' />
		<rect x='0' y='360' rx='10' ry='10' width='200' height='30' />
		<rect x='250' y='320' rx='100' ry='100' width='35' height='35' />
		<rect x='0' y='420' rx='10' ry='10' width='200' height='30' />
	</ContentLoader>
)

export { Skeleton }
