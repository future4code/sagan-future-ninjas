import React from 'react'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const StyledElemnts = styled(InputLabel)`
    margin-top: 10px;
    font-weight: bold;
`
const StyledDate = styled(Input)`
    margin-bottom: 10px;
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    width: 30%;
    padding: 5px;
    @media (max-width: 480px){
        width: 80%;
    }
`

class FormularioAddJobs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: "",
            description: "",
            price: "",
            payment: "",
            date: "",
        }
    }

    saveTitle = (e) => {
        this.setState({
            title: e.target.value
        })
        console.log(this.state.title)
    }

    saveDescription = (e) => {
        this.setState({
            description: e.target.value
        })
        console.log(this.state.description)
    }

    savePrice = (e) => {
        this.setState({
            price: e.target.value
        })
        console.log(this.state.price)
    }

    savePayment = (e) => {
        this.setState({
            payment: e.target.value
        })
        console.log(this.state.payment)
    }

    saveDate = (e) => {
        this.setState({
            date: e.target.value
        })
        console.log(this.state.date)
    }

    createJob = () => {
        const createJobData = {
            "title": this.state.title,
            "description": this.state.description,
            "value": this.state.price,
            "paymentMethods": [this.state.payment],
            "dueDate": this.state.date
        }
        const addJobPromise = axios.post(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs`,
        createJobData,{headers: {'Content-Type': 'application/json'}})
        addJobPromise.then((response => {
            console.log(response.data)
        })).catch((error)=> {
            console.log(error)
        })
    }

    render(){
        return(
            <FormWrapper>
                <h3>Contrato de prestação de serviço</h3>
                <StyledElemnts>Título do serviço</StyledElemnts>
                <Input type="text" 
                onChange={this.saveTitle} 
                value={this.state.title} 
                ></Input>
                <StyledElemnts>Descrição</StyledElemnts>
                <Input type="text" 
                onChange={this.saveDescription} 
                value={this.state.description} 
                ></Input>
                <StyledElemnts>Valor</StyledElemnts>
                <Input type="number" 
                onChange={this.savePrice} 
                value={this.state.price} 
                ></Input>
                <StyledElemnts>Pagamento</StyledElemnts>
                <NativeSelect 
                onChange={this.savePayment} 
                value={this.state.payment}
                >
                    <option>Selecione a forma de pagamento</option>
                    <option>Cartão de crédito</option>
                    <option>Cartão de débito</option>
                    <option>Dinheiro</option>
                    <option>Cheque</option>
                    <option>Escambo</option>
                </NativeSelect>
                <StyledElemnts>Dia de agendamento</StyledElemnts>
                <StyledDate type="date" 
                onChange={this.saveDate} 
                value={this.state.date} 
                ></StyledDate>
                <Button variant="outlined"
                onClick={this.createJob}
                >Criar contrato</Button>
            </FormWrapper>
        )
    }
}

export default FormularioAddJobs