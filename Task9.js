<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Input Validator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    form {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 320px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    label {
      display: block;
      margin: 10px 0 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 5px;
    }
    .error {
      color: red;
      font-size: 0.9em;
    }
  </style>
</head>
<body>

  <h2>Form Input Validator</h2>
  <form id="myForm">
    <label for="name">Name:</label>
    <input type="text" id="name" />
    <div id="nameError" class="error"></div>

    <label for="email">Email:</label>
    <input type="text" id="email" />
    <div id="emailError" class="error"></div>

    <label for="phone">Phone:</label>
    <input type="text" id="phone" />
    <div id="phoneError" class="error"></div>

    <label for="password">Password:</label>
    <input type="password" id="password" />
    <div id="passwordError" class="error"></div>

    <button type="submit">Submit</button>
  </form>

  <!-- JavaScript inside the HTML -->
  <script>
    // Regex patterns
    const nameRegex = /^[A-Za-z\s]{3,30}$/;  
    // ^ start, [A-Za-z\s] only letters and spaces, {3,30} between 3–30 chars

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;  
    // \w = letters/numbers/_, .- allowed, @ domain, .com/.net etc.

    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;  
    // Format: (123) 456-7890

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;  
    // At least 1 uppercase, 1 lowercase, 1 digit, 1 special char, 8+ length

    // Get form and inputs
    const form = document.getElementById("myForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");

    // Error message divs
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const passwordError = document.getElementById("passwordError");

    // Auto-format phone input as (123) 456-7890 using replace()
    phoneInput.addEventListener("input", function () {
      let digits = phoneInput.value.replace(/\D/g, ""); // remove non-digits
      if (digits.length > 10) digits = digits.substring(0, 10);

      let formatted = digits.replace(
        /(\d{0,3})(\d{0,3})(\d{0,4})/,
        function (_, g1, g2, g3) {
          let out = "";
          if (g1) out += `(${g1}`;
          if (g1.length === 3) out += ")";
          if (g2) out += ` ${g2}`;
          if (g2.length === 3) out += "-";
          if (g3) out += g3;
          return out;
        }
      );
      phoneInput.value = formatted;
    });

    // Validation function
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      // Name
      if (!nameRegex.test(nameInput.value)) {
        nameError.textContent = "Name must be 3-30 letters only.";
        valid = false;
      } else {
        nameError.textContent = "";
      }

      // Email
      if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Enter a valid email (e.g. test@mail.com).";
        valid = false;
      } else {
        emailError.textContent = "";
      }

      // Phone
      if (!phoneRegex.test(phoneInput.value)) {
        phoneError.textContent = "Phone must be in format (123) 456-7890.";
        valid = false;
      } else {
        phoneError.textContent = "";
      }

      // Password
      if (!passwordRegex.test(passwordInput.value)) {
        passwordError.textContent =
          "Password must be 8+ chars, include uppercase, lowercase, digit, and special symbol.";
        valid = false;
      } else {
        passwordError.textContent = "";
      }

      if (valid) {
        alert("Form submitted successfully ✅");
      }
    });
  </script>
</body>
</html>
