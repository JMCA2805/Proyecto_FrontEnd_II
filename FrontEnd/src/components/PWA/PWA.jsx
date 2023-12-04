import { useEffect, useState } from "react";

export default function PWA() {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      //Instalar ?
      event.preventDefault();

      //Evitar la visualizacion del instalar
      window.deferredPrompt = event;

      //Quitar lo oculto
      setIsReadyForInstall(true);
    });
  }, []);

  async function descargar() {

    //Asignacion de evento
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
      // Ya esta instalado
      return;
    }

    // mensaje de instalación
    promptEvent.prompt();

    const result = await promptEvent.userChoice;
    //Reseteo de evento
    window.deferredPrompt = null;

    //Ocultar instalacion
    setIsReadyForInstall(false);
  }

  return (
    <>
      {isReadyForInstall && (
        <div className="absolute flex justify-center items-center pt-28 left-1/2">
          <div className="fixed dark:border-azulO border-azul border-2 bg-white-smoke dark:bg-woodsmoke text-azulO dark:text-white rounded-lg w-80 text-center p-4">
            <div className="mb-2 py-2">
              <div className="flex gap-2 justify-center items-center w-full">
                <div className="w-20">
                  <img
                    className="w-full"
                    src="/WebStore Wonderland.png"
                    alt="Logo"
                  />
                </div>
                <h1 className="w-40 font-extrabold dark:text-azulW text-2xl text-left">
                  WebStore Wonderland
                </h1>
              </div>
              <p className="dark:text-white/50 text-azulO">
                Descarga nuestra PWA Offline
              </p>
            </div>
            <div className="flex w-full justify-center items-center p-2 gap-4">
              <button
                className="px-3 py-2 block md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                onClick={descargar}
              >
                Descargar
              </button>
              <button
                className="px-3 py-2 block md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                onClick={() => {
                  setIsReadyForInstall(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
