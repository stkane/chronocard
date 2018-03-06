import React, { Component } from 'react';

export class CardBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fact: '',
			date: undefined,
		};
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
		//this.props.deckCallback(this.state);
		console.log(this.state);
		
	}

	render() {
		return(
			<div>
				<div>
					<h2 className='tc'>YO</h2>
					<form>
						<input
							placeholder="card fact"
							name="fact"
							value={this.state.fact}
							onChange={this.onInputChange}
							
							
						/>
						<input
							placeholder="fact year"
							name="date"
							value={this.state.date}
							onChange={this.onInputChange}
						/>
					</form>
				</div>
			</div>
		);
	}
}
