# Applicativo frontend

Progetto generato usando il template `react-ts` di [Vite](https://vitejs.dev/).

> **Requirements**: NodeJS

## Installazione

- Usare `npm i` per installare le dipendenze
- Inserire variabili d'ambiente necessarie in un file `.env` nella root directory del progetto come mostrato nel file d'esempio `.env.example`
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

### REDUX

Per affrontare la problematica della gestione dello stato globale e dello stato dei dati proveniente da backend si è deciso di usare la soluzione unica Redux, scelta per essere una soluzione ben definita e documentata.
In particolare si è usato la libreria [Redux toolkit](https://redux-toolkit.js.org/) che semplifica il setup di Redux.

Per la parte riguardante il recupero da dati dall'api si è deciso di usare un tool integrato in Redux quale [Redux toolkit](https://redux-toolkit.js.org/rtk-query/overview).

### Autenticazione

[Sito ufficiale](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)
L'autenticazione è gestita tramite la libreria Amplify di AWS, tramite Amazon Cognito.

# Guida alle directory

- `src/components` contiene i componenti dell'interfaccia
- `src/hooks` contiene i custom hooks usati nel progetto
- `src/globals` contiene file di configurazione globali necessari all'applicativo
- `src/router` contiene la configurazione del router che gestisce la divisione in pagine e l'accesso a esse
- `src/pages` contiene i componenti che rappresentano le varie pagine gestite dal router
- `src/app/services` contiene le funzionalità che gestiscono la problematica del recupero di dati dal backend
- `src/app/slices` contiene le funzionalità che servono alla gestione dello stato globale
- `src/types` contiene tipi utili all'intero applicativo
