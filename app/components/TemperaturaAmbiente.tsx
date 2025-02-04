"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TemperaturaAmbienteProps {
  temperature: number; // Último valor de temperatura
}

const TemperaturaAmbiente: React.FC<TemperaturaAmbienteProps> = ({
  temperature,
}) => {
  const data = [{ name: "Temperatura", value: temperature }];

  const getColor = (temp: number): string => {
    if (temp < 0) return "#00008B"; // Azul oscuro para muy frío
    if (temp < 10) return "#0000FF"; // Azul para frío
    if (temp < 18) return "#00c6ff"; // Azul claro para fresco
    if (temp < 25) return "#82ca9d"; // Verde para templado
    if (temp < 30) return "#FFFF00"; // Amarillo para cálido
    if (temp < 37) return "#FFA500"; // Naranja para caliente
    return "#ff4d4f"; // Rojo para muy caliente
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Temperatura Ambiente
      </h2>
      <ResponsiveContainer width={120} height={200}>
        <BarChart data={data}>
          <YAxis
            type="number"
            domain={[0, 50]}
            ticks={[0, 20, 30, 40, 50]}
            width={40}
            label={{
              value: "°C",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <XAxis type="category" dataKey="name" hide />
          <Bar dataKey="value" fill={getColor(temperature)} barSize={30}>
            <Cell key="bar" fill={getColor(temperature)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-lg font-semibold text-gray-700 mt-4">
        {temperature?.toFixed(1)}°C
      </p>
    </>
  );
};

export default TemperaturaAmbiente;
