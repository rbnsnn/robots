//Walidacja formularza /opinie

const validateForm = () => {
    //Domślne wartości dla każdego pola, które są fałszywe jeżeli pole nie przeszło walidacji
    const checkTrue = {
        name: false,
        email: false,
        message: false
    }
    //Pobieramy element name, nastepnie sprawdzamy jego wartość i dodajemy lub usuwamy klasy css
    const name = document.getElementById('name');
    if (name.value === "") {
        name.classList.add('is-invalid')
        name.classList.remove('is-valid')
        //Walidacja niepomyślna
        checkTrue.name = false
    } else {
        name.classList.add('is-valid')
        name.classList.remove('is-invalid')
        //Walidacja ok
        checkTrue.name = true
    }

    //Pobieramy element email
    const email = document.getElementById('email');
    //Wyrażenie regularne (RegEx) - sprwdza nam czy wpisany ciąg znaków spełnia określone warunki
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Sprawdzamy czy wartość pola email spełnia warunki RegEx i czy nie jest puste (""), następnie dodajemy lub usuwamy klasy css
    if (!re.test(email.value) || email.value === "") {
        email.classList.add('is-invalid')
        email.classList.remove('is-valid')
        //Walidacja niepomyślna
        checkTrue.email = false
    } else {
        email.classList.add('is-valid')
        email.classList.remove('is-invalid')
        //Walidacja ok
        checkTrue.email = true
    }

    //Pobieramy element message, następnie sprawdzamy jego wartość i dodajemy lub usuwamy klase css
    const message = document.getElementById('message');
    if (message.value === "") {
        message.classList.add('is-invalid')
        message.classList.remove('is-valid')
        //Walidacja niepomyślna
        checkTrue.message = false
    } else {
        message.classList.add('is-valid')
        message.classList.remove('is-invalid')
        //Walidacja ok
        checkTrue.message = true
    }

    //Sprawdzamy czy wszystkie pola przeszły walidację
    if (checkTrue.name && checkTrue.email && checkTrue.message) {
        //Obiekt data który zbierze wartości każdego pola
        const data = {
            name: name.value,
            email: email.value,
            message: message.value
        }
        //Przesyłamy przy pomocy fetch obiekt data. Metoda POST dla url /opinia - obsługa w opiniaController. Przy takim wysłaniu danych mamy do nich dostęp w req.body
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