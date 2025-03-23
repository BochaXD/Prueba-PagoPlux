const axios = require("axios");

// Credenciales de PagoPlux desde .env
const API_URL = process.env.API_URL;
const API_USER = process.env.API_USER;
const API_PASSWORD = process.env.API_PASSWORD;
 //console.log(API_URL, API_USER, API_PASSWORD);

exports.createPaymentLink = async (req, res) => {
  try {
    const {
      montoCero,
      monto12,
      whatsapp,
      emailPago,
      telefono,
      nombrePago,
      ci,
      direccion,
    } = req.body;

    const requestData = {
      montoCero,
      monto12,
      whatsapp,
      emailPago,
      telefono,
      nombrePago,
      ci,
      direccion,
      descripcion: "Pago",
    };

    console.log("Request Data:", requestData);  

    const response = await axios.post(
      `${API_URL}/integrations/createTransactionWhatsappResource`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${API_USER}:${API_PASSWORD}`
          ).toString("base64")}`,
        },
      }
    );

   
    console.log("Response from createPaymentLink:", response.jsonString());

    res.json({ linkPago: response.data.detail.url });
  } catch (error) {
    if (error.response) {
      // Si el error tiene una respuesta, imprimirla
      console.error(
        "Error al generar link de pago (Response error):",
        error.response.data
      );
      res.status(401).json({
        msg: "Error no se generaron link de pago",
        error: error.response.data,
      });
    } else {
     
      console.error("Error al generar link de pago (No response):", error.message);
      res.status(500).json({
        msg: "Error ",
        error: error.message,
      });
    }
  }
};



exports.checkTransactionStatus = async (req, res) => {
  try {
    const { idTransaction } = req.query;

    const response = await axios.get(
      `${API_URL}/integrations/getTransactionByIdStateResource?idTransaction=${idTransaction}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${API_USER}:${API_PASSWORD}`
          ).toString("base64")}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error al consultar transacción:",
      error.response?.data || error.message
    );
    res.status(500).json({
      msg: "Error al consultar transacción",
      error: error.response?.data || error.message,
    });
  }
};
