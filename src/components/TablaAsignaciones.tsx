interface TablaProcesosProps {
    titulos: string[]
    asignaciones: Asignacion[]
}

const TablaAsignaciones = ({titulos, asignaciones} : TablaProcesosProps) => {
  return (
    <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            {titulos.map((titulo, index) => (
                <th
                    key={index}
                    className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell"
                >{titulo}</th>
            ))}
        </tr>
        </thead>

        <tbody className="block md:table-row-group">
        {asignaciones.map((asignacion, index) => (
            <tr className="border-gray-200 border" key={index}>
                <td className="border-gray-200 border text-center my-2">{asignacion.proceso}</td>
                <td className="border-gray-200 border text-center my-2">{asignacion.inicio} - {asignacion.fin}</td>
            </tr>
        ))}
        </tbody>
  </table>
  )
}

export default TablaAsignaciones