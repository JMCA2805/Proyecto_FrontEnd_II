import { Button, Modal } from 'flowbite-react';

function ArticleModal({ articulo, modalOpen, closeModal }) {
  if (!articulo) {
    return null;
  }

  return (
    <Modal show={modalOpen} size="6xl" className='bg-black' onClose={closeModal}>
      <Modal.Header className="bg-azulC dark:bg-woodsmoke">{articulo.titulo}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6 bg-white ">
          <img
            className="w-full rounded-2xl"
            src={articulo.imagen}
            alt="Articulo_image"
          />
          <p className="text-base leading-relaxed text-black dark:text-black">
            {articulo.texto}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-azulC dark:bg-woodsmoke">
        <Button className="bg-azulO hover:bg-azulW text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ArticleModal;