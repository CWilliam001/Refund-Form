const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const getRefundForm = async (val, res) => {
    try {
        let refund_form = []
        if (val == "") {
            refund_form = await pool.query('SELECT * FROM refund_form ORDER BY rf_number DESC LIMIT 1');
        } else {
            refund_form = await pool.query('SELECT * FROM refund_form WHERE rf_number = $1', [val]);
        }

        return res.json({
            refund_form: refund_form.rows
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json("Server Error");
    }
}

// Return the searched refund form
router.post('/search', async(req, res) => {
    try {
        const { rf_no } = req.body;
        console.log(rf_no);

        return getRefundForm(rf_no, res);
    } catch (e) {
        console.error(e.message);
        res.status(500).json("Server Error");
    }
})

router.get('/', async(req, res) => {
    try {
        return getRefundForm("", res);
    } catch (e) {
        console.error(e.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;