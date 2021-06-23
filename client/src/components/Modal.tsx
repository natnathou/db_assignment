import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../reducers';
import { updateNoResultStatus } from '../reducers/apiDuckduckgoSlice';

const ModalTemplate = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(updateNoResultStatus(false));
  };

  return (
    <div>
      <Modal isOpen={apiDuckduckgoState.noResult} toggle={toggle}>
        <ModalBody>NO RESULT, SORRY ;)</ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalTemplate;
