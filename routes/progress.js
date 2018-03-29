const Router = require('express-promise-router');
var router = new Router();

router.get('/', function (req, res, next) {
    res.render('progress', {title: 'Progress'}) ;
});

module.exports = router;