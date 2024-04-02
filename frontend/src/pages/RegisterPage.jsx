import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../styles/Register.scss";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          [name]: name === "profileImage" ? files[0] : value,
        });
      };

    //   console.log(formData)

    const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }


  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit} >
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            hidden
            // style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-file-upload-icon-image_1344464.jpg" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" >REGISTER</button>
        </form>
        <Link to={'/login'}>Already have an account? Log In Here</Link>
      </div>
    </div>
  )
}

export default RegisterPage

// submit button disabled={!passwordMatch}