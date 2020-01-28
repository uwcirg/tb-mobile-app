import { MobXProviderContext } from 'mobx-react';
import React from 'react';

export default function useStores() {
    return React.useContext(MobXProviderContext)
}