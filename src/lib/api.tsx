const API_DOMAIN = "http://localhost:3009";

export async function getAllSensors() {
  const response = await fetch(`${API_DOMAIN}/sensor`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch sensors.");
  }

  const loadedSensors = [];
  for (const key in data.results) {
    loadedSensors.push({
      device_id: data.results[key].device_id,
      last_online: data.results[key].last_online,
      last_temp: data.results[key].last_temp,
      location: data.results[key].location,
    });
  }

  return { loadedSensors, count: data.paging.count };
}

export async function getSingleSensor(sensorId: any) {
  const response = await fetch(`${API_DOMAIN}/sensor/${sensorId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch sensor.");
  }

  return data;
}

export async function addSensor(sensorData: any) {
  const response = await fetch(`${API_DOMAIN}/sensor`, {
    method: "POST",
    body: JSON.stringify(sensorData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create sensor.");
  }

  return null;
}

export async function updateSensor(sensorData: any) {
  const response = await fetch(`${API_DOMAIN}/sensor/${sensorData.device_id}`, {
    method: "PUT",
    body: JSON.stringify(sensorData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not update sensor.");
  }

  return null;
}

export async function getSensorEvents(sensorId: any) {
  const response = await fetch(`${API_DOMAIN}/sensor/${sensorId}/events`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch sensor events.");
  }

  return data.results;
}

export async function getSensorStats() {
  const response = await fetch(`${API_DOMAIN}/sensor/stats`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch sensors.");
  }

  const transformedSensorStats = [];

  for (const key in data) {
    const sensorObj = {
      id: key,
      ...data[key],
    };

    transformedSensorStats.push(sensorObj);
  }

  return transformedSensorStats;
}

export async function getSensorStatsWeekly(sensorId: any) {
  const response = await fetch(`${API_DOMAIN}/sensor/${sensorId}/stats/weekly`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch sensor stats weekly.");
  }

  const loadedStats = {
    id: sensorId,
    ...data,
  };

  return loadedStats;
}

export async function getSensorStatsWeeklyAvg(sensorId: any) {
  const response = await fetch(
    `${API_DOMAIN}/sensor/${sensorId}/stats/weekly_avg`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not fetch sensor stats weekly average."
    );
  }

  const loadedStats = {
    id: sensorId,
    ...data,
  };

  return loadedStats;
}

export async function getSensorLogs(sensorId: any) {
  const response = await fetch(`${API_DOMAIN}/sensor/${sensorId}/logs`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch sensor logs.");
  }

  const loadedLogs = {
    id: sensorId,
    ...data,
  };

  return loadedLogs;
}
