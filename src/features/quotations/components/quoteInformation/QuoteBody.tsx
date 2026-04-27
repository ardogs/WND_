import { QuoteItemList } from './QuoteItemList';
import { GeneralInformation } from './GeneralInformation';
import { QuoutePricing } from './QuoutePricing';
import "./styles.scss";

export const QuoteBody = () => {
    return (
        <div className='quotation-body-card  quotation-body-card-form shadow scroll'>
            <GeneralInformation />
            <QuoteItemList />
            <QuoutePricing />
        </div>
    )
}
