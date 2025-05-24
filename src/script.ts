window.addEventListener("DOMContentLoaded", () => {
  const authForm = document.querySelector("form") as HTMLFormElement

  const emailField = document.querySelector(
    "input[name='email']"
  ) as HTMLInputElement

  const otpField = document.querySelector(
    "input[name='otp']"
  ) as HTMLInputElement

  const submitBtn = document.querySelector(
    "button[type='submit']"
  ) as HTMLButtonElement

  const submitText = document.querySelector("#submit-text") as HTMLSpanElement

  const loaderIcon = document.querySelector("#loader") as SVGElement | null

  const feedbackMsg = document.querySelector("#message") as HTMLParagraphElement

  let authStep = 1 // 1: email, 2: otp

  emailField.addEventListener("input", () => {
    feedbackMsg.textContent = ""
    feedbackMsg.style.display = "none"
    emailField.style.borderColor = ""
  })

  otpField.addEventListener("input", () => {
    feedbackMsg.textContent = ""
    feedbackMsg.style.display = "none"
    otpField.style.borderColor = ""
  })

  authForm?.addEventListener("submit", async (e) => {
    e.preventDefault()
    submitBtn.disabled = true

    submitText.classList.add("invisible")
    loaderIcon?.classList.remove("invisible")

    if (authStep === 1) {
      // Step 1: Send email to /api/login
      const formData = new FormData(authForm)
      const email = formData.get("email")
      try {
        const loginResponse = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
        const loginResult: { success?: boolean; error?: string } =
          await loginResponse.json()
        if (loginResult.error) {
          feedbackMsg.style.display = "block"
          feedbackMsg.textContent = loginResult.error
          feedbackMsg.style.color = "#ff5938"
          submitBtn.disabled = false

          if (loginResult.error === "Invalid email") {
            emailField.focus()
            emailField.style.borderColor = "#ff5938"
          }
          return
        }
        // Success: show OTP input
        feedbackMsg.setAttribute("hidden", "true")
        otpField.removeAttribute("hidden")
        otpField.setAttribute("required", "true")
        otpField.focus()
        authStep = 2
        submitBtn.disabled = false
        submitBtn.innerHTML = "Verify OTP"
      } catch (error) {
        feedbackMsg.textContent = "An error occurred. Please try again."
        feedbackMsg.style.color = "#ff5938"
        submitBtn.disabled = false
      }
    } else if (authStep === 2) {
      // Step 2: Verify OTP
      const email = emailField.value
      const otp = otpField.value
      if (!otp) {
        alert("Please enter the OTP")
        submitBtn.disabled = false
        return
      }
      try {
        const verifyResponse = await fetch("/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, otp }),
        })
        const verifyResult = (await verifyResponse.json()) as {
          success: boolean
          error?: string
        }
        if (!verifyResponse.ok || verifyResult.error) {
          feedbackMsg.style.display = "block"
          feedbackMsg.textContent =
            verifyResult.error || `HTTP error! status: ${verifyResponse.status}`
          feedbackMsg.style.color = "#ff5938"

          submitBtn.disabled = false

          if (verifyResult.error === "Invalid email") {
            emailField.focus()
            emailField.style.borderColor = "#ff5938"
          }

          if (
            verifyResult.error === "OTP must be 6 digits" ||
            verifyResult.error === "Invalid OTP"
          ) {
            otpField.focus()
            otpField.style.borderColor = "#ff5938"
          }
          return
        }
        window.location.href = "/admin"
      } catch (error) {
        feedbackMsg.textContent = "An error occurred. Please try again."
        feedbackMsg.style.color = "#ff5938"
        submitBtn.disabled = false
      }
    }
  })
})
