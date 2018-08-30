import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = props => (
  <div>
    <Modal isOpen={props.showModal} >
      <ModalHeader >Select Batsmen</ModalHeader>
      <ModalBody>
        BatsmenList
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggleModal}>Select</Button>{' '}

      </ModalFooter>
    </Modal>
  </div>
);

export default ModalExample;
