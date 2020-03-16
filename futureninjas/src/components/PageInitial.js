import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const Main = styled.div`
	width: 60%;
	display:flex;
	flex-wrap: wrap;
`
const Img = styled.img`
	width: 240px;
	border-radius: 9px;
	margin: 10px;
`
const classes = {
	card: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
};

const Description = styled(Card)`
	margin: 10px;
	width: 60%;
	@media (max-width: 480px){
		width: 100%;
	}
`


export class PageInitial extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Main>
					<Img src={require("../img/page-initial-1.jpg")} />
					<Description className={classes.card}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Contrate um serviço
       						 </Typography>
							<Typography variant="h5" component="h2">
								Contrate agora um serviço direto da sua casa economize tempo e garanta o melhor preço
							</Typography>
						</CardContent>
					</Description>
					<Description className={classes.card}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Encontre um serviço
       						 </Typography>
							<Typography variant="h5" component="h2">
								Que prestar serviço e encontrar as melhores oportunidades por um pagamento justo? só a future ninjas te conecta com os melhores clientes
							</Typography>
						</CardContent>
					</Description>
					<Img src={require("../img/page-initial-2.jpg")} />
			</Main>
		)
	}
}