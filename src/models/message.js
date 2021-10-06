const {message, room} = require("config");

class Message {
    /**
     * @param content : string
     * @param member :  Member
     */
    constructor(content, member) {
        this.content = content;
        this.member = member;
    }

    validateContent = () => {
        if (this.content.length < message.min)
            throw Error(`Minimum message length is ${message.min}`);

        if (this.content.length > message.max)
            throw Error(`Maximum message length is ${message.max}`);

    }

    create = async () => {
        this.validateContent();

        if (!await this.member.exists()) {
            throw Error('You are not a member in this room');
        }

        await pool.execute(
            'insert into `messages` (content , memberId) values(?,?)',
            [this.content, this.member.id]
        );
    }

    static  get = async (member, lastId) => {
        if (!await member.exists())
            throw Error('You are not a member in this room');

        if (Number.isInteger(lastId)) {
            const [rows] = await pool.execute(
                `select messages.id, messages.content, members.name
                 from messages
                          inner join members
                                     on messages.memberId = members.id
                 where members.roomName = ?
                   and messages.id < ?
                 order by messages.id desc
                 limit 20
                `,
                [member.room.name, lastId]
            );
            return rows;
        } else {
            const [rows] = await pool.execute(
                `select messages.id, messages.content, members.name
                 from messages
                          inner join members
                                     on messages.memberId = members.id
                 where members.roomName = ?
                 order by messages.id desc
                 limit 20
                `,
                [member.room.name]
            );

            return rows;
        }
    }
}

module.exports = Message;