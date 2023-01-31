export let workerLoginForm = () => {

    let form = document.querySelector('#formLoginWorker');

    if(form){
        form.addEventListener('submit', (event) => {

            e.preventDefault();

            event.preventDefault();
            let formData = new FormData(form);
            let formDataJson = Object.fromEntries(formData.entries());
            
            fetch('http://127.0.0.1:8080/api/auth/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            }).then(response => {
                return response.json();
            }).then(data => {
                sessionStorage.setItem('accessToken', data.accessToken);
            }).catch(error => {
                console.log(error);
            });
        });
    }

};