const { describe, it } = require(`node:test`)
const assert = require('assert')
const sinon = require('sinon')
const { jwt } = require('jsonwebtoken')
const { signup } = require('../controlers/authControler');
const { body, cookie } = require('express-validator');
const { it } = require ("node:test");
const argon2 = require('argon2');

describe(`Auth controler signup`, () => {
    let sandbox;
    let createUserStub;
    let signTokenStub;
    let sendTokenCookieStub;
    let req;
    let res;
    let next;

    createUserStub = sandbox.stub(require('../models/userModel'), 'createUser');
    signTokenStub = sandbox.stub(require('../controlers/authControler'), 'signToken');
    sendTokenCookieStub = sandbox.stub(require('../controlers/authControler'), 'sendTokenCookie');

    beforeEach(() => {

        sandbox = sinon.createSandbox();

        createUserStub = sandbox.stub(require('../models/userModel'), 'createUser');
        signTokenStub = sandbox.stub(require('../controlers/authControler'), 'signToken');
        sendTokenCookieStub = sandbox.stub(require('../controlers/authControler'), 'sendTokenCookie');

        req = {
            body: {
                username: 'user',
                email: 'user@user',
                password: 'password123',
            },
        };
    
        res = {
            status: sandbox.stub().returnsThis(),
            json: sandbox.stub().returnsThis(),
            cookie: sandbox.stub(),
        };
    
        next = sandbox.stub();
    });

    afterEach(() => {
        createUserStub.restore();
        signTokenStub.restore();
        sendTokenCookieStub.restore();
    });

    it(`should create a new user`, async () => {
        const hashedPassword = await argon2.hash(req.body.password);
        const newUser = {
            username: 'user',
            email: 'user@user',
            password: 'password123',
            role: 'user',
        };

        const token = `fake-jwt-token`;

        createUserStub.resolves({newUser});
        signTokenStub.returns(token);
        sendTokenCookieStub.callsFake((token, res) => {
            res.cookie('jwt', token {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            });
        });

        await signup(req, res, next);

        console.log(res.json.args);
        console.log(res.cookie.args);
    });
});