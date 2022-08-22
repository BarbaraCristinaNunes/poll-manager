const {Polls, Options} = require("./models");
// const {getPollStatus} = require("./models/polls");
module.exports = {
    createPoll: async function (object){
        const newPoll = await Polls.create(object);
        return newPoll.id;
    },
    getPolls: async function (page) {
        const limit = 9;
        const offset = (page - 1) * limit;
        const response = await Polls.findAndCountAll(
            {
                limit: limit,
                offset: offset,
            }
        );
        const data = JSON.parse(JSON.stringify(response));
        data.limit = limit;
        return data;
    },
    getPollById: async function (id){

        const response = await Polls.findAll({
            where: {
                id: id,
            }
        });
        const data = JSON.parse(JSON.stringify(response));        
        return data;    
    },
    getOptionsByPollId: async function (id){
        const data = await Options.findAll({
            where: {
                pollid: id,
            }
        });
        return JSON.parse(JSON.stringify(data));
    },
    createOption: async function (object){
        return await Options.create(object);
    },
    updateOptionScore: async function (id, socre){
        return await Options.update(
            {
                score: socre,
            },
            {
                where: {id: id}
            }
        )
    }
}
