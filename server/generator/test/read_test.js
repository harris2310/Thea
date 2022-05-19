const assert = require('assert');
const Message = require('../models/message');
let message;
beforeEach(() => {
    message = new Message({ latlng: [232,32], message: "adfjo" });
    message.save()
        .then(() => done());
});
describe('Reading pokemon details', () => {
    it('finds pokemon with the name of poke', (done) => {
        Message.findOne({ name: 'message' })
            .then((message) => {
                assert(message.name === 'message'); 
                done();
            });
    })
})