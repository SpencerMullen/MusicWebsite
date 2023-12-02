const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getFormatDateYear = (dateString) => {
  const options = { year: 'numeric', timeZone: 'UTC' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const formatType = (type) => {
  if (type.toLowerCase() === 'album') {
    return 'Album';
  } else if (type.toLowerCase() === 'livealbum') {
    return 'Live Album';
  } else if (type.toLowerCase() === 'ep') {
    return 'EP';
  }
};

export { formatDate, getFormatDateYear, formatType };