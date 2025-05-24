import Loader from "../../components/icons/loader"
import Layout from "./layout"

export default function Home() {
  return (
    <Layout>
      <form class='flex w-full px-8 flex-col gap-4 max-w-sm mx-auto'>
        <h1 class='text-xl font-semibold text-start'>Login</h1>
        <input
          type='email'
          name='email'
          placeholder='Email'
          required
          class='py-2 px-3 outline-none rounded-md border'
        />
        <input
          type='number'
          name='otp'
          placeholder='OTP'
          pattern='[0-9]*'
          inputMode='numeric'
          maxLength={6}
          minLength={6}
          // required
          hidden
          class='py-2 px-3 outline-none rounded-md border'
          style={{
            "-webkit-appearance": "none",
            "-moz-appearance": "textfield",
          }}
        />
        <p id='message' class='text-start hidden'></p>
        <button
          type='submit'
          class='bg-foreground grid [grid-template-areas:"stack"] rounded-md p-2 text-background cursor-pointer font-semibold'>
          <span class='[grid-area:stack]' id='submit-text'>
            Submit
          </span>
          <Loader class='[grid-area:stack] m-auto h-4 w-4 invisible' />
        </button>
      </form>
    </Layout>
  )
}
