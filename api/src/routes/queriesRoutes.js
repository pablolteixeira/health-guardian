const express = require("express");
const router = express.Router();

// Define routes for '/api/queries'
router.get('/revenueByCompany', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT Companies.name AS CompanyName,\
                                             SUM(Revenues.value) AS ValueRevenue\
                                             FROM Companies\
                                             LEFT JOIN Revenues ON Companies.id = Revenues.company_id\
                                             GROUP BY Companies.id");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/averageAccidentByCompany', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT Companies.name AS CompanyName,\
                                             AVG(Validators.accident_rate) AS AccidentRate,\
                                             AVG(Validators.sinister) AS Sinister\
                                             FROM Companies\
                                             JOIN Validators ON Companies.id = Validators.company_id\
                                             GROUP BY Companies.id");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/collaboratorsByCompany', async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT Collaborators.name AS CollaboratorsName,\
                                             Collaborators.cpf AS CollaboratorsCPF,\
                                             Companies.name AS CompanyName,\
                                             SUM(Appointments.value) AS ValueAppointments\
                                             FROM Collaborators\
                                             JOIN Appointments ON Collaborators.id = Appointments.collaborator_id\
                                             JOIN Companies ON Appointments.company_id = Companies.id\
                                             GROUP BY Collaborators.id, Companies.id");
        req.db.release()
        res.json(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;
