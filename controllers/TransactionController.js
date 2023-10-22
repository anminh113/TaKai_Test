const Transactions = require('../models/transaction');
const fs = require('fs');
const csv = require('csv-parser');
const chunkSize = 1000;

async function saveChunkToDB(chunk) {
    try {
        await Transactions.insertMany(chunk);
    } catch (error) {
        console.error('Error inserting into MongoDB:', error);
    }
}

// transactions
const transactionsData = async (req, res) => {
    try {
        let chunk = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                chunk.push(row);
                if (chunk.length === chunkSize) {
                    saveChunkToDB(chunk);
                    chunk = [];
                }
            })
            .on('end', () => {
                if (chunk.length > 0) {
                    saveChunkToDB(chunk);
                }
                fs.unlinkSync(req.file.path);
                res.json({ message: 'Data imported successfully' });
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while importing data' });
    }
};


module.exports = {
    transactionsData
};