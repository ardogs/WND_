
import { List as AntList } from 'antd';
import './styles.scss';
import { ListdataSource } from './types';

interface Props {
    data: ListdataSource[]
}

export const List = ({ data }: Props) => (
    <AntList
        itemLayout="horizontal" dataSource={data} renderItem={(item) => (
            <AntList.Item actions={item.action ? [item.action] : []} >
                <AntList.Item.Meta title={item.title} />
            </AntList.Item>
        )}
    />
);