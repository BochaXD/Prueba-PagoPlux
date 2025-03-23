const express = require("express");
const {
  createPaymentLink,
  checkTransactionStatus,
} = require("../controller/payments/paymentController");

const router = express.Router();

router.post("/create-payment", createPaymentLink);
router.get("/check-transaction", checkTransactionStatus);

module.exports = router;
