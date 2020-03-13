import React from 'react'
import styled from 'styled-components'

const JobWrapper = styled.div`
    border: 1px black dotted;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 10px auto;
    min-height: 150px;
`
const InfoWrapper = styled.div`
    border-right: 1px dotted black;
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

class Contrato extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            botaoAceitarServico: false,
            taken: false
        }
    }

    componentDidMount(){
        this.alteraEstadoBotao()
        this.alteraEstadoTaken()
    }

    alteraEstadoTaken = ()=>{
        this.setState({taken: this.props.taken})
    }

    alteraEstadoBotao = () => {
        if (this.props.currentMenu === "provider") {
            this.setState({
                botaoAceitarServico: true
            })
        }
        else{
            this.setState({
                botaoAceitarServico: false
            })
        }
    }

    render() {
        console.log("takencontract: "+ this.props.taken)
        return (
            <JobWrapper>
                <InfoWrapper>
                    <h3>{this.props.tituloJob}</h3>
                    <span>Prazo:</span><span>{this.props.tituloprazoJob}</span><br />
                    <span>Valor:</span><span>{this.props.valorJob}</span><br />
                    <span>Forma de pagamento:</span><span>{this.props.pagJob}</span><br />
                </InfoWrapper>
                <DescicaoWrapper>
                    <p>
                        {this.props.descricaoJob}
                    </p>
                    {
                        this.state.botaoAceitarServico&&<button onClick={()=>{
                            this.props.changeTaken()
                            this.setState({taken: !this.state.taken})
                        }}>Aceitar serviço</button>
                    }
                    <div>olha só {this.state.taken}</div>
                    {
                        
                        this.state.taken?<p>Serviço já contratado</p>:<p>Serviço não contratado</p>
                    }
                    {/* A props acima refere-se ao botão de aceitar que será adicionado na lista
                        de jobs exibida ao prestador de serviços */}
                </DescicaoWrapper>
            </JobWrapper>
        )
    }
}

export default Contrato;