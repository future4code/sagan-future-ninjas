import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const JobWrapper = styled.div`
    border: 1px black dotted
    display: flex;
    justify-content: center;
    align-items: center
    width: 60%;
    margin: 10px auto;
    min-height: 150px;
`
const InfoWrapper = styled.div`
    border-right: 1px dotted black
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
    width: 200%
`

function Contrato (props){

    return(
            <JobWrapper>
                <InfoWrapper>
                    <h3>{props.tituloJob}</h3>
                    <span>Prazo:</span><span>{props.prazoJob}</span><br/>
                    <span>Valor:</span><span>{props.valorJob}</span><br/>
                    <span>Forma de pagamento:</span><span>{props.pagJob}</span><br/>
                </InfoWrapper>
                <DescicaoWrapper>
                    <p>
                    {props.descricaoJob}                    
                    </p>
                    {props.botaoAceitarJob}
                    {/* A props acima refere-se ao botão de aceitar que será adicionado na lista
                    de jobs exibida ao prestador de serviços */}
                </DescicaoWrapper>
            </JobWrapper>
        )
}

export default Contrato;