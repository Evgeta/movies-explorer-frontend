export function formatDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if(hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }