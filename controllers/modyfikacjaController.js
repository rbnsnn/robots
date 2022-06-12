const mongoose = require('mongoose')
const Form = require('../models/Form')
const Robots = require('../models/Robots')

//Ta funkcja jest asynchroniczna (async)
const getModyfikacja = async (req, res) => {
    //Sprawdzamy czy kolekcja form zawiera rekordy. Await powoduje, że reszta kodu "czeka" na wykonanie tej operacji. Await można użyć tylko w funkcji asynchronicznej
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

    if (isCollectionEmpty) {
        //Jeżeli zawiera rekordy pobieramy je do data i przekazujemy do widoku. .lean() powoduje że zwracany jest obiekt a nie Mongoose document z czym hbs ma problem i przy przekazywaniu do widoku pojawiały się błędy
        const data = await Form.find({}).lean()
        res.render('layouts/modyfikacja', { layout: 'index', data });
    } else {
        // jeżeli nie ma wyświetlamy informacje o pustych rekordach
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
}

//Wybieramy w widoku modyfikacja ID robota którego chcemy edytować - parametry przekazywane z ../public/javascripts/edit
const getModyfikacjaById = async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()
    //Pobieramy konfiguracje czasu i ilosci części produkowanych przez roboty
    const config = await Robots.findOne({}).lean()

    if (isCollectionEmpty) {
        //Pobieramy wszystkie rekordy, żeby wyświetlić je ponownie w select
        const data = await Form.find({}).lean()
        //Pobieramy wybrany element w select za pomocą jego ID
        const selectedElement = await Form.find({ id: req.params.id }).lean()

        res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement, config })
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
}

//Funkcja edytująca robota, przekazywane są parametry zmieniające wartośći - parametry przekazywane z ../public/javascripts/edit
const getModyfikacjaByIdWithPrams = async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

    if (isCollectionEmpty) {
        //Pobieramy konfigurację robotów 
        const config = { productionTimeMax, productionTimeMin, producedPartsMax, producedPartsMin } = await Robots.findOne({}).lean()
        //Pobieramy Czas i ilość części z parametrów
        const productionTime = Number(req.params.productionTime)
        const producedParts = Number(req.params.producedParts)
        //Pobieramy Wartość przed wprowadzeniem zmian wyświetlane w przypadku błędnie wprowadzonych wartości
        const oldData = await Form.find({}).lean()
        //Pobieramy wybrany element w select za pomocą jego ID
        const selectedElement = await Form.find({ id: req.params.id }).lean()
        //Pobieramy element do porównania wartości
        const elementToCompare = await Form.findOne({ id: req.params.id }).lean()

        //Sprawdzamy czy czas produkcji i ilość części mieści się w zakresie konfiguracji robotów - jeżeli nie wyświetlamy błąd
        if (productionTime > productionTimeMax || productionTime < productionTimeMin || producedParts > producedPartsMax || producedParts < producedPartsMin) {
            res.render('layouts/modyfikacja', { layout: 'index', data: oldData, selectedElement, config, editError: true })

            //Sprawdzamy czy edytowana wartość jest inna od już istniejącej - jeżeli nie wyświetlamy błąd o braku wprowadzonych zmian
        } else if (elementToCompare.productionTime === productionTime && elementToCompare.producedParts === producedParts) {
            res.render('layouts/modyfikacja', { layout: 'index', data: oldData, selectedElement, config, noChanges: true })

        } else {
            //Tworzymy dane oparte o parametry, które zostaną zaktualizowane w bazie danych
            const effectivity = (producedParts / productionTime).toFixed(4)
            const editData = {
                productionTime,
                producedParts,
                effectivity
            }

            //Znajdujemy i aktualizujemy rekord na podstawie ID robota przekazanego w parametrach
            await Form.findOneAndUpdate({ id: req.params.id }, editData).lean()

            //Pobieramy aktualne wartości po wprowadzonych zmianach a następnie je renderujemy
            const newSelectedElement = await Form.find({ id: req.params.id }).lean()
            const data = await Form.find({}).lean()

            res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement: newSelectedElement, config, edited: true })
        }
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
}

module.exports = { getModyfikacja, getModyfikacjaById, getModyfikacjaByIdWithPrams }