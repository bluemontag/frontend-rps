

export default function getAPIUrl() {
    if(process.env.NODE_ENV !== 'production') {
        return 'http://localhost:8081/game/';
    } else {
        return 'https://rock-paper-scissors.es/game/';
    }
}
