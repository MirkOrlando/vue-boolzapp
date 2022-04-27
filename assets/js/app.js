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
*/

const app = new Vue({
    el: '#app',
    data: {
        linkImg: './assets/img/avatar',
        extensionImg: '.jpg',
        activeChat: 0,
        txtMessage: '',
        searchKey: '',
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
            this.contacts.forEach((contact, index) => {
                //console.log(index, contact);
                contact.messages.forEach((message, index) => {
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
        takeDate(date) {
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
            const newMsgTime = `${hours}:${minutes}`
            return newMsgTime
        },
        sendMsg() {
            if (this.txtMessage !== '') {
                const newDate = new Date();
                const newMsg = {
                    msgTime: this.takeDate(newDate),
                    message: this.txtMessage,
                    status: 'sent'
                };
                this.contacts[this.activeChat].messages.push(newMsg);
                this.txtMessage = '';
                this.receiveMsg();
            }
        },
        receiveMsg() {
            setTimeout(() => {
                const newDate = new Date();
                const newMsgTxt = 'Ok'
                const newMsg = {
                    msgTime: this.takeDate(newDate),
                    message: newMsgTxt,
                    status: 'received'
                };
                this.contacts[this.activeChat].messages.push(newMsg);
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
            console.log(thumb, 'sto cliccando il message');
            thumb.dropDownVisible = !thumb.dropDownVisible
            console.log(thumb);
            ++this.activeChat;
            console.log(this.activeChat);
            --this.activeChat;
            console.log(this.activeChat);
        },
        //openDropDownMenu(thumb) {}
    },
    created() {
        this.getMsgTime();
        this.createPropertyDropDownVisible()
    },
})