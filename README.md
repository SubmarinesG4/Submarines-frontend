# Applicativo frontend

Progetto generato usando il template `react-ts` di [Vite](https://vitejs.dev/).

> **Requirements**: NodeJS

## Installazione

- Usare `npm i` per installare le dipendenze
- Usare `npm run dev` per far partire un server locale di sviluppo

A seguito dell'esecuzione di questi comandi verrà avviato una versione di sviluppo utilizzabile in locale dell'applicativo,
raggiungibile all'indirizzo di base visualizzato nel terminale

## Tecnologie utilizzate

### Vite

[Sito ufficiale](https://vitejs.dev/)

Ha lo scopo di generare e gestire le directory del progetto, la compilazione del codice, il server di sviluppo e la build finale.

### React

[Sito ufficiale](https://it.reactjs.org/)

Libreria che si occupa della gestione della visualizzazione dell'interfaccia, manipolazione del DOM, gestione degli eventi di esso e altro.
La libreria è molto semplice e ricopre un ruolo ben preciso, ad integrazione di essa per le varie funzionalità si sono integrate le librerie elencate nei prossimi punti.

### React-router

[Sito ufficiale](https://reactrouter.com/en/main)

Si è utilizzata questa libreria che offre componenti e metodologie per dividere in pagine raggiungibili da path diverse le varie parti dell'interfaccia.

### Material UI

[Sito ufficiale](https://mui.com/)

Libreria di componenti grafici pre-realizzati che offre funzionalità per la gestione degli stili e del tema grafico.

### Gestione richieste HTTP e dati asincroni

Trattandosi di una tematica molto complicata si è deciso di usare le due seguenti librerie che gestiscono la problematica.

- [Axios](https://axios-http.com/docs/intro/) Libreria utilizzata per eseguire chiamate HTTP

- [React-query](https://react-query-v3.tanstack.com/) Libreria usata gestire il flusso del recupero dati dal backend e l'integrazione di essi nei componenti React. Semplifica notevolmente la problematica di gestire la natura asincrona della problematica e molti altre tematiche tra le quali caching dei dati, gestione del flusso di errore e caricamento e altro.

### Gestione stato globale

Si è scelto di utilizzare un'altra soluzione per gestire la problematica di stato globale presente nel client, divisa dalla gestione dei dati provenienti dal backend. La libreria scelta è:

- [Zustand](https://github.com/pmndrs/zustand) Consiste in utilities che permettono di gestire e integrare in React degli stores che rappresentano dati che possono essere comuni a più componenti (ad esempio token di autenticazione, stati specifici dell'interfaccia)

### React-hook-form

[Sito ufficiale](https://react-hook-form.com/)

Questa libreria espone componenti e funzionalità per la gestione di form.

### Autenticazione

L'autenticazione in questa versione è solamente simulata, si pianifica di usare le librerie di amazon che si interfacciano con AWS Cognito per gestire la problematica.

# Guida alle directory

- `src/components` contiene i componenti dell'interfaccia
- `src/globals` contiene file di configurazione globali necessari all'applicativo
- `src/router` contiene la configurazione del router che gestisce la divisione in pagine e l'accesso a esse
- `src/pages` contiene i componenti che rappresentano le varie pagine gestite dal router
- `src/queries` contiene le funzionalità che gestiscono la problematica del recupero di dati dal backend
- `src/stores` contiene le funzionalità che servono alla gestione dello stato globale
- `src/types` contiene tipi utili all'intero applicativo
