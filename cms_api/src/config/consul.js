import Consul from 'consul';

const consul = new Consul({
  host: process.env.CONSUL_HOST || 'localhost', // Consul agent host
  port: process.env.CONSUL_PORT || '8500',     // Consul agent port
  secure: false,
});

export function registerService(serviceName, serviceId, port) {
    consul.agent.service.register(
        {
            id: serviceId,
            name: serviceName,
            address: process.env.SERVICE_HOST || 'localhost', // Microservice host
            port: port,
        },
        (err) => {
            if (err) throw err;
            console.log(`${serviceName} registered with Consul`);
        }
    );
}
export function deregisterService(serviceId) {
    consul.agent.service.deregister(serviceId, (err) => {
        if (err) throw err;
        console.log(`${serviceId} deregistered from Consul`);
    });
}
