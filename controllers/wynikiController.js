const mongoose = require('mongoose')
const Form = require('../models/Form')
const Robots = require('../models/Robots')

const getWyniki = async (req, res) => {
    //Sprawdzamy czy kolekcja form zawiera rekordy. Await powoduje, że reszta kodu "czeka" na wykonanie tej operacji. Await można użyć tylko w funkcji asynchronicznej
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

    if (isCollectionEmpty) {
        //Pobieramy kolekcje
        const data = await Form.find({}).lean()
        //Pobieramy i wyszukujemy najbardziej efektywnego robota, nasępnie przekazujemy wartość do renderowania
        const mostEffective = await Form.find({}).sort("-effectivity").limit(1).lean()
        res.render('layouts/wyniki', { layout: 'index', data, mostEffective });
    } else {
        res.render('layouts/wyniki', { layout: 'index', emptyRecords: true })
    }

}

//Funkcja generująca roboty
const getWynikiGeneruj = async (req, res) => {
    //Sprawdzamy wpisaną wartość liczby rekordów - domyślnie program losuje od 1 do 10 rekordów poniżej można zmienić maksymalną wartość
    if (req.body.amount > 0 && req.body.amount <= 10) {
        const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()
        const config = await Robots.findOne({}).lean()

        //Pobranie konfiguracji robotów
        const productionTimeMax = Number(config.productionTimeMax)
        const productionTimeMin = Number(config.productionTimeMin)
        const producedPartsMax = Number(config.producedPartsMax)
        const producedPartsMin = Number(config.producedPartsMin)

        //Jeżeli istnieje kolekcja forms, przy generowaniu nowej stara zostaje usunięta
        if (isCollectionEmpty) {
            mongoose.connection.db.dropCollection('forms')
        }

        //Pętla generująca i dodająca do kolekcji roboty
        for (let i = 0; i < req.body.amount; i++) {
            const productionTime = Math.floor(Math.random() * (productionTimeMax - productionTimeMin) + productionTimeMin)
            const producedParts = Math.floor(Math.random() * (producedPartsMax - producedPartsMin) + producedPartsMin)
            const effectivity = (producedParts / productionTime).toFixed(4)

            const randomData = new Form({
                id: i,
                productionTime,
                producedParts,
                effectivity
            })
            await randomData.save()
        }

        //Pobranie nowych danych po wygenerowaniu robotów, które zostaną wyświetlone
        const data = await Form.find({}).lean()
        const mostEffective = await Form.find({}).sort("-effectivity").limit(1).lean()

        res.render('layouts/wyniki', { layout: 'index', data, mostEffective })

        //Jeżeli wpisano złą liczbe w generator wyświetlamy błąd
    } else {
        const data = await Form.find({}).lean()
        const mostEffective = await Form.find({}).sort("-effectivity").limit(1).lean()

        res.render('layouts/wyniki', { layout: 'index', data, mostEffective, dataError: true })
    }
}

module.exports = { getWyniki, getWynikiGeneruj }