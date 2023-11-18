const express = require("express");
const router = express.Router();

// Define routes for '/api/company'
router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT * FROM Companies");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, operator, broker, cod_sinister } = req.body
        
        const [result] = await req.db.execute(
            `INSERT INTO Companies (name, operator, broker, cod_sinister) VALUES ('${name}', '${operator}', '${broker}', ${cod_sinister})`
        );
        req.db.release()
        res.status(201).json(result);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await req.db.execute(`DELETE FROM Companies WHERE id=${req.params.id}`);
        req.db.release()
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Company not found." })
        } else {
            res.json({ message: `Company excluído com sucesso.` });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.put('/', async (req, res) => {
    try {
        const { id, name, operator, broker, cod_sinister } = req.body

        const [result] = await req.db.execute(
            `UPDATE Companies 
            SET name = '${name}', 
            operator = '${operator}', 
            broker = '${broker}', 
            cod_sinister = ${cod_sinister}, 
            WHERE id = ${id}`
        );
        req.db.release()
        res.status(201).json(result);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


module.exports = router;
