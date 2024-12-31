import Swal from "sweetalert2";
import { returnAPI } from "./returnapi";
import './style.css';

const btn = document.querySelector('button');
const divResult = document.getElementById('result');
const section = document.querySelector('section');
const input = document.querySelector('input');

function showSection(){
    section.classList.add('show');
}

function hidenSection(){
    section.classList.remove('show');
}

btn.addEventListener('click', () => {
const moeda = input.value.trim().toUpperCase();

if(moeda !== ''){
    const api = returnAPI();
    const baseURL = `https://v6.exchangerate-api.com/v6/${api}/latest/${moeda}`;
    console.log(baseURL);

    divResult.innerHTML = '';

    fetch(baseURL).then((res) => res.json()).then((data) =>{
        const rates = data.conversion_rates;

        if(rates && Object.keys(rates).length > 0 ){
            showSection();
        }

        for (const currency in rates ){
            const rate = rates[currency];
            const rateElement = document.createElement('p');
            rateElement.textContent = `${currency}: ${rate}`;
            divResult.appendChild(rateElement);
        }
    }).catch((error) => {
        console.log(error.result);
        Swal.fire({
            title: 'Ops...',
            text: error.result || 'Moeda não existente.',
            icon: 'error',
            confirmButtonText: 'Cool'

        })
        hidenSection();
    });   
} else{
    Swal.fire({
        title: 'Aviso.',
        text: 'Por favor, digite uma moeda antes de pesquisar.',
        icon: 'warning',
        confirmButtonText: 'OK'
    })
    hidenSection();
}
})

