import React from 'react'
import styled from 'styled-components'


const Main = styled.div`
	display:flex;
`
const Img = styled.img`
	width: 240px;
	/* height: 914px; */
	border-radius: 9px;
	margin: 10px;
`


export class PageInitial extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Main>
				{/* <img src={require("./img/page-initial-1.jpg")} /> */}
				<div>
					<Img src={require("../img/page-initial-1.jpg")} />

					<Img src={require("../img/page-initial-2.jpg")} />
				</div>
			</Main>
		)
	}
}