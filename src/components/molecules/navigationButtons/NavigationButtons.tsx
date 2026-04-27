import { IconButton } from '../../atoms/';

import { AiOutlineArrowLeft, AiOutlineHome } from 'react-icons/ai';

import './styles.scss'

interface Props {
    handleHome: () => void
    handleGoBack: () => void
}

export const NavigationButtons = ({ handleHome, handleGoBack }: Props) => {
    return (
        <>
            <IconButton icon={<AiOutlineArrowLeft />} className="white" onClick={handleGoBack} />
            <IconButton icon={<AiOutlineHome />} className="white" onClick={handleHome} />
        </>

    )
}
