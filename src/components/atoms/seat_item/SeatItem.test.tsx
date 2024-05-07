import {render, screen} from '@testing-library/react-native';
import SeatItem from './SeatItem';

test('component must rendered', async () => {
  const onPress = jest.fn();

  render(
    <SeatItem
      label={1}
      forDesktopSeat
      onPress={onPress}
      forDisabledPerson={false}
    />,
  );
  const seatItem = screen;

  expect(seatItem).toBeTruthy();
});
