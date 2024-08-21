function timeAgo(dateString) {
  const now = Date.now();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  const interval = Math.floor(seconds / 31536000); // years

  if (interval > 1) return `${interval} years ago`;

  const monthInterval = Math.floor(seconds / 2592000); 
  if (monthInterval > 1) return `${monthInterval} months ago`;

  const weekInterval = Math.floor(seconds / 604800);
  if (weekInterval > 1) return `${weekInterval} weeks ago`;

  const dayInterval = Math.floor(seconds / 86400); 
  if (dayInterval > 1) return `${dayInterval} days ago`;

  const hourInterval = Math.floor(seconds / 3600); 
  if (hourInterval > 1) return `${hourInterval} hours ago`;

  const minuteInterval = Math.floor(seconds / 60); 
  if (minuteInterval > 1) return `${minuteInterval} minutes ago`;

  return `${Math.floor(seconds)} seconds ago`;
}

function isISODate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date.toISOString().startsWith(dateString);
}


// Function to format the date string based on its type
function formatDate(dateString) {
    const date = new Date(dateString);
    if (isISODate(dateString) && !isNaN(date.getTime())) {
        // Parse the ISO date and format it as 'time ago'
        return timeAgo(date);
    } else {
        // Return createAt if it's not an ISO date
        return dateString;
    }
}

export {formatDate}