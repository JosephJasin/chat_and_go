const {uniqueNamesGenerator, adjectives, colors, animals} = require('unique-names-generator');

const {member: memberConfig} = require('config');

const Room = require("../models/room.js");
const Member = require("../models/member.js");
const Message = require('../models/message.js');

function getRandName() {
    let randName;
    do {
        randName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors],
            length: 3,
            style: 'lowerCase'
        });
    } while (randName.length > memberConfig.name.max)

    return randName;
}

function registerRoomHandler(io, socket) {
    socket.on('room', async args => {
        try {
            const room = new Room(args.roomName, args.roomPassword);

            if (args.createRoom)
                await room.create();

            const member = new Member(getRandName(), room);
            await member.create();

            socket.join(room.name);
            socket.emit('save', {
                memberId: member.id,
                memberName: member.name,
                roomName: member.room.name,
                roomPassword: member.room.password,
            });

        } catch (e) {
            socket.emit('error', e.message);
        }
    })
}

function registerReconnectHandler(io, socket) {
    socket.on('reconnect', async args => {
        try {
            const room = new Room(args.roomName, args.roomPassword);
            const member = new Member(args.memberName, room, args.memberId)
            if (await member.exists())
                socket.join(member.room.name);
            else
                throw Error('')//TODO: Add custom error.


            const messages = await Message.getAll(member);

            socket.emit('messages' , messages);


        } catch (e) {
            socket.emit('error', e.message);

        }
    })

}

function registerMessageHandler(io, socket) {
    socket.on('message', async args => {
        try {
            const room = new Room(args.roomName, args.roomPassword);
            const member = new Member(args.memberName, room, args.memberId);
            const message = new Message(args.content, member);

            await message.create();

            io.to(room.name).emit('message', {
                memberName: message.member.name,
                content: message.content,
            });

        } catch (e) {
            socket.emit('error', e.message);
        }
    })
}

module.exports = {
    registerRoomHandler,
    registerReconnectHandler,
    registerMessageHandler
}