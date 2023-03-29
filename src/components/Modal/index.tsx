import { FC, ReactNode } from 'react';

import ModalLayout from './ModalLayout';

interface ModalProps {
  component: ReactNode;
}

const Modal: FC<ModalProps> = ({ component }) => {
  return <ModalLayout>{component}</ModalLayout>;
};

export default Modal;
