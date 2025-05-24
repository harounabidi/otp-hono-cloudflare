import Layout from "./layout"

export default function NotFound() {
  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Not Found</h1>
        <p className='text-gray-500'>
          The page you are looking for does not exist.
        </p>
        <a href='/' className='text-blue-500 hover:underline mt-4'>
          Go back to Home
        </a>
      </div>
    </Layout>
  )
}
