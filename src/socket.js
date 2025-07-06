import {io} from 'socket.io-client';

// const URL = 'http://localhost:3000';
const URL = 'https://bingo-server-51uc.onrender.com';

export const socket = io(URL, {
    autoConnect: false,
    transports: ['websocket'],
});