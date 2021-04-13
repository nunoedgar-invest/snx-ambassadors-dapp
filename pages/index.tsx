import React, { useMemo } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from 'components/Header';
import { useTranslation } from 'react-i18next';
import { FlexDivRow, Paragraph, GridDiv } from 'styles/common';
import Box from 'components/Box';
import useTokenList from 'queries/tokenLists/useTokenLists';
import { MAX_PAGE_WIDTH } from 'styles/constants';
import Table from 'components/Table';
import { CellProps } from 'react-table';
import Spinner from 'assets/svg/loader.svg';
import { Svg } from 'react-optimized-image';

const HomePage: React.FC = () => {
	const { t } = useTranslation();
	const tokenListQuery = useTokenList();
	const tokenList = useMemo(() => (tokenListQuery.isSuccess ? tokenListQuery.data ?? null : null), [
		tokenListQuery.isSuccess,
		tokenListQuery.data,
	]);

	const SUPPORTED_PROTOCOLS = ['UNI', 'COMP', 'AAVE', '1INCH'];

	const memberColumns = useMemo(() => {
		const columns = [
			{
				Header: <>{t('members.table.name')}</>,
				accessor: 'name',
				Cell: (cellProps: CellProps<any>) => {
					return <StyledParagraph>{cellProps.value}</StyledParagraph>;
				},

				sortable: false,
				width: 600,
			},
			{
				Header: <>{t('members.table.address')}</>,
				accessor: 'address',
				Cell: (cellProps: CellProps<any>) => {
					return <StyledParagraph>{cellProps.value}</StyledParagraph>;
				},
				sortable: false,
				width: 600,
			},
		];

		return columns;
	}, [t]);

	// @TODO: add real addresses
	const data = [
		{
			name: 'MiLLiΞ',
			address: '0xf55703751d80476B5ae8d26f7D3b99A1D3FbE69B',
		},
		{
			name: 'farmwell',
			address: '0xf55703751d80476B5ae8d26f7D3b99A1D3FbE69B',
		},
		{
			name: 'SynthaMan',
			address: '0xf55703751d80476B5ae8d26f7D3b99A1D3FbE69B',
		},
	];

	return (
		<>
			<Head>
				<title>Ambassadors</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<>
				<Header title={t('ambassadors.title')} first />
				<BoxContainer>
					<StyledParagraph>{t('ambassadors.description')}</StyledParagraph>
				</BoxContainer>
				<Header title={t('delegation.title')} />
				<StyledGrid>
					{SUPPORTED_PROTOCOLS.map((symbol, i) => {
						if (tokenList) {
							return (
								<Box key={i} tokenInfo={tokenList[symbol]} votingPower={'0'} delegated={'0'} />
							);
						} else return <StyledSpinner src={Spinner} />;
					})}
				</StyledGrid>
				<Header title={t('members.title')} />
				<BoxContainer>
					<StyledParagraph>{t('members.helper')}</StyledParagraph>
				</BoxContainer>
				<BoxContainer>
					<StyledTable
						palette="primary"
						columns={memberColumns}
						data={data}
						isLoading={false}
						showPagination={false}
					/>
				</BoxContainer>
			</>
		</>
	);
};

export default HomePage;

const StyledGrid = styled(GridDiv)`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: 0 auto;
	column-gap: 16px;
	grid-template-columns: auto auto auto;
`;

const BoxContainer = styled(FlexDivRow)<{ first?: boolean }>`
	max-width: ${MAX_PAGE_WIDTH}px;
	margin: ${(props) => (props.first ? '120px auto 20px auto' : '40px auto 20px auto')};
	font-size: 28px;
	line-height: 120%;
	font-family: ${(props) => `${props.theme.fonts.expanded}, ${props.theme.fonts.regular}`};
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
`;

const StyledTable = styled(Table)`
	width: 100%;

	.table-body-cell {
		height: 40px;
	}
	.table-body-cell,
	.table-header-cell {
		&:last-child {
		}
	}
`;

const StyledParagraph = styled(Paragraph)`
	font-size: 14px;
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.white};
	text-transform: none;
`;

// @ts-ignore
const StyledSpinner = styled(Svg)`
	display: block;
	margin: 30px auto;
`;
