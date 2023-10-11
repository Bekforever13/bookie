import { ConfigProvider, Rate, RateProps } from 'antd'
import React from 'react'

const UiRate: React.FC<RateProps> = _props => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorFill: '#ff9e30',
				},
			}}
		>
			<Rate {..._props} />
		</ConfigProvider>
	)
}

export { UiRate }
