const accounts = [];

export function addMoney(req, res) {
  const { accountId, customerId, amount } = req.body;
  const account = accounts.find(a => a.accountId === accountId);
  if (!account) return res.status(404).json({ error: 'Account not found' });
  if (account.customerId !== customerId) return res.status(400).json({ error: 'Invalid customer ID' });
  account.balance += amount;
  res.json({ message: 'Money added', balance: account.balance });
}

export function withdrawMoney(req, res) {
  const { accountId, customerId, amount } = req.body;
  const account = accounts.find(a => a.accountId === accountId);
  if (!account) return res.status(404).json({ error: 'Account not found' });
  if (account.customerId !== customerId) return res.status(400).json({ error: 'Invalid customer ID' });
  if (account.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });
  account.balance -= amount;
  res.json({ message: 'Money withdrawn', balance: account.balance });
}

export function getAccountDetails(req, res) {
  const account = accounts.find(a => a.accountId === req.params.accountId);
  if (!account) return res.status(404).json({ error: 'Account not found' });
  res.json(account);
}

export function deleteAccount(req, res) {
  const index = accounts.findIndex(a => a.accountId === req.params.accountId);
  if (index === -1) return res.status(404).json({ error: 'Account not found' });
  accounts.splice(index, 1);
  res.json({ message: 'Account deleted' });
}
