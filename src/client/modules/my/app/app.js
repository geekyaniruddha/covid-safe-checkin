import { LightningElement } from 'lwc';
const defaultData = {
    Name: '',
    Email: '',
    Mobile: ''
}
const BASE_URL = 'http://localhost:3002';
export default class App extends LightningElement {
    formData = defaultData; 
    loader = false;
    isSubmitted = false;
    get checkInMsg(){
        return `Welcome ${this.formData.Name}. You're checked in!`;
    }
    formchange(event){
        const {name, value} = event.detail;
        this.formData = {...this.formData, [name]:value};
    }
    checkInHandler(event){
        event.preventDefault();
        this.loader= true;
        this.formData = {...this.formData, 
            "Date":new Date().toLocaleDateString(),
            "Time":new Date().toLocaleTimeString()
        }
        console.log(this.formData);
        fetch(`${BASE_URL}/api/v1/submit`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.formData)
        }).then(response=>response.json())
          .then(result=>{
              if(result.success){
                this.isSubmitted = true;
                window.setTimeout(()=>{
                    this.isSubmitted = false;
                    this.formData = {...defaultData};
                },3000)
              }
          })
          .catch(error=>console.error(error))
          .finally(()=>{
              this.loader = false;
          })
    }
    // connectedCallback is given by lwc which gets called on the load of the page
    // connectedCallback(){
    //     this.fetchData();
    // }
    // fetchData(){
    //     fetch(`${BASE_URL}/api/v1/sheetname`)
    //     .then(response=>response.json()) //response comes in binary string that's why I have converted it to json
    //     .then(result=>console.log(result))
    //     .catch(error=>console.log(error))
    // }
}
