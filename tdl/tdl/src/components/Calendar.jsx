import React from "react";
import "./Calendar.css";

const Calendar = () => {
  return (
    <section className="calendar">
      <header>
        <span>11</span>
        <span>NOV</span>
        <span>2025</span>
      </header>
      <table>
        <thead>
          <tr>
            <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
          <tr><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
        </tbody>
      </table>
    </section>
  );
};

export default Calendar;
