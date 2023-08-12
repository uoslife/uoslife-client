export type ToggleSwitchProps = {
  isOn: boolean;
  size: 'small' | 'medium';
  onToggle?: (name: string, value?: boolean) => void;
};

export default ToggleSwitchProps;
