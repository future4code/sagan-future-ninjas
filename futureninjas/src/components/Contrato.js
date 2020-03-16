import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const JobWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 10px auto;
    min-height: 150px;
`
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 100%;
`

const DescicaoWrapper = styled.div`
    padding: 5px;
    text-align: center;
    width: 200%;
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
	width: 100%;
`
const ItemContrato = styled(CardContent)`
    display:flex;
`

class Contrato extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            botaoAceitarServico: false,
            taken: false
        }
    }

    componentDidMount() {
        this.alteraEstadoBotao()
        this.alteraEstadoTaken()
    }

    alteraEstadoTaken = () => {
        this.setState({ taken: this.props.taken })
    }

    alteraEstadoBotao = () => {
        if (this.props.currentMenu === "provider" || this.props.currentMenu === "providerAccepts") {
            this.setState({
                botaoAceitarServico: true
            })
        }
        else {
            this.setState({
                botaoAceitarServico: false
            })
        }
    }

    render() {
        return (
            <JobWrapper>
                <Description className={classes.card}>
                    <ItemContrato>
                        <InfoWrapper>
                            <h3>{this.props.tituloJob}</h3>
                            <span>Prazo:</span><span>{this.props.tituloprazoJob}</span><br />
                            <span>Valor:</span><span>{this.props.valorJob}</span><br />
                        </InfoWrapper>
                        <DescicaoWrapper>
                            <p>
                                {this.props.descricaoJob}
                            </p>
                            <p>Forma de pagamento: {this.props.pagJob}</p>
                            {
                                this.state.botaoAceitarServico && <Button variant="contained" className={classes.button} onClick={() => {
                                    this.props.changeTaken()
                                    this.setState({ taken: !this.state.taken })
                                }}>Aceitar/Retirar serviço</Button>
                            }
                            {

                                this.state.taken ? <p><strong>Serviço já contratado</strong></p> : <p><strong>Serviço não contratado</strong></p>
                            }
                        </DescicaoWrapper>
                    </ItemContrato>
                </Description>
            </JobWrapper>
        )
    }
}

export default Contrato;