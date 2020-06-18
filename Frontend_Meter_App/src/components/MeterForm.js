import React from 'react';
import axios from 'axios';

class MeterForm extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            serial : "METER000001",
            data : [],
            message: '',
            formErrors: {
                serialErr: ''
            },
            fieldValidity: {
                serial: false
            },
            formValid: false,
        }
    }

    handleChange = (e) => {
        const serialValue = e.target.value;
        var formErrors = this.state.formErrors;
        var fieldValidity = this.state.fieldValidity;
        this.setState({ serial: serialValue });
        if (serialValue.length === 0) {
            formErrors.serialErr = "Serial Should not be empty";
            fieldValidity.serial = false;
        }
        else {
            formErrors.serialErr = "";
            fieldValidity.serial = true;
        }
        this.setState({ fieldValidity: fieldValidity })
        this.setState({ formValid: fieldValidity.serial})
    }

    handleSearch = (e) => {
        e.preventDefault();
        if (this.state.formValid) {
            if(this.state.data.length === 0){
                this.setState({message : "Meter Data not found"});
            }
            else{
                this.setState({message:''});
                return(
                    <React.Fragment>
                        <div>
                            <h1>Table data</h1>
                            <table className="table col-4 center" style={{"background":"White","color":"black","marginLeft":"auto", "marginRight":"auto"}}>
                                <thead>
                                <tr>
                                <th>Serial</th><th>ReadingDateTimeUTC</th><th>WH</th><th>VARH</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((data)=> <tr key={this.state.data.Serial}><td>{this.state.data.Serial}</td><td>{this.state.data.ReadingDateTimeUTC}</td><td>{this.state.data.WH}</td><td>{this.state.data.VARH}</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>
                )
            }
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/meter_data/METER000002')
        .then(res=>this.setState({data:res.data})
        .catch(err => this.setState({message:err}))
    }

    render(){
        return(
            <div style={{width:500, margin:'0px auto'}}>
                <h3 className="text-center">Meter Consumption Data App</h3>
                <form >
                    <div className="form-group">
                        <label>Serial:</label>
                        <input className="form-control" onChange={this.handleChange} value={this.state.serial} />
                    </div>
                    <span className="text-danger">{this.state.formErrors.serialErr}</span><br/>
                    <button type="button" onClick={this.handleSearch} className="btn btn-success" disabled={!this.state.formValid}>Search</button><br/>
                    <span className="text-danger">{this.state.message}</span>
                </form>
            </div>
        )
    }
}

export default MeterForm;