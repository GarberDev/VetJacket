import { OptionType } from '@src/components/base/Select.tsx';
import ComboBox from '@src/components/base/ComboBox.tsx';

interface SelectProps {
  options?: OptionType[];
  selected: OptionType;
  setSelected: (e: OptionType) => null;
}

export default function Select({
  selected,
  setSelected,
  options,
}: SelectProps) {
  return (
    <ComboBox
      label=""
      options={options as OptionType[]}
      selected={selected}
      setSelected={setSelected}
      queryChanged={(e) => console.log(e)}
    />
  );
}
