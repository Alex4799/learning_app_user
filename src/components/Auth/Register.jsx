import './index.css';

function Register(){
    return(
        <div className="d-flex justify-content-center align-items-center parents">
        <div className="container-fluid row">
            <div className="col-lg-4 offset-lg-4 bg-white shadow p-3 rounded">
                <div className="p-4">
                        <h2 className=" text-center">Welcome To Angle</h2>
                        <div className='d-flex justify-content-center'>
                            <img src="./image/ANGLE_logo.png" alt="" className='w-50' />
                        </div>
                        <h2 className=" py-2 text-center">Register</h2>
                        <div className="py-2">
                            <label className="py-2">Name</label>
                            <input type="text" className="form-control py-2" name="name" />
                        </div>
                        <div className="py-2">
                            <label className="py-2">Email</label>
                            <input type="email" className="form-control py-2" name="email" />
                        </div>
                        <div className="py-2">
                            <label className="py-2">Password</label>
                            <input type="password" className="form-control py-2" name="password" />
                        </div>
                        <div className="py-2">
                            <label className="py-2">Confirm Password</label>
                            <input type="password" className="form-control py-2" name="password_confirmation" />
                        </div>
                        <div className="py-4">
                            <button className="buttonone fs-4">Register</button>
                        </div>
                        <div className="py-1">
                            <a href="">You already have an account? Login Here!</a>
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Register