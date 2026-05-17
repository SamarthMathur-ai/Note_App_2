const signUpForm = document.querySelector(".form-item.sign-up");
const loginForm = document.querySelector('.form-item.log-in');

console.log(loginForm);
console.log(signUpForm);

// * Making sure the form actually exists
if(signUpForm) {
    signUpForm.addEventListener('submit', async(e)=>{
        // * Stop the form reloading page
        e.preventDefault();

        // *Scoops up all the inputs automatically
        const formData = new FormData(signUpForm);

        // *Converting all the formData into json object
        const signUpData = Object.fromEntries(formData);

        console.log("Sending this to backend", signUpData);

        try {

            // * The delivery driver
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData)
            });


            // ! Reading the backend's reply
            const result = await response.json();

            // * Handling the result
            if(response.ok) {// ? If status 200 or 201
                alert("Account created successfully! Please log in.");
            } else {
                alert("Error: " + result.error);
            }
        } catch(error) {
            console.error("Something went wrong with the fethc", error);
        }
    })
}


if(loginForm) {
    loginForm.addEventListener('submit', async(e)=>{
        // * Stopping the form reloading page
        e.preventDefault();

        // * Scooping up all the form data 
        const formData = new FormData(loginForm);

        // * Converting all the formdata into json object
        const loginData = Object.fromEntries(formData);

        console.log("Sending login data to backend: ", loginData);
        const token = localStorage.getItem('accessToken');
        

        try {
            // * the delivery driver
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            // ! reading the backend's reply
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('accessToken', result.accessToken);
                window.location.href = result.redirectTo;
            } else {
                alert('Login failed. Check your credentials.');
            }
        } catch (error) {
            console.log("Something went wrong: ", error);
        }

    })
}



