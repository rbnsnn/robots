const validateForm = () => {
    const checkTrue = {
        name: false,
        email: false,
        message: false
    }
    const name = document.getElementById('name');
    if (name.value === "") {
        name.classList.add('is-invalid')
        name.classList.remove('is-valid')
        checkTrue.name = false
    } else {
        name.classList.add('is-valid')
        name.classList.remove('is-invalid')
        checkTrue.name = true
    }

    const email = document.getElementById('email');

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.value) || email.value === "") {
        email.classList.add('is-invalid')
        email.classList.remove('is-valid')
        checkTrue.email = false
    } else {
        email.classList.add('is-valid')
        email.classList.remove('is-invalid')
        checkTrue.email = true
    }

    const message = document.getElementById('message');
    if (message.value === "") {
        message.classList.add('is-invalid')
        message.classList.remove('is-valid')
        checkTrue.message = false
    } else {
        message.classList.add('is-valid')
        message.classList.remove('is-invalid')
        checkTrue.message = true
    }

    if (checkTrue.name && checkTrue.email && checkTrue.message) {
        const data = {
            name: name.value,
            email: email.value,
            message: message.value
        }
        fetch("/opinia", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => {
            const form = document.querySelector('.opinion-form')
            form.submit()
        })
    }
}

const opinionButton = document.querySelector('.opinion-button')

opinionButton.addEventListener('click', validateForm)