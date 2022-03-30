import cluster from 'cluster'
import os from 'os'
const numCPUs = os.cpus().length;
import http from 'http'
import axios from 'axios'

let i = 0
async function requestRouter() {

  await axios.get("http://localhost:2000").then((req) => { console.log(i + " | " + req.data) })


}

async function requestRouterAnt() {

  await axios.get("http://localhost:2000").then((req) => { console.log(i + " | " + req.data) })


}

async function criaCluster() {
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



    setTimeout(() => {
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      i++
    }, 4000)
    setTimeout(() => {
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      i++
    }, 8000)
    setTimeout(() => {
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      i++
    }, 12000)
    setTimeout(() => {
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      requestRouterAnt()
      i++
    }, 16000)

  } else {
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end(`eu sou o worker ${process.pid}\n`);
    }).listen(2000);

    console.log('Rodando na porta 2000 processo ' + process.pid);

    await requestRouter()
  }
}
await criaCluster()
