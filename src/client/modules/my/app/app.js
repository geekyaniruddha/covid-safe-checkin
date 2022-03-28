import { LightningElement } from 'lwc';
const defaultData = {
    Name: '',
    Email: '',
    Mobile: ''
}
export default class App extends LightningElement {
    formData = defaultData; 
    formchange(event){
        const {name, value} = event.target;
        this.formData = {...this.formData, [name]:value};
    }
    checkInHandler(event){
        event.preventDefault();
        console.log(this.formData);

    }
}
