const body = document.querySelector('body')

// Navbar actions
const navOpen = document.getElementById('nav-open')
const nav = document.getElementById('navbar')

// Modal options
const openModal = document.getElementById('make-list');
const modal = document.getElementById('modal')

// Buttons Modal
const send = document.getElementById('send')
const cancel = document.getElementById('cancel')

navOpen.addEventListener('click', function(){
    let modalToggleConfig = true;

    if(nav.classList.contains('activated') != modalToggleConfig){
        nav.classList.add('activated')

    } else{
        nav.classList.remove('activated')
    }
});
openModal.addEventListener('click', ()=>{
    modal.classList.toggle('actived')
    nav.classList.remove('activated')
});
send.addEventListener('click', () => {
    App.checking()

    modal.classList.toggle('actived')
});
cancel.addEventListener('click', () => {
    modal.classList.toggle('actived')

    Modal.clearModal()
});


//Dark Mode
const mode = document.getElementById('darkmode')
const cardColor = document.getElementById('section-mode')
const checkbox = document.getElementById('checkbox')
const modeName = 'darkmode';


mode.addEventListener('click', () => {

    if( !body.classList.contains('body-animated') ){

        if( mode.src === 'https://img.icons8.com/nolan/64/bright-moon.png'){
            mode.src = 'https://img.icons8.com/nolan/64/vaporwave.png';
        } else {
            mode.src = 'https://img.icons8.com/nolan/64/bright-moon.png';
        }
        
        document.body.classList.toggle('darkmode-body')
        cardColor.classList.toggle(modeName)
        
        nav.classList.toggle('activated')
    } else {
        window.alert('Por favor desabilite a animação!')
    }

   
})



checkbox.addEventListener('click', () => {

    if( !body.classList.contains('darkmode-body') ) {

        
        if( checkbox.checked === true){
            if(body.classList.contains('darkmode-body')){
                body.classList.remove('darkmode-body')
                cardColor.classList.toggle(modeName)
                
                body.classList.add('body-animated')
            }
            
            return body.classList.add('body-animated')
        } else
        {
            return body.classList.remove('body-animated')
        }
    } else {
        checkbox.checked = false;
    }
})

const time = new Date()

function timeNew(){
    let day = time.getDay()
    let month = time.getMonth()
    let year = time.getFullYear()

    const timeSeted = day + '/' + month + '/' + year;
    return timeSeted
}

const Modal = {
    title: document.getElementById('text'),
    date: document.getElementById('date-input'),
    description: document.getElementById('description'),

    getValues(){
        return{
            title: Modal.title.value,
            date: Modal.date.value,
            description: Modal.description.value,
        }
    },

    clearModal(){
        Modal.title.value = "";
        Modal.date.value = "";
        Modal.description.value = "";
    },

    delete(index){
        DOM.lists.splice(index, 1);
        App.reload()
    }
}

const validating = {

    checkFields(){
        const {title, date, description} = Modal.getValues();

        if(title.trim( ) === "" || date.trim( ) === "" ||  description.trim( ) === ""){
            throw new Error('Por favor, preencha os campos corretamente!')

        } else {
            DOM.lists.push(validating.add(title, validating.dateValidating(date), description))
            App.reload()
            Modal.clearModal()
        }
    },

    dateValidating(date){
        const result = date.split('-')
        return `${result[2]}/${result[1]}/${result[0]}`
    },

    add(title, date, description){
        return {
            title,
            date,
            description
        }
    }
}

const localStorageSet = {
    get(){
        return JSON.parse(localStorage.getItem('listas')) || [
            {
                title: 'Olá! Seja bem vindo!',
                date: timeNew(),
                description: 'Para adicionar algo, apenas clique do lado direito em cima onde está em azul, logo em seguida clique em "CREATE LIST"',
            }]
    }
}

const DOM = {
    listContainer: document.getElementById('cards'),

    lists: localStorageSet.get(),

    makeList(lists, index){
        const div = document.createElement('div') 

        div.innerHTML = DOM.innerHTMLset(lists, index)

        DOM.listContainer.appendChild(div)

        div.dataset.klinkonskyChekList = index
    },

    innerHTMLset(lists, index){
        const html = 
        `
        <div class="card" id="card-color">
            <p class="date">${lists.date}</p>
                            
            <div class="div-title">
                <h1 class="title">${lists.title}</h1>
            </div>
            
            <hr class="row">
            <div class="div-description">
                <p class="description">${lists.description}</p>
            </div>
            
            <div class="image-container">
                <img onclick="Modal.delete(${index})" src="./assets/garbage_114839.svg" width="30" height="30" class="check-list" />
            </div>
        </div>
        `

        return html
    }
}

const App = {
    start(){
        DOM.lists.forEach(DOM.makeList)

        localStorage.setItem('listas', JSON.stringify(DOM.lists))
    },

    reload(){
        DOM.listContainer.innerHTML = ' '

        App.start()
    },

    checking(){
        try{
            validating.checkFields()
        } catch(e){
            window.alert(e)
        }
    }
}

App.start()