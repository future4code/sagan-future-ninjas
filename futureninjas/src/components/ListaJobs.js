import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Contrato from './Contrato'

const List = styled.div`
`
const Main = styled.div`
   width: 80%;
`
const Filtro = styled.div`
    height: 30px;
    display:flex;
`
const ButonOrder = styled.button`
    height: 50px;    
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
            valMax: ""
        }
    }
    componentDidMount() {
        this.listImport();
    }
    listImport = async () => {
        let result = undefined
        try {
            result = await axios.get(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs`,
                { headers: { 'Content-Type': 'application/json' } })
            if (this.props.currentMenu==="providerAccepts"){
                const jobs = result.data.jobs.filter((job)=>{
                    return (job.taken===true)
                })
                this.setState({ jobList: jobs, filterList: jobs })
            }else{
                this.setState({ jobList: result.data.jobs, filterList: result.data.jobs })
            }
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
    }
    filterAlphabetically = () => {
        let jobList = this.state.jobList
        jobList.sort(function (jobA, jobB) {
            if (jobA.title < jobB.title) { return -1; }
            if (jobA.title > jobB.title) { return 1; }
            return 0;
        })
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
                        <input placeholder="Filtrar por titulo..." value={this.state.title} onChange={this.inputTitle}></input>
                        <input placeholder="Filtrar por Descrição..." value={this.state.descricao} onChange={this.inputDescricao}></input>
                        <button onClick={() => this.filterListByTitleAndDescription(this.state.title, this.state.descricao)}>filtrar</button>
                        <input placeholder="valor minimo" value={this.state.valMin} onChange={this.inputValMin}></input>
                        <input placeholder="valor maximo" value={this.state.valMax} onChange={this.inputValMax}></input>
                        <button onClick={() => this.filterListByValMInAndValMax(this.state.valMin, this.state.valMax)}>filtrar</button>
                        <ButonOrder onClick={() => this.filterAlphabetically()}>Ordernar Por Titulo</ButonOrder>
                        <ButonOrder onClick={() => this.filterByValue()}>Ordernar Por valor</ButonOrder>
                        <ButonOrder onClick={() => this.filterByDate()}>Ordernar Por Data</ButonOrder>
                    </Filtro>
                    <List>
                        {list.map((job, index) => (
                            <Contrato taken={job.taken} changeTaken={() => { this.changeTaken(job.id) }} descricaoJob={job.description} key={job.id} currentMenu={this.props.currentMenu} tituloJob={job.title} tituloprazoJob={job.dueDate} valorJob={job.value} pagJob={job.paymentMethods[0]} />
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