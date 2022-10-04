const API_KEY = '359f79e6f33f1987a8c20e196d2eef90-381f2624-f55fb921';
const DOMAIN = 'sandboxfcc7935f721345b380b4e0e998d020c1.mailgun.org';

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });

module.exports = {
    sendMail: function () {
        (async () => {
            try {
                const data = {
                    from: 'jnarihira@gmail.com',
                    to: 'yeshealer@gmail.com',
                    subject: 'Complex',
                    text: 'Testing some Mailgun awesomness!',
                    html: '<html>HTML version of the body</html>'
                };

                const result = await client.messages.create(DOMAIN, data);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        })();
    }
}