import styled from 'styled-components'

interface ButtonProps {
	backgroundcolor?: string
	color: string
	border?: string
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
	background-color: ${props => props.backgroundcolor};
	color: ${props => props.color};
	border: ${props => props.border};
	width: fit-content;

	&:hover {
		opacity: 0.7;
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
	background-color: var(--brand-color-1);

	&:hover {
		opacity: 0.8;
	}
`
