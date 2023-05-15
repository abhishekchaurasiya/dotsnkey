const express = require("express");
const { createCustomer, getAllCustomer, updateCustomerById, deleteCustomerById } = require("../controllers/customersController");
const router = express.Router();

router.post("/customer", createCustomer)
router.get("/allCustomer", getAllCustomer)
router.put("/updateCustomer/:id", updateCustomerById)
router.delete("/deleteCustomer/:id", deleteCustomerById)

module.exports = router;