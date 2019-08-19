import React from 'react';

const FormFields = (props) => {
    const renderFields = () => {
        const formArray = [];

        for(let elementName in props.formData)
        {            
            formArray.push({
                id:elementName,
                settings:props.formData[elementName]
            })

        }

        return formArray.map((item,i) => {
            return(
                <div key={i} className="form_element">
                    {renderTemplates(item)}
                </div>
            )
        })

    }

    const showlabel = (show,label)=>{
        return show ? 
            <label>{label}</label>
            :null 
    }

    const changehandle = (event,id,blur)=>{
        const newState = props.formData;
        newState[id].value = event.target.value;

        if(blur){
            let valiDate = validate(newState[id]);
        newState[id].valid = valiDate[0];
        newState[id].validationMessage = valiDate[1];
        
        }

        newState[id].touched = blur;
        props.change(newState);
        

    }

    const validate = (element) => {
        let error = [true,'']

        if(element.validation.minlen){
            const valid = element.value.length >= element.validation.minlen;
            const message = `${!valid ? 'Must be greater than ' + element.validation.minlen:''}`

            error = !valid ? [valid,message] : error;
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required':''}`

            error = !valid ? [valid,message] : error;

        }
        return error;
    }

    const showvalidation = (data)=>{
        let errormsg = '';

        if(data.validation && !data.valid)
        {
            errormsg=(
                <div className='label_error'>
                    {data.validationMessage}
                </div>
            )
        }
        return errormsg;
    }

    const renderTemplates  = (data)=>{
        let formTemplates = '';
        let values = data.settings;

        switch(values.element){
            case('input'):
                formTemplates=(
                    <div>
                        {showlabel(values.label,values.labelText)}
                        <input 
                            {...values.config}
                            value={values.value}
                            onBlur={ (event)=>{changehandle(event,data.id,true)}          }
                            onChange={ (event)=>{changehandle(event,data.id,false)}          }
                        /> 
                        {showvalidation(values)}
                    </div>
                )
                break;

            case('textarea'):
                formTemplates=(
                    <div>
                        {showlabel(values.label,values.labelText)}
                        <textarea
                            {...values.config}
                            value={values.value}
                            onChange={ (event)=>{changehandle(event,data.id)}}
                        >
                            
                        </textarea>
                    </div>
                )
                break;

            case('select'):
                formTemplates=(
                        <div>
                            {showlabel(values.label,values.labelText)}
                            <select
                    
                                onChange={ (event)=>{changehandle(event,data.id)}}
                                name={values.config.name}
                            >
                                {values.config.options.map((item,i)=>(
                                        <option key={i} value={item.val}>
                                            {item.text}
                                        </option>
                                ))}
                            </select>

                        </div>
                    )
                break;
            default:
                formTemplates=null;
        }
        return formTemplates;
    }

    return(
        <div>
            {renderFields()}
        </div>
    )
}


export default FormFields;