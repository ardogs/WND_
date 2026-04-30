import { App as AntApp, AppProps as AntAppProps } from 'antd';
import React from 'react';


interface AppProps<T> extends Omit<AntAppProps<T>, 'children'> {
    children: React.ReactNode;
}

const AppWrapper = <T,>({ children, ...rest }: AppProps<T>) => {

    return (<AntApp {...rest}> {children} </AntApp>)
}

export const App = Object.assign( AppWrapper, {
    useApp: AntApp.useApp,

} )