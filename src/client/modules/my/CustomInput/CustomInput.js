import { LightningElement, api } from 'lwc';
export default class CustomInput extends LightningElement {
    @api name = 'field';
    @api type = 'text';
    @api required = false;
    @api label = 'Form Label';

    get uniqueId(){
        return this.name;
    }

    inputHandler(event){
        const{name, value} = event.target;
        this.dispatchEvent(new CustomEvent("formchange", {
            detail:{
                name,
                value
            }
        }))
    }

}