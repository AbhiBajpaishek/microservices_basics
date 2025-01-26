import { mockAccounts } from "../accountMocks.js";
import axios from "axios";
import { asyncHandler, syncHandler } from "../middlewares/errorHandler.js";

const accounts = mockAccounts;

export const addAccountDetails = syncHandler((req, res) => {
  const { customerId } = req.params;
  const accountId = accounts.length + 1;
  accounts.push({ accountId, customerId, balance: 0 });
  res.status(201).json({ message: "Account added", accountId });
});

export const addMoney = syncHandler((req, res) => {
  const { accountId, customerId, amount } = req.body;
  const account = accounts.find((a) => a.accountId == accountId);
  if (!account) return res.status(404).json({ error: "Account not found" });
  if (account.customerId !== customerId)
    return res.status(400).json({ error: "Invalid customer ID" });
  account.balance += amount;
  res.json({ message: "Money added", balance: account.balance });
});

export const withdrawMoney = syncHandler((req, res) => {
  const { accountId, customerId, amount } = req.body;
  const account = accounts.find((a) => a.accountId == accountId);
  if (!account) return res.status(404).json({ error: "Account not found" });
  if (account.customerId != customerId)
    return res.status(400).json({ error: "Invalid customer ID" });
  if (account.balance < amount)
    return res.status(400).json({ error: "Insufficient balance" });
  account.balance -= amount;
  res.json({ message: "Money withdrawn", balance: account.balance });
});

export const getAccountDetails = asyncHandler(async (req, res) => {
  const requestedAccountId = req.params.accountId;
  const account = accounts.find((a) => a.accountId == requestedAccountId);
  if (!account) return res.status(404).json({ error: "Account not found" });

  const customerServiceUrl = process.env.CUSTOMERS_SERVICE_URL;

  // Make a GET request
  const response = await axios.get(
    `${customerServiceUrl}/${account.customerId}`
  );

  if (response.status !== 200) {
    throw new Error("Error while fetching customer details");
  }

  const accountDetails = {
    accountId: account.accountId,
    customerName: response.data.name,
    customerEmail: response.data.email,
    balance: account.balance,
  };
  res.json(accountDetails);
});

export const deleteAccount = syncHandler((req, res) => {
  const index = accounts.findIndex((a) => a.accountId == +req.params.accountId);
  if (index === -1) return res.status(404).json({ error: "Account not found" });

  accounts.splice(index, 1);

  res.json({ message: "Account deleted" });
});
