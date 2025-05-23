import Layout from "./layout"

export default function Login() {
  return (
    <Layout>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "300px",
          margin: "0 auto",
          fontSize: "1rem",
        }}>
        <h1
          style={{
            color: "#fafafa",
            fontSize: "1.25rem",
            fontWeight: 600,
            textAlign: "start",
          }}>
          Login
        </h1>
        <input
          type='email'
          name='email'
          placeholder='Email'
          required
          style={{
            padding: "0.5rem",
            outline: "none",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            backgroundColor: "transparent",
            color: "#fafafa",
          }}
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
          style={{
            "-webkit-appearance": "none",
            "-moz-appearance": "textfield",
            outline: "none",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            backgroundColor: "transparent",
            color: "#fafafa",
          }}
        />
        <p
          id='message'
          style={{
            color: "#fafafa",
            fontSize: "0.875rem",
            fontWeight: 400,
            textAlign: "start",
            display: "none",
          }}></p>
        <button
          type='submit'
          style={{
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #fafafa",
            backgroundColor: "#fafafa",
            color: "#18181b",
            fontWeight: 500,
            cursor: "pointer",
          }}>
          Submit
        </button>
      </form>
    </Layout>
  )
}
