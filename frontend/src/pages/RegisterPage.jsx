import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Register.scss";

function RegisterPage() {
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" >
          <input
            placeholder="First Name"
            name="firstName"
            // value={formData.firstName}
            // onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            // value={formData.lastName}
            // onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            // value={formData.email}
            // onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            // value={formData.password}
            // onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            // value={formData.confirmPassword}
            // onChange={handleChange}
            type="password"
            required
          />

          {/* {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )} */}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            hidden
            // style={{ display: "none" }}
            // onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-file-upload-icon-image_1344464.jpg" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {/* {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )} */}
          <button type="submit" >REGISTER</button>
        </form>
        <Link to={'/login'}>Already have an account? Log In Here</Link>
      </div>
    </div>
  )
}

export default RegisterPage

// submit button disabled={!passwordMatch}