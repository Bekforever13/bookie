import { Modal, ModalProps } from 'antd'
import React from 'react'

const UiModal: React.FC<ModalProps> = _props => {
	return <Modal {..._props} />
}

export { UiModal }
