const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    // user model
    sequelize.models.user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'First name is required',
              },
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: {
              args: true,
              msg: 'This email already in use',
            },
            allowNull: false,
            validate: {
              notNull: {
                msg: 'Email required',
              },
              notEmpty: {
                msg: 'Email required',
              },
              isEmail: {
                msg: 'Invalid email format',
              },
            },
          },
        role: {
            type: DataTypes.ENUM('USER', 'ADMIN'),
            allowNull: false,
            defaultValue: 'USER',
        },
    });

    // user_secret model
    sequelize.models.user_secret = sequelize.define(
      'user_secret',
      {
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Password required',
            },
            notEmpty: {
              msg: 'Password required',
            },
          },
        },
      },
      {
        // nereikia automatiniu updated_at, created_at
        timestamps: false,
        // sitas hookas "automatiskai" hashina slaptazodi
        // pagal geros praktikos taisykles
        // jis atskirtas nuo visos serviso logikos
  
        hooks: {
          beforeCreate: async (userSecret) => {
            userSecret.password = await bcrypt.hash(userSecret.password, 10);
          },
          beforeUpdate: async (userSecret) => {
            if (userSecret.changed('password')) {
              userSecret.password = await bcrypt.hash(userSecret.password, 10);
            }
          },
        },
      });

        // token model
  sequelize.models.token = sequelize.define('token', {
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
  });
  };