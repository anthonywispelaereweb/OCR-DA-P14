import React, { useState, useRef, useEffect } from 'react';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function pad(n) {
  return n < 10 ? `0${n}` : n;
}

const AppDatePicker = ({ label, name, value, onChange, required, dropdownPosition = 'bottom' }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || '');
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [y, m] = value.split('-');
      return new Date(Number(y), Number(m) - 1);
    }
    return new Date();
  });
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  useEffect(() => {
    setSelectedDate(value || '');
  }, [value]);

  const handleInputClick = () => setShowCalendar(true);

  const handleDayClick = (day) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
    setSelectedDate(dateStr);
    setShowCalendar(false);
    if (onChange) {
      onChange({ target: { name, value: dateStr } });
    }
  };

  const handlePrevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };
  const handleNextMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const weeks = [];
  let days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
    if (days.length === 7) {
      weeks.push(days);
      days = [];
    }
  }
  if (days.length) {
    while (days.length < 7) days.push(null);
    weeks.push(days);
  }

  return (
    <div className="datepicker-wrapper" ref={ref}>
      {label && <label className="form-label" htmlFor={name}>{label}{required && ' *'}</label>}
      <div className="date-input-wrapper">
        <input
          type="text"
          name={name}
          id={name}
          value={selectedDate}
          onClick={handleInputClick}
          onChange={() => {}}
          placeholder="YYYY-MM-DD"
          required={required}
          className={`form-input date-input-with-icon${showCalendar && dropdownPosition === 'left' ? ' has-datepicker-left' : ''}${showCalendar && dropdownPosition === 'right' ? ' has-datepicker-right' : ''}`}
          autoComplete="off"
          readOnly
        />
        <div className="calendar-icon" onClick={handleInputClick}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            className="calendar-svg"
          >
            <path 
              fillRule="evenodd" 
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {showCalendar && (
        <div className={`calendar-popup ${dropdownPosition}`}>
          <div className="calendar-nav">
            <button type="button" className="calendar-nav-btn" onClick={handlePrevMonth}>&lt;</button>
            <span>{viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}</span>
            <button type="button" className="calendar-nav-btn" onClick={handleNextMonth}>&gt;</button>
          </div>
          <table>
            <thead>
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="calendar-table-th">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'][i]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, i) => (
                <tr key={i}>
                  {week.map((day, j) => {
                    const isSelected = day && selectedDate === `${viewDate.getFullYear()}-${pad(viewDate.getMonth() + 1)}-${pad(day)}`;
                    return (
                      <td key={j} style={{ textAlign: 'center', padding: 2 }}>
                        {day ? (
                          <button
                            type="button"
                            className={`calendar-day-btn${isSelected ? ' selected' : ''}`}
                            onClick={() => handleDayClick(day)}
                          >
                            {day}
                          </button>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppDatePicker; 