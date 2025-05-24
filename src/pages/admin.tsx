import Layout from "./layout"

export default async function Admin({ email }: { email?: string }) {
  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 class='text-xl'>Hello, {email ? email : "Admin"}!</h1>
        <form action='/api/logout' method='post' class='mt-4'>
          <button
            type='submit'
            class='bg-foreground rounded-md py-2 px-3 text-background cursor-pointer font-semibold'>
            Logout
          </button>
        </form>
      </div>
    </Layout>
  )
}
