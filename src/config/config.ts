import dotenv from 'dotenv';

dotenv.config();

export const config = {
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
    PORT: process.env.PORT,
};
