import { URL_API_FACTUS, ACCESS_TOKEN_FACTUS } from "../config/config.js";

export const createFacture = async (p_id, correo, relojes) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const additionalFields = {
    discount_rate: 0,
    tax_rate: "5.00",
    unit_measure_id: 70,
    standard_code_id: 1,
    is_excluded: 0,
    tribute_id: 1,
  };

  const updatedList = relojes.map((item) => ({
    ...item,
    code_reference: `${item.prod_id}`,
    name: item.title,
    price: item.unit_price,
    ...additionalFields,
  }));

  const AUTHORIZATION = `Bearer ${ACCESS_TOKEN_FACTUS}`;
  const res = await fetch(`${URL_API_FACTUS}/v1/bills/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION,
    },
    body: JSON.stringify({
      numbering_range_id: 8,
      reference_code: p_id,
      payment_form: "1",
      payment_due_date: formattedDate,
      payment_method_code: "10",
      billing_period: {
        start_date: "2024-01-01",
        start_time: "00:00:00",
        end_date: "2024-02-01",
        end_time: "23:59:59",
      },
      customer: {
        identification: "123456789",
        dv: "3",
        company: "",
        trade_name: "",
        names: correo.split("@")[0],
        address: "calle 1 # 2-68",
        email: correo,
        phone: "1234567890",
        legal_organization_id: "2",
        tribute_id: "21",
        identification_document_id: "3",
        municipality_id: "980",
      },
      items: updatedList,
    }),
  });

  const response = await res.json();
  return { message: "Factura creada", qr: response.data.bill.qr };
};
