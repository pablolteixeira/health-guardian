const express = require("express");
const router = express.Router();

// Define routes for '/api/company'
router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT * FROM Collaborators");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, company_id, cpf} = req.body
        
        const [result] = await req.db.execute(
            `INSERT INTO Collaborators (name, company_id, cpf) VALUES ('${name}', '${company_id}', '${cpf}')`
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
        const [result] = await req.db.execute(`DELETE FROM Collaborators WHERE id=${req.params.id}`);
        req.db.release()
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Collaborators not found." })
        } else {
            res.json({ message: `Collaborators excluído com sucesso.` });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.put('/', async (req, res) => {
    try {
        const { id, name, company_id, cpf } = req.body

        const [result] = await req.db.execute(
            `UPDATE Collaborators 
            SET name = '${name}', 
            company_id = ${company_id}, 
            cpf = '${cpf}', 
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
