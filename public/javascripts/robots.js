//Zmiana zasad generowania robotów

//Pobieramy elementy
const productionTimeMax = document.querySelector('.production-time-max')
const productionTimeMin = document.querySelector('.production-time-min')
const producedPartsMax = document.querySelector('.produced-parts-max')
const producedPartsMin = document.querySelector('.produced-parts-min')

const configEditButton = document.querySelector('.edit-config-button')

//Po kliknięciu w przycisk przekierowujemy na url z parametrami (.value to wartość we wpisanych elementach) - obsługa w robotyController
configEditButton.addEventListener('click', () => {
    window.location.replace(`http://localhost:3000/roboty/${productionTimeMax.value}/${productionTimeMin.value}/${producedPartsMax.value}/${producedPartsMin.value}`)
})