const express = require(`express`);
const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);
const helmet = require(`helmet`);

const path = require(`path`);

// endpoints
const userRouter = require(`./routers/user.Router`);

// import middlewares
const errorsMiddleware = require(`./middlewares/error.middleware`);

const app = express();

app.use(express.json());

app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })
  );

  app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use('/api/v1/users', userRouter);

app.use(errorsMiddleware);

module.exports = app;