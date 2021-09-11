const {v4: getRandStr} = require('uuid');
const {room} = require("config");


//TODO: Add custom errors
class Room {
    /**
     * @param name : string
     * @param password : string
     */
    constructor(name, password) {
        this.name = name.trim().toLowerCase();
        this.password = password.trim().toLowerCase();
    }

    validateName = () => {
        if (this.name.length < room.name.min) throw Error('');
        if (this.name.length > room.name.max) throw Error('');
    }

    validatePassword = () => {
        if (this.password.length < room.password.min) throw Error('');
        if (this.password.length > room.password.max) throw Error('');
    }

    create = async () => {
        this.validateName();
        this.validatePassword();

        if (await this.exists())
            throw Error('');

        await pool.execute(
            'insert into `rooms` (name, password) value (?,?)',
            [this.name, this.password]
        );
    }

    exists = async () => {
        const [rows] = await pool.execute(
            'select 1 from `rooms` where name = ? and password = ?',
            [this.name, this.password]
        );

        return rows.length === 1;
    }
}

module.exports = Room;