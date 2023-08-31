// Import required modules
const express = require('express');
const cors = require('cors')
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-token')

// Set up Express app
const app = express();
const port = process.env.PORT || 8080;

// Define your Agora credentials here
const appId = 'e9b38caaab77438fa64316dad3bbda81';
const appCertificate = 'b21012941b474acc94ad2d0ee1cbaf2f';

app.use(cors());

// Define a route to generate RTC tokens
app.get('/generateToken', (req, res) => {
    const { channelName, uid, userAccount } = req.query;

    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
    console.log("Token With Integer Number Uid: " + tokenA);

    // Build token with user account
    //const tokenB = RtcTokenBuilder.buildTokenWithAccount(appId, appCertificate, channelName, userAccount, role, privilegeExpiredTs);
    res.json({ tokenA });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
