import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const List = styled.div`
    
`
const ListItem = styled.div`
    border: solid black 1px;
    display: flex;
    flex-direction:column;
`

class ListaJobs extends Component{
    constructor(props){
        super(props)
        this.state = {
            jobList: undefined,
            filterList:undefined,
            title: "",
            descricao:"",
            valMin: "",
            valMax: "",
        }
    }
componentDidMount(){
    this.listImport();
}
listImport = async()=>{
    let result = undefined
    try{
        result = await axios.get(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs`,
        {headers: {'Content-Type': 'application/json'}})
        this.setState({jobList: result.data.jobs, filterList:result.data.jobs})
    }catch(error){
        console.log(error)
    }
    
}
inputTitle = e =>{
    this.setState({title: e.target.value})
}
inputDescricao = e =>{
    this.setState({descricao: e.target.value})
}
inputValMin = e =>{
    this.setState({valMin: e.target.value})
    console.log(this.state.valMin)
}
inputValMax= e =>{
    this.setState({valMax: e.target.value})
}
filterListByValMInAndValMax = (min,max)=>{
    
    let jobList = this.state.jobList
    jobList = this.state.jobList.filter((job)=>{
        if(min !== ""){
            return parseInt(job.value) > min
        }
        else if(max !== ""){
            return parseInt(job.value) < max
        }
    })
    this.setState({filterList: jobList}) 
}
filterListByTitleAndDescription = (title,descricao) =>{
    
    let jobList = this.state.jobList.filter((job)=>{
        return job.title.includes(title)
    })
    if(descricao !== ""){
        jobList = jobList.filter((job)=>{
            return job.description.includes(descricao)
        })
    }  
    this.setState({filterList: jobList})
}

changeTaken = async (id) =>{
    
    const job = this.state.jobList.filter((job)=>{
        return job.id === id
    })
    
    
    if(!job[0].taken){
        try{
            const result = await axios.put(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs/${id}/take`,
            {headers: {'Content-Type': 'application/json'}})
        }catch(error){
            console.log(error)
        }  
    }
    else{
        try{
            const result = await axios.put(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs/${id}/giveup`,
            {headers: {'Content-Type': 'application/json'}})
        }catch(error){
            console.log(error)
        }  
    }
    this.listImport()
    
}
filterAlphabetically =()=>{
    let jobList = this.state.jobList
    jobList.sort(function(jobA, jobB){
        if(jobA.title < jobB.title) { return -1; }
        if(jobA.title > jobB.title) { return 1; }
        return 0;
    })
    this.setState({filterList: jobList})
}

filterByValue =()=>{
    let jobList = this.state.jobList
    jobList.sort(function(jobA, jobB){
        if(parseInt(jobA.value) < parseInt(jobB.value) ) { return -1; }
        if(parseInt(jobA.value)  > parseInt(jobB.value) ) { return 1; }
        return 0;
    })
    this.setState({filterList: jobList})
}
filterByDate =()=>{
    let jobList = this.state.jobList
    jobList.sort(function(jobA, jobB){
        if(Date.parse(jobA.dueDate) < Date.parse(jobB.dueDate) ) { return -1; }
        if(Date.parse(jobA.dueDate)  > Date.parse(jobB.dueDate) ) { return 1; }
        return 0;
    })
    this.setState({filterList: jobList})
}

render(){
    const list = this.state.filterList
    
    if(list!== undefined){
        return(
            <div>
                <List>
                {list.map(job=>(
                    <ListItem>
                        <p>Titulo: {job.title}</p><p> Descrição:{job.description}</p><p> Forma De Pagamento: {job.paymentMethods[0]}</p>
                        <p>Prazo: {job.dueDate}</p><p>Valor Do Pagamento: {job.value}</p><button onClick={()=>this.changeTaken(job.id)}>Pegar/Largar</button>
                    </ListItem>   
                ))}
                </List>
                
                <input placeholder="Filtrar por titulo..." value={this.state.title} onChange={this.inputTitle}></input>
                <input placeholder="Filtrar por Descrição..." value={this.state.descricao} onChange={this.inputDescricao}></input>
                <button onClick={()=>this.filterListByTitleAndDescription(this.state.title,this.state.descricao)}>filtrar</button>
                <input  placeholder="valor minimo" value={this.state.valMin} onChange={this.inputValMin}></input>
                <input  placeholder="valor maximo" value={this.state.valMax} onChange={this.inputValMax}></input>
                <button onClick={()=>this.filterListByValMInAndValMax(this.state.valMin,this.state.valMax)}>filtrar</button>
                <button onClick={()=>this.filterAlphabetically()}>Ordernar Por Titulo</button>
                <button onClick={()=>this.filterByValue()}>Ordernar Por valor</button>
                <button onClick={()=>this.filterByDate()}>Ordernar Por Data</button>
            </div>
        )    
    }
    else{
        return(
            <div>lista vazia</div>
        )    
    }
}

}
export default ListaJobs;