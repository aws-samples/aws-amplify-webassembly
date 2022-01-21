/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { FC } from 'react'

import HomeView from '../views/home'

// :: ---

type AppRootProps = {
  //
}

const AppRoot: FC<AppRootProps> = () => {
  return <HomeView />
}

export default AppRoot
