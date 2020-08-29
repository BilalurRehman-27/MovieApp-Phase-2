import { storiesOf } from '@storybook/react'
import React from 'react'

import MovieHeader from './index'

storiesOf('Movies Header', module).add(
    'change input in the Knobs tab',
    () => {
        return <MovieHeader movie={{ title: 'BatMan', homepage: '/home' }} />
    },
    {
        notes: `Movie Header component`,
    })