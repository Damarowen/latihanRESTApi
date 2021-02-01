const express = require('express');
const app = express();

const port = 9000;

app.get('/', (req, res)  => {
    res.send('hai damar')
})

app.listen(port, (x) => {

    console.log(` listen to ${port} and ${x}`)

})