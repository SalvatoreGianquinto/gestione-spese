import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const ChartEntrateUscite = ({ entrate, uscite }) => {
  const data = [
    {
      name: "Entrate",
      valore: entrate,
    },
    {
      name: "Uscite",
      valore: uscite,
    },
  ]

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Entrate vs Uscite</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valore" fill="#8884d8" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default ChartEntrateUscite
