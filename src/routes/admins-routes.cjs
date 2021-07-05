// module.exports = adminapp => {
//     const admins = require('../controllers/Admins.cjs');

//     adminapp.get("/admins/create-admin", (req, res) => {
//       res.render('admins')
//     });

//     adminapp.post("/admins/create-admin", admins.createAdmin);
//   };

const express = require('express');
const router = express.Router();

const adminController = require('../controllers/Admins.cjs');


router.get('/admins/create-admin', (req, res) => {
    res.render('admins-add')
})

router.post('/admins/create-admin', adminController.createAdmin);

module.exports = router;
