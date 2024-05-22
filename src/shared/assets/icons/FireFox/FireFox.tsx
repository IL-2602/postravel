import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg height={36} ref={ref} width={36} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'm35.95 11.746-.419 2.676s-.593-4.953-1.328-6.805c-1.117-2.836-1.617-2.816-1.617-2.808.75 1.902.613 2.93.613 2.93s-1.332-3.622-4.844-4.774c-3.89-1.277-5.996-.93-6.238-.863h-.105c.027.003.054.003.086.007-.004 0-.004.004-.004.004.015.02 4.3.746 5.062 1.793 0 0-1.82 0-3.633.52-.082.023 6.665.844 8.043 7.586 0 0-.742-1.547-1.656-1.805.602 1.828.45 5.3-.125 7.027-.074.223-.148-.96-1.277-1.468.363 2.59-.024 6.695-1.82 7.828-.137.086 1.125-4.055.253-2.453-5.015 7.695-10.949 3.55-13.613 1.726 1.367.297 3.961-.047 5.11-.898.003 0 .003-.004.003-.004 1.247-.856 1.985-1.477 2.649-1.328.664.148 1.105-.52.59-1.11-.516-.59-1.77-1.406-3.465-.96-1.192.312-2.676 1.632-4.934.296-1.738-1.031-1.902-1.883-1.918-2.476.043-.207.098-.403.164-.586.2-.555.805-.727 1.145-.86.57.102 1.062.278 1.582.543.004-.171.008-.398 0-.656.047-.101.016-.398-.063-.762a5.256 5.256 0 0 0-.238-1.078l.004-.004.008-.007h.004l.004-.016c.039-.164.422-.477.906-.813.434-.304.937-.625 1.34-.87.351-.223.62-.383.68-.426l.074-.059.015-.016.012-.007c.191-.153.473-.438.531-1.04v-.003c.004-.02.004-.036.004-.055 0-.016.004-.024.004-.04 0-.007 0-.019.004-.027v-.078c0-.058 0-.117-.004-.18a.343.343 0 0 0-.012-.097v-.016c0-.004-.004-.011-.004-.015v-.004c-.003-.004-.003-.008-.007-.016-.063-.144-.293-.195-1.246-.215h-.004a74.811 74.811 0 0 0-1.563-.004c-1.172.004-1.816-1.144-2.023-1.585.285-1.567 1.101-2.68 2.441-3.434.027-.012.024-.027-.008-.031.266-.16-3.172-.004-4.754 2.004-1.398-.348-2.62-.325-3.675-.079a4.915 4.915 0 0 1-.754-.093c-.7-.633-1.703-1.809-1.758-3.207 0 0-.004.004-.012.007V2.52S2.023 4.16 2.344 8.637c0 .07-.004.136-.004.207-.578.781-.863 1.441-.887 1.586C.941 11.473.422 13.043 0 15.422c0 0 .297-.938.887-2-.434 1.336-.778 3.414-.578 6.535 0 0 .054-.691.242-1.687.144 1.933.793 4.32 2.422 7.128 3.129 5.391 7.933 8.114 13.246 8.532a18.433 18.433 0 0 0 3.129-.016 19.468 19.468 0 0 0 3.277-.504c14.95-3.613 13.324-21.664 13.324-21.664zm0 0'
      }
      fill={'currentColor'}
      fillOpacity={'1'}
      fillRule={'evenodd'}
      stroke={'none'}
    />
  </svg>
)

export const FireFoxIcon = memo(forwardRef(SvgComponent))