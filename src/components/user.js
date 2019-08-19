import React, { Component } from 'react';
import FormFields from './../widgets/forms/formFields'
class User extends Component {

    state = {
        formData:{
            name:{
                element:'input',
                value:'',
                label:true,
                labelText:'Name',
                config:{
                    name: 'name_input',
                    type:'text',
                    placeholder:'enter your name'
                },
                validation:{
                    required:true,
                    minlen:5
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            lastname:{
                element:'input',
                value:'',
                label:true,
                labelText:'Lastname',
                config:{
                    name: 'lastname_input',
                    type:'text',
                    placeholder:'enter your lastname'
                },
                validation:{
                    required:false,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            message:{
                element:'textarea',
                value:'',
                label:true,
                labelText:'message',
                config:{
                    name: 'message_input',
                    rows:4,
                    cols:36
                },
                validation:{
                    required:false,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            age:{
                element:'select',
                value:'',
                label:true,
                labelText:'age',
                config:{
                    name: 'age_input',
                    options:[
                        {val:'1',text:'10-20'},
                        {val:'2',text:'20-30'},
                        {val:'3',text:'30-40'}
                    ]
                },
                validation:{
                    required:false,
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        })
        
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            
        }

        let formvalid = true;
        for(let key in this.state.formData){
            if(this.state.formData[key].validation.required)
            formvalid = this.state.formData[key].valid && formvalid ;
        }

        console.log(formvalid);
        
        if(formvalid)
        {
            console.log(dataToSubmit);
        }        
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.submitForm}>

                    <FormFields 
                        formData={this.state.formData}
                        change = {(newState)=> this.updateForm(newState)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default User;