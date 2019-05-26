import React from 'react'
import { DateTime } from 'luxon'

export default ({ date }) => (
  <time dateTime={date}>
    {DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}
  </time>
)
