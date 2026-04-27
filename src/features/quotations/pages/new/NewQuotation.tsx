import { AnimatedPage } from '../../../../components/layout'
import { QuoteForm } from '../../components/quoteForm/QuoteForm';
import "./styles.scss"

export const NewQuotation = () => {

    return (
        <AnimatedPage>
            <div className='newQuotation-content'>
                <QuoteForm 
                // mode="create" 
                />
            </div>
        </AnimatedPage >
    )
}

