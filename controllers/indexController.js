// controller dla strony głównej wyświetla widok main oparty na wyglądzie index

const indexController = (req, res) => {
    res.render('layouts/main', { layout: 'index' });
}

module.exports = indexController