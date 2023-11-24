import {useAtom} from 'jotai';
import {
  SignUpFlowType,
  CommonFlowNameType,
  accountFlowAtom,
  accountFlowInit,
} from '../atoms/account/index';
import AddUndefined from '../utils/addUndefined';

type ChangeAccountFlowParams = {
  commonFlowName?: CommonFlowNameType;
  isResetSignUpFlow?: boolean;
} & AddUndefined<SignUpFlowType>;

const useAccountFlow = () => {
  const [accountFlow, setAccountFlow] = useAtom(accountFlowAtom);

  const changeAccountFlow = ({
    commonFlowName,
    signUpUser,
    step,
    isResetSignUpFlow,
  }: ChangeAccountFlowParams) => {
    if (isResetSignUpFlow) {
      setAccountFlow(prev => {
        return {
          ...prev,
          commonFlow: commonFlowName || prev.commonFlow,
          signUpFlow: accountFlowInit.signUpFlow,
        };
      });
      return;
    }
    setAccountFlow(prev => {
      return {
        ...prev,
        commonFlow: commonFlowName || prev.commonFlow,
        signUpFlow: {
          signUpUser: signUpUser || prev.signUpFlow.signUpUser,
          step: step || prev.signUpFlow.step,
        },
      };
    });
  };
  const increaseSignUpFlowStep = () => {
    setAccountFlow(prev => {
      return {
        ...prev,
        signUpFlow: {
          signUpUser: prev.signUpFlow.signUpUser,
          step: prev.signUpFlow.step + 1,
        },
      };
    });
  };
  const decreaseSignUpFlowStep = () => {
    if (accountFlow.signUpFlow.step === 0)
      throw new Error('현재 step이 0인 flow는 감소시킬 수 없습니다.');

    setAccountFlow(prev => {
      return {
        ...prev,
        signUpFlow: {
          signUpUser: prev.signUpFlow.signUpUser,
          step: prev.signUpFlow.step - 1,
        },
      };
    });
  };
  const resetAccountFlow = () => {
    setAccountFlow(accountFlowInit);
  };

  return {
    changeAccountFlow,
    resetAccountFlow,
    increaseSignUpFlowStep,
    decreaseSignUpFlowStep,
  };
};
export default useAccountFlow;
