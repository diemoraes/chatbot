const { tree } = require('gulp');
const venom = require('../dist');


venom.create({
  session: 'sessionname', //name of session
  headless: false,
  logQR: true,
}).then((client) => {
  start(client);
});


function start(client) {
  let listaPresenca = [];
  let listaParticipantes = [];

  client.onMessage((message) => {

    const grupo = 'Chat Bot';
    //const grupo = 'Vôlei de terça ( café com leite )';

    if ((message.body === 'oi' || message.body === 'Oi') && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Oi ' + message.notifyName)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } else if ((message.body === 'Eu' || message.body === 'eu' || message.body === 'I' || message.body === 'i' || message.body === 'yo' || message.body === 'io') && message.isGroupMsg === true && message.groupInfo.name === grupo) {


      let confirmado = message.notifyName;

      if (listaParticipantes.indexOf(confirmado) > -1) {
        client.sendText(message.from, 'Você já está na lista relaxa!!!')
        client.sendText(message.from, 'Legal, já somos ' + listaPresenca.length + ', confirmados: \n' + listaPresenca.join('\n') + ' \n Quem mais??? Só mandar --> Eu <-- \n Para sair mande sair')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      } else {
        listaPresenca.push(listaPresenca.length + 1 + ' - ' + confirmado);
        listaParticipantes.push(confirmado);
        client.sendText(message.from, 'Legal, já somos ' + listaPresenca.length + ', confirmados: \n' + listaPresenca.join('\n') + ' \n Quem mais??? Só mandar --> Eu <-- \n Para sair mande sair')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
    } else if (message.body.includes('Avulso:') && message.isGroupMsg === true && message.groupInfo.name === grupo) {
      let confirmado = message.body.split(':');
      listaPresenca.push(listaPresenca.length + 1 + ' - ' + confirmado[1]);
      client.sendText(message.from, 'Legal, já somos ' + listaPresenca.length + ', confirmados: \n' + listaPresenca.join('\n') + ' \n Quem mais??? Só mandar --> Eu <-- \n Para sair mande sair')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } else if (message.body === 'Limpar' && message.isGroupMsg === true && message.groupInfo.name === grupo) {
      listaPresenca.length = 0;
      client.sendText(message.from, 'A Lista de presença foi reiniciada. Quem mais??? Bora só falar --> Eu <--')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    else if (message.body.toUpperCase() === 'SAIR' && message.isGroupMsg === true && message.groupInfo.name === grupo) {
      try {
        let confirmado = message.notifyName;

        const posicao = listaParticipantes.indexOf(confirmado);

        listaPresenca.splice(posicao,1);
        listaParticipantes.splice(posicao,1);

        client.sendText(message.from, 'Legal, já somos ' + listaPresenca.length + ', confirmados: \n' + listaPresenca.join('\n') + ' \n Quem mais??? Só mandar --> Eu <-- \n Para sair mande sair')
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });

      } catch (error) {
        console.error('Error when sending: ', error); //return object error
      }

    }
    else if (essage.body.toUpperCase().includes('SAIR:') && message.isGroupMsg === true && message.groupInfo.name === grupo) {
      try {
        let confirmado = message.body.split(':');
        const posicao = listaParticipantes.indexOf(confirmado[1]);

        listaPresenca.splice(posicao,1);
        listaParticipantes.splice(posicao,1);

        client.sendText(message.from, 'Legal, ainda somos ' + listaPresenca.length + ', confirmados: \n' + listaPresenca.join('\n') + ' \n Quem mais??? Só mandar --> Eu <-- \n Para sair mande sair')
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });

      } catch (error) {
        console.error('Error when sending: ', error); //return object error
      }

    }
  });
}



