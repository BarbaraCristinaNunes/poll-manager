import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export async function getPolls(offset) {
    const url = `http://localhost:3001/polls`;
    const res = await axios.get(url, {params: {page: offset}});
    return res.data;

}

export async function getPollById(id) {
    const url = `http://localhost:3001/polls/${id}`;
    const res = await axios.get(url);
    return res.data;

}

export async function getPollStatus(id) {
    const url = `http://localhost:3001/polls/${id}`;
    const res = await axios.get(url);
    return res.data[0].status;

}

export async function createPoll(poll){
    const url = `http://localhost:3001/polls`;
    const response = await axios.post(url, {
        title: poll.title, 
        start: poll.start, 
        end: poll.end, 
    });
    
    return response.data.id;
}

export async function getOptionById(id) {
    const url = `http://localhost:3001/option/${id}`;
    const res = await axios.get(url);
    return res.data;

}

export async function getOptionsByPollId(id) {
    const url = `http://localhost:3001/options/${id}`;
    const res = await axios.get(url);
    return res.data;
  
}

export async function updateOptionScore(id){
    const url = `http://localhost:3001/options/${id}`;
    await axios.put(url); 
}

export async function createOption(option, id){
    const url = `http://localhost:3001/options`;
    await axios.post(url, {
        label: option, 
        score: 0, 
        pollId: id,
    })
}

export async function getTotalVotes(id) {
    console.log("CRUD.js getTotalVotes: ", id)
    const url = `http://localhost:3001/votes/${id}`;
    const res = await axios.get(url);
    return res.data;

}