const {v4: getRandStr} = require('uuid');
const {room} = require("config");


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
        if (this.name.length < room.name.min)
            throw Error(`Minimum room name length is ${room.name.min}`);

        if (this.name.length > room.name.max)
            throw Error(`Maximum room name length is ${room.name.max}`);
    }

    validatePassword = () => {
        if (this.password.length < room.password.min)
            throw Error(`Minimum password length is ${room.password.min}`);

        if (this.password.length > room.password.max)
            throw Error(`Minimum password length is ${room.password.min}`);
    }

    create = async () => {
        this.validateName();
        this.validatePassword();

        if (await this.exists())
            throw Error('This room name is already used');

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