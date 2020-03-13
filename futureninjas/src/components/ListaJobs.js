import React, { Component } from 'react'
//import styled from 'styled-components'
import axios from 'axios'

class ListaJobs extends Component{
    constructor(props){
        super(props)
        this.state = {
            jobList: undefined,
            filterList:undefined,
            title: "",
            descricao:"",
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
filterList = (title,descricao) =>{
    
    let jobList = this.state.jobList.filter((job)=>{
        return job.title.includes(title)
    })
    jobList = this.state.jobList.filter((job)=>{
        return job.description.includes(descricao)
    })
    
    this.setState({filterList: jobList})
}

changeTaken = async (id) =>{
    
    const job = this.state.jobList.jobs.filter((job)=>{
        return job.id === id
    })
    
    if(!job.taken){
        try{
            const result = await axios.put(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs/:id/take`,id,
            {headers: {'Content-Type': 'application/json'}})
        }catch(error){
            console.log(error)
        }  
    }
    else{
        try{
            const result = await axios.put(`https://us-central1-future-apis.cloudfunctions.net/futureNinjas/jobs/:id/giveup`,id,
            {headers: {'Content-Type': 'application/json'}})
        }catch(error){
            console.log(error)
        }  
    }
    console.log(job)
}

render(){
    const list = this.state.filterList
    
    if(list!== undefined){
        return(
            <div>
                {console.log(this.state.jobList)}
                {list.map(job=>(
                    <div>
                        <p>{job.title}</p><p>{job.description}</p><p>{job.paymentMethods[0]}</p>
                        <p>{job.dueDate}</p><p>{job.value}</p><button onClick={()=>this.changeTaken(job.id)}>Pegar/Largar</button>
                    </div>   
                ))}
                <input placeholder="Filtrar por titulo..." value={this.state.title} onChange={this.inputTitle}></input>
                <input placeholder="Filtrar por Descrição..." value={this.state.descricao} onChange={this.inputDescricao}></input>
                <button onClick={()=>this.filterList(this.state.title,this.state.descricao)}>filtrar</button>
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