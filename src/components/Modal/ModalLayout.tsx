import { FC, ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';

import { shareModalState } from '@/lib/recoil';

export interface ModalLayoutProps {
  children: ReactNode;
}

const ModalLayout: FC<ModalLayoutProps> = ({ children }) => {
  const setModal = useSetRecoilState(shareModalState);

  return (
    <div className="fixed top-0 flex h-full w-full snap-center justify-center">
      {children}
      <div className="h-full w-full" onClick={() => setModal(false)} />
    </div>
  );
};

export default ModalLayout;
