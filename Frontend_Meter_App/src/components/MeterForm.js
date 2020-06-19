import React from 'react';
import axios from 'axios';

class MeterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			serial: '',
			data: [],
			message: '',
			meter: [],
			formErrors: {
				serialErr: '',
			},
			fieldValidity: {
				serial: false,
			},
			formValid: false,
		};
	}

	handleChange = (e) => {
		const serialValue = e.target.value;
		var formErrors = this.state.formErrors;
		var fieldValidity = this.state.fieldValidity;
		this.setState({ serial: serialValue });
		if (serialValue.length === 0) {
			formErrors.serialErr = 'Serial Should not be empty';
			fieldValidity.serial = false;
		} else {
			formErrors.serialErr = '';
			fieldValidity.serial = true;
		}
		this.setState({ fieldValidity: fieldValidity });
		this.setState({ formValid: fieldValidity.serial });

		const meterdata = this.state.data.filter(
			(meter) => meter.Serial === this.state.serial
		);
		this.setState({ meter: meterdata });
	};

	handleSearch = (e) => {
		e.preventDefault();

		if (this.state.data.length === 0) {
			this.setState({ message: 'Meter Data not found' });
		} else {
			this.setState({ message: '' });
			this.showingTable();
		}
	};

	componentDidMount() {
		axios
			.get('http://localhost:3001/meter_data/')
			.then((res) => this.setState({ data: res.data }))
			.catch((err) => console.log('error: ', err));
	}

	showingTable() {
		const meterdata = this.state.data.filter(
			(meter) => meter.Serial === this.state.serial.toUpperCase()
		);
		if(meterdata.length === 0){
			this.setState({message:"Meter Data Not Found"});
			this.setState({meter:[]});
		}
		if(meterdata.length >0){
			this.setState({message:''});
			let limit = meterdata.slice(0, 5);
			this.setState({ meter: limit });
		}
	}

	render() {
		return (
			<div style={{ width: 500, margin: '0px auto' }}>
				<h3 className='text-center'>Meter Consumption Data App</h3>
				<form>
					<div className='form-group'>
						<label>Serial:</label>
						<input
							className='form-control'
							onChange={this.handleChange}
							value={this.state.serial}
						/>
					</div>
					<span className='text-danger'>{this.state.formErrors.serialErr}</span>
					<br />
					<button
						type='button'
						onClick={this.handleSearch}
						className='btn btn-success'
						disabled={!this.state.formValid}>
						Search
					</button>
					<br />
					<span className='text-danger'>{this.state.message}</span>
				</form>
				<div>
					{this.state.meter.length ? (
						<div>
							<h1 className='text-center'>Meter Table data</h1>
							<table
								className='table col-4 center'
								style={{
									background: 'White',
									color: 'black',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}>
								<thead>
									<tr>
										<th>Serial</th>
										<th>ReadingDateTimeUTC</th>
										<th>WH</th>
										<th>VARH</th>
									</tr>
								</thead>
								<tbody>
									{this.state.meter.map((data) => (
										<tr key={data.WH}>
											<td>{data.Serial}</td>
											<td>{data.ReadingDateTimeUTC}</td>
											<td>{data.WH}</td>
											<td>{data.VARH}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) :
						 (
						<div></div>
					)}
				</div>
			</div>
		);
	}
}

export default MeterForm;
