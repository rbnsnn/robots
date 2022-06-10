const selectedElement = document.querySelector('.edit')

selectedElement.addEventListener('change', e => {
    window.location.replace(`http://localhost:3000/modyfikacja/${e.target.value}`)
})

const id = document.querySelector('.robot-id') || null
const productionTime = document.querySelector('.production-time') || null
const producedParts = document.querySelector('.produced-parts') || null
const editButton = document.querySelector('.edit-button') || null

if (editButton) {
    editButton.addEventListener('click', () => {
        window.location.replace(`http://localhost:3000/modyfikacja/${id.innerHTML}/${productionTime.value}/${producedParts.value}`)
    })
}