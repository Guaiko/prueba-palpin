import React, { Fragment, useState } from 'react';

function Formulary(){

    const [data, setData] = useState({
        username: '',
        ci: '',
        password: '',
    })

    const [confirmPassword, setConfirmPassword] = useState({
        confirmpassword: ''
    });

    const [step, setStep] = useState(1);

    const [usernameValue, setUsernameValue] = useState();

    const [ciNumber, setCiNumber] = useState();

    const [passwordValue, setPasswordValue] = useState();

    const handleStepOne = (e) => {
        e.preventDefault();
        setStep(2);
    }

    const handleStepTwo = async (e) => {
        e.preventDefault();
        if (data.password.length > 0 && confirmPassword.confirmpassword.length) {
            if (data.password === confirmPassword.confirmpassword) {
                setPasswordValue(true);
                setData({
                    username: data.username,
                    ci: data.ci,
                    password: data.password
                });
                setStep(3);
                try {
                    const config = {
                        method: 'POST',
                        headers: {
                            "Accept" : 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(data)
                    }
                    const res = await fetch('http://localhost:3001/users', config);
                    await res.json();
                } catch (error) {
                    console.log(error);
                }
            } else {
                setPasswordValue(false);
            }
        } else {
            setPasswordValue(0);
        }
    }

    const handleUsername = (e) => {
        const value = e.target.value;
        value.length < 6 ? setUsernameValue(false) : setUsernameValue(true)
        usernameValue === true ? setData({
            ...data,
            username: value
        }) : setData({
            ...data,
            username: value
        })
    }

    const handleCI = (e) => {
        const value = e.target.value;
        isNaN(value) ? setData({
            ...data,
            ci: data.ci
        }) : setData({
            ...data,
            ci: value
        })
        isNaN(data.ci) ? setCiNumber(false) : setCiNumber(true)
    }

    const handlePassword = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword({
            ...confirmPassword,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Fragment>
            {
                step === 1 ? (
                    <div className="container">
                        <div className="row text-white">
                            <div className="col-lg-4 bg-primary border">
                                <h3>Paso 1: Datos básicos</h3>
                            </div>
                            <div className="col-lg-4 bg-secondary border">
                                <h3>Paso 2: Seguridad</h3>
                            </div>
                            <div className="col-lg-4 bg-secondary border">
                                <h3>Registro completado</h3>
                            </div>
                        </div>
                        <form action="" method="POST" onSubmit={(e) => handleStepOne(e)}>
                            <div className="form-group mt-3">
                                <label for="username">Nombre de usuario</label>
                                <input type="text" name="username" onChange={(e) => handleUsername(e)} value={data.username} maxLength="15" className="form-control"  aria-describedby="helpUsername" />
                                {
                                    usernameValue === true ? (
                                        <small id="helpUsername" className="text-success">* Debe contener minimo 6 y máximo 15 carácteres</small>
                                    ) : (
                                        <small id="helpUsername" className="text-muted">* Debe contener minimo 6 carácteres y máximo 15</small>
                                    )
                                }
                            </div>
                            <div className="form-group mt-4">
                                <label for="ci">Cédula de identidad</label>
                                <input type="text" name="ci" onChange={(e) => handleCI(e)} value={data.ci} className="form-control" maxLength="8" aria-describedby="helpCI" />
                                {
                                    ciNumber === true ? (
                                        <small id="helpCI" className="text-success">* Debe contener solo carácteres númericos</small>
                                    ) : (
                                        <small id="helpCI" className="text-muted">* Debe contener solo carácteres númericos</small>
                                    )
                                }
                            </div>
                            {
                                usernameValue === true && ciNumber === true ? (
                                    <button type="submit" className="btn btn-success btn-block mt-5">Continuar</button>
                                ) : (
                                    <button type="submit" className="btn btn-success btn-block mt-5" disabled>Continuar</button>
                                )
                            }
                        </form>
                    </div>
                ) : ('')
            }
            {
                step === 2 ? (
                    <div className="container">
                        <div className="row text-white">
                            <div className="col-lg-4 bg-success">
                                <h3>Paso 1: Datos básicos</h3>
                            </div>
                            <div className="col-lg-4 bg-primary">
                                <h3>Paso 2: Seguridad</h3>
                            </div>
                            <div className="col-lg-4 bg-secondary">
                                <h3>Registro completado</h3>
                            </div>
                        </div>
                        <form action="" method="POST" onSubmit={(e) => handleStepTwo(e)}>
                            <div className="form-group mt-3">
                                <label for="password">Contraseña</label>
                                <input type="password" name="password" onChange={(e) => handlePassword(e)} maxLength="20" className="form-control"  aria-describedby="helpPassword" />
                            </div>
                            <div className="form-group mt-4">
                                <label for="confirmpassword">Confirme su contraseña</label>
                                <input type="password" name="confirmpassword" onChange={(e) => handleConfirmPassword(e)} className="form-control" maxLength="20" aria-describedby="helpConfirmPassword" />
                            </div>
                            {
                                passwordValue === false ? (
                                    <span className="text-danger">* La contraseña no coincide</span>
                                ) : ('')
                            }
                            {
                                passwordValue === 0 ? (
                                    <span className="text-danger">* Debe completar los campos</span>
                                ) : ('')
                            }
                            <button type="submit" className="btn btn-success btn-block mt-5">Registrarme</button>
                        </form>
                    </div>
                ) : ('')
            }
            {
                step === 3 ? (
                    <div className="container">
                        <div className="row text-white">
                            <div className="col-lg-4 bg-success">
                                <h3>Paso 1: Datos básicos</h3>
                            </div>
                            <div className="col-lg-4 bg-success">
                                <h3>Paso 2: Seguridad</h3>
                            </div>
                            <div className="col-lg-4 bg-success">
                                <h3>Registro completado</h3>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <h3 className="text-black mt-5">¡Se ha registrado éxitosamente!</h3>
                        </div>
                    </div>
                ) : ('')
            }
        </Fragment>
    );
}

export default Formulary;
