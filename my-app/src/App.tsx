import React, { useEffect, useState } from "react";
import axios from "axios";
import { Student } from "./interface/Student";
import { Seat } from "./interface/Seat";
import { Timeslot } from "./interface/Timeslot";
import { Reservation } from "./interface/Reservation";

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/students").then((res: { data: Student[] }) => setStudents(res.data));
    axios.get("http://localhost:3000/api/seats").then((res: { data: Seat[] }) => setSeats(res.data));
    axios.get("http://localhost:3000/api/timeslots").then((res: { data: Timeslot[] }) => setTimeslots(res.data));
    axios.get("http://localhost:3000/api/reservations").then((res: { data: Reservation[] }) => setReservations(res.data));
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
              {r.student_id} 預約 {r.seat_id} 時段 {r.timeslot_id}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}