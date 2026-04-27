import { AiFillMoon, AiOutlineSun } from 'react-icons/ai';
import { Switch } from '../../../../../components/atoms'
import { useSettings } from '../../../../../hooks';

export const DarkModeSwitch = () => {

    const { darkmode, darkmodeisLoading, handleDarkMode } = useSettings();

    return (
        <Switch isChecked={darkmode} loading={darkmodeisLoading}
            unCheckedChildren={<AiOutlineSun />} checkedChildren={<AiFillMoon />}
            handleOnChange={handleDarkMode}
        />
    )
}
