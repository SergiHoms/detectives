import { API_URL } from '../config/config.js'

class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.url = this.getAttribute('url');
        this.data = [];
    }
    
    static get observedAttributes() { return ['url']; }

    connectedCallback() {
       
        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', event.detail.url);
        }));

        this.loadData().then(() => this.render())
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.loadData().then(() => this.render())
    }

    async loadData() {

        let url = `${API_URL}${this.getAttribute("url")}`;
    
        try{
    
            let response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem('accessToken')
                }
            });
    
            let data = await response.json();
            this.data =  data;

            console.log(this.data);
           
        }catch(error){
            console.log(error);
        }
    
        console.log(url);
    }
    

    render() {

        this.shadow.innerHTML =
        `
        <table class="content-table"> 
            <thead class="tableHeader"> 
                <tr> 
                    <th>Id</th> 
                    <th>Email</th> 
                    <th>Asunto</th> 
                    <th>Contenido</th>
                    <th>Botones</th>
                </tr> 
            </thead> 
            <tbody> 
                <tr>
                    <td>1</td> 
                    <td>Sergihoms24@gmail.com</td> 
                    <td>Asunto del mensaje</td> 
                    <td>Contenido del mensaje</td>
                    <td class="iconsBox">
                        <svg class="btns-icons emailSvg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                        </svg>
                        <svg class="btns-icons" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                        </svg>
                        <svg class="btns-icons deleteSvg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </td>
                </tr>
                <tr>
                    <td>2</td> 
                    <td>Sergihoms24@gmail.com</td> 
                    <td>Asunto del mensaje</td> 
                    <td>Contenido del mensaje</td>
                    <td class="iconsBox">
                        <svg class="btns-icons emailSvg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                        </svg>
                        <svg class="btns-icons" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                        </svg>
                        <svg class="btns-icons deleteSvg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </td>
                </tr> 
                <tr> 
                    <td>3</td>
                     <td>Sergihoms24@gmail.com</td> 
                     <td>Asunto del mensaje</td> 
                     <td>Contenido del mensaje</td>
                     <td class="iconsBox">
                        <svg class="btns-icons emailSvg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                        </svg>
                        <svg class="btns-icons" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                        </svg>
                        <svg class="btns-icons deleteSvg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </td>
                </tr> 
            </tbody> 
        </table>


        <style>

        .content-table{
            background-color: whitesmoke;
        }

        table { 
            border-collapse:collapse; 
            margin: 16px 0; 
            font-size: 1em; 
            font-family: "Poppins", Helvetica, Arial, Verdana, sans-serif; 
            min-width: 450px;
            max-width: 980px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        
        }
        
        
        table thead tr { 
            background-color: cadetblue;
            color: #ffffff; 
            text-align: middle;
            box-shadow: 0px 2px 4px 1px rgb(197, 193, 193);
            
        }
        
        table th, table td { 
            padding: 12px 15px;
            /* border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 1rem; */
            
        }
        
        table tbody tr { 
            border-bottom: 1px solid #dddddd;
            color: black;
            font-size: 15px;
            
        }
        
        .iconsBox{
        display: flexbox;
        top: 50%;
        /* left: 50%; */
            
        
        }
        
        .btns-icons{
            width: 24px;
            height: 24px;
            margin-left: 1rem;
            color: cadetblue;
            cursor: pointer;
        }
        
        .btns-icons:hover{
            -webkit-transform: rotateZ(-30deg);
            -ms-transform: rotateZ(-30deg);
            transform: rotateZ(-30deg);
            transition-duration: 1s;
            color: rgb(63, 107, 110);
        }
        
        </style>
        `;

        // this.data.forEach(data =>)
    }
}

customElements.define('table-component', Table);