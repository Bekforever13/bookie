import { Select, SelectProps } from 'antd'
import React from 'react'

const UiSelect: React.FC<SelectProps> = _props => {
	return <Select {..._props} style={{ width: '100%' }} />
}

export { UiSelect }
