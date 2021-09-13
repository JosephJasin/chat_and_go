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

    static  getAll = async (member) => {
        if (!await member.exists())
            throw Error('You are not a member in this room');

        const [rows] = await pool.execute(
            'select messages.content , members.name from messages inner join members ' +
            'on messages.memberId =members.id ' +
            'where members.roomName = ? order by messages.creationDate  limit 1000',
            [member.room.name]
        );

        return rows;
    }


}

module.exports = Message;