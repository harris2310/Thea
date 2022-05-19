const assert = require('assert');
const Message = require('../models/message'); //imports the Pokemon model.
describe('Creating documents', () => {
    it('creates a message', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const message = new Message({ latlng: [232,32], message: "adfjo" });
        message.save() //takes some time and returns a promise
            .then(() => {
                assert(!message.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});