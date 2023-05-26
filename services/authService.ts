// create authService with .login and .logout methods in react native

export const authService = {
    signIn: async (email: string, password: string) => {
        const submit: { email: string, password: string } = { email: email.toLowerCase(), password: password };
        const newuser = await fetch(global.SERVERPATH + '/mobile/mobilelogin.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: Object.keys(submit)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((submit as any)[key]))
                .join('&'),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data from the PHP server
                return data;
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });

        if (newuser.result === "Success") {
            return newuser;


        } else {
            alert("Invalid username or password");
            return false
        }


    },
    signUp: async (submit: { email: string, password: string, fname: string, sname: string, pcode: string }) => {
        const newuser = await fetch(global.SERVERPATH + '/mobile/mobileregister.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: Object.keys(submit)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((submit as any)[key]))
                .join('&'),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data from the PHP server
                return data;
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });

        if (newuser.result === "Success") {
            return true;


        } else {
            alert("Invalid username or password");
            return false
        }


    }
};