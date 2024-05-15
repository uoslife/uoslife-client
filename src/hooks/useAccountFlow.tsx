import {useAtom} from 'jotai';
import {
  AccountFlowNameType,
  accountFlowAtom,
  accountFlowInit,
} from '../store/account';

const useAccountFlow = () => {
  const [accountFlow, setAccountFlow] = useAtom(accountFlowAtom);

  const changeAccountFlow = (name: AccountFlowNameType) => {
    setAccountFlow(name);
  };
  const resetAccountFlow = () => {
    setAccountFlow(accountFlowInit);
  };

  return {
    accountFlow,
    changeAccountFlow,
    resetAccountFlow,
  };
};
export default useAccountFlow;
