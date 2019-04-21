/* translates dates into a more human friendly format
returns input for passed invalid dated objects */
function renderDate(dateTime) {
  if (!dateTime) return dateTime; // empty
  let formattedDate = new Date(dateTime);
  if (formattedDate instanceof Date && !isNaN(formattedDate.valueOf())) {
    var locales = null;
    if (navigator.languages != undefined) {
      locales = navigator.languages[0];
    } else {
      locales = navigator.language;
    }
    var options = {
      hourCycle: 'h24',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return formattedDate.toLocaleString(locales, options);
  } else {
    return dateTime;
  }
}

export { renderDate };
