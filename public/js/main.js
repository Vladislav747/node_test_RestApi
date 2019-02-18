const form = document.getElementById('login-form');
const login = document.getElementById('btnLogin');
const uri = window.location.origin;

form.addEventListener('submit', (e) => {

    const name = document.querySelector('input[name=login]').value;
    const password = document.querySelector('input[name=password]').value;


    //Запрос на регистрацию
    fetch(uri+'/createUser', {
        method: 'post',
        body: JSON.stringify({name: name, password:password})
    })
        //Выводим в консоль результат выбора
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));


    e.preventDefault();

});

login.addEventListener('click', (e) => {

    const name = document.querySelector('input[name=login]').value;
    const password = document.querySelector('input[name=password]').value;


    //Запрос на регистрацию
    fetch(uri+'/login', {
        method: 'post',
        body: JSON.stringify({name: name, password:password})
    })
        //Выводим в консоль результат выбора
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));


    e.preventDefault();

});