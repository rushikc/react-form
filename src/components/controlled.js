import React, { Component } from 'react';

class Controlled extends Component {

    state = {
        name:'',
        lastname:''
    }

    handlenamechange = (event)=>{
        this.setState({
            name: event.target.value
        })
        console.log(this.state.name);
        console.log(event.target.value);
        
    }   
    handlelastnamechange = (event)=>{
        this.setState({
            lastname: event.target.value
        })
        console.log(this.state.name);
        
    }
    render(){
        return(
            <div className='container'>
                <form>
                    <div className='form_element'>
                        <label>Enter name</label>
                        <input
                        type='text'
                        onChange={this.handlenamechange}
                        value={this.state.name}
                        >
                        </input>
                    </div>
                    <div className='form_element'>
                        <label>Enter lastname</label>
                        <input
                        type='text'
                        onChange={this.handlelastnamechange}
                        value={this.state.lastname}
                        >
                        </input>
                    </div>
                </form>
            </div>
        )
    }
}

export default Controlled;