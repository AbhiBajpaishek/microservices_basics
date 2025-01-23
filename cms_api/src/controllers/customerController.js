const customers = [];

export function addCustomer(req, res) {
  const { id, name, email } = req.body;
  customers.push({ id, name, email });
  res.status(201).json({ message: 'Customer added', id });
}

export function getAllCustomers(req, res) { return res.json(customers); }

export function getCustomer(req, res) {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  res.json(customer);
}

export function updateCustomer(req, res) {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  Object.assign(customer, req.body);
  res.json({ message: 'Customer updated', customer });
}

export function deleteCustomer(req, res) {
  const index = customers.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Customer not found' });
  customers.splice(index, 1);
  res.json({ message: 'Customer deleted' });
}
