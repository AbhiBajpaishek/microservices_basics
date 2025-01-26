import { mockCustomers } from "../customerMocks.js";
import axios from "axios";
import { v4 } from "uuid";
import { asyncHandler, syncHandler } from "../middlewares/errorHandler.js";

const customers = mockCustomers;

export const addCustomer = asyncHandler(async (req, res) => {
  const id = v4();
  const { name, email } = req.body;

  // Call account service to create a new account
  const accountsServiceUrl = process.env.ACCOUNTS_SERVICE_URL;

  // Make a ADD account request
  const response = await axios.post(`${accountsServiceUrl}/${id}`);

  if (response.status !== 201) {
    console.log("res: ", response);
    throw new Error(response.data.error);
  }

  const { accountId } = response.data;

  customers.push({ id, name, email, accountId });
  res.status(201).json({ message: "Customer added", id, accountId });
});

export const getAllCustomers = syncHandler((req, res) => {
  return res.json(customers);
});

export const getCustomer = syncHandler((req, res) => {
  const customer = customers.find((c) => c.id == req.params.id);
  if (!customer) return res.status(404).json({ error: "Customer not found" });
  return res.json(customer);
});

export const updateCustomer = syncHandler((req, res) => {
  const customer = customers.find((c) => c.id == req.params.id);
  if (!customer) return res.status(404).json({ error: "Customer not found" });
  Object.assign(customer, req.body);
  res.json({ message: "Customer updated", customer });
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const index = customers.findIndex((c) => c.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ error: "Customer not found" });

  // Call account service to delete customer accounts
  try {
    const accountsServiceUrl = process.env.ACCOUNTS_SERVICE_URL;

    // Make a DELETE request
    const response = await axios.delete(
      `${accountsServiceUrl}/${customers[index].accountId}`
    );

    if (response.status !== 200) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  customers.splice(index, 1);
  res.json({ message: "Customer deleted" });
});
