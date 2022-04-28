/* 
Milestone 1
Replica della grafica con la possibilità di avere messaggi 
scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando 
due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la 
direttiva v-for, visualizzare nome e immagine di ogni contatto
Milestone 2
Visualizzazione dinamica dei messaggi: 
tramite la direttiva v-for, visualizzare tutti i messaggi 
relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato
Milestone 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.
Milestone 4
● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
“mar” rimangono solo Marco e Martina)
Milestone 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato
● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

Funzionalità
- evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi
- A) cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio)
  finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, 
  quando l'input non è vuoto si visualizza l'icona dell'aeroplano. 
  Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono. 
  B) inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano
- predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" 
  quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla 
  lista e utilizzarla come testo del messaggio di risposta del pc
- visualizzare nella lista dei contatti l'ultimo messaggio inviato/ricevuto da ciascun contatto
- inserire l'orario corretto nei messaggi (v. note day.js)
- sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: 
  visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, 
  poi mantenere la scritta "online" per un paio di secondi e 
  infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto
- dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o 
  di cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona con 
  i tre pallini in alto a destra, si apre un dropdown menu in cui sono presenti 
  le voci "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si 
  cancellano rispettivamente tutti i messaggi di quel contatto (quindi 
  rimane la conversazione vuota) oppure l'intera chat comprensiva di 
  tutti i dati del contatto oltre che tutti i suoi messaggi (quindi sparisce il
  contatto anche dalla lista di sinistra)
- dare la possibilità all'utente di aggiungere una nuova conversazione,
  inserendo in un popup il nome e il link all'icona del nuovo contatto
fare scroll in giù in automatico fino al messaggio più recente, quando viene aggiunto un nuovo messaggio alla conversazione (NB: potrebbe esserci bisogno di utilizzare nextTick: https://vuejs.org/v2/api/#Vue-nextTick)
aggiungere le emoticons, tramite l'utilizzo di una libreria, ad esempio: https://www.npmjs.com/package/vue-emoji-picker
Grafica
visualizzare un messaggio di benvenuto che invita l'utente a selezionare un contatto dalla lista per visualizzare i suoi messaggi, anziché attivare di default la prima conversazione
aggiungere una splash page visibile per 1s all'apertura dell'app
A) rendere l'app responsive e fruibile anche su mobile: di default si visualizza solo la lista dei contatti e cliccando su un contatto si vedono i messaggi di quel contatto. B) aggiungere quindi un'icona con una freccia verso sinistra per tornare indietro, dalla visualizzazione della chat alla visualizzazione di tutti i contatti
aggiungere un'icona per ingrandire o rimpicciolire il font: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
aggiungere un'icona per cambiare la modalità light/dark: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
*/



const app = new Vue({
    el: '#app',
    data: {
        linkImg: './assets/img/avatar',
        extensionImg: '.jpg',
        activeChat: 0,
        txtMessage: '',
        searchKey: '',
        isTypingResult: false,
        isOnline: false,
        isContactTyping: false,
        isPopUpVisible: false,
        isPopUpNewChatVisible: false,
        newName: '',
        newIcon: '',
        rndTxtMsg: [
            'Scappa Marty!',
            'Nulla è reale, tutto è lecito',
            'Questi non sono i droidi che state cercando',
            "Mi chiamo Massimo Decimo Meridio",
            "Sei proprio tu John Wayne? E io chi sarei?",
            "Vieni con me se vuoi vivere",
            "Non odii anche tu i silenzi che mettono a disagio?",
            "Ok",
            "Cosa vedono i tuoi occhi da elfo?",
            "I am Ironman"
        ],
        contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ]
    },
    methods: {
        getActive(i) {
            this.activeChat = i
        },
        getMsgTime() {
            //console.log('getmsgtime is running');
            this.contacts.forEach((contact) => {
                //console.log(index, contact);
                contact.messages.forEach((message) => {
                    //console.log(index, message);
                    //console.log(message.date.slice(11, 16));
                    message.msgTime = message.date.slice(11, 16)
                });
            });
        },
        createPropertyDropDownVisible() {
            this.contacts.forEach(contact => {
                contact.messages.forEach(message => {
                    message.dropDownVisible = false
                });
            });
        },
        saveLastAccess() {
            let lastAccess
            this.contacts.forEach(contact => {
                contact.messages.forEach(message => {
                    if (message.status === "received") {
                        lastAccess = message.msgTime
                    }
                });
                contact.lastAccess = lastAccess
            });
        },
        saveLastMsg() {
            let lastMsg
            this.contacts.forEach(contact => {
                contact.messages.forEach(message => {
                    let cutText
                    if (message.length < 1) {
                        lastMsg = ''
                    } else {
                        if (message.message.length > 20) {
                            cutText = message.message.slice(0, 19) + "..."
                        } else {
                            cutText = message.message
                        }
                        //console.log(cutText);
                        lastMsg = {
                            text: cutText,
                            date: message.msgTime,
                        }
                    }
                });
                contact.lastMsg = lastMsg
            });
        },
        takeTime(date) {
            let hours;
            let minutes;
            if (date.getHours().toString().length < 2) {
                hours = 0 + date.getHours().toString()
            } else {
                hours = date.getHours().toString()
            }
            if (date.getMinutes().toString().length < 2) {
                minutes = 0 + date.getMinutes().toString()
            } else {
                minutes = date.getMinutes().toString()
            }
            const newTime = `${hours}:${minutes}`
            return newTime
        },
        validate() {
            //console.log('validate');
            if (/^\s/.test(this.txtMessage)) {
                this.txtMessage = '';
            }
        },
        sendMsg() {
            //console.log(event);
            if (this.txtMessage !== '') {
                const newDate = new Date();
                const newMsg = {
                    msgTime: this.takeTime(newDate),
                    message: this.txtMessage,
                    status: 'sent'
                };
                this.contacts[this.activeChat].messages.push(newMsg);
                this.isTypingResult = false
                this.txtMessage = '';
                this.receiveMsg();
            }
            this.saveLastMsg()
        },
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        getRndMsgTxt() {
            return this.rndTxtMsg[this.getRndInteger(0, this.rndTxtMsg.length)]
        },
        generateNewMsg() {
            const newDate = new Date();
            const newMsgTxt = this.getRndMsgTxt();
            const newMsg = {
                msgTime: this.takeTime(newDate),
                message: newMsgTxt,
                status: 'received'
            };
            this.contacts[this.activeChat].messages.push(newMsg);
            this.saveLastMsg()
            this.saveLastAccess()
        },
        receiveMsg() {
            setTimeout(() => {
                this.isOnline = true
                setTimeout(() => {
                    this.isContactTyping = true
                    setTimeout(() => {
                        this.generateNewMsg()
                        this.isContactTyping = false
                        setTimeout(() => {
                            this.isOnline = false
                            const date = new Date()
                            this.contacts[this.activeChat].lastAccess = this.takeTime(date)
                        }, 2000)
                    }, 2000)
                }, 1000)
            }, 1000);
        },
        searchContact() {
            //console.log(this.searchKey, 'sto cercando un contatto');
            this.contacts.forEach(contact => {
                const name = contact.name.toUpperCase();
                const searchKey = this.searchKey.toUpperCase()
                if (!name.includes(searchKey)) {
                    contact.visible = false
                } else {
                    contact.visible = true
                }
            });
        },
        clickMessage(thumb) {
            //console.log(thumb, 'sto cliccando il message');
            thumb.dropDownVisible = true;
            console.log(thumb);
            ++this.activeChat;
            //console.log(this.activeChat);
            --this.activeChat;
            //console.log(this.activeChat);
        },
        deleteMessage(i) {
            //console.log(i, 'cliccato');
            this.closePopUp()
            this.contacts[this.activeChat].messages.splice(i, 1)
            this.saveLastMsg()
        },
        deleteAllMsg() {
            this.contacts[this.activeChat].messages = []
        },
        deleteActiveChat() {
            this.contacts.splice(this.activeChat, 1)
        },
        closePopUp() {
            this.isPopUpVisible = false
            this.isPopUpNewChatVisible = false
            this.contacts.forEach(contact => {
                contact.messages.forEach(thumb => {
                    thumb.dropDownVisible = false
                    console.log(thumb);
                })
            });
            ++this.activeChat;
            //console.log(this.activeChat);
            --this.activeChat;
            //console.log(this.activeChat);
        },
        isTyping() {
            if (this.txtMessage !== '') {
                this.isTypingResult = true
            } else {
                this.isTypingResult = false
            }
        },
        isTypeInputEmpty() {
            console.log('backspace');
            if (this.txtMessage === '') {
                this.isTypingResult = false
            }
        },
        clickEllipsis() {
            this.isPopUpVisible = !this.isPopUpVisible;
        },
        clickNewChat() {
            this.isPopUpNewChatVisible = !this.isPopUpNewChatVisible;
        },
        regretNewChat() {
            this.isPopUpNewChatVisible = false;
            this.newName = '';
            this.newIcon = '';
        },
        confirmNewChat() {
            if (this.newName !== '' && this.newIcon !== '') {
                const newContact = {
                    name: this.newName,
                    avatar: this.newIcon,
                    visible: true,
                    messages: [],
                };
                this.contacts.unshift(newContact);
                this.isPopUpNewChatVisible = false;
                this.newName = '';
                this.newIcon = '';
                this.saveLastMsg()
            }
        },
    },
    created() {
        this.getMsgTime();
        this.createPropertyDropDownVisible();
        this.saveLastMsg();
        this.saveLastAccess();
    },
})