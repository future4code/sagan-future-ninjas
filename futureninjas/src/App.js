import React, { Fragment } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { MuiThemeProvider, createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { PageInitial } from './components/PageInitial'
import Contrato from './components/Contrato'
import FormularioAddJobs from './components/FormularioAddJob'
import ListaJobs from './components/ListaJobs'

const generateClassName = createGenerateClassName()
const jss = create({
	...jssPreset(),
	// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
	insertionPoint: document.getElementById('jss-insertion-point'),
})

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#ac8ede',
		},
		secondary: {
			main: '#494949',
		},
	}
})

const Main = styled.div`
`
const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #F5F3FC;
`
const Footer = styled.div`
	background-color: #ac8ede;
	display: flex;
	justify-content:center;
	height: 80px;
`
const MenuTop = styled.div`
	width: 100%;
	background-color: #AC8EDE;
`
const Logo = styled.img`
	width: 379px;
	height: 169px;
`
const ToolbarMenu = styled(Toolbar)`
	display: flex;
	justify-content: center;
`
const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #F5F3FC;
`
const ButtonMenu = styled(Button)`
	margin-inline-end: 20px;
`
const Input = styled(InputBase)`
	width: 129px;
	border: 1px solid black;
	border-radius: 5px;
`


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentMenu: 'initial',
			currentPage: 'initial'
		}
	}




	currentMenu = (currentMenu) => {
		switch (currentMenu) {
			case 'initial':
				return (
					<Fragment>
						<ButtonMenu onClick={() => {
							this.setState({
								currentMenu: 'contract',
								currentPage: 'contract'
							})
						}} variant="contained" color="primary"><strong>Contratar serviço</strong></ButtonMenu>
						<ButtonMenu onClick={() => {
							this.setState({
								currentMenu: 'provider',
								currentPage: 'listJobsProvider'
							})
						}} variant="contained" color="primary"><strong>Prestar serviço</strong></ButtonMenu>
					</Fragment>
				)
			case 'contract':
				return (
					<Fragment>
						<ButtonMenu onClick={() => {
							this.setState({
								currentPage: 'contract'
							})
						}} variant="contained" color="primary"><strong>Contratar serviço</strong></ButtonMenu>
						<ButtonMenu onClick={() => {
							this.setState({
								currentPage: 'listJobsContract'
							})
						}} variant="contained" color="primary"><strong>Meus contratos</strong></ButtonMenu>
						<Input placeholder="Pesquisar serviço" />
						<SearchIcon />
					</Fragment>
				)
			case 'provider':
				return (
					<Fragment>
						<ButtonMenu onClick={() => {
							this.setState({
								currentPage: 'listJobsProvider'
							})
						}} variant="contained" color="primary"><strong>Ofertas de serviços</strong></ButtonMenu>
						<ButtonMenu onClick={() => {
							this.setState({
								currentPage: 'listJobsProvider'
							})
						}} variant="contained" color="primary"><strong>Serviços aceitos</strong></ButtonMenu>
						<Input placeholder="Pesquisar serviço" />
						<SearchIcon />
					</Fragment>
				)
			default:
				return (
					<Fragment>Menu não encontrado</Fragment>
				)
		}
	}
	currentPage = (currentPage) => {
		console.log('exec')
		console.log(currentPage)
		switch (currentPage) {
			case 'initial':
				return (<PageInitial />)
			case 'contract':
				return (<FormularioAddJobs />)
			case 'myContracts':
				return (<ListaJobs currentMenu="contract" />)
			case 'listJobsContract':
				return (<ListaJobs currentMenu="contract" />)
			case 'listJobsProvider':
				console.log("entrei no p")
				return (<ListaJobs currentMenu="provider" />)
			default:
				return (
					<Fragment>Página não encontrada</Fragment>
				)
		}
	}
	render() {
		return (
			<JssProvider jss={jss} generateClassName={generateClassName}>
				<MuiThemeProvider theme={theme}>
					<Main>
						<Header>
							<MenuTop>
								<Button onClick={() => {
									this.setState({
										currentMenu: 'contract',
										currentPage: 'contract'
									})
								}} color="default"><strong>CONTRATAR SERVIÇO</strong></Button>
								<Button onClick={() => {
									this.setState({
										currentMenu: 'provider',
										currentPage: 'listJobsProvider'
									})
								}} color="default"><strong>PRESTAR SERVIÇO</strong></Button>
							</MenuTop>
							<Logo src={require("./img/logo.png")} />
							<AppBar position="static">
								<ToolbarMenu>
									{this.currentMenu(this.state.currentMenu)}
								</ToolbarMenu>
							</AppBar>
						</Header>
						<Page>
							{this.currentPage(this.state.currentPage)}
						</Page>
						<Footer>
							Footer
						</Footer>
					</Main>
				</MuiThemeProvider>
			</JssProvider>
		)
	}
}

export default App
