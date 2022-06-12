const mongoose = require('mongoose')
const Robots = require('../models/Robots')

//Funkcja wyśwetlająca /opinia
const getRoboty = async (req, res) => {
    //Sprawdzamy czy istnieje kolekcja - jeżeli nie tworzymy nową z wartościami domyślnymi
    const isCollectionEmpty = await mongoose.connection.db.collection('robots').estimatedDocumentCount()
    if (!isCollectionEmpty) {
        const robotsData = new Robots()
        await robotsData.save()
        const config = await Robots.findOne({}).lean()
        res.render('layouts/roboty', { layout: 'index', config })
    } else {
        const config = await Robots.findOne({}).lean()
        res.render('layouts/roboty', { layout: 'index', config })
    }
}

//Funkcja zmieniająca parametry generowania danych
const getRobotyWithParams = async (req, res) => {
    //Pobieramy nowe wartośći z parametrów przekazanych przez url z - ../public/javascripts/robots
    const productionTimeMax = Number(req.params.productionTimeMax)
    const productionTimeMin = Number(req.params.productionTimeMin)
    const producedPartsMax = Number(req.params.producedPartsMax)
    const producedPartsMin = Number(req.params.producedPartsMin)

    //Pobieramy starą konfigurację
    const oldConfig = await Robots.findOne({}).lean()
    //Tworzymy obiekt z nową konfiguracją pobraną z parametrów
    const config = {
        productionTimeMax,
        productionTimeMin,
        producedPartsMax,
        producedPartsMin
    }

    //Sprawdzany czy wprowadzono zmiany - jeżeli nie wyświetlamy komunikat o ich braku
    if (productionTimeMax === oldConfig.productionTimeMax && productionTimeMin === oldConfig.productionTimeMin && producedPartsMax === oldConfig.producedPartsMax && producedPartsMin === oldConfig.producedPartsMin) {
        res.render('layouts/roboty', { layout: 'index', config: oldConfig, noChanges: true })

        //Sprawdzamy czy wartość minimalna nie jest większa bądź równa maksymalnej - jeżeli tak wyświetlamy błąd
    } else if (productionTimeMin >= productionTimeMax || producedPartsMin >= producedPartsMax) {
        res.render('layouts/roboty', { layout: 'index', config: oldConfig, editError: true })

        //Sprawdzamy wprowadzone wartości są mniejsze bądź równe zeru - jeżeli tak wyświetlamy błąd
    } else if (productionTimeMax <= 0 || productionTimeMin <= 0 || producedPartsMax <= 0 || producedPartsMin <= 0) {
        res.render('layouts/roboty', { layout: 'index', config: oldConfig, valueError: true })

    } else {

        //Aktualizujemy konfigurację generowanych wartości
        await Robots.findOneAndUpdate({ id: req.params.id }, config).lean()

        //Wyświetlamy nową konfigurację z potwierdzeniem wprowadzonych zmian
        res.render('layouts/roboty', { layout: 'index', config, edited: true })
    }
}

module.exports = { getRoboty, getRobotyWithParams }