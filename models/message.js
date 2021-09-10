const {message} = require("config");

//TODO: Add custom errors
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
        if (this.content.length < message.min) throw  Error('');
        if (this.content.length > message.max) throw  Error('');
    }

    create = async () => {
        this.validateContent();

        if (!await this.member.exists()) {
            throw Error('');
        }

        await pool.execute(
            'insert into `messages` (content , memberId) values(?,?)',
            [this.content, this.member.id]
        );
    }

    static  getAll = async (member) => {
        if (!await member.exists()) throw Error('');

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