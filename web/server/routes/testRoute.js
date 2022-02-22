const express = require('express');
const { REPL_MODE_SLOPPY } = require('repl');
const router = express.Router();


router.get("/test", (req, res) => {
    res.end('I made an Express server and it\'s amazing!')
})

module.exports = router;