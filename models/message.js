const {message} = require("config");

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
}

module.exports = Message;