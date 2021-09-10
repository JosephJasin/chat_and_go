const {v4: getRandStr} = require("uuid");
const {member} = require("config");

//TODO: Add custom errors
class Member {
    /**
     * @param name : string
     * @param room : Room
     * @param id : string|undefined
     */
    constructor(name, room, id = undefined) {
        this.name = name;
        this.room = room;
        this.id = id;

    }

    validateName = () => {
        if (this.name.length < member.name.min) throw Error('');
        if (this.name.length > member.name.max) throw Error('');
    }

    create = async () => {
        this.validateName();

        if (!await this.room.exists()) {
            throw Error('');
        }

        this.id = getRandStr();

        await pool.execute(
            'insert into `members`(id , name , roomName) values (?,?,?)',
            [this.id, this.name, this.room.name]
        );
    }

    exists = async () => {
        const [rows] = await pool.execute(
            'select 1 from `members` where id = ? and name = ? and roomName = ?',
            [this.id, this.name, this.room.name]
        );

        return rows.length === 1;
    }
}

module.exports = Member;