const eventNames = [
    "Rock the Night",
    "Comedy Fiesta",
    "Broadway Musical",
    "Sports Mania",
    "Jazz Nights",
    "Theater Under Stars",
    "Live Music Festival",
    "Stand-Up Comedy Show",
    "Dance Extravaganza",
    "Art Exhibition",
    "Tech Conference",
    "Food Carnival",
    "Cultural Fest",
    "Classic Movie Night",
    "Outdoor Adventure",
    "Charity Gala",
    "Music Jam Session",
    "Magic Show",
    "Book Fair",
    "Science Fair",
  ];
// Mock data
const mockEvents = Array.from({ length: 20 }, (v, i) => ({
    id: i + 1,
    name: eventNames[Math.floor(Math.random() * eventNames.length)],
    type: ["Concert", "Comedy", "Theater", "Sports"][i % 4],
    date: `2024-11-${(i % 30) + 1}`,
    location: `Location ${i + 1}`,
  }));
  
  // Mock fetch function
  export const fetchEvents = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEvents);
      }, 500); 
    });
  };


//if backend server is available I'll follow below approach 
// export const fetchEvents = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/events');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       return [];
//     }
//   };
  