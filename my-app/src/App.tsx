import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [students, setStudents] = useState([]);
  const [seats, setSeats] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/students").then((res: { data: any }) => setStudents(res.data));
    axios.get("http://localhost:3000/api/seats").then((res: { data: any }) => setSeats(res.data));
    axios.get("http://localhost:3000/api/timeslots").then((res: { data: any }) => setTimeslots(res.data));
    axios.get("http://localhost:3000/api/reservations").then((res: { data: any }) => setReservations(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">預約系統</h1>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">學生列表</h2>
        <ul>{students.map(s => (<li key={s.student_id}>{s.student_name}</li>))}</ul>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">座位列表</h2>
        <ul>{seats.map(s => (<li key={s.seat_id}>{s.row_label}{s.seat_number}</li>))}</ul>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">時間段</h2>
        <ul>{timeslots.map(t => (<li key={t.timeslot_id}>{t.start_time} - {t.end_time}</li>))}</ul>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">預約紀錄</h2>
        <ul>
          {reservations.map(r => (
            <li key={r.reservation_id}>
              {r.student_name} 預約 {r.row_label}{r.seat_number} 時段 {r.start_time} - {r.end_time}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
