import cluster from 'cluster'
import os from 'os'
const numCPUs = os.cpus().length;
import http from 'http'
if (cluster.isPrimary) {
  console.log('Primary process rodando');

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} morreu, o código é: ${code}, e sinal: ${signal}`);
    console.log('Iniciando um novo Worker');
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`eu sou o worker ${process.pid}\n`);
  }).listen(2000);

  console.log('Rodando na porta 2000 processo ' + process.pid);
}