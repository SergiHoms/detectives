export let adminFormTable = () => {

    let form = document.querySelector('#adminForm');
  
    if(form){
      
      form.addEventListener('submit', (event) => {
  
          event.preventDefault();
          let formData = new FormData(form);
          let formDataJson = Object.fromEntries(formData.entries());
          
          fetch('http://127.0.0.1:8080/api/admin/workers', {
              method: 'POST',
              headers: {
                  'x-access-token': sessionStorage.getItem('accessToken'),
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formDataJson)
          }).then(response => {
              return response.json();
          }).then(data => {
              console.log(data);
          }).catch(error => {
              console.log(error);
          });
      });
    }
}