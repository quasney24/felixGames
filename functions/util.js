export function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function getTimeAgo(timestring) {
  const date = new Date(timestring);
  const nowInSeconds = Math.floor(new Date().getTime() / 1000);
  const ago = nowInSeconds - date.getTime() / 1000;

  if (ago < 60) {
    let when = Math.round(ago);
    if (when < 1) {
      when = 1;
    }
    const seconds = when === 1 ? 'second' : 'seconds';
    return `${when} ${seconds} ago`;
  }
  if (ago < 3600) {
    let when = Math.round(ago / 60);
    const minutes = when === 1 ? 'minute' : 'minutes';
    return `${when} ${minutes} ago`;
  }
  if (ago >= 3600 && ago < 86400) {
    let when = Math.round(ago / 60 / 60);
    const hours = when === 1 ? 'hour' : 'hours';
    return `${when} ${hours} ago`;
  }
  if (ago >= 86400 && ago < 2629743.83) {
    let when = Math.round(ago / 60 / 60 / 24);
    const days = when === 1 ? 'day' : 'days';
    return `${when} ${days} ago`;
  }
  if (ago >= 2629743.83 && ago < 31556926) {
    let when = Math.round(ago / 60 / 60 / 24 / 30.4375);
    const months = when === 1 ? 'month' : 'months';
    return `${when} ${months} ago`;
  }

  const when = Math.round(ago / 60 / 60 / 24 / 365);
  const years = when === 1 ? 'year' : 'years';
  return `${when} ${years} ago`;
}
