import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Contrato from './Contrato'

const List = styled.div`
    width: 80%;
`
const ListItem = styled.div`
    border: solid black 1px;
    display: flex;
    flex-direction:column;
`
const Main = styled.div`
    width: 80%;
    display:flex;
`
const Filtro = styled.div`
    width: 20%;
    display:flex;
    flex-direction:column;
`
const FiltroItem = styled.div`
    display:flex;
    flex-direction:column;
`
const FiltroBotao = styled.div`
    display:flex;
`

class ListaJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobList: undefined,
            filterList: undefined,
            title: "",
            descricao: "",
            valMin: "",
            valMax: "",
        }
    }
    componentDidMount() {
        console.log("entrei no lugar mais importante")
        this.listImport();
    }
    listImport = async () => {
        let result = undefined
        try {
            result = await axios.get(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs`,
                { headers: { 'Content-Type': 'application/json' } })
            this.setState({ jobList: result.data.jobs, filterList: result.data.jobs })
        } catch (error) {
            console.log(error)
        }

    }
    inputTitle = e => {
        this.setState({ title: e.target.value })
    }
    inputDescricao = e => {
        this.setState({ descricao: e.target.value })
    }
    inputValMin = e => {
        this.setState({ valMin: e.target.value })
        console.log(this.state.valMin)
    }
    inputValMax = e => {
        this.setState({ valMax: e.target.value })
    }
    filterListByValMInAndValMax = (min, max) => {

        let jobList = this.state.jobList
        jobList = this.state.jobList.filter((job) => {
            if (min !== "") {
                return parseInt(job.value) > min
            }
            else if (max !== "") {
                return parseInt(job.value) < max
            }
        })
        this.setState({ filterList: jobList })
    }
    filterListByTitleAndDescription = (title, descricao) => {

        let jobList = this.state.jobList.filter((job) => {
            return job.title.includes(title)
        })
        if (descricao !== "") {
            jobList = jobList.filter((job) => {
                return job.description.includes(descricao)
            })
        }
        this.setState({ filterList: jobList })
    }

    changeTaken = async (id) => {

        const job = this.state.jobList.filter((job) => {
            return job.id === id
        })
        alert("teste")

        if (!job[0].taken) {
            try {
                const result = await axios.put(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs/${id}/take`,
                    { headers: { 'Content-Type': 'application/json' } })
                
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                const result = await axios.put(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs/${id}/giveup`,
                    { headers: { 'Content-Type': 'application/json' } })
            } catch (error) {
                console.log(error)
            }
        }
        this.listImport()
        console.log(this.state.jobList)

    }
    filterAlphabetically = () => {
        let jobList = this.state.jobList
        jobList.sort(function (jobA, jobB) {
            if (jobA.title < jobB.title) { return -1; }
            if (jobA.title > jobB.title) { return 1; }
            return 0;
        })
        this.setState({ filterList: jobList })
    }

    filterByValue = () => {
        let jobList = this.state.jobList
        jobList.sort(function (jobA, jobB) {
            if (parseInt(jobA.value) < parseInt(jobB.value)) { return -1; }
            if (parseInt(jobA.value) > parseInt(jobB.value)) { return 1; }
            return 0;
        })
        this.setState({ filterList: jobList })
    }
    filterByDate = () => {
        let jobList = this.state.jobList
        jobList.sort(function (jobA, jobB) {
            if (Date.parse(jobA.dueDate) < Date.parse(jobB.dueDate)) { return -1; }
            if (Date.parse(jobA.dueDate) > Date.parse(jobB.dueDate)) { return 1; }
            return 0;
        })
        this.setState({ filterList: jobList })
    }

    render() {
        const list = this.state.filterList

        if (list !== undefined) {
            return (
                <Main>
                    <Filtro>
                        <FiltroItem>
                            <input placeholder="Filtrar por titulo..." value={this.state.title} onChange={this.inputTitle}></input>
                            <input placeholder="Filtrar por Descrição..." value={this.state.descricao} onChange={this.inputDescricao}></input>
                            <button onClick={() => this.filterListByTitleAndDescription(this.state.title, this.state.descricao)}>filtrar</button>
                        </FiltroItem>
                        <FiltroItem>
                            <input placeholder="valor minimo" value={this.state.valMin} onChange={this.inputValMin}></input>
                            <input placeholder="valor maximo" value={this.state.valMax} onChange={this.inputValMax}></input>
                            <button onClick={() => this.filterListByValMInAndValMax(this.state.valMin, this.state.valMax)}>filtrar</button>
                        </FiltroItem>
                        <FiltroBotao>
                            <button onClick={() => this.filterAlphabetically()}>Ordernar Por Titulo</button>
                            <button onClick={() => this.filterByValue()}>Ordernar Por valor</button>
                            <button onClick={() => this.filterByDate()}>Ordernar Por Data</button>
                        </FiltroBotao>
                    </Filtro>
                    <List>
                        {list.map(job => (
                            <Contrato taken={job} changeTaken={()=>{this.changeTaken(job.id)}} descricaoJob={job.description} key={job.id} currentMenu={this.props.currentMenu} tituloJob={job.title} tituloprazoJob={job.dueDate} valorJob={job.value} pagJob={job.paymentMethods[0]} />
                        ))}
                    </List>
                </Main>
            )
        }
        else {
            return (
                <div>lista vazia</div>
            )
        }
    }

}
export default ListaJobs;