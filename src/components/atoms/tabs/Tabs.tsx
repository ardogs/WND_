
import { Tabs as AntTabs, TabsProps } from 'antd';


interface Props extends Omit<TabsProps, 'tabPosition' | 'items'> {
    tabPosition: 'top' | 'right' | 'bottom' | 'left';
    items: TabsProps["items"]
}


export const Tabs = ({ tabPosition, items }: Props) => {
    return (
        <>
            <AntTabs
                tabPosition={tabPosition}
                items={items}
                animated={{tabPane: true}}
            />
        </>
    );
};

