class Login extends HTMLElement {

    constructor() {
        super();
        this.url = this.getAttribute('action');
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }

    render() {

        this.shadow.innerHTML =
        `
        <style>

            input{
                width:100%;
                padding-top:.5rem;
                padding-bottom:.5rem;
                background-color: honeydew;
                margin-top:.5rem;
                margin-bottom:.5rem;
                border:none;
                border-radius:.5rem;
            }

            label{
                color:honeydew;
                padding-top:.5rem;
                font-family: "Poppins", Helvetica, Arial, Verdana, sans-serif;
            }

            button{
                width: 100%;
                margin-top:1rem;
                border:none;
                border-radius:2rem;
                color:cadetblue;
                background-color: honeydew;
                font-weight:600;
                cursor: pointer;
                padding:.5rem;
                font-size:26px;
                transition-duration: .5s;
                font-family: "Poppins", Helvetica, Arial, Verdana, sans-serif;
                position:relative;
            }

            button:hover{
    
            background-color: cadetblue;
            border:solid .5px honeydew;
            color:honeydew;
            
            }

            input:focus{
                border:none;
                outline: none;
            }

            input:focus::placeholder{
                opacity: .2;
            }
        </style>
        `;

        const form = document.createElement('form');
        const labelName = document.createElement('label');
        const inputName = document.createElement('input');
        const labelPass = document.createElement('label');
        const inputPass = document.createElement('input');
        const btn = document.createElement('button');

        form.textContent = this.form;
        labelName.textContent = "Email";
        inputName.name = "email";
        inputName.type = "email";
        inputName.placeholder = "Email";
        labelPass.textContent = "Introduzca su contraseña";
        inputPass.name = "password";
        inputPass.type ="password"
        inputPass.placeholder = "Contraseña";
        btn.textContent = "Iniciar";

        form.appendChild(labelName);
        form.appendChild(inputName);
        form.appendChild(labelPass);
        form.appendChild(inputPass);
        form.appendChild(btn);
        this.shadow.appendChild(form);
        
        btn.addEventListener('click', event => {
            event.preventDefault();
            this.submitClickForm();
        });
    }

    submitClickForm() {

        let formData = new FormData(this.shadow.querySelector('form'));
        let formDataJson = Object.fromEntries(formData.entries());
            
        fetch(this.url, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            }).then(response => {
                return response.json();
            }).then(data => {
                sessionStorage.setItem('accessToken', data.accessToken);
                window.location.href = this.getAttribute('redirection');
            }).catch(error => {
                console.log(error);
        });
        
    }
}

customElements.define('login-form', Login);