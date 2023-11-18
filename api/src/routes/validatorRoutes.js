const express = require("express");
const router = express.Router();

// Define routes for '/api/validator'
router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT * FROM Validators");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/', async (req, res) => {
    try {
        const { company_id, competence, lives, revenue, sinister, accident_rate } = req.body

        const [result] = await req.db.execute(
            `INSERT INTO Validators (company_id, competence, lives, revenue, sinister, accident_rate) VALUES (${company_id}, '${competence}', ${lives}, ${revenue}, ${sinister}, ${accident_rate})`
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
        const [result] = await req.db.execute(`DELETE FROM Validators WHERE id=${req.params.id}`);
        req.db.release()
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Validator not found." })
        } else {
            res.json({ message: `Validador excluído com sucesso.` });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.put('/', async (req, res) => {
    try {
        const { id, company_id, competence, lives, revenue, sinister, accident_rate } = req.body

        const [result] = await req.db.execute(
            `UPDATE Validators 
            SET company_id = ${company_id}, 
            competence = '${competence}', 
            lives = ${lives}, 
            revenue = ${revenue}, 
            sinister = ${sinister}, 
            accident_rate = ${accident_rate}
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
