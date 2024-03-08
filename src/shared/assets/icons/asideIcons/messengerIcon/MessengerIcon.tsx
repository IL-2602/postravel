import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg height={24} width={24} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M12 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1ZM16 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1ZM8 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm0 0'
      }
      style={{
        fill: '#fff',
        fillOpacity: 1,
        fillRule: 'nonzero',
        stroke: 'none',
      }}
    />
    <path
      d={
        'M19.07 4.93a10.006 10.006 0 0 0-6.125-2.907A10.01 10.01 0 0 0 2.38 9.163a10.028 10.028 0 0 0 .41 6.767c.098.199.129.422.09.64L2 20.8a.986.986 0 0 0 .02.49A.988.988 0 0 0 3 22h.2l4.28-.86c.22-.027.438.005.641.09a10.005 10.005 0 0 0 6.766.41 10.036 10.036 0 0 0 5.472-3.995 10.014 10.014 0 0 0-1.238-12.696Zm.828 8.36A8.004 8.004 0 0 1 15.875 19a7.968 7.968 0 0 1-3.445.984 7.993 7.993 0 0 1-3.532-.613 3.272 3.272 0 0 0-1.25-.262c-.187 0-.375.02-.558.051l-2.82.57.57-2.82a3.09 3.09 0 0 0-.211-1.808 7.993 7.993 0 0 1-.613-3.532 7.968 7.968 0 0 1 3.379-6.113 7.956 7.956 0 0 1 3.316-1.355 7.962 7.962 0 0 1 3.746.277 8.073 8.073 0 0 1 3.207 1.957c.895.898 1.566 2 1.957 3.207.39 1.21.484 2.492.277 3.746Zm0 0'
      }
      style={{
        fill: '#fff',
        fillOpacity: 1,
        fillRule: 'nonzero',
        stroke: 'none',
      }}
    />
  </svg>
)

export const MessengerIcon = memo(SvgComponent)
