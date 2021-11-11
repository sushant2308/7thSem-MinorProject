import React,{useState} from 'react'
import { Redirect } from 'react-router-dom';
import './Home.css'
function Home() {
    const [id,setid] = useState('')
    const [redirect,setredirect] = useState(null)

    if(redirect) {
        return <Redirect to={redirect} />
    }
    return (

        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4">Hi there welcome back!</h3>
              <form>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" placeholder="ID of the device" value={id} onChange={(e)=>setid(e.target.value)}/>
                  <label for="floatingInput">Enter the id of the device</label>
                </div>
                <div className="d-grid">
                    <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" onClick={(e) => {
                        e.preventDefault()
                        setredirect('/readings/'+id)
                    }}>
                        Submit
                    </button>
                </div>

              </form>
            </div>
          </div>
          </div>

    )
}

export default Home
