
export function DateDefaultValue(dateString: Date) {
  // Parse the date string into a JavaScript Date object
  const date = new Date(dateString);
  // Create a new Date object from the dateString

  // Format the date components, adjusting for timezone offset
  const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
  const adjustedDate = new Date(date.getTime() - offset);

  // Extract and format individual date components
  const year = adjustedDate.getFullYear();
  const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = adjustedDate.getDate().toString().padStart(2, '0');
  const hours = adjustedDate.getHours().toString().padStart(2, '0');
  const minutes = adjustedDate.getMinutes().toString().padStart(2, '0');

  // Construct the final formatted date string
  const dateShow = `${year}-${month}-${day}T${hours}:${minutes}`;

  return dateShow;
}

 