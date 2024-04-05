const { createApp } = Vue;
const dt = luxon.DateTime;

createApp({
  data() {
    return {
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
          message: 'Ricordati di dargli da mangiare',
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
          status: 'received'
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
        name: 'Luisa',
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
      ],
      activeItem: 0,
      messageText: '',
      searchText: '',
      isOnline: false,
      isActiveMessage: false,
    };
  },
  methods: {
    showChat(index) {
      this.activeItem = index;
    },
    formatClock(element) {
      const dateArray = element.date.split(' ');
      const clock = dateArray[1].split(':');
      const formatClock = `${clock[0]}:${clock[1]}`;
      return formatClock;
    },
    addNewSentMessage() {
      const messageTextTrimmed = this.messageText.trim();
      const now = dt.now().setLocale('fr').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
      const newMessage = { date: now, message: messageTextTrimmed, status: 'sent' };
      this.contacts[this.activeItem].messages.push(newMessage);
      this.messageText = '';
      setTimeout(this.online, 1000);
      setTimeout(this.addNewReceivedMessage, 1500);
    },
    addNewReceivedMessage() {
      const now = dt.now().setLocale('fr').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
      const newReceivedMessage = { date: now, message: 'ok', status: 'received' };
      this.contacts[this.activeItem].messages.push(newReceivedMessage);
      setTimeout(this.offline, 2000);
    },
    searchContact() {
      const searchTextTrimmed = this.searchText.trim();
      this.contacts.forEach((contact) => {
        contact.visible = contact.name.toLowerCase().includes(searchTextTrimmed.toLowerCase());
      });
    },
    online() {
      this.isOnline = true;
    },
    offline() {
      this.isOnline = false;
    },
    dropDown() {
      if (!this.isActiveMessage) {
        this.isActiveMessage = true;
      } else if (this.isActiveMessage) {
        this.isActiveMessage = false;
      }
      console.log(this.isActiveMessage);
    },
    dropUp() {
      this.isActiveMessage = false;
    },
    deleteMessage(activeItem, index) {
      this.dropUp();
      this.contacts[activeItem].messages.splice(index, 1);
      console.log(this.contacts[activeItem].messages);
    }
  }
}).mount('#app');
