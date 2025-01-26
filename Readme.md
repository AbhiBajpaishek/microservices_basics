MVP for a banking application


Steps to run:

Prerequisites:
NodeJS >=v22.13.0
consul agent


Start consul agent
consul agent -dev


RUN Customer Management Service

cd .\microservices_basics\
cd .\api_gateway\
npm install
npm start


RUN Accounts Management Service

cd .\microservices_basics\
cd .\api_gateway\
npm install
npm start


Import Endpoints from file: "Microservices_basics_endpoints" inside folder "microservices_basics" using Postman 

Sample URLs to Hit Service Endpoints
Customer Management Service

Add Customer (POST):

URL: http://localhost:3001/customers/
Body: { "name": "John Doe", "email": "john.doe@example.com" }

Get All Customers (GET):
URL: http://localhost:3001/customers/

Get Customer by ID (GET):
URL: http://localhost:3001/customers/:customerId

Update Customer (PUT):
URL: http://localhost:3001/customers/:customerId
Body: { "name": "John Updated", "email": "john.updated@example.com" }

Delete Customer (DELETE):
URL: http://localhost:3001/customers/:customerId

Account Management Service
Add Money to Account (POST):
URL: http://localhost:3002/accounts/add
Body: { "customerId": "123", "amount": 1000 }

Withdraw Money (POST):
URL: http://localhost:3002/accounts/withdraw
Body: { "customerId": "123", "amount": 500 }

Get Account Details (GET):
URL: http://localhost:3002/accounts/:accountId

Delete Account (DELETE):
URL: http://localhost:3002/accounts/:accountId




API Gateway
Forward Customer Management Requests:

URL: http://localhost:4000/customers/
Forward Account Management Requests:

URL: http://localhost:4000/accounts/
