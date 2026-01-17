import React, { useEffect, useState } from 'react';
import client from '../api/client';

export default function DashboardPage() {
  const [takt, setTakt] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await client.get('/takt/config');
      setTakt(data);
    };
    load().catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Dashboard</h2>
      {takt && (
        <div className="bg-white shadow p-4">
          <h3 className="font-semibold mb-2">Current Takt Configuration</h3>
          <p>Takt time: {takt.taktTimeMinutes} minutes</p>
          <p>
            Working day: {takt.workingDayStart} – {takt.workingDayEnd}
          </p>
          <p>Time zone: {takt.timeZone}</p>
        </div>
      )}
    </div>
  );
}



