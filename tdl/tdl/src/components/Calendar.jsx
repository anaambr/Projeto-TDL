import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Atualiza o calendário todo dia à meia-noite automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // a cada 24 horas
    return () => clearInterval(interval);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  // Nome dos meses
  const monthNames = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Descobre o primeiro dia da semana do mês atual
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Gera o calendário dinamicamente
  const weeks = [];
  let currentDay = 1 - firstDay;

  while (currentDay <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (currentDay < 1 || currentDay > daysInMonth) {
        week.push(""); // célula vazia
      } else {
        week.push(currentDay);
      }
      currentDay++;
    }
    weeks.push(week);
  }

  return (
    <section className="calendar-card">
      <header className="calendar-header">
        <span className="cal-day">{day}</span>
        <span className="cal-month">{monthNames[month]}</span>
        <span className="cal-year">{year}</span>
      </header>

      <table className="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map((d, i) => (
              <th key={i}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((d, di) => (
                <td
                  key={di}
                  className={`${
                    d === day ? "today" : d ? "filled" : "empty"
                  }`}
                >
                  {d}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Calendar;
