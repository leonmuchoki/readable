export const  getDateFromTimeStamp = (unix_timestamp) => {
  const date = Date.now(unix_timestamp)
  return date
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// function to sort posts by score
export const compareByScore = (a, b) => {
  if (a.voteScore < b.voteScore)
    return -1;
  if (a.voteScore > b.voteScore)
    return 1;
  return 0;
}

// function to sort posts by date
export const compareByDate = (a, b) => {
  if (a.timestamp < b.timestamp)
    return -1;
  if (a.timestamp > b.timestamp)
    return 1;
  return 0;
}