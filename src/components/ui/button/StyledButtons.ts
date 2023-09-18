import styled from 'styled-components'

export const StyledButton = styled.button`
	transition: all 0.2s ease-in-out;
	padding: 10px 24px;
	border-radius: 16px;
	font-size: 16px;
	font-weight: 600;
	line-height: 130%;
	cursor: pointer;
`

export const WhiteButton = styled(StyledButton)`
	background-color: var(--typography-light);
	color: var(--brand-color-1);

	&:hover {
		-webkit-box-shadow: 0px 0px 0px 3px rgba(161, 161, 161, 1);
		-moz-box-shadow: 0px 0px 0px 3px rgba(161, 161, 161, 1);
		box-shadow: 0px 0px 0px 3px rgba(161, 161, 161, 1);
	}
`

export const TransparentButton = styled(StyledButton)`
	border: 1px solid var(--typography-light);
	color: var(--typography-light);
	background-color: transparent;

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
