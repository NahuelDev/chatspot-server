export let rooms = [];

export const addRoom = (room) => {

    const alreadyExists = rooms.some(({ id }) => id === room.id);

    if (!alreadyExists) {
        rooms.push(room);
    }

    return alreadyExists;
};