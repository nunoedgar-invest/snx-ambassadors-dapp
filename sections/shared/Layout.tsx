import { zIndex } from 'constants/ui';
import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import media from 'styles/media';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<GlobalStyle />
			<Page>
				<Header />
				<Section>{children}</Section>
				<Footer />
			</Page>
		</>
	);
};
export default Layout;

const Page = styled.div``;

const Section = styled.section`
	min-height: 90vh;
	padding-top: 20px;
	padding-bottom: 80px;
`;

const GlobalStyle = createGlobalStyle`
  body {
		background-color: ${(props) => props.theme.colors.black};
		color: ${(props) => props.theme.colors.white};
		margin: 0;
  }

  .bn-notify-custom {
		&& {
			font-family: ${(props) => props.theme.fonts.regular};
		}
	}
	/* blocknative onboard style overrides */
	.bn-onboard-custom {
		&&& {
			font-family: ${(props) => props.theme.fonts.regular};
			color: ${(props) => props.theme.colors.white};

		}
		&&.bn-onboard-modal {
			z-index: ${zIndex.DIALOG_OVERLAY};
			background: rgba(0, 0, 0, 0.8);
			${media.lessThan('sm')`
				align-items: flex-start;
			`};
		}
		&&.bn-onboard-modal-content-header-icon {
			background: none;
		}
		&&.bn-onboard-selected-wallet {
			background-color: ${(props) => props.theme.colors.grayBlue};
			color: ${(props) => props.theme.colors.white};
		}
		&&.bn-onboard-modal-content {
			background-color: ${(props) => props.theme.colors.navy};
			${media.lessThan('sm')`
				height: 100%;
			`};
		}
		&&.bn-onboard-select-wallet-info {
			cursor: pointer;
			color: ${(props) => props.theme.colors.white};
		}
		&&.bn-onboard-dark-mode-background-hover {
			&:hover {
				background-color: ${(props) => props.theme.colors.grayBlue};
			}
		}
		&&.bn-onboard-prepare-button {
			border-radius: 2px;
			color: ${(props) => props.theme.colors.white} ;
			background-color: ${(props) => props.theme.colors.navy} ;
			border: 1px solid ${(props) => props.theme.colors.grayBlue} ;
		}
		.bn-onboard-clickable {
			color: ${(props) => props.theme.colors.white} !important;
		}
	}
`;
