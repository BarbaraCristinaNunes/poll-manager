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


export async function createPoll(poll){
    const url = `http://localhost:3001/polls`;
    const response = await axios.post(url, {
        title: poll.title, 
        start: poll.start, 
        end: poll.end, 
    });
    
    return response.data.id;
}

export async function getOptionsByPollId(id) {
    const url = `http://localhost:3001/options/${id}`;
    const res = await axios.get(url);
    return res.data;
  
}

export async function updateOptionScore(id, score){
    const url = `http://localhost:3001/options/${id}`;
    await axios.put(url, {score: score}); 
}

export async function createOption(option, id){
    const url = `http://localhost:3001/options`;
    await axios.post(url, {
        label: option, 
        score: 0, 
        pollId: id,
    })
}
