//Select w /modyfikacja

//Pobieramy select
const selectedElement = document.querySelector('.edit')

//Po zmianie wartości select przekierowujemy na nowy url z parametrem id - obsługa w modyfikacjaController
selectedElement.addEventListener('change', e => {
    window.location.replace(`http://localhost:3000/modyfikacja/${e.target.value}`)
})

//Pobieramy wartości poszczególnych elementów jeżeli nie istnieją ich wartość jest null
const id = document.querySelector('.robot-id') || null
const productionTime = document.querySelector('.production-time') || null
const producedParts = document.querySelector('.produced-parts') || null
const editButton = document.querySelector('.edit-button') || null

//Jeżeli editButton istnieje dodajemy event i po kliknięciu przekierowujemy na url z parametrami nowych wartości - obsługa w modyfikacjaController
if (editButton) {
    editButton.addEventListener('click', () => {
        window.location.replace(`http://localhost:3000/modyfikacja/${id.innerHTML}/${productionTime.value}/${producedParts.value}`)
    })
}