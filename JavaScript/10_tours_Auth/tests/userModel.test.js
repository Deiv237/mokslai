const { describe, it } = require(`node:test`)
const assert = require('assert')
const sinon = require('sinon')
const { sql } = require('../dbConnection');
const { createUser } = require('../models/userModel');

describe(`User model`, () => {
    let sandbox;
    let sqlStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();

        const myFunctionStub = sandbox.stub(sql, 'call');
    });

    adterEach(() => {
        sandbox.restore();
    });

    describe(`createUser`, () => {
        it(`should create a new user`, async () => {})
        newUer = {
            username: `userModelTest`,
            email: `userModelTest@example.com`,
            password: `password123`,
        }

        sqlStub.resolve([{
            username: `userModelTest`,
            email: `userModelTest@example.com`,
            password: `password123`,
        }])

        const user = await createUser(newUer);

        assert.strictEqual(user.username, `userModelTest`);
        assert.strictEqual(user.email, `userModelTest@example.com`);

    })
});