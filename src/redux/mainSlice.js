import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        players: [],
    },
    reducers: {
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        setPlayers: (state, action) => {
            state.players = action.payload;
        },
        mergePlayers: (state, action) => {
            const player = action.payload;
            const newPlayers = state.players.map((p) => {
                if (p.name === player.name) {
                    return player;
                }
                return p;
            });
            state.players = newPlayers;
        },
    },
});

export const { setPlayers, mergePlayers, addPlayer } = mainSlice.actions;

export default mainSlice.reducer;
