// check if user voted in a specific poll
export function checkVote(id, string){
    const voted = JSON.parse(localStorage.getItem("votes").slice(",")).find((vote) => id === vote[string]);
    
    if(voted) {
        return true;
    }
    
    return false;
}

export function convertDateFormat(string){
    const date = string.slice(0, 10).split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
}

// check if there are empty inputs in the form 
export function checkNewPollData(title, start, end, options){
    const data = [title, start, end];

    options.forEach((option) => data.push(option));

    const result = data.includes("");
    return result;
}

export function maxPaginationPage(rows, limit){
    return Math.ceil(rows/limit);
}

export function getTotalVotes(options){
    let result = 0;
    options.forEach((option) => {
        result += option.score;                
    })
    return result;
}