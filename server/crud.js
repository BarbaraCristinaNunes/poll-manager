const {Polls, Options} = require("./models");

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
    deletePoll: async function (id){
        return await Polls.destroy(
            {
                where: {id: id},
                force: true,
            },
        )
    },
    updatePoll: async function (id, poll){
        await Polls.update(
            {
                title: poll.title,
                start: poll.start,
                end: poll.end,
            },
            {
                where: {id: id},
            }
        )
    },
    getOptionById: async function (id){

        const response = await Options.findAll({
            where: {
                id: id,
            }
        });
        const data = JSON.parse(JSON.stringify(response));        
        return data[0];    
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
    updateOptionScore: async function (id, poll){
        
        if(poll[0].status.disabled){
            return false;
        }else{
            await Options.increment("score", {by: 1, where: {id: id}});
            return true;
        }
    },
    deleteOption: async function (id){
        return await Options.destroy(
            {
                where: {pollid: id},
                force: true,
            },
        )
    },
}