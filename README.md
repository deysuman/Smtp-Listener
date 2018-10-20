# smtp-listener

A NodeJS script that acts as a SMTP listen server. Accepts all emails, and emits them both as an EventEmitter and through a socket.


[![suman made-with-nodejs](https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png)](https://nodejs.org)

## Usage (single access)

If only 1 script needs to receive mails:

```javascript
const SMTPServer = require("smtp-listener").Server;
const server = new SMTPServer(25 /* port */);
server.on("test@example.com", (mail)=>{
    ...
});
```

## Usage (multi access)

If multiple scripts need to receive mails, create a symlink at `/var/dev/smtp-listener/` pointing to the working directory, then create a symlink at `/etc/systemd/system/smtp-listener.service` pointing to `./service/smtp-listener.service`. Finally run `sudo systemctl start smtp-listener`. This starts the server and keeps it running should it crash.

If you aren't running systemd, do the equivalent on your system.

Then in your scripts do

```javascript
const SMTPClient = require("smtp-listener");
const client = new SMTPClient();
client.on("test@example.com", ()=>{
    ...
});
```

## Mail object

All listeners receive a single response, a `Mail` object. This is simply the email parsed by [Nodemailer's Mailparser](https://nodemailer.com/extras/mailparser/). See their documentation for details.

## Socket

If you need access to mails from non-JS code (or you don't want to use `SMTPClient`), you can instead listen to the UNIX/Windows socket (default UNIX location: `/tmp/app.smtp-listener`).

The server emits emails as UTF8-encoded JSON to all clients, using [`node-ipc`](https://github.com/RIAEvangelist/node-ipc).
