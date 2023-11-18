const express = require("express");
const router = express.Router();

// Define routes for '/api/company'
router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT * FROM Appointments");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/', async (req, res) => {
    try {
        const { value, competence, company_id, collaborator_id, cod_procedure} = req.body
        
        const [result] = await req.db.execute(
            `INSERT INTO Appointments (value, competence, company_id, collaborator_id, cod_procedure) VALUES ('${value}', '${competence}', '${company_id}', ${collaborator_id}, ${cod_procedure})`
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
        const [result] = await req.db.execute(`DELETE FROM Appointments WHERE id=${req.params.id}`);
        req.db.release()
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Appointments not found." })
        } else {
            res.json({ message: `Appointments excluído com sucesso.` });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.put('/', async (req, res) => {
    try {
        const { id, value, competence, company_id, collaborator_id, cod_procedure } = req.body

        const [result] = await req.db.execute(
            `UPDATE Appointments 
            SET value = '${value}', 
            competence = '${competence}',
            company_id = ${company_id}, 
            collaborator_id = ${collaborator_id},
            cod_procedure = ${cod_procedure}
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
