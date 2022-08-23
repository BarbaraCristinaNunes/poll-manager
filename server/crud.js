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
    getPollStatus: async function (id){

        const response = await Polls.findAll({
            where: {
                id: id,
            }
        });
        const data = JSON.parse(JSON.stringify(response));  
        console.log(data);      
        return data[0].status;    
    },
    deletePoll: async function (id){
        return await Polls.destroy(
            {
                where: {id: id},
                force: true,
            },
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
    updateOptionScore: async function (id){
        await Options.increment("score", {by: 1, where: {id: id}});
    },
    deleteOption: async function (id){
        return await Options.destroy(
            {
                where: {pollid: id},
                force: true,
            },
        )
    },
    getTotalVotes: async function (id){
        console.log("CRUD: ", id)
        let total = 0;
        const response = await Options.findAll({
            where: {
                pollid: id,
            }
        });
        const data = JSON.parse(JSON.stringify(response));
        data.forEach((option) => {
            total += option.score;
        })
        return total;
    },

}
