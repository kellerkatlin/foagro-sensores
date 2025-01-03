"use client";
import Humedad from "../components/Humedad";
import Temperatura from "../components/Temperatura";
import TemperaturaAmbiente from "../components/TemperaturaAmbiente";
import Ph from "../components/Ph";
import Co2 from "../components/Co2";
import Tds from "../components/Tds";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SensorData {
  id: number;
  temperatura_ambiente: number;
  humedad_relativa: number;
  tempSensor1: number;
  tempSensor2: number;
  co2: number;
  tds1: number;
  tds2: number;
  ph1: number;
  ph2: number;
  dispositivo: string;
  mq2_estado: string;
  timestamp: string;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/sensor/find/all");
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);
  const handleLogout = () => {
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };
  const temperaturaData = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.tempSensor1,
  }));

  const temperaturaData2 = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.tempSensor2,
  }));

  const humedadData =
    sensorData.length > 0
      ? sensorData[sensorData.length - 1].humedad_relativa
      : 0;

  const co2Data =
    sensorData.length > 0 ? sensorData[sensorData.length - 1].co2 : 0;

  const tdsData = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.tds1,
  }));

  const tdsData2 = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.tds2,
  }));

  const phData =
    sensorData.length > 0 ? sensorData[sensorData.length - 1].ph1 : 7;

  const ph2Data =
    sensorData.length > 0 ? sensorData[sensorData.length - 1].ph2 : 7;

  const temperaturaAmbienteData =
    sensorData.length > 0
      ? sensorData[sensorData.length - 1].temperatura_ambiente
      : 0;

  return (
    <div className="relative bg-gray-50 min-h-screen flex flex-col items-center">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg"
      >
        Cerrar Sesión
      </button>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full max-w-screen-xl mb-8">
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Temperatura data={temperaturaData} title={"Temperatura 1"} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Temperatura data={temperaturaData2} title={"Temperatura 2"} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Ph value={phData} title={"Ph1"} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Ph value={ph2Data} title={"Ph2"} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Co2 value={co2Data} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Humedad value={humedadData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <TemperaturaAmbiente temperature={temperaturaAmbienteData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Tds data={tdsData} title={"TDS 1"} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Tds data={tdsData2} title={"TDS 2"} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
