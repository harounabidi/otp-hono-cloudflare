export default function Loader(props: { class?: string }) {
  return (
    <svg
      id='loader'
      viewBox='0 0 24 24'
      width='20'
      height='20'
      class={props.class}>
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'>
        <path
          fill='none'
          stroke='currentColor'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.3s'
            values='16;0'></animate>
          <animateTransform
            attributeName='transform'
            dur='1.5s'
            repeatCount='indefinite'
            type='rotate'
            values='0 12 12;360 12 12'></animateTransform>
        </path>
      </g>
    </svg>
  )
}
