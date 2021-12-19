export default function validateInvoice(data) {
  let errors = {};
  if (data.invoice_received === "Yes") {
    if (!data.invoice_amount_received) {
      errors.invoice_amount_received = "Invoice Amount is Required";
    } else if (data.invoice_amount_received > data.PO_amt) {
      errors.Client_Name = "Invoice Amount cannot be greater than PO Amount";
    }
    if (!data.vb_bank_account) {
      errors.vb_bank_account = "Bank Account is Required";
    }
    if (!data.amount_received_on) {
      errors.Type = "Amount Received Date is required";
    }
  }
  return errors;
}
