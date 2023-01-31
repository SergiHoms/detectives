import { API_URL } from '../config/config.js'

class Menu extends HTMLElement {

  constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
      this.menuItems = [];
  }

  connectedCallback() {
    this.loadData().then(() => this.render())
  }

  async loadData() {

    let url = `${API_URL}/api/admin/menus/display/${this.getAttribute("menu")}`;

    try{

        let response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('accessToken')
            }
        });

        let data = await response.json();
        this.menuItems =  data.menuItems;
       
    }catch(error){
        console.log(error);
    }

    console.log(url);
  }

  render() {

    this.shadow.innerHTML =
    `
    <style>
      .menu {
        text-align: center;
      }
      .menu ul {
        display: flex;
        justify-content: space-evenly;
        list-style-type: none;
        padding: 2rem;
        background-color: #ffff;
        border:2px solid green;
        border-radius:.5rem;
        box-shadow: 0px 2px 4px 1px rgb(197, 193, 193);
      }
      .menu li {
        font-family: "Poppins", Helvetica, Arial, Verdana, sans-serif;
        color: cadetblue;
        cursor: pointer;
        font-size:2rem;
        font-weight:600;
        text-shadow: 1px 1px 4px grey;
      }
      .menu li:hover {
        -webkit-transform: rotateZ(-10deg);
        -ms-transform: rotateZ(-10deg);
        transform: rotateZ(-10deg);
        transition-duration: 1s;
        text-shadow: none;
        color: rgb(63, 107, 110);
      }
      .menu li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }
      
    </style>
    <div class="menu">
      <ul>
        ${this.menuItems.map(item => `
          <li>
            <span title="${item.name}" href="${item.customUrl}">${item.name}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    `;

    this.menuItem = this.shadow.querySelectorAll('.menu span');

    this.menuItem.forEach(item => {
      item.addEventListener('click', () => {
        this.changePage(item);
      });
    });
  }

  changePage(menuItem) {
    document.dispatchEvent(new CustomEvent('newUrl', {
      detail: {
          title: menuItem.getAttribute("title"),
          url: menuItem.getAttribute("href")
      }
    }));
  }
}

customElements.define('menu-component', Menu);