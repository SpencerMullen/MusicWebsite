const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

const formatType = (type) => {
  if(type.toLowerCase() === 'album') {
    return 'Album';
  } else if(type.toLowerCase() === 'livealbum') {
    return 'Live Album';
  } else if(type.toLowerCase() === 'ep') {
    return 'EP';
  }
};
  
export { formatDate, formatType };