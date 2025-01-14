import * as React from 'react'
import { SVGProps } from 'react'
const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    style={{ marginTop: '-2px' }}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M18 4h-1V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM6 6h1v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h1a1 1 0 0 1 1 1v4H5V7a1 1 0 0 1 1-1Zm12 14H6a1 1 0 0 1-1-1v-6h14v6a1 1 0 0 1-1 1Z'
      }
      fill={'#fff'}
    />
    <path
      d={'M8 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 15h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Z'}
      fill={'#fff'}
    />
  </svg>
)

export default Calendar
