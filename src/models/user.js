"use strict";

const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true
        },
        fullName: {
            type: DataTypes.STRING(255),
            required: true,
        },
        gender: {
            type: DataTypes.INTEGER(4),
            defaultValue: 1 // nam
        },
        status: {
            type: DataTypes.INTEGER(4),
            defaultValue: 0
        },
        password: {
            type: DataTypes.STRING(255),
            required: true
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });

    user.afterValidate((user) => {
        if (user.password) {
            const salt = bcryptjs.genSaltSync(10);
            user.password = bcryptjs.hashSync(user.password, salt);
        }
    })

    return user;
}