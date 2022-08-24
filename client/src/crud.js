import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export async function getPolls(offset) {
    const url = `${BASE_URL}/polls`;
    const res = await axios.get(url, {params: {page: offset}});
    return res.data;

}

export async function getPollById(id) {
    const url = `${BASE_URL}/polls/${id}`;
    const res = await axios.get(url);
    return res.data;

}

export async function getPollStatus(id) {
    const url = `${BASE_URL}/polls/${id}`;
    const res = await axios.get(url);
    return res.data[0].status;

}

export async function createPoll(poll){
    const url = `${BASE_URL}/polls`;
    const response = await axios.post(url, {
        title: poll.title, 
        start: poll.start, 
        end: poll.end, 
    });
    
    return response.data.id;
}

export async function getOptionById(id) {
    const url = `${BASE_URL}/option/${id}`;
    const res = await axios.get(url);
    return res.data;

}

export async function getOptionsByPollId(id) {
    const url = `${BASE_URL}/options/${id}`;
    const res = await axios.get(url);
    return res.data;
  
}

export async function updateOptionScore(id, pollId){
    const url = `${BASE_URL}/options/${id}`;
    const res = await axios.put(url, {
        pollId: pollId,
    }); 
    return res.data;
}

export async function createOption(option, id){
    const url = `${BASE_URL}/options`;
    await axios.post(url, {
        label: option, 
        score: 0, 
        pollId: id,
    })
}