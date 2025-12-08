import React from "react";
import "./Calendar.css";

export default function Calendar() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("pt-BR", { month: "short" }).toUpperCase();
  const year = today.getFullYear();

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  // Gerar calendário do mês
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const weeks = [];
  let current = 1 - firstDay;

  while (current <= totalDays) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(current > 0 && current <= totalDays ? current : "");
      current++;
    }
    weeks.push(week);
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header-box">
        <span className="calendar-day">{day}</span>
        <span className="calendar-month">{month}</span>
        <span className="calendar-year">{year}</span>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            {weekDays.map((wd) => (
              <th key={wd}>{wd}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((d, di) => (
                <td
                  key={di}
                  className={d === day ? "today" : d ? "filled" : "empty"}
                >
                  {d}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
