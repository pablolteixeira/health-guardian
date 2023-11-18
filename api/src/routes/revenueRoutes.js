const express = require("express");
const router = express.Router();

// Define routes for '/api/company'
router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT * FROM Revenues");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/', async (req, res) => {
    try {
        const { company_id, value, data} = req.body
        
        const [result] = await req.db.execute(
            `INSERT INTO Revenues (company_id, value, data) VALUES ('${company_id}', '${value}', ${data})`
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
        const [result] = await req.db.execute(`DELETE FROM Revenues WHERE id=${req.params.id}`);
        req.db.release()
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Revenues not found." })
        } else {
            res.json({ message: `Revenues excluído com sucesso.` });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.put('/', async (req, res) => {
    try {
        const { id, company_id, value, data } = req.body

        const [result] = await req.db.execute(
            `UPDATE Revenues 
            SET company_id = '${company_id}', 
            value = '${value}',
            data = ${data}
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
