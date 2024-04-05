const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, './files');
    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            res.send('Unable to scan directory: ' + err);
        } 
        let fileLinks = files.map(file => `<li><a href="/download/${file}">${file}</a></li>`).join('');
        res.send(`<ul>${fileLinks}</ul>`);
    });
});

app.get('/download/:file(*)', (req, res) => {
    var filePath = path.join(__dirname, './files', req.params.file);
    res.download(filePath);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
