import styled from 'styled-components'

interface ButtonProps {
	bg: string
	color: string
	border?: string
}
interface ButtonWithGrayHoverProps {
	width?: string
	onClick?: () => void
}

export const StyledButton = styled.button<ButtonProps>`
	transition: all 0.2s ease-in-out;
	padding: 10px 24px;
	border-radius: 16px;
	font-size: 16px;
	font-weight: 600;
	line-height: 130%;
	cursor: pointer;
	background-color: ${props => props.bg};
	color: ${props => props.color};
	border: ${props => props.border};

	&:hover {
		opacity: 0.9;
	}
`

export const ButtonWithGrayHover = styled(
	StyledButton
)<ButtonWithGrayHoverProps>`
	background-color: ${props => props.bg};
	color: ${props => props.color};
	width: ${props => props.width};

	&:hover {
		-webkit-box-shadow: 0px 0px 0px 3px rgba(161, 161, 161, 1);
		-moz-box-shadow: 0px 0px 0px 3px rgba(161, 161, 161, 1);
		box-shadow: 0px 0px 0px 3px rgba(161, 161, 161, 1);
	}
`

export const StyledSubmitButton = styled.button.attrs({ type: 'submit' })`
	transition: all 0.2s ease-in-out;
	padding: 13px 0 12px;
	border-radius: 16px;
	font-size: 16px;
	font-weight: 600;
	line-height: 130%;
	cursor: pointer;
	text-align: center;
	color: var(--typography-light);

	&:hover {
		opacity: 0.9;
	}
`
