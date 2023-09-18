import { Button, ButtonProps } from 'antd'

const UiButton: React.FC<ButtonProps> = _props => {
	return <Button {..._props} type='primary' />
}
export { UiButton }
