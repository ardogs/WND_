// import { TitleWithDescription } from "../../../../../components/molecules";
import { TitleWithDescription } from "../../../../components/molecules";
import "./styles.scss";

interface Props {
    title: string,
    description: string,
    children: React.ReactNode
}

export const SettingsCard = ({ title, description, children }: Props) => {
    return (
        <div className="settings-card-content shadow">
            <TitleWithDescription title={title} description={description} />
            {children}
        </div>
    )
}
