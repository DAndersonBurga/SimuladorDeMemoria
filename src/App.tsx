import { useEffect, useState } from "react";
import { dividirEnBloques } from "./helpers/dividirEnBloques";
import { ESTADO } from "./constants/estadoProceso";
import TablaProcesos from "./components/TablaProcesos";
import TablaAsignaciones from "./components/TablaAsignaciones";
import { COLORES } from "./constants/colores";

function App() {

  const [memoria, setMemoria] = useState<Memoria[]>(Array(100).fill({nombreProceso: "", color: ""}));
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);

  const [memoriaDisponible, setMemoriaDisponible] = useState(100);

  const [indiceProceso, setIndiceProceso] = useState(1);
  const [peso, setPeso] = useState(1);


  useEffect(() => {
    const cantidad = procesos.reduce((acc, proceso) => proceso.estado === ESTADO.EXE ? acc + proceso.size : acc, 0);

    setMemoriaDisponible(100 - cantidad);
  }, [procesos, asignaciones])

  const agregarProceso = () => {
    if(peso <= 0) return;

    const proceso: Proceso = {
      nombre: `P${indiceProceso}`,
      size: peso,
      estado: ESTADO.WAIT
    }

    setIndiceProceso(indiceProceso + 1);

    if(proceso.size <= memoriaDisponible) {
      asignarMemoria(proceso);
      proceso.estado = ESTADO.EXE;
    }

    setProcesos([...procesos, proceso]);
  }

  const asignarMemoria = (proceso: Proceso, memoriaActual: Memoria[] = memoria) => {
    const nuevaMemoria: Memoria[] = [...memoriaActual];
      
    let contador = 0;
    let inserciones = 0;

    for (let i = 0; i < nuevaMemoria.length; i++) {
      
      if (nuevaMemoria[i].nombreProceso === "") {
        contador++;

        const procesoMemoria: Memoria = {
          nombreProceso: proceso.nombre,
          color: COLORES[indiceProceso]
        }

        nuevaMemoria[i] = procesoMemoria;

        if (nuevaMemoria[i + 1]?.nombreProceso !== "" || (contador === proceso.size)) {
          
          const inicio = i - inserciones;


          setAsignaciones(prevstate => {
            return [...prevstate, {
              inicio,
              fin: i,
              proceso: proceso.nombre
            }]
          });

          inserciones = 0;
          
        }

        inserciones++;
      }

      if (contador === proceso.size) break;
    }

    setMemoria(nuevaMemoria);
  }
  

  const eliminarProceso = (nombreProceso: string, procesoSize: number) => {

    const procesosFiltrados = procesos.filter(proceso => proceso.nombre !== nombreProceso);
    
    const asignacionesFiltradas = asignaciones.filter(asignacion => asignacion.proceso !== nombreProceso);
    const nuevaMemoria = [...memoria]
    const cantidad = procesosFiltrados.reduce((acc, proceso) => proceso.estado === ESTADO.EXE ? acc + proceso.size : acc, 0);
    const nuevaMemoriaDisponible = 100 - cantidad;

    let contador = 0;
    
    for (let i = 0; i < nuevaMemoria.length; i++) {
      if(nuevaMemoria[i].nombreProceso === nombreProceso) {
        nuevaMemoria[i] = {nombreProceso: "", color: ""};
        
        contador++;
        
        if(procesoSize === contador) {
          break;
        }
      }
    }  

    setMemoriaDisponible(nuevaMemoriaDisponible);
    setMemoria(nuevaMemoria);
    setAsignaciones(asignacionesFiltradas);

    
    const procesosEnEspera = procesosFiltrados.filter(proceso => proceso.estado === ESTADO.WAIT);
    

    for (let i = 0; i < procesosEnEspera.length; i++) {

      if(procesosEnEspera[i].size <= nuevaMemoriaDisponible) {
        asignarMemoria(procesosEnEspera[i], nuevaMemoria);
        procesosEnEspera[i].estado = ESTADO.EXE;
      }
    }

    setProcesos(procesosFiltrados);
  }

  return (
    <>
      <header className="bg-red-500 p-6">
        <h2
          className="text-white font-bold text-3xl"
        >SimuladorDe
          <span 
            className="text-yellow-300"
          >Memoria</span>
        </h2>
      </header>

      <main
        className="w-11/12 mx-auto mt-5"
      >

        <div 
          className="flex justify-center mb-5 gap-10"
        >
          <div>
            <div className="flex justify-between mb-2 gap-5">
              <label htmlFor="peso">Peso en bytes: </label>
              <input
                className="border-2 border-gray-600 rounded-sm"
                id="peso" type="number" min={1}
                onChange={(e) => {setPeso(+e.target.value)}}
              />
            </div>

            <button 
              className="bg-blue-500 text-white p-3 rounded-sm flex mx-auto"
              onClick={agregarProceso}
            >Agregar proceso</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10">
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-xl">Procesos: </h2>
            <div
              className="flex flex-col gap-3"
            >
              <TablaProcesos
                titulos={["Nombre", "Tamaño", "Estado", "Acciones"]}
                procesos={procesos}
                eliminarProceso={eliminarProceso}
              />
              
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-xl">Asignaciones: </h2>
              <TablaAsignaciones 
                titulos={["Proceso", "Inicio - Fin"]}
                asignaciones={asignaciones}
              />
          </div>
        </div>

        <div
          className="flex flex-col gap-3 items-center pb-10"
        >
          {dividirEnBloques(memoria).map((bloque, index) => (
            <div
            key={index}
            className="flex flex-col gap-3"
            >
              <div className="flex flex-row gap-2">
                {bloque.map((proceso, index) => (
                      <div
                      key={index}
                      className="h-6 w-6 md:h-8 md:w-8 xl:w-10 xl:h-10 2xl:h-14 2xl:w-14 flex 
                      items-center justify-center border-gray-400 border-2 text-white"
                      style={{backgroundColor: proceso.color}}
                    >{proceso.nombreProceso}
                    </div>
                ))}
              </div>
        
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
