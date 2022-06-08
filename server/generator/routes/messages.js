var express = require('express');
var router = express.Router();

const messages = require('../controllers/messagesController')




/* GET users listing. */
router.get('/', messages.initialMessages);

router.post('/', messages.postMessages);

router.get('/files', messages.getFiles);

router.get('/files/:name', messages.getEachFile);






module.exports = router;
