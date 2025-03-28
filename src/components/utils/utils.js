export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Format date as "28 Mar 2025"
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Format time as "03:16 PM"
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });

  return `${formattedDate} ${formattedTime}`;
};
