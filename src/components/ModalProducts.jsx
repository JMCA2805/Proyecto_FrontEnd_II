import { Button, Modal } from 'flowbite-react';

function ProductModal({ item, modalOpen, closeModal }) {
  if (!item) {
    return null;
  }

  return (
    <Modal show={modalOpen} size="7xl" className="bg-black" onClose={closeModal}>
      <Modal.Header className="bg-azulC dark:bg-woodsmoke">{item.nombre}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6 bg-white">
          <div className="bg-azul dark:bg-azulO rounded-lg p-4 mx-4 mt-4 sm:mx-28 border dark:border-azulC border-azulO">
            <h2 className="text-white text-3xl font-bold text-center">
              {item.nombre}
            </h2>
          </div>
          <div className="flex justify-center">
            <img className="w-512 h-auto rounded-xl bg-azulO" src={item.imagen} alt="Articulo_image" />
          </div>
          <div className="border dark:border-azulC border-azulO p-4 mx-2 mt-2 sm:mx-10">
            <div className="flex justify-between items-center mb-6">
              <p className="text-4xl font-bold text-black dark:text-black ">${item.precio}</p>
              <p className="text-xl text-black dark:text-black">Cantidad: {item.cantidad}</p>
            </div>
            <p className="text-lg leading-relaxed text-black dark:text-black mb-6">Descripción: {item.descripcion}</p>
            <p className="text-lg text-black dark:text-black">Categoría: {item.categoria}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-azulC dark:bg-woodsmoke">
        <Button
          className="bg-azulO hover:bg-azulW text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={closeModal}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;