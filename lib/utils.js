/* translates dates into a more human friendly format
returns input for passed invalid dated objects */
function renderDate(dateTime) {
  let formattedDate = new Date(dateTime);
  if (formattedDate instanceof Date && !isNaN(formattedDate.valueOf())) {
    return formattedDate.toLocaleString();
  } else {
    return dateTime;
  }
}

export { renderDate };
