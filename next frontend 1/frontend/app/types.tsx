import { NextPage, NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { LayoutKeys } from './layouts';

export type MyPage<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: LayoutKeys;
}

export type MyAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any, any> & {
        Layout: LayoutKeys;
    }
}

export type TypeQuest = object;
export type TypeReward = object;
export type TypeItem = object;
export type TypeNpc = object;
export type TypeStep = object;
export type TypeJob = object;
export type TypeClass = {name: string, active: boolean};