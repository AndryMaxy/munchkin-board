import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../redux/mainSlice';
import Api from '../web/api';
import Body from './Body.jsx';
import Head from './Head.jsx';

const Board = () => {
    const players = useSelector((state) => state.main.players);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllPlayers = async () => {
            const newPlayers = await Api.getAll();
            dispatch(setPlayers(newPlayers));
        }
        getAllPlayers();
    }, []);

    return players.length ? (
        <table>
            <Head />
            <Body players={players} />
        </table>
    ) : null;
};

export default Board;
