import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { setPlayers, mergePlayers, addPlayer } from './redux/mainSlice';
import store from './redux/store';
import Api from './web/api';
import { host } from './constants';

export const connect = (successReconnectCallback) => {
    const socket = new SockJS(`${host}/munchkin`);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
        { credentials: false },
        async () => {
            console.log('Connected');
            await successReconnectCallback?.();

            stompClient.subscribe('/topic/activity', async (data) => {
                const response = JSON.parse(data.body);
                await handleMsg(response);
            });
        },
        reconnect,
        reconnect
    );
};

const handleMsg = async (response) => {
    const payload = JSON.parse(response.payload);

    switch (response.eventType) {
        case 'LOGIN':
            store.dispatch(addPlayer(payload));
            break;
        case 'UPDATE':
            store.dispatch(mergePlayers(payload));
            break;
        case 'DELETE':
            const newPlayers = await Api.getAll();
            store.dispatch(setPlayers(newPlayers));
            break;
    }
};

const reconnect = () => {
    console.log('Trying to reconnect...');
    const successReconnectCallback = async () => {
        const newPlayers = await Api.getAll();
        store.dispatch(setPlayers(newPlayers));
    };
    setTimeout(() => connect(successReconnectCallback), 10000);
};
