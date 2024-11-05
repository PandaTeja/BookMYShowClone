import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../api';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setFilteredEvents(data);
    };
    loadEvents();
  }, []);

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    if (type) {
      setFilteredEvents(events.filter((event) => event.type === type));
    } else {
      setFilteredEvents(events);
    }
  };

  const handleCategoryClick = (type) => {
    if (filterType === type) {
      setFilterType('');
      setFilteredEvents(events);
    } else {
      setFilterType(type);
      setFilteredEvents(events.filter((event) => event.type === type));
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setFilteredEvents(events.filter((event) => event.date === date));
  };

  const handleClearType = () => {
    setFilterType('');
    setFilteredEvents(events);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setFilteredEvents(events);
  };

  const handleClearDate = () => {
    setSelectedDate('');
    setFilteredEvents(events);
  };


  const categories = [...new Set(events.map((event) => event.type))];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Events</h1>
      <div style={styles.categoryContainer}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{
              ...styles.categoryButton,
              ...(filterType === category && styles.activeCategoryButton),
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          <h2 style={styles.filterHeading}>Filters</h2>

          <div style={styles.filter}>
            <div style={styles.filterRow}>
              <span onClick={() => setShowTypeDropdown(!showTypeDropdown)} style={styles.filterLabel}>
                Category
              </span>
              <span onClick={handleClearType} style={styles.clearText}>
                Clear
              </span>
            </div>
            {showTypeDropdown && (
              <select
                value={filterType}
                onChange={(e) => handleFilterTypeChange(e.target.value)}
                style={styles.dropdown}
              >
                <option value="">All Types</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div style={styles.filter}>
            <div style={styles.filterRow}>
              <span onClick={() => setShowSearchDropdown(!showSearchDropdown)} style={styles.filterLabel}>
                Search by Name
              </span>
              <span onClick={handleClearSearch} style={styles.clearText}>
                Clear
              </span>
            </div>
            {showSearchDropdown && (
              <input
                type="text"
                placeholder="Search events..."
                value={searchText}
                onChange={handleSearchChange}
                style={styles.dropdown}
              />
            )}
          </div>

          <div style={styles.filter}>
            <div style={styles.filterRow}>
              <span onClick={() => setShowDateDropdown(!showDateDropdown)} style={styles.filterLabel}>
                Date
              </span>
              <span onClick={handleClearDate} style={styles.clearText}>
                Clear
              </span>
            </div>
            {showDateDropdown && (
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                style={styles.dropdown}
              />
            )}
          </div>
        </div>

        <div style={styles.eventsGrid}>
          {filteredEvents.map((event) => (
            <div key={event.id} style={styles.eventCard}>
              <div style={styles.eventImage}>
                {event.name.charAt(0)}
              </div>
              <h3 style={styles.eventName}>{event.name}</h3>
              <p style={styles.eventType}>{event.type}</p>
              <p style={styles.eventDate}>{event.date}</p>
              <p style={styles.eventLocation}>{event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#F0F0F0',
    minHeight: '100vh',
    padding: '20px',
    color: '#000',
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  categoryContainer: {
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    marginBottom: '20px', 
  },
  categoryButton: {
    padding: '8px 16px',
    fontSize: '0.9rem',
    color: '#E50914',
    backgroundColor: '#FFF',
    border: '1px solid #D0D0D0',
    borderRadius: '20px',
    cursor: 'pointer',
    margin: '5px', 
  },
  activeCategoryButton: {
    backgroundColor: '#E50914',
    color: '#FFF',
    border: '1px solid #E50914',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sidebar: {
    width: '300px',
    padding: '15px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginRight: '20px',
  },
  filterHeading: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#E50914',
  },
  filter: {
    marginBottom: '20px',
  },
  filterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  filterLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#000',
  },
  clearText: {
    fontSize: '0.8rem',
    color: '#888',
    cursor: 'pointer',
  },
  dropdown: {
    padding: '6px',
    fontSize: '0.9rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '90%',
    maxWidth: '100%',
    backgroundColor: '#FFF',
    color: '#000',
    outline: 'none',
    marginTop: '5px',
    boxSizing: 'border-box',
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    flexGrow: 1,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '16px',
    color: '#000',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  },
  eventImage: {
    width: '100%',
    height: '150px',
    backgroundColor: '#D0D0D0',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: '10px',
  },
  eventName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  eventType: {
    fontSize: '0.9rem',
    color: '#888',
    margin: '5px 0',
  },
  eventDate: {
    fontSize: '0.9rem',
    margin: '5px 0',
  },
  eventLocation: {
    fontSize: '0.9rem',
    color: '#E50914',
  },
};

export default EventsList;
