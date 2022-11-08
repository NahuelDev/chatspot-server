import { Router } from "express";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const clientID = process.env.CLIENT_ID;
const secretID = process.env.SECRET_ID;
const redirectURI = process.env.REDIRECT_URI;
const tokenEndpoint = process.env.TOKEN_ENDPOINT;

const tokenRouter = Router();

tokenRouter.post("/", (req, res) => {
    const code = req.body.code;

    const data = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectURI
    }).toString();
    console.log('New request! AUTHORIZATION_CODE');

    axios({
        method: 'POST',
        url: tokenEndpoint,
        data: data,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${clientID}:${secretID}`).toString('base64')}`
        }
    })
        .then(data => {
            if (data.status === 200) {
                res.json({
                    accessToken: data.data.access_token,
                    refreshToken: data.data.refresh_token
                }).end();
                return;
            } else {
                res.send(data)
            }
        },
            err => {
                res.send(err);
            }
        );

});

tokenRouter.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;

    const data = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        redirect_uri: redirectURI
    }).toString();

    console.log('New request! REFRESH_TOKEN');


    axios({
        method: 'POST',
        url: tokenEndpoint,
        data: data,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${clientID}:${secretID}`).toString('base64')}`
        }
    })
        .then(data => {

            if (data.status === 200) {
                res.json({
                    accessToken: data.data.access_token
                }).end();
                return;
            } else {
                res.send(data)
            }
        },
            err => {
                res.send(err);
            }
        );

});

export default tokenRouter;