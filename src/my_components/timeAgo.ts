function timeAgo(previousDate : Date) {
    const currentDate = new Date();
    const difference = currentDate.getTime() - previousDate.getTime();
    const minutesDifference = Math.floor(difference / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference >= 24) {
      const daysDifference = Math.floor(hoursDifference / 24);
      return `${daysDifference} day(s) ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour(s) ago`;
    } else {
      return `${minutesDifference} minute(s) ago`;
    }
}

export { timeAgo }