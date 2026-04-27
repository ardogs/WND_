import { Steps as AntSteps } from 'antd'
import { Button, Flex } from '../../atoms'
import { PopConfirm } from '../../organisms'
import { StepsContent, useSteps, useTitleBar } from '../../../hooks'
import "./styles.scss"

interface Props {
    stepsArray: StepsContent[];
}

export const Steps = ({ stepsArray }: Props) => {

    const { currentStep, status, items, previous, showPreviousButton, handleNext, next } = useSteps(stepsArray);
    const { handleHome } = useTitleBar()
    return (
        <>
            <Flex justify='center' vertical className='' align='center' >
                <AntSteps current={currentStep} status={status} size='small' items={items} style={{ width: "60%", alignContent: "center" }} />
            </Flex>

            <div className='content-step'>
                {stepsArray[currentStep].content}
            </div>

            <Flex className='controlbuttons' justify='center' gap={8}>
                {( currentStep === 0 ||currentStep === items.length - 1) && <Button type="default" text='Volver al inicio' onClick={handleHome}/>}
                {showPreviousButton && <Button type="primary" text='Anterior' onClick={previous} />}
                {(currentStep >= 0) && (currentStep < items.length - 2) && <Button type="primary" htmlType='button' text='Siguiente' onClick={handleNext} />}
                {(currentStep === items.length - 2) && <PopConfirm title='Enviar cotización' description='¿Desea enviar esta información?' buttonText='Enviar' next={next} />}
            </Flex>
        </>

    )
}
