
interface TablaProcesosProps {
    titulos: string[]
    procesos: Proceso[]
    eliminarProceso: (nombreProceso: string, procesoSize: number) => void
}

const TablaProcesos = ({titulos, procesos, eliminarProceso} : TablaProcesosProps) => {


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
        {procesos.map((proceso, index) => (
            <tr className="border-gray-200 border" key={index}>
            <td className="border-gray-200 border text-center my-2">{proceso.nombre}</td>
            <td className="border-gray-200 border text-center my-2">{proceso.size} bytes</td>
            <td className="border-gray-200 border text-center my-2">{proceso.estado}</td>
            <td>
                <button
                onClick={() => eliminarProceso(proceso.nombre, proceso.size)}
                className="bg-red-500 p-2 rounded-sm text-white flex mx-auto my-2 font-bold"
                >Eliminar proceso</button>
            </td>
            </tr>
        ))}
        </tbody>
  </table>
  )
}

export default TablaProcesos